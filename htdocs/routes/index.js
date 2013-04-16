
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {
        title: '休日なのにお疲れ様です',
        h1: 'CSS Holic Q&A Chat.',
        template_question: [
            '<p class="name"><%= name %></p>',
            '<p class="q"><%= q %></p>',
            '<p class="time"><%= time %></p>',
        ].join('')
    });
};
