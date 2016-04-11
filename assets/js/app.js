$('.carousel').carousel();

var middle_block_height = $('.middle-block').height();
var left_sidebar_height = $('#left').height();
var right_sidebar_height = $('#right').height();




var stickyOptions = {
    disabled: false,
    className: 'sticky',
    stateClassName: 'is-sticky',
    fixedClass: 'sticky-fixed',
    wrapperClass: 'sticky-wrap',
    absoluteClass: 'is-absolute'
};

StickyState.apply(document.querySelectorAll('.sticky'), stickyOptions);