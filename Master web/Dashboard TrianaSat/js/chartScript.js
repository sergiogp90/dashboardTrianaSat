$(document).ready(function(){
    $.ajax({
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
    });
}); 