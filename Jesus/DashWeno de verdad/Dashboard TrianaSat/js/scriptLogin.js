
$(document).ready(function() {

    $.ajax({
        url: "http://www.trianasat.com/datosjson/datosUsuario.json",
        type: "GET",
        cache: false,
        success: function(root) {

            $('#inputName').val(root.nombre + " " + root.apellidos);
            $('#inputMail').val(root.email);
            $('#inputNewPassword').val(root.password);
            $('#inputRepeatNewPassword').val(root.password);

            if (!adminLogged) {
                $(".projectActions").addClass("hideToken");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('error');
        }
    });
});
