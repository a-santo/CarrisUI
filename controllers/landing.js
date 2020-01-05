const api = require('../controllers/api');

exports.index = function(req, res, next) {
    api.getTodasEstacoes().then(function(estacoes) {
        console.log(estacoes);
        res.render('index', { title: 'CarrisUI', user: req.user, estacoes: estacoes});
    });
};