var actualMenuSelected;
var isMobile;
var projectToken;

// Cierra el menú lateral
function closeSideBar(){
    $('.sidebar-menu').css('display', 'none');
}

// Comprueba el tamaño del dispositivo.
function checkScreenSize(){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        isMobile = true;
        closeSideBar();
    }else{
        isMobile = false;
    }
}

function getUrlVars(){

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    /* TODO activar cuando esté alojada en el dominio, cambiando la URL por la real.
    Esto sirve para ocultar los parametros de la url

    if(typeof window.history.pushState == 'function') {
        window.history.pushState({}, "Hide", "file:///C:/Users/sguerrero/Desktop/dashboardTrianaSat/Sergio/Dashboard%20TrianaSat/publicIndex.html");
    }*/

    return vars;
}

$(document).ready(function(){
    var variables = getUrlVars();

    // Se comprueba el tamaño del dispositivo
    checkScreenSize();

    // En cada cambio de pantalla se comprueba el tamaño del dispositivo.
    $(window).resize(function() {
        checkScreenSize();
    });

    // Marcar como activo el menú mapa en el arranque, y se carga
    // la página con el mapa.
    actualMenuSelected = $('#goMapa').closest('li');
    actualMenuSelected.toggleClass('active');

    $('.main-wrapper').load("sections/sectionMapa.html");

    /******** EVENTOS CLICK MENÚ LATERAL ********/

    // Cambiar el menú activo según se pulsa.
    $('.menuLink').on('click', function(){
        actualMenuSelected.toggleClass('active');

        actualMenuSelected = $(this).closest('li');
        actualMenuSelected.toggleClass('active');
    });

    $('#goMapa').on('click', function(){
        $('.main-wrapper').load("sections/sectionMapa.html");

        if(isMobile){
            closeSideBar();
        }
    });

    $('#goGallery').on('click', function(){
        var photosURL = 'http://www.trianasat.com/datosjson/fotos.json';
        var newCols = "";

        $('.main-wrapper').load("sections/sectionGallery.html");

        if(isMobile){
            closeSideBar();
        }

        $.ajax({
            url: photosURL,
            type: "GET",
            cache: false,

          success: function(data){
            var listaFotos = data._embedded.timelapse;

            $.each(listaFotos, function (i, foto) {

                var fechaTraida = foto.fecha;
                var day = moment(fechaTraida).format('DD/MM/YYYY HH:mm:ss');

                var newImageHtml = '<div class="col-lg-3 col-md-4 col-xs-6 thumb"><a class="thumbnail">'+
                '<img class="img-responsive" src="'+foto.foto+'" alt="" fecha="'+day+'"></a>'+
                '<button class="js-button btn btn-secondary-outline btn-expand center-block" data-toggle="modal" data-target="#modalPicture"'+
                ' type="button" value="Expand photo" role="button"><i class="fa fa-eye" aria-hidden="true"></i></button></div>';

                newCols+=newImageHtml;
            });

            $('.photosBody').append(newCols);

            setPagination();
            updateGalleryItems();
          },
          error: function(data){
            alert("error ajax");
            $.each(data, function(i){
                alert(data.text());
            });
          }
        });
    });

    $('#goTable').on('click', function(){
        $('.main-wrapper').load("sections/sectionTable.html");

        if(isMobile){
            closeSideBar();
        }
    });

    $('#goMyProfile').on('click', function(){
        $('.main-wrapper').load("sections/sectionMyProfile.html");

        actualMenuSelected.removeClass('active');
    });
});
