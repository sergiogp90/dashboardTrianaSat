var actualMenuSelected;

function initializeJS() {
    //tool tips
    $('.tooltips').tooltip();

    //popovers
    //$('.popovers').popover();

    //custom scrollbar
        //for html
    $("html").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '6', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '', zindex: '1000'});
        //for sidebar
    $("#sidebar").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});
        // for scroll panel
    $(".scroll-panel").niceScroll({styler:"fb",cursorcolor:"#007AFF", cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});
    
    //sidebar dropdown menu
    $('#sidebar .sub-menu > a').click(function () {
        var last = $('.sub-menu.open', $('#sidebar'));        
        $('.menu-arrow').removeClass('arrow_carrot-right');
        $('.sub', last).slideUp(200);
        var sub = $(this).next();
        if (sub.is(":visible")) {
            $('.menu-arrow').addClass('arrow_carrot-right');            
            sub.slideUp(200);
        } else {
            $('.menu-arrow').addClass('arrow_carrot-down');            
            sub.slideDown(200);
        }
        var o = ($(this).offset());
        diff = 200 - o.top;
        if(diff>0)
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

    // sidebar menu toggle
    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    $('.toggle-nav').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-180px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '180px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

    //bar chart
    if ($(".custom-custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }
}

$(document).ready(function(){
    initializeJS();

    // Marcar como activo el menú mapa en el arranque, y se carga
    // la página con el mapa.
    actualMenuSelected = $('#goMapa').closest('li');
    actualMenuSelected.toggleClass('active');
    
    $('.main-wrapper').load("sections/sectionMapa.html");

    // EVENTOS CLICK MENÚ LATERAL 

    // Cambiar el menú activo según se pulsa.
    $('.menuLink').on('click', function(){
        actualMenuSelected.toggleClass('active');

        actualMenuSelected = $(this).closest('li');
        actualMenuSelected.toggleClass('active');
    });

    $('#goMapa').on('click', function(){
        $('.main-wrapper').load("sections/sectionMapa.html");
    });

    $('#goGallery').on('click', function(){
        $('.main-wrapper').load("sections/sectionGallery.html");
    });

    $('#goCamera').on('click', function(){
        $('.main-wrapper').load("sections/sectionCamera.html");
    });

    $('#goTable').on('click', function(){
        $('.main-wrapper').load("sections/sectionTable.html");
    });

    // Click sobre la galería
    $(document).on('click', '.thumbnail', function(){
        $(this).toggleClass('imageSelected');
    });

    /*
        Muestra/oculta el botón de ver la foto en grande al pasar el ratón
        sobre cada elemento de la galería.
    */
    $(document).on('hover', '.thumb', function(){
        alert('hover')
        $(this).find('.btn-expand').toggleClass('shownButton');
    }, function(){
        alert('no hover')
        $(this).find('.btn-expand').toggleClass('shownButton');
    });

});