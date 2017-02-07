function initializeJS() {
    //tool tips
    $('.tooltips').tooltip();

    //custom scrollbar
    //for html
    $("html").niceScroll({
        styler: "fb",
        cursorcolor: "#007AFF",
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#F7F7F7',
        cursorborder: '',
        zindex: '1000'
    });
    //for sidebar
    $("#sidebar").niceScroll({
        styler: "fb",
        cursorcolor: "#007AFF",
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#F7F7F7',
        cursorborder: ''
    });
    // for scroll panel
    $(".scroll-panel").niceScroll({
        styler: "fb",
        cursorcolor: "#007AFF",
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#F7F7F7',
        cursorborder: ''
    });

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

    $('.toggle-nav').click(function() {
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

    $('#login-trigger').click(function() {
        $(this).next('#login-content').slideToggle();
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
        else $(this).find('span').html('&#x25BC;')
    })
}

$(document).ready(function() {
    initializeJS();
});
