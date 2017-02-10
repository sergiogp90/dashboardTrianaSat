$(document).ready(function() {
    var adminLogged = $('.user-dropdown').length > 0;

    $('#content-main .wrapper').load('sections/sectionProjectTable.html', function() {

        var newProjectsRows = "";

        $.ajax({
            url: 'http://www.trianasat.com/datosjson/proyectos.json',
            type: "GET",
            cache: false,
            success: function(root) {
                var projects = root._embedded.proyectos;

                var newProjectsRows = "";

                $.each(projects, function(i, project) {
                    newProjectsRows += '<tr token=' + project.token + '><td>' + project.nombre + '</td><td>'+project.organizacion.nombre+'</td>'+
                        '<td>FALTA AÑADIR</td><td>' + project.localidad + '</td><td class="projectActions"><div class="btn-group">' +
                        '<a class="btn btn-success" href="infoProyecto.html"><i class="icon_check_alt2"></i></a>' +
                        '<a class="btn btn-primary btnToken" token="'+ project.token +'" href="#" data-target="#modalToken" data-toggle="modal">' +
                        '<i class="icon_info"></i></a></div></td><td class="projectActions">' +
                        '<input name="projectSelected" class="rememberProject" type="checkbox" name="options" paco="lolo" autocomplete="off"></td></tr>';
                });

                $('.table-projects tbody').append(newProjectsRows);

                if (!adminLogged) {
                    $(".projectActions").addClass("hideToken");
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('error');
            }
        });
    });

    // Genera un código QR con el token del proyecto seleccionado
    // y lo muestra en un modal
    $(document).on('click', '.btnToken', function() {
        $('#qrcode').empty();

        var token = $(this).attr('token');
        $('#modalToken p:nth-child(3)').text(token);

        new QRCode("qrcode").makeCode(token);
    });

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

    $(document).on('click', "tr:not(tr:first-child)", function(){
        var token = $(this).attr('token');

        window.location = 'publicIndex.html?token='+token;
    });

});
