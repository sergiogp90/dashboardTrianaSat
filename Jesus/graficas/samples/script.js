
$.getJSON("temperaturas.json", function (json) {
  // will generate array with ['Monday', 'Tuesday', 'Wednesday']
  var ejex = json.map(function(item) {
    return item.hora;
  })
  var ejeyuno = json.map(function(item){
    return item.temp2;
  })
  var ejeydos = json.map(function(item){
    return item.temp;
  })
  alert(ejex);
  alert(ejeyuno);
  alert(ejeydos);

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

  var ctx = document.getElementById("myChart").getContext("2d");
  ctx.canvas.width = 800;
  ctx.canvas.height = 500;

  var myChart = new Chart(ctx).Line(data);
});
