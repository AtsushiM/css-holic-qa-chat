// send
cssholicqachat.views = {
    sendBlock: new C.View({
        el: '#send',
        init: function() {
            this.username = this.el.find('.username input');
            this.question = this.el.find('.question input');
            this.lock();
        },
        events: {
            me: {
                'submit': 'submit'
            }
        },
        lock: function() {
            this.el.css({
                opacity: '0.5'
            });
            this.isLock = true;
        },
        unlock: function() {
            this.el.css({
                opacity: '1'
            });
            this.isLock = false;
        },
        submit: function(e) {
            e.preventDefault();

            var name = this.username.val() || 'No name',
                q = this.question.val();

            if (this.isLock || !q) {
                return;
            }

            cssholicqachat.socket.emit('sendquestion', {
                name: name,
                q: q
            });

            this.question.val('');
            this.lock();
        }
    }),
    questions: new C.View({
        el: '#questions',
        template: C.$('#template-question').html(),
        collection: cssholicqachat.collections.questions,
        init: function() {
            var that = this;

            that.collection.on('change', that.render);

            cssholicqachat.socket.on('recivequestion', function(data) {
                cssholicqachat.addQuestion(data);
                cssholicqachat.views.sendBlock.unlock();
            });
        },
        events: {},
        clear: function() {
            this.el.html('');
        },
        render: function(data, index, collection) {
            data = data.get();

            /* data.time = '' + new Date(data.time); */
            data.time = cssholicqachat.formatDate(new Date(data.time));

            var html = C.util.template(this.template, data),
                li = C.dom.create('li');

            C.dom.html(li, html);

            this.el.insertBefore(li);
        }
    })
};
