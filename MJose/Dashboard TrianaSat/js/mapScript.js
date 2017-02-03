function createInfoWindow(poly,content) {
    google.maps.event.addListener(poly, 'click', function(event) {
        infowindow.content = content;
        infowindow.position = event.latLng;
        infowindow.open(map);
    });
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 37.379324, lng: -6.012817},
      mapTypeId: 'terrain'
    });

    //ajax
    $.ajax({
        url: 'http://olalas.hol.es/datosJson/coordenadas.json',
        type: "GET",
        success: function(root){
          var coordenadas = root.coordenadas;
          alert(coordenadas[1]);
        },
        error: function(data){
          alert("error ajax");
          $.each(data, function(i){
              alert(data.text());
          });
        }
    });

    var flightPlanCoordinates = [
      {lat: 37.379324, lng: -6.012817},
      {lat: 37.372777, lng: -6.051270},
      {lat: 37.353129, lng: -6.097961},
      {lat: 37.331293, lng: -6.144653},
      {lat: 37.291973, lng: -6.166626},
      {lat: 37.291973, lng: -6.210571},
      {lat: 37.270119, lng: -6.276489},
      {lat: 37.222018, lng: -6.309448},
      {lat: 37.235139, lng: -6.397339},
      {lat: 37.187016, lng: -6.463257},
      {lat: 37.182640, lng: -6.551147},
      {lat: 37.138862, lng: -6.584106},
      {lat: 37.138862, lng: -6.680237},
      {lat: 37.081914, lng: -6.704956},
      {lat: 37.064383, lng: -6.803833}
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#91A5D2',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    var infowindow = new google.maps.InfoWindow({
        map: map
    });

    for ( var i = 0; i < flightPath.getPath().getLength(); i++ ) {
        var marker = new google.maps.Marker( {
           icon     : {
               // use whatever icon you want for the "dots"
               url     : "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
               size    : new google.maps.Size( 7, 7 ),
               anchor  : new google.maps.Point( 4, 4 )
           },
           title    : String(flightPath.getPath().getAt( i )),
           position : flightPath.getPath().getAt( i ),
           map      : map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var toolTip = '<div id="map-box">'+
           '<div id="siteNotice">'+
           '</div>'+
           '<h1 id="firstHeading" class="firstHeading">Punto de prueba</h1>'+
           '<div id="bodyContent">'+
           '<p>'+marker.position+'</p>'+
           '</div>'+
           '</div>';

            infowindow.setContent(toolTip);
            infowindow.setPosition(marker.position);
            infowindow.open(map);
        }
        })(marker, i));
    }

    google.maps.event.addListener(flightPath, 'click', function(event) {
        var toolTip = '<div id="map-box">'+
       '<div id="siteNotice">'+
       '</div>'+
       '<h1 id="firstHeading" class="firstHeading">Punto de prueba</h1>'+
       '<div id="bodyContent">'+
       '<p>'+event.latLng+'</p>'+
       '</div>'+
       '</div>';
        infowindow.setContent(toolTip);
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
    });

    flightPath.setMap( map );
}
