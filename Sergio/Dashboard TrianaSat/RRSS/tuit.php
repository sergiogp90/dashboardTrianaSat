<?php
$servername = "mysql.hostinger.es";//"172.27.0.48";//"localhost";//
$username = "u202739290_tuite";
$password = "gabronio";
$dbname = "u202739290_tuite";
$id= 1;

global $api_key;
global $api_secret;
global $access_token;
global $access_token_secret;

// Creo la conexión a la BD
$conn = new mysqli($servername, $username, $password, $dbname);
//var_dump($conn);

// Compruebo que todo OK
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
  echo "<h3>Connected successfully</h3>";


      // Hago un Select de los TOKENS del proyecto
   $sql = "SELECT api_key, api_secret, access_token, access_token_secret FROM proyecto where id= $id"; // where api_key=HYKqDevABoyGHoLcsE2C64t3B
   $result = $conn->query($sql);
   echo "<br><br>";
   //var_dump($result);
   if ($result->num_rows > 0) {
       echo "Al menos hay un resultado con esos datos en la BD.";
       while($row = $result->fetch_assoc()) {
           $api_key =              $row["api_key"];
           $api_secret =           $row["api_secret"];
           $access_token =         $row["access_token"];
           $access_token_secret =  $row["access_token_secret"];
   
           if($api_key =="" || $api_secret =="" || $access_token =="" || $access_token_secret ==""){
             //header("Location: generaToken.html");
             echo "<h3>Tienes que generar el token</h3><br><i>Header_Location</i>";
             //twittear();
           }else{
             echo "<h3>TE CONECTASTE CON LOS VALORES: $api_key,   $api_secret,   $access_token,   $access_token_secret. </h3>";
             twittear();
           }
       }
   
   } else {
       //echo "0 results";
       header("Location: https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%2FTwitter2%2FTwitter2%2Fhome.php&ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text=%C2%A1Me%20encanta%20la%20foto%20que%20hemos%20tomado%20desde%20la%20sonda!&tw_p=tweetbutton&url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&via=twitterdev");
   }
}
function twittear(){
    require_once ('codebird.php');
    // TODO: NO SE CONTROLA QUE LOS VALORES INTRODUCIDOS SEAN INCORRECTOS

     // API Key, API Secret
     \Codebird\Codebird::setConsumerKey($GLOBALS['api_key'], $GLOBALS['api_secret']);
     $cb = \Codebird\Codebird::getInstance();
     //API TOKEN
     $cb->setToken($GLOBALS['access_token'], $GLOBALS['access_token_secret']);
     // 	Access Token, Access Token Secret
     //SIMPLE TWEET
     /*$reply = (array) $cb->statuses_homeTimeline();
     print_r($reply);

     $reply = $cb->statuses_update('status=Whohoo, I just Tweeted!');
     */

    // Sólo se pueden enviar 4 fotos (.jpg o enlaces) o un gif/video.
    // NO SE PUEDEN MEZCLAR IMÁGENES Y VIDEOS
    // GIF: 'http://www.reactiongifs.com/wp-content/uploads/2013/06/you-dont-say.gif'
    // URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg'

     $media_files = []; //'image.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg',

    $data= json_decode($_REQUEST['data']);

    foreach($data as $d){
       //echo substr($d, 1, -1);
       array_push($media_files, substr($d, 1, -1));
    }
    echo "<u>Comprobamos dentro del array</u><br>";
    var_dump($media_files);
    echo "<br><u>Acabamos la comprobaci�n del array</u>";





     

     // ALOJARÁ LOS IDs DE LAS FOTOS
     $media_ids = [];

     foreach ($media_files as $file) {
       // SUBIDA DE FOTOS
       $reply = $cb->media_upload([
         'media' => $file
       ]);
       // COLLECTS FOTOS IDs
       $media_ids[] = $reply->media_id_string;
     }

     // CONVERTIMOS LAS IDs EN STRING
     $media_ids = implode(',', $media_ids);
// Aqu� es donde da el error
     // ENVIAMOS EL TWEET
     $reply = $cb->statuses_update([
       'status' => 'Sonda espacial',
       'media_ids' => $media_ids
     ]);

     //print_r($reply);
     echo "<h3>Twitteaste de manera correcta</h3>";
     //echo $reply['errors'][0]['message'];

}


 ?>
		