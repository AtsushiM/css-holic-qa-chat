// main
(function() {
    var socket = io.connect(),
        viewSend = new C.View({
            el: '#send',
            init: function() {
                this.username = this.el.find('.username input');
                this.question = this.el.find('.question input');
            },
            events: {
                me: {
                    'submit': 'submit'
                }
            },
            submit: function(e) {
                e.preventDefault();

                var name = this.username.val(),
                    q = this.question.val();

                if (!q) {
                    return;
                }

                if (!name) {
                    name = 'No name';
                }

                socket.emit('sendquestion', {
                    name: name,
                    q: q
                });

                this.question.val('');
            }
        }),
        ModelQuestion = C.Model.extend({
            defaults: {
                name: '',
                q: '',
                time: 0
            },
            validate: {
                name: C.validate.isString,
                q: C.validate.isString,
                time: C.validate.isNumber
            }
        }),
        collectionQuestion = new C.Collection(),
        viewQuestions = new C.View({
            el: '#questions',
            template: C.$('#template-question').html(),
            collection: collectionQuestion,
            init: function() {
                var that = this;

                that.collection.on('change', that.render);

                socket.on('recivequestion', addQuestion);
            },
            events: {},
            render: function(data, index, collection) {
                data = data.get();

                data.time = '' + new Date(data.time);

                var html = C.util.template(this.template, data),
                    li = C.dom.create('li');

                C.dom.html(li, html);

                this.el.insertBefore(li);
            }
        });

    socket.on('initializequestion', function(datas) {
        var i = 0,
            len = datas.length;

        for (; i < len; i++) {
            addQuestion(datas[i]);
        }
    });

    function addQuestion(data) {
        collectionQuestion.add(new ModelQuestion({
            defaults: data
        }));
    }

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
}());
