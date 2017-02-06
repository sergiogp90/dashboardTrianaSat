function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      zoom: 12,
      center: {lat: 37.379324, lng: -6.012817},
      mapTypeId: 'terrain'
    });

    //ajax
    $.ajax({
        url: 'http://salesianosftpclient.hol.es/datosjson/coordenadas.json',
        type: "GET",
        cache: false,
        success: function(root){
          var coordenadas = root.coordenadas;

          var flightPath = new google.maps.Polyline({
            path: coordenadas,
            geodesic: true,
            strokeColor: '#91A5D2',
            strokeOpacity: 1.0,
            strokeWeight: 4
          });

          var infowindow = new google.maps.InfoWindow();

          for (var i=0; i < flightPath.getPath().getLength(); i++){
              var marker = new google.maps.Marker({
                 icon: {
                     url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
                     size: new google.maps.Size( 7, 7 ),
                     anchor: new google.maps.Point( 4, 4 )
                 },
                 title: String(flightPath.getPath().getAt(i)),
                 position: flightPath.getPath().getAt(i),
                 map: map
              });

              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  var toolTip = '<div id="map-box"><div id="siteNotice"></div>'+
                   '<h1 id="firstHeading" class="firstHeading">Punto de prueba</h1>'+
                   '<div id="bodyContent"><p>'+marker.position+'</p></div></div>';

                    infowindow.setContent(toolTip);
                    infowindow.setPosition(marker.position);
                    infowindow.open(map);
                }
              })(marker, i));
          }

          google.maps.event.addListener(map, 'click', function(event) {
            infowindow.close()
          });

          flightPath.setMap( map );
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
          alert(xhr.responseText);
        }
    });
}