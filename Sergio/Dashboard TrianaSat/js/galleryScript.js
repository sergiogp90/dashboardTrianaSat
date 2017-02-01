var pagination = $("#pagination");

function setPagination(){
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
    items = $(".thumb");

    pagination.pagination("updateItems", items.length);

    var page = Math.min(
        pagination.pagination("getCurrentPage"),
        pagination.pagination("getPagesCount")
    );

    pagination.pagination("selectPage", page);
}

$(document).ready(function(){
    $(document).on('click', '#resetSelecteds', function(){
        $('.thumbnail').removeClass('imageSelected');
    });

    $(document).on('click', '#hola', function(){
        var fotos = $('.imageSelected').children(".img-responsive").attr("src");

        alert(fotos);
    });
});