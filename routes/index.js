var express = require('express');
var router = express.Router();

const landing = require('../controllers/landing');
const api = require('../controllers/api');

router.get('/',landing.index);

router.get('/get/estacaomaisproxima/:lat/:lon', function (request, response) {
    api.getEstacaoMaisProxima(request.params.lat, request.params.lon).then(function(estacoes) {
        response.send(estacoes);
    });
});

router.post('/paragem/', function (request, response) {
    api.getInfoParagem(request.body.id).then(function(infoParagem) {
        response.render('paragem', { title: 'Informação da Paragem', infoParagem: infoParagem });
    });
});

router.get('/posicaoautocarro/:numAuto/:matricula', function (request, response) {
    api.getPosicaoAutocarro(request.params.numAuto, request.params.matricula).then(function(autocarro) {
        response.render('autocarro', { title: 'Informação do Autocarro', autocarro: autocarro });
    });
});

router.get('/autocarros/', function (request, response) {
    api.getAutocarros().then(function(autocarros) {
        console.log(autocarros);
        response.render('autocarros', { title: 'Informação de Autocarros', autocarros: autocarros });
    });
});

router.get('/rota/:numRota', function (request, response) {
    api.getRota(request.params.numRota).then(function(infoRota) {
        console.log(infoRota);
        response.render('rota', { title: 'Informação sobre a rota ' + request.params.numRota, infoRota: infoRota });
    });
});

module.exports = router;
