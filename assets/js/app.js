function checkSize() {
    if ($(window).width() > 959) {
        $(function() { // document ready
            if ($('.sidebar').length) { // make sure "#sticky" element exists
                var el = $('.sidebar');
                var stickyTop = $('.sidebar').offset().top; // returns number
                var stickyHeight = $('.sidebar').height();

                $(window).scroll(function() { // scroll event

                    var limit = $('.footer').offset().top - stickyHeight - 300;

                    var windowTop = $(window).scrollTop(); // returns number

                    if (stickyTop < windowTop) {
                        el.css({
                            position: 'fixed',
                            top: 0,
                            width: $('#left').width(),
                            'background-color': 'white'
                        });
                    } else {
                        el.css('position', 'static');

                    }

                    if (limit < windowTop) {
                        var diff = limit - windowTop;
                        el.css({
                            top: diff
                        });
                    }
                });
            }
        });
    }
}

checkSize();

$(window).resize(function() {
    checkSize();
});


$('.carousel').carousel();