// main
(function() {
    var socket = io.connect(),
        $ = C.$,
        $send = $('#send'),
        $input_username = $send.find('.username input'),
        $input_question = $send.find('.question input'),
        $questions = $('#questions'),
        template = $('#template-question').html(),
        _convertDom = C.dom.create('div');

    socket.on('initializequestion', function(data) {
        console.log(data);

        var i,
            len = data.length;

        for (i = 0; i < len; i++) {
            fetchQuestion(data[i]);
        }
    });

    $send.on('submit', function(e) {
        e.preventDefault();

        var name = $input_username.val(),
            q = $input_question.val();

        if (!name) {
            name = 'No name';
        }

        if (name && q) {
            socket.emit('sendquestion', {
                name: name,
                q: q
            });
            $input_question.val('');
        }
    });

    socket.on('recivequestion', function(data) {
        fetchQuestion(data);
    });

    function fetchQuestion(data) {
        data.time = '' + new Date(data.time);

        var html = C.util.template(template, data),
            li = C.dom.create('li');

        C.dom.html(li, html);

        $questions.insertBefore(li);
    }
}());
