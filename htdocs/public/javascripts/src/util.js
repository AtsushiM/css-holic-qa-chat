cssholicqachat.socket = io.connect();
cssholicqachat.addQuestion = function(data) {
    cssholicqachat.collections.questions.add(
        new cssholicqachat.models.Question({
            defaults: data
        })
    );
};
cssholicqachat._dayConvertAry = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
cssholicqachat._formatNumDigit2 = function(num) {
    num = num * 1;

    if (num < 10) {
        num = '0' + num;
    }

    return '' + num;
};
cssholicqachat.formatDate = function(date) {
    var digit2 = cssholicqachat._formatNumDigit2,
        ymd = [
            date.getFullYear(),
            digit2(date.getMonth()),
            digit2(date.getDate())
        ],
        hms = [
            digit2(date.getHours()),
            digit2(date.getMinutes()),
            digit2(date.getSeconds())
        ];

    return ymd.join('/') +
        '(' +
            cssholicqachat._dayConvertAry[ date.getDay() ] +
        ')' +
        ' ' + hms.join(':');
};
