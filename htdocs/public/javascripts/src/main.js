cssholicqachat.socket.on('initializequestion', function(datas) {
    var i = 0,
        len = datas.length;

    cssholicqachat.views.questions.clear();

    for (; i < len; i++) {
        cssholicqachat.addQuestion(datas[i]);
    }

    cssholicqachat.views.sendBlock.unlock();
});

// title styling
(function() {
    var $h1 = C.$('h1'),
        h1_text = $h1.html().replace('&amp;', '&'),
        $span,
        i;

    $h1.html(
        '<span>' + h1_text.split('').join('</span><span>') + '</span>'
    );

    $span = $h1.find('span');

    i = $span.length;
    for (; i--;) {
        C.dom.addClass($span[i], 'letter' + i);
    }
}());
