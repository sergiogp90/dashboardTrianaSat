$(document).ready(function(){
    var adminLogged = $('.user-dropdown').length > 0;

    $('#content-main .wrapper').load('sections/sectionProjectTable.html', function(){
        if(!adminLogged){
           $(".projectActions").addClass("hideToken");
        }
    });

    // Genera un código QR con el token del proyecto seleccionado
    // y lo muestra en un modal
    $(document).on('click', '.btnToken', function(){
        $('#qrcode').empty();

        var token = $(this).attr('token');
        $('#modalToken p:nth-child(3)').text(token);

        new QRCode("qrcode").makeCode(token);
    });

    $(document).on("change", "input[type=checkbox]", function (e) {
    e.preventDefault();

    if ($(this).is(":checked")) {
      alert('checked');
      $("input[type=checkbox]").prop("checked", false);
      $(this).prop("checked", true);
    }
  });
});
