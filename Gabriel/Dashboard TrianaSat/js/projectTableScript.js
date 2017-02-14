$(document).ready(function(){
    $('#content-main .wrapper').load('sections/sectionProjectTable.html');

    var adminLogged = $('.user-dropdown').length > 0;

    if(!adminLogged){
       $('.btnToken').hide("fast");
       alert('ocultado?')
    }
    // Genera un código QR con el token del proyecto seleccionado
    // y lo muestra en un modal
    $(document).on('click', '.btnToken', function(){
        $('#qrcode').empty();

        var token = $(this).attr('token');
        $('#modalToken p:nth-child(3)').text(token);

        new QRCode("qrcode").makeCode(token);
    });
});
