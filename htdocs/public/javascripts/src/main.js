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
        collectionQuestion = new C.Model.extend({
            defaults: {
                collection: []
            },
            validate: {
                collection: C.validate.isArray
            },
            addQuestion: function(model) {
                var collection = this.get('collection');

                collection.push(model);

                this.set('collection', collection);
            }
        })(),
        viewQuestions = new C.View({
            el: '#questions',
            template: C.$('#template-question').html(),
            model: collectionQuestion,
            init: function() {
                var that = this;

                that.model.on('change', that.render);

                socket.on('recivequestion', function(data) {
                    that.model.addQuestion(new ModelQuestion({
                        defaults: data
                    }));
                });
            },
            events: {},
            render: function(dataCollection) {
                var collection = dataCollection.collection;
                var data = collection[collection.length - 1].get();

                console.log(data);
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
            collectionQuestion.addQuestion(new ModelQuestion({
                defaults: datas[i]
            }));
        }
    });
}());
