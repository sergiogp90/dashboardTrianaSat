
$(document).ready(function(){

//grafica 1
$.getJSON("http://olalas.hol.es/datosJson/altura.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var altura = json.altura;
  var ejex = json.altura.map(function(item) {
    return item.hora;
  })

  var ejeyuno = json.altura.map(function(item){
    return item.metros;
  })

  var data = {
    labels: ejex,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: ejeyuno
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


$.getJSON("http://olalas.hol.es/datosJson/temperaturas.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var altura = json.temperaturas;
  var ejex = json.temperaturas.map(function(item) {
    return item.date;
  })

  var ejeyuno = json.temperaturas.map(function(item){
    return item.temp;
  })

  var data = {
    labels: ejex,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: ejeyuno
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

$.getJSON("http://olalas.hol.es/datosJson/altura.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var altura = json.altura;
  var ejex = json.altura.map(function(item) {
    return item.hora;
  })

  var ejeyuno = json.altura.map(function(item){
    return item.metros;
  })

  var data = {
    labels: ejex,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: ejeyuno
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

$.getJSON("http://olalas.hol.es/datosJson/altura.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var altura = json.altura;
  var ejex = json.altura.map(function(item) {
    return item.hora;
  })

  var ejeyuno = json.altura.map(function(item){
    return item.metros;
  })

  var data = {
    labels: ejex,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: ejeyuno
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
});
