var chartAlturaData;
var chartTemperaturaData;
var chartPresionData;
var chartHumedadData;

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: 'http://trianasat2-salesianostriana.rhcloud.com/datossensores',
        success: function(data) {
          var listaDatosSensores = data._embedded.datossensores;

          var fechaLista = [];
          var alturaLista = [];
          var temperaturaLista = [];
          var presionLista = [];
          var humedadLista = [];

          var newDateHtml="";

          $.each(listaDatosSensores, function(i, datos) {
              var fecha = datos.fecha;
              var fechaFormateada = moment(fecha).format('DD/MM/YYYY HH:mm:ss');
              var fechaFormateadaCharts = moment(fecha).format('DD/MM HH:mm');

              var altitud= datos.altitud;
              var temperatura = datos.temperatura;
              var humedad = datos.humedad;
              var presion = datos.presion;
              var calidadDelAire = datos.calidad_aire;

              fechaLista.push(fechaFormateadaCharts);
              alturaLista.push(parseInt(altitud));
              temperaturaLista.push(parseInt(temperatura));
              presionLista.push(parseInt(presion));
              humedadLista.push(parseInt(humedad));

              newDateHtml += '<tr><td class="text-center">'+fechaFormateada+'</td><td class="text-center">'+altitud+'</td><td class="text-center">'+temperatura+'</td><td class="text-center">'+humedad+'</td><td class="text-center">'+presion+'</td><td class="text-center hideToken">'+calidadDelAire+'</td></tr>'
          });
          $("#tablaDatos").append(newDateHtml);

          chartAlturaData = {
            labels: fechaLista,
            datasets: [
              {
                label: "primero",
                fillColor : "rgba(220,0,220,0.5)",
                strokeColor : "rgba(0,220,0,1)",
                pointColor : "rgba(220,0,0,1)",
                pointStrokeColor : "#ffa",
                data: alturaLista
              }
            ]
          };

          chartTemperaturaData = {
            labels: fechaLista,
            datasets: [
              {
                label: "primero",
                fillColor : "rgba(220,0,220,0.5)",
                strokeColor : "rgba(0,220,0,1)",
                pointColor : "rgba(220,0,0,1)",
                pointStrokeColor : "#ffa",
                data: temperaturaLista
              }
            ]
          };

          chartPresionData = {
            labels: fechaLista,
            datasets: [
              {
                label: "primero",
                fillColor : "rgba(220,0,220,0.5)",
                strokeColor : "rgba(0,220,0,1)",
                pointColor : "rgba(220,0,0,1)",
                pointStrokeColor : "#ffa",
                data: presionLista
              }
            ]
          };

          chartHumedadData = {
            labels: fechaLista,
            datasets: [
              {
                label: "primero",
                fillColor : "rgba(220,0,220,0.5)",
                strokeColor : "rgba(0,220,0,1)",
                pointColor : "rgba(220,0,0,1)",
                pointStrokeColor : "#ffa",
                data: humedadLista
              }
            ]
          };
        },
        error: function(data) {
            alert("error ajax");
            $.each(data, function(i) {
                alert(data.text());
            });
        }
    });

    $(document).on('click', '.chartTab', function(){
        Chart.defaults.global.animationSteps = 50;
        Chart.defaults.global.tooltipYPadding = 16;
        Chart.defaults.global.tooltipCornerRadius = 2;
        Chart.defaults.global.tooltipTitleFontStyle = "normal";
        Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
        Chart.defaults.global.animationEasing = "easeOutBounce";
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.scaleLineColor = "black";
        Chart.defaults.global.scaleFontSize = 16;

        var ctxChartAltura = document.getElementById("graficaAltura").getContext("2d");
        var chartAltura = new Chart(ctxChartAltura).Line(chartAlturaData);

        var ctxChartTemperatura = document.getElementById("graficaTemperatura").getContext("2d");
        var chartTemperatura = new Chart(ctxChartTemperatura).Line(chartTemperaturaData);

        var ctxChartPresion = document.getElementById("graficaPresion").getContext("2d");
        var chartPresion = new Chart(ctxChartPresion).Line(chartPresionData);

        var ctxChartHumedad = document.getElementById("graficaHumedad").getContext("2d");
        var chartHumedad = new Chart(ctxChartHumedad).Line(chartHumedadData);
    });
});
