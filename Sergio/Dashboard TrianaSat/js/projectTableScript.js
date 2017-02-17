function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    /* TODO activar cuando esté alojada en el dominio, cambiando la URL por la real.
    Esto sirve para ocultar los parametros de la url

    var ruta = adminLogged ? "tablaProyectosAdmin.html" : "tablaProyectos.html";

    if(typeof window.history.pushState == 'function') {
        window.history.pushState({}, "Hide", "www.salesianos-triana.com/trianasat/dash/"+ruta);
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

    // Cargar el section que tiene la tabla, y hacer la consulta para traer proyectos.
    $('#content-main .wrapper').load('sections/sectionProjectTable.html', function() {
        var newProjectsRows = "";
        var urlProyectos;

        if(adminLogged){
            var getParameters = getUrlParams();
            organizacionId = getParameters["orgId"];
            urlProyectos = 'http://trianasat2-salesianostriana.rhcloud.com/organizaciones/'+organizacionId+'/listaProyectos';
        }else{
            urlProyectos = "http://trianasat2-salesianostriana.rhcloud.com/proyectos";
        }

        $.ajax({
            url: urlProyectos,
            type: "GET",
            cache: false,
            success: function(root) {
                var projects = root._embedded.proyectos;

                var newProjectsRows = "";
                var projectList = "";

                $.each(projects, function(i, project) {
                    var projectId = project._links.self.href.split("/")[4];

                    newProjectsRows += '<tr projectId=' + projectId + '><td>' + project.nombre + '</td><td class="orgColumn">FALTA ORG</td>' +
                        '<td>'+ moment(project.fecha_creacion).format('DD/MM/YYYY') +'</td><td>'+ moment(project.fecha_lanzamiento).format('DD/MM/YYYY') +
                        '</td><td>' + project.localidad + '</td><td class="projectActions"><div class="btn-group">' +
                        '<a class="btn btn-success" href="infoProyecto.html"><i class="icon_check_alt2"></i></a>' +
                        '<a class="btn btn-primary btnToken" data-target="#modalToken" data-toggle="modal">' +
                        '<i class="icon_info" data-target="#modalToken" data-toggle="modal"></i></a></div></td><td class="projectActions">' +
                        '<input name="projectSelected" class="rememberProject" type="checkbox" name="options" autocomplete="off"></td></tr>';

                    if(adminLogged){
                        projectList += '<li token="'+ project.token +'"><a><span class="label label-primary"><i class="icon_folder-alt">'+
                        '</i></span> '+ project.nombre +'</a></li>';
                    }
                });

                $('.table-projects tbody').append(newProjectsRows);

                if (!adminLogged) {
                    $(".projectActions").addClass("hideToken");
                }else{
                    $('.orgColumn').addClass("hideToken");

                    projectList += '<li><a href="tablaProyectosAdmin.html?orgId='+ organizacionId +'">'+
                    'Ver todos los proyectos</a></li>';

                    $('.projectListMenu').append(projectList);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('error');
            }
        });
    });

    // Genera un código QR con el token del proyecto seleccionado
    // y lo muestra en un modal
    $(document).on('click', '.btnToken, .btnToken i', function(event) {
        event.stopImmediatePropagation();

        $('#qrcode').empty();

        var token = $(this).closest('tr').attr('token');

        new QRCode("qrcode").makeCode(token);
    });

    // Gestiona el click sobre los checkboxs de recordar proyecto, para activar
    // sólo uno a la vez.
    $(document).on('click', ".rememberProject", function(event) {
        event.stopImmediatePropagation();

        var box = $(this);
        if (box.is(":checked")) {
            var group = "input:checkbox[name='" + box.attr("name") + "']";

            $(group).prop("checked", false);
            $(group).next("span").css('color', 'red');
            box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });

    // Abre el dashboard para el proyecto seleccionado de la tabla.
    $(document).on('click', ".table-projects tr:not(tr:first-child) td", function() {
        var projectId = $(this).closest('tr').attr('projectId');
        var redirectionUrl = adminLogged ? "adminIndex.html" : "publicIndex.html";

        window.location = redirectionUrl+'?projectId=' + projectId;
    });

    // Gestiona el alta de organización.
    $(document).on("click", ".guardarOrganizacion", function() {
        var rutaProyectosOrg = "";

        var newOrg = {
            "nombre": $('#nombreOrganizacion').val(),
            "descripcion": $('#descripcionOrganizacion').val()
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

    // Gestiona la creación de un nuevo proyecto.
    $(document).on("click", ".guardarProyecto", function(){
      var cryptToken = guid();

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
              //TODO cambiar por project Id
              window.location = 'adminIndex.html?tokenUsuario=blabla&tokenProyecto='+cryptToken;
          },
          error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
          }
      });
    });

    // Evento click sobre los proyectos del menú superior.
    $(document).on('click', '.projectListMenu li:not(:last-child)', function(){
        var token = $(this).attr('token');
        window.location = 'adminIndex.html?tokenUsuario=blabla&tokenProyecto='+token;
    });
});
