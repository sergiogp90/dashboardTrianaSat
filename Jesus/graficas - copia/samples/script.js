$(document).ready(function(){

  // grafica 4 temperaturas
  //url:http://olalas.hol.es/datosJson/altura.json
  $.getJSON("alturaPr.json", function (json) {
    // will generate array with ['Monday', 'Tuesday', 'Wednesday']
    var item = json
    var horas = [];
    var metros = [];
    var mialturas = [];
    var datos = [];

      /*
      for(i=1;i<item.options.length;i++){
        horas.push(item.options[i].horas);
        metros.push(item.options[i].metros);
        alert(item.options[i].horas);
      }*/
      $.each(item,function(i){
        //alert(item[i]);
        mialturas = item[i];
        $.each(mialturas,function(x){
          //  alert(mialturas[x]);
            datos=mialturas[x];
          //  alert(datos);
            $.each(datos,function(y){
            //  alert(y);
              if(y == "hora"){
                var num= parseInt(datos[y]);
                   horas.push(parseInt(datos[y]));
                //  alert(typeof(num));

              }else{
                metros.push(parseInt(datos[y]));
              }

              //  $.each(horasD,function(h){
              //    horas.push(horasD[h]);
              //    alert(horas);
              //  })

            })

        //  alert("fuera del tercer array");
        //  alert(horas);
        //  alert(metros);
        })

      })
      alert(typeof horas[1]);
      alert(horas);
      alert(metros);
      var data = {
        labels: horas,
        datasets: [
        {
          label: "primero",
          fillColor : "rgba(220,0,220,0.5)",
          strokeColor : "rgba(0,220,0,1)",
          pointColor : "rgba(220,0,220,1)",
          pointStrokeColor : "#ffa",
          data: metros
        }

        ]
      };

      var ctxtres = document.getElementById("myChartuno").getContext("2d");
      Chart.defaults.global.animationSteps = 50;
      Chart.defaults.global.tooltipYPadding = 16;
      Chart.defaults.global.tooltipCornerRadius = 2;
      Chart.defaults.global.tooltipTitleFontStyle = "normal";
      Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
      Chart.defaults.global.animationEasing = "easeOutBounce";
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.scaleLineColor = "black";
      Chart.defaults.global.scaleFontSize = 16;

      var myChart = new Chart(ctxtres).Line(data);

    })

});
/*
var horas;
var metros;
// grafica 1 temperatura
$.getJSON("http://olalas.hol.es/datos.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var ejex = json.map(function(item) {
    return item.x;
  })
  alert(ejex);
  var ejeyuno = json.map(function(item){
    return item.y;
  })
  var data = {
    labels: horas,
    datasets: [
    {
      label: "primero",
      fillColor : "rgba(220,0,220,0.5)",
      strokeColor : "rgba(0,220,0,1)",
      pointColor : "rgba(220,0,220,1)",
      pointStrokeColor : "#ffa",
      data: metros
    }

    ]
  };

  var ctx = document.getElementById("myChartuno").getContext("2d");
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
*/
/*$.getJSON( "", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
      alert(key.val("altura"))
  });
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
$.ajax({
    url: 'http://olalas.hol.es/datosJson/altura.json',
    type: "GET",
    cache: false,
    success: function(root){
      var altura = root.altura;
      var lista = altura.metros;
      alert(lista);
    }



});
*/

// grafica dos altura ok
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

  var ctxdos = document.getElementById("myChartdos").getContext("2d");
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

// grafica tres altura ok
$.getJSON("altura.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var ejex = json.map(function(item) {
    return item.hora;
  })

  var ejeyuno = json.map(function(item){
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

  var ctxtres = document.getElementById("myCharttres").getContext("2d");
  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 2;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(100,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var myChart = new Chart(ctxtres).Line(data);
});
