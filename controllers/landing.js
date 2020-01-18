exports.index = function(req, res, next) {
    res.render('index', { title: 'CarrisUI' });
};

exports.acerca = function (req, res, next) {
    res.render('acerca', { title: 'CarrisUI' });
};