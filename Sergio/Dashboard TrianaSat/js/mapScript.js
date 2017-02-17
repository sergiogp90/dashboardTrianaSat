var map;
var projectId;

function refreshData(projectId){
  $.ajax({
      url: 'http://trianasat2-salesianostriana.rhcloud.com/proyectos/'+ projectId +'/gps',
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

        var estadoBateria = coordenadas[0].estado_bateria;
        $('#bateria').text(estadoBateria+" %");

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

    refreshData(projectId);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1].split("#")[0];
    }

    /* TODO activar cuando esté alojada en el dominio, cambiando la URL por la real.
    Esto sirve para ocultar los parametros de la url

    if(typeof window.history.pushState == 'function') {
        window.history.pushState({}, "Hide", "file:///C:/Users/sguerrero/Desktop/dashboardTrianaSat/Sergio/Dashboard%20TrianaSat/publicIndex.html");
    }*/
    return vars;
}


$(document).ready(function(){
    var getParameters = getUrlVars();
    projectId = getParameters["projectId"];

    $(document).on('click', '#refreshSection', function(){
        refreshData(projectId);
    });

    $.ajax({
        cache: false,
        type: "GET",
        url: "http://trianasat2-salesianostriana.rhcloud.com/proyectos/"+ projectId +"/datos_sensores",
        success: function(data) {
            var datosSensores = data._embedded.datossensores[0];

            var fecha_datosSens = moment(datosSensores.fecha).format('DD/MM/YYYY HH:mm:ss');
            var altitud_datosSens = datosSensores.altitud;
            var temperatura_datosSens = datosSensores.temperatura;
            var presion_datosSens = datosSensores.presion;
            var calidadDelAire_datosSens = datosSensores.calidad_aire;
            var humedad_datosSens = datosSensores.humedad;

            $('#altitud').text(altitud_datosSens+" m.");
            $('#temperatura').text(temperatura_datosSens+" ºC");
            $('#humedad').text(humedad_datosSens+" %");
            $('#presion').text(presion_datosSens+" hPca");
            //$('#calidadDelAire').text(calidadDelAire_datosSens);
        },
        error: function(data) {
            alert("error ajax");
            $.each(data, function(i) {
                alert(data.text());
            });
        }
    });
});
