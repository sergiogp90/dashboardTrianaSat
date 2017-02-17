var chartAlturaData;
var chartTemperaturaData;
var chartPresionData;
var chartHumedadData;

$(document).ready(function() {
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
            var fechaDiaMes = "";

            var newDateHtml = "";

            $.each(listaDatosSensores, function(i, datos) {
                var fecha = datos.fecha;
                var fechaFormateada = moment(fecha).format('DD/MM/YYYY HH:mm:ss');
                var fechaFormateadaCharts = moment(fecha).format('HH:mm');
                fechaDiaMes = moment(fecha).format('DD/MM');

                var altitud = datos.altitud;
                var temperatura = datos.temperatura;
                var humedad = datos.humedad;
                var presion = datos.presion;
                var calidadDelAire = datos.calidad_aire;

                fechaLista.push(fechaFormateadaCharts);
                alturaLista.push(parseInt(altitud));
                temperaturaLista.push(parseInt(temperatura));
                presionLista.push(parseInt(presion));
                humedadLista.push(parseInt(humedad));

                newDateHtml += '<tr><td class="text-center">' + fechaFormateada + '</td><td class="text-center">' + altitud + '</td><td class="text-center">' + temperatura + '</td><td class="text-center">' + humedad + '</td><td class="text-center">' + presion + '</td><td class="text-center hideToken">' + calidadDelAire + '</td></tr>'
            });

            $("#tablaDatos").append(newDateHtml);

            $('.titleAltura').text("Altura (" + fechaDiaMes + ")");
            $('.titleTemperatura').text("Temperatura (" + fechaDiaMes + ")");
            $('.titleHumedad').text("Humedad (" + fechaDiaMes + ")");
            $('.titlePresion').text("Presión (" + fechaDiaMes + ")");

            chartAlturaData = {
                labels: fechaLista,
                datasets: [{
                    fillColor: "rgba(200, 12, 12,0.5)",
                    strokeColor: "rgba(253, 0, 0,1)",
                    pointColor: "rgba(255,255,255,1)",
                    pointStrokeColor: "#f00",
                    data: alturaLista
                }]
            };

            chartTemperaturaData = {
                labels: fechaLista,
                datasets: [{
                    fillColor: "rgba(200, 12, 12,0.5)",
                    strokeColor: "rgba(253, 0, 0,1)",
                    pointColor: "rgba(255,255,255,1)",
                    pointStrokeColor: "#f00",
                    data: temperaturaLista
                }]
            };

            chartPresionData = {
                labels: fechaLista,
                datasets: [{
                    fillColor: "rgba(200, 12, 12,0.5)",
                    strokeColor: "rgba(253, 0, 0,1)",
                    pointColor: "rgba(255,255,255,1)",
                    pointStrokeColor: "#f00",
                    data: presionLista
                }]
            };

            chartHumedadData = {
                labels: fechaLista,
                datasets: [{
                    fillColor: "rgba(200, 12, 12,0.5)",
                    strokeColor: "rgba(253, 0, 0,1)",
                    pointColor: "rgba(255,255,255,1)",
                    pointStrokeColor: "#f00",
                    data: humedadLista
                }]
            };
        },
        error: function(data) {
            alert("error ajax");
            $.each(data, function(i) {
                alert(data.text());
            });
        }
    });

    $(document).on('click', '.chartTab', function() {
        Chart.defaults.global.animationSteps = 50;
        Chart.defaults.global.tooltipYPadding = 16;
        Chart.defaults.global.tooltipCornerRadius = 2;
        Chart.defaults.global.tooltipTitleFontStyle = "normal";
        Chart.defaults.global.tooltipFillColor = "rgba(253, 0, 0,1)";
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
