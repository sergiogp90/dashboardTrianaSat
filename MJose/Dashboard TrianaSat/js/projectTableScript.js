$(document).ready(function() {
    var adminLogged = $('.user-dropdown').length > 0;

    $('#content-main .wrapper').load('sections/sectionProjectTable.html', function() {
        if (!adminLogged) {
            $(".projectActions").addClass("hideToken");
        }
    });

    // Genera un código QR con el token del proyecto seleccionado
    // y lo muestra en un modal
    $(document).on('click', '.btnToken', function() {
        $('#qrcode').empty();

        var token = $(this).attr('token');
        $('#modalToken p:nth-child(3)').text(token);

        new QRCode("qrcode").makeCode(token);
    });

    /*$(document).on('click', '.table-projects tr', function() {
        if($(this).find('.rememberProject').prop('checked')){
            $(this).find('.rememberProject').prop('checked', false);
        }else{
          $(this).find('.rememberProject').prop('checked', true);
        }
    });*/

    // the selector will match all input controls of type :checkbox
    // and attach a click event handler
    $(document).on('click', ".rememberProject", function() {
        // in the handler, 'this' refers to the box clicked on
        var box = $(this);
        if (box.is(":checked")) {
            var group = "input:checkbox[name='" + box.attr("name") + "']";
            // the checked state of the group/box on the other hand will change
            // and the current value is retrieved using .prop() method
            $(group).prop("checked", false);
            $(group).next("span").css('color', 'red');
            box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });

    $(document).on('click', '#hola', function(){
      alert($('.rememberProject:checked').attr('paco'));
    })
});
