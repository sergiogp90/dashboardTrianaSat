
$(document).ready(function(){

//grafica 1
var fechaLista =[];
var altura = [];
//trianasat2-salesianostriana.rhcloud.com/datossensores
$.getJSON("http://trianasat2-salesianostriana.rhcloud.com/datossensores", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var raiz = json._embedded.datossensores;
//  var altitud = json._embedded.datossensores;
  console.log(json._embedded.datossensores[0]);

  $.each(raiz, function(i, dato) {
    var fecha = dato.fecha;

    var formattedDate = moment(fecha).format('HH:mm');
    var altitud = dato.altitud;
    //var formattedDate = moment(fechaAltura).format('DD/MM/YYYY HH:mm:ss');
    fechaLista.push(formattedDate);
    altura.push(parseInt(altitud));
    ;
  });


  var data = {
    labels: fechaLista,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,0,1)",
      pointStrokeColor : "#ffa",
      data: altura
    }

    ]
  };

  var ctxdos = document.getElementById("grafica1").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxdos).Line(data);
});


//grafica 2
$.getJSON("http://trianasat2-salesianostriana.rhcloud.com/datossensores", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var fechaListaD= [];
  var temperaturaLista = [];
  var raiz = json._embedded.datossensores;
//  var altitud = json._embedded.datossensores;
  console.log(json._embedded.datossensores[0]);

  $.each(raiz, function(i, dato) {
    var fecha = dato.fecha;

    var formattedDate = moment(fecha).format('HH:mm');
    var temperatura = dato.temperatura;
    //var formattedDate = moment(fechaAltura).format('DD/MM/YYYY HH:mm:ss');
    fechaListaD.push(formattedDate);
    temperaturaLista.push(parseInt(temperatura));

  });


  var data = {
    labels: fechaListaD,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: temperaturaLista
    }

    ]
  };

  var ctxdos = document.getElementById("grafica2").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxdos).Line(data);
});

//grafica 3

$.getJSON("http://trianasat2-salesianostriana.rhcloud.com/datossensores", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var fechaListaE= [];
  var presionLista = [];
  var raiz = json._embedded.datossensores;
//  var altitud = json._embedded.datossensores;


  $.each(raiz, function(i, dato) {
    var fecha = dato.fecha;

    var formattedDate = moment(fecha).format('HH:mm');
    var presion = dato.presion;
    //var formattedDate = moment(fechaAltura).format('DD/MM/YYYY HH:mm:ss');
    fechaListaE.push(formattedDate);
    presionLista.push(parseInt(presion));

  });


  var data = {
    labels: fechaListaE,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: presionLista
    }

    ]
  };

  var ctxdos = document.getElementById("grafica3").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxdos).Line(data);
});

//grafica 4

$.getJSON("http://trianasat2-salesianostriana.rhcloud.com/datossensores", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var fechaListaA= [];
  var calidad_aireLista = [];
  var raiz = json._embedded.datossensores;
//  var altitud = json._embedded.datossensores;
  console.log(json._embedded.datossensores[0]);

  $.each(raiz, function(i, dato) {
    var fecha = dato.fecha;

    var formattedDate = moment(fecha).format('HH:mm');
    var calidad_aire = dato.calidad_aire;
    //var formattedDate = moment(fechaAltura).format('DD/MM/YYYY HH:mm:ss');
    fechaListaA.push(formattedDate);
    calidad_aireLista.push(parseInt(calidad_aire));
  });


  var data = {
    labels: fechaListaA,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: calidad_aireLista
    }

    ]
  };


  var ctxdos = document.getElementById("grafica4").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxdos).Line(data);
});

//grafica 5

$.getJSON("http://trianasat2-salesianostriana.rhcloud.com/datossensores", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var fechaListaH= [];
  var humedadLista = [];
  var raiz = json._embedded.datossensores;
//  var altitud = json._embedded.datossensores;
  console.log(json._embedded.datossensores[0]);

  $.each(raiz, function(i, dato) {
    var fecha = dato.fecha;

    var formattedDate = moment(fecha).format('HH:mm');
    var humedad = dato.humedad;
    //var formattedDate = moment(fechaAltura).format('DD/MM/YYYY HH:mm:ss');
    fechaListaH.push(formattedDate);
    humedadLista.push(parseInt(humedad));
  });


  var data = {
    labels: fechaListaH,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: humedadLista
    }

    ]
  };


  var ctxdos = document.getElementById("grafica5").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxdos).Line(data);
});
});
