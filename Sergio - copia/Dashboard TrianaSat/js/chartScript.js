$(document).ready(function(){
  //grafica
    /*$.ajax({
        url: 'http://www.olalas.hol.es/datos.json',
        data: {
            format: 'json'
        },
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "My First Chart in CanvasJS"
                },
                data: [{
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "line",
                    dataPoints: data
                }]
            });
            chart.render();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });*/
    //tabla datos(no borrar)
    $.ajax({
        cache: false,
        type: "GET",
        //  buena   url: 'http://trianasat2-salesianostriana.rhcloud.com/datossensores',
        url:'http://www.trianasat.com/datosjson/datosSensores.json',
        success: function(data) {
          var listaDatosSensores = data._embedded.datossensores;
          var newDateHtml="";

          $.each(listaDatosSensores, function(i, datos) {
              var fecha = datos.fecha;
              var fechaFormateada = moment(fecha).format('DD/MM/YYYY HH:mm:ss');

              var altitud= datos.altitud;
              var temperatura = datos.temperatura;
              var humedad = datos.humedad;
              var presion = datos.presion;
              var calidadDelAire = datos.calidad_aire;

              newDateHtml += '<tr><td class="text-center">'+fechaFormateada+'</td><td class="text-center">'+altitud+'</td><td class="text-center">'+temperatura+'</td><td class="text-center">'+humedad+'</td><td class="text-center">'+presion+'</td><td class="text-center">'+calidadDelAire+'</td></tr>'

          });
          $("#tablaDatos").append(newDateHtml);


        },
        error: function(data) {
            alert("error ajax");
            $.each(data, function(i) {
                alert(data.text());
            });
        }
    });
});
