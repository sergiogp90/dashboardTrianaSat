var map;

function refreshData(){
  $.ajax({
      url: 'http://www.trianasat.com/datosjson/coordenadas.json',
      type: "GET",
      cache: false,
      success: function(root){
        var coordenadas = root._embedded.gps;

        var flightPath = new google.maps.Polyline({
          path: coordenadas,
          geodesic: true,
          strokeColor: '#91A5D2',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });

        var estadoBateria = coordenadas[coordenadas.length-1].estado_bateria;
        $('#bateria').text(estadoBateria+"%");


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
          infowindow.close();
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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      zoom: 12,
      center: {lat: 37.379324, lng: -6.012817},
      mapTypeId: 'terrain'
    });

    refreshData();
}

$(document).ready(function(){
    $(document).on('click', '#refreshSection', function(){
        refreshData();
    });

    $.ajax({
        cache: false,
        type: "GET",
        url: 'http://www.trianasat.com/datosjson/datosMapa.json',
        success: function(data) {
            var datosSensores = data._embedded.datossensores;
                var fecha_datosSens = moment(datosSensores.fecha).format('DD/MM/YYYY HH:mm:ss');
                var altitud_datosSens = datosSensores.altitud;
                var temperatura_datosSens = datosSensores.temperatura;
                var presion_datosSens = datosSensores.presion;
                var calidadDelAire_datosSens = datosSensores.calidad_aire;
                var humedad_datosSens = datosSensores.humedad;

                $('#altitud').text(altitud_datosSens);
                $('#temperatura').text(temperatura_datosSens);
                $('#humedad').text(humedad_datosSens);
                $('#presion').text(presion_datosSens);
                $('#calidadDelAire').text(calidadDelAire_datosSens);


        },
        error: function(data) {
            alert("error ajax");
            $.each(data, function(i) {
                alert(data.text());
            });
        }
    });
});
