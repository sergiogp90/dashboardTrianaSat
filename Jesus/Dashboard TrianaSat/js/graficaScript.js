$(document).ready(function(){
  $( "#accordion" ).accordion({
    collapsible: true,
    heightStyle: "content"
  });

  $.getJSON("http://www.olalas.hol.es/dash/temperaturas.json", function (json) {
    // will generate array with ['Monday', 'Tuesday', 'Wednesday']
    var ejex = json.map(function(item) {
      return item.hora;
    })
    var ejeyuno = json.map(function(item){
      return item.temp2;
    })
    var ejeydos = json.map(function(item){
      return item.temp;
    });
    alert(ejex);
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
      },
      {
        label: "segundo",
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(000,187,205,1)",
        pointColor : "rgba(100,187,205,1)",
        pointStrokeColor : "#aff",
        data : ejeydos
      }

      ]
    };

    var ctx = document.getElementById("temperaturas").getContext("2d");
    Chart.defaults.global.animationSteps = 50;
    Chart.defaults.global.tooltipYPadding = 16;
    Chart.defaults.global.tooltipCornerRadius = 2;
    Chart.defaults.global.tooltipTitleFontStyle = "normal";
    Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
    Chart.defaults.global.animationEasing = "easeOutBounce";
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.scaleLineColor = "black";
    Chart.defaults.global.scaleFontSize = 16;

    var myChart = new Chart(ctx).Line(data);
  });

  $.getJSON("http://www.olalas.hol.es/datosJson/altura.json", function (json) {
    // will generate array with ['Monday', 'Tuesday', 'Wednesday']
    alert("graficas dos");

    var ejex = json.map(function(item) {
      return item:altura.hora;
    })
    alert(ejex);
    var ejeyuno = json.map(function(item){
      return item.metros;
    })


    alert(ejeyuno);
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
      },
      {
        label: "segundo",
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(000,187,205,1)",
        pointColor : "rgba(100,187,205,1)",
        pointStrokeColor : "#aff",
        data : ejeydos
      }

      ]
    };

    var ctx = document.getElementById("altitud").getContext("2d");
    Chart.defaults.global.animationSteps = 50;
    Chart.defaults.global.tooltipYPadding = 16;
    Chart.defaults.global.tooltipCornerRadius = 2;
    Chart.defaults.global.tooltipTitleFontStyle = "normal";
    Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
    Chart.defaults.global.animationEasing = "easeOutBounce";
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.scaleLineColor = "black";
    Chart.defaults.global.scaleFontSize = 16;

    var myChart = new Chart(ctx).Line(data);
  });

});
