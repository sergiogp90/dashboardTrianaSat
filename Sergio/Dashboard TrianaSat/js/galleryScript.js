var pagination = $("#pagination");

function setPagination() {
    var items = $('.thumb');
    var perPage = 12;

    pagination.pagination({
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        displayedPages: 3,
        onPageClick: function(pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;

            items.hide()
                .slice(showFrom, showTo).show();
        }
    });
}

function updateGalleryItems() {
    $("img.lazy").lazyload({
        threshold : 200,
        effect: "fadeIn"
    });
    var items = $('.thumb');
    pagination.pagination("updateItems", items.length);

    var page = Math.min(
        pagination.pagination("getCurrentPage"),
        pagination.pagination("getPagesCount")
    );

    pagination.pagination("selectPage", page);
}

$(document).ready(function() {
    // Click sobre las fotografías de la galería
    $(document).on('click', '.thumbnail', function() {
        $(this).toggleClass('imageSelected');

        var numSeleccionadas = $(".imageSelected").length;

        if (numSeleccionadas > 4) {
            // Botón tuit forbidden
            console.log("Llevas 4 o más, anular botón twitter");
            $("#tuiter").removeClass('notactive');
            $("#tuiter").toggleClass('notactive');
            alert("No mas de 4 fotos, 1 gif o 1 video");
        } else {
            console.log("Quito");
            $("#tuiter").removeClass('notactive');
        }
        console.log(numSeleccionadas);
    });

    $(document).on('click', '#tuiter', function() {
        if(!$(this).hasClass('notactive')){
          var fotos = $(".imageSelected");
          console.log(fotos);
          var urls = [];

          $.each(fotos, function(i, foto){
              var photoUrl = $(foto).children('img').attr('src');
              urls.push(photoUrl);
          });

          console.log(urls);
          var jsonString = JSON.stringify(urls);
          console.log(jsonString);
          $.ajax({
            type: "POST",
            url: "./RRSS/tuit.php",
            data: {
              data: jsonString
            },
            dataType: "json",
            cache: false,
            success: function() {
              //alert("enviado");
              //window.location.href = './RRSS/tuit.php';
            }
          });
        }
    });

    /*
        Muestra/oculta el botón de ver la foto en grande al pasar el ratón
        sobre cada elemento de la galería.
    */
    $(document).on('mouseenter', '.thumb', function() {
        $(this).find('.btn-expand').toggleClass('shownButton');
    });

    $(document).on('mouseleave', '.thumb', function() {
        $(this).find('.btn-expand').toggleClass('shownButton');
    });

    // Pinta la fotografía seleccionada en el modal de detalle.
    $(document).on('click', '.btn-expand', function() {
        var photoName = $(this).siblings('a.thumbnail').find('.img-responsive').attr('photoName');
        var photoUrl = 'http://www.salesianos-triana.com/dam/trianasat/files/'+photoName;
        var photoDate = $(this).siblings('a.thumbnail').find('.img-responsive').attr('fecha');
        $('#photoModal').attr('src', photoUrl);
        $('#modalPictureLabel').text(photoDate);
    });

    $('#modalPicture').on('hidden.bs.modal', function () {
        $('#photoModal').attr('src', '');
    })

    // Genera un GIF con las fotografías seleccionadas, y lo muestra en el menú lateral.
    $('#generateTimelapse').on('click', function() {
        var photosUrl = [];

        $('.imageSelected').each(function(i) {
            photosUrl.push($(this).children('.img-responsive').attr('src'));
        });

        //$("#tooltip").show(); //Muestra el tooltip del timelapse

        gifshot.createGIF({
                'gifWidth': 400,
                'gifHeight': 300,
                'images': photosUrl,
                'interval': 0.3
            },
            function(obj) {
                if (!obj.error) {
                    var image = obj.image;
                    $('#timelapseSideBar').attr('src', image);
                    $('#photoTimelapseModal').attr('src', image);
                    var actualDate = moment().format('[Generado el] DD/MM/YY [a las] HH:mm:ss');
                    $('#modalTimelapse p').text(actualDate);
                    $("#tooltip").hide(); //Oculta el timelapse cuando termina de generar el gif
                }
        });
    });

    // Desmarca todas las imágenes de la galería.
    $(document).on('click', '#resetSelecteds', function() {
        $('.thumbnail').removeClass('imageSelected');
    });

    // Marca las imágenes de la página actual.
    $('#markActualPageItems').on('click', function() {
        $('.thumb').filter(function() {
            return $(this).css('display') == 'block';
        }).find('.thumbnail').addClass('imageSelected');
    });

    // Marca todas las imágenes de la galería.
    $('#markAll').on('click', function() {
        $('.thumbnail').addClass('imageSelected');
    });
});
