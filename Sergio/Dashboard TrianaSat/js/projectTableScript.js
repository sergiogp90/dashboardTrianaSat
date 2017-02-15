function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    /* TODO activar cuando esté alojada en el dominio, cambiando la URL por la real.
    Esto sirve para ocultar los parametros de la url

    if(typeof window.history.pushState == 'function') {
        window.history.pushState({}, "Hide", "file:///C:/Users/sguerrero/Desktop/dashboardTrianaSat/Sergio/Dashboard%20TrianaSat/publicIndex.html");
    }*/

    return vars;
}

function guid() {
    function s4() {
        return (Math.floor((1 + Math.random()) * 9827) * new Date().getTime()).toString(16);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + s4();
}

var organizacionId;

$(document).ready(function() {
    var adminLogged = $('.user-dropdown').length > 0;

    $('#content-main .wrapper').load('sections/sectionProjectTable.html', function() {
        var newProjectsRows = "";
        var urlProyectos;

        if(adminLogged){
            var getParameters = getUrlVars();
            organizacionId = getParameters["orgId"];
            urlProyectos = 'http://trianasat2-salesianostriana.rhcloud.com/organizaciones/'+organizacionId+'/listaProyectos';
        }else{
            urlProyectos = "http://www.trianasat.com/datosjson/proyectos.json";
        }

        $.ajax({
            url: urlProyectos,
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
  */
    $(document).on("click", ".guardarOrganizacion", function() {
        var rutaProyectosOrg = "";

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
                  "organizacion": root._links.self.href
              };

              rutaProyectosOrg = root._links.listaProyectos.href;
              var idOrg = rutaProyectosOrg.split("/")[4];

              $.ajax({
                  url: 'http://trianasat2-salesianostriana.rhcloud.com/usuarios',
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(newUser),
                  success: function(root) {
                      alert('Registrado correctamente.');
                      window.location = 'tablaProyectosAdmin.html?tokenUsuario=blabla&orgId='+idOrg;
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

      /*script que usan los modal al pulsar en siguiente*/
      $('a[title]').tooltip();

      $(document).on("click", ".cambiarSiguiente", function() {
          $(".two").parents("li").addClass("active");
          $(".one").parents("li").removeClass("active");
      });

      $(document).on("click", ".cambiarTercera", function() {
          $(".three").parents("li").addClass("active");
          $(".two").parents("li").removeClass("active");
      });
      /*fin script modal*/


      /*
      "descripcion":"Proyecto de sonda meteorológica para la Feria FP.",
      	"localidad":"Sevilla",
      	"nombre":"TrianaSat",
      	"token":"asdfg435cdghs79846h741asdfg435cdg",
      	"organizacion":"http://localhost:8090/organizaciones/1",
      	"api_key":"sdfghsjk5d4fh6hf4",
      	"api_secret":"ER56DF4HAged68h4d6h",
      	"access_token":"dfh654df6h4s98h4a",
      	"access_token_secret":"sd6g54asd8g47a654gha98h"
      */
      $(document).on("click", ".guardarProyecto", function(){
        var cryptToken = guid();
        alert(cryptToken);

        var nuevoProyecto = {
            "descripcion": $("#descripcionProyecto").val(),
            "localidad": "los palacios",
            "nombre": $("#nombreProyecto").val(),
            "token": cryptToken,
            "organizacion": "http://trianasat2-salesianostriana.rhcloud.com/organizaciones/"+organizacionId,
            "api_key": $("#api_key").val(),
            "api_secret": $("#api_secret").val(),
            "access_token": $("#access_token").val(),
            "access_token_secret": $("#access_token_secret").val()
        };

        $.ajax({
            url: 'http://trianasat2-salesianostriana.rhcloud.com/proyectos',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevoProyecto),
            success: function(root) {
                alert('Registrado proyecto correctamente.');
                window.location = 'adminIndex.html?tokenUsuario=blabla&tokenProyecto='+cryptToken;
            },
            error: function(xhr, status, error) {
              console.log(xhr);
              console.log(status);
              console.log(error);
            }
        });

      });
});
