cssholicqachat.models = {
    Question: C.Model.extend({
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
    })
};
