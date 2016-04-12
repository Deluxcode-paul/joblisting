$('.carousel').carousel();

$(window).on('load resize', function() {

    var middle_block_height = $('.middle-block').height();
    var left_sidebar_height = $('#left').height();
    var right_sidebar_height = $('#right').height();
    var sidebar_width = $('.sidebar.sticky').width();

    if ($(this).width() > 767) {
        $('.sidebar').css('width', sidebar_width + 'px');
        $('#left').css('height', middle_block_height + 'px');
        $('#right').css('height', middle_block_height + 'px');
    } else {
        $('#left').css('height', 'auto');
        $('#right').css('height', 'auto');
    }
});

var stickyOptions = {
    disabled: false,
    className: 'sticky',
    stateClassName: 'is-sticky',
    fixedClass: 'sticky-fixed',
    wrapperClass: 'sticky-wrap',
    absoluteClass: 'is-absolute'
};

StickyState.apply(document.querySelectorAll('.sticky'), stickyOptions);