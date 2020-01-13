const api = require('../controllers/api');

exports.index = function(req, res, next) {
    api.getTodasParagens().then(function(estacoes) {
        res.render('index', { title: 'CarrisUI', user: req.user, estacoes: estacoes});
    });
};