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
                    newProjectsRows += '<tr token=' + project.token + '><td>' + project.nombre + '</td><td>' + project.organizacion.nombre + '</td>' +
                        '<td>FALTA AÑADIR</td><td>' + project.localidad + '</td><td class="projectActions"><div class="btn-group">' +
                        '<a class="btn btn-success" href="infoProyecto.html"><i class="icon_check_alt2"></i></a>' +
                        '<a class="btn btn-primary btnToken" token="' + project.token + '" href="#" data-target="#modalToken" data-toggle="modal">' +
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

    // Abre el dashboard para el proyecto seleccionado.
    $(document).on('click', "tr:not(tr:first-child)", function() {
        var token = $(this).attr('token');

        window.location = 'publicIndex.html?token=' + token;
    });

    /*
    "nombre":"Daniel",
	"apellidos":"Blázquez Morlano",
	"email":"dani@email.com",
	"password":"parato2017",
	"administrador":0,
	"organizacion": "http://localhost:8090/organizaciones/1"
  */f
    $(document).on("click", ".guardarOrganizacion", function() {
        var newOrg = {
            "nombre": $('#nombreOrganizacion').val()
        };



        $.ajax({
            url: 'http://trianasat2-salesianostriana.rhcloud.com/organizaciones',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(newOrg),
            success: function(root) {
              var newUser = {
                  "nombre": $('#nombreAdministrador').val(),
                  "apellidos": $('#apellidosAdministrador').val(),
                  "email": $('#emailAdministrador').val(),
                  "password": $('#confirmPassword').val(),
                  "administrador": 1,
                  "organizacion": root._links.self.href;
              }

              $.ajax({
                  url: 'http://trianasat2-salesianostriana.rhcloud.com/usuarios',
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(newUser),
                  success: function(root) {
                      alert('usuario registrado');

                      // TODO añadir el token del usuario cuando se loguea.
                      window.location = 'tablaProyectosAdmin.html?tokenUsuario=blabla';
                  },
                  error: function(xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                  }
              });
            },
            error: function(xhr, status, error) {
              console.log(xhr);
              console.log(status);
              console.log(error);
            }
        });
    });

});
