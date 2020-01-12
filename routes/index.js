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
    console.log(request);
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

router.get('/paragens/', function (request, response) {
    api.getTodasParagens().then(function(paragens) {
        response.render('paragens', { title: 'Paragens', paragens: paragens });
    });
});

router.get('/planear', function(request, response) {
    api.getTodasParagens().then(function(paragens) {
        response.render('planear', { title: 'Planear Rota', paragens: paragens });
    });
});

router.post('/calcular/:latDe/:lonDe/:latPara/:lonPara', function(request, response) {
    api.getCaminho(request.params.latDe, request.params.lonDe, request.params.latPara, request.params.lonPara).then(function(rota) {
        response.render('planeado', { title: 'Rota Calculada', rota: rota, gps: { lat: request.params.latDe, lon: request.params.lonDe }});
    });
});

module.exports = router;
