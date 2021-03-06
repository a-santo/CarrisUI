exports.getEstacaoMaisProxima = function (lat, lon) {
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/busstops/near/lat/' + lat +'/lon/' + lon,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getTodasParagens = function () {
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/busstops',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getInfoParagem = function (idParagem) {
    let moment = require('moment-timezone');
    moment.tz.setDefault("Europe/Lisbon");
    moment.locale('pt');
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/Estimations/busStop/' + idParagem + '/top/5',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    let conteudo = JSON.parse(body);
                    if(conteudo) {
                        conteudo.forEach(info => {
                            info.tempoEstimado = moment(info.time).fromNow();
                        });
                        resolve(conteudo);
                    }
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getPosicaoAutocarro = function (numAuto, matricula) {
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/vehicleStatuses',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    let autocarros = JSON.parse(body);
                    let infoAutocarro = {
                        numAuto: numAuto,
                        matricula: matricula,
                        lat: null,
                        lng: null,
                        atualizado: null
                    };
                    autocarros.forEach(autocarro => {
                        if(autocarro.routeNumber === numAuto && autocarro.plateNumber === matricula) {
                            infoAutocarro.lat = autocarro.lat;
                            infoAutocarro.lng = autocarro.lng;
                            infoAutocarro.atualizado = autocarro.lastGpsTime;
                        }
                    });
                    resolve(infoAutocarro);
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getAutocarros = function () {
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/vehicleStatuses',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getRota = function (idRota) {
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/Routes/' + idRota,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };

        request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });
    });
};

exports.getCaminho = function (latDe, lonDe, latPara, lonPara) {
    let moment = require('moment-timezone');
    moment.tz.setDefault("Europe/Lisbon");
    let now = moment();
    return new Promise(function (resolve, reject) {
        const request = require('request');
        const options = {
            url: 'https://carris.tecmic.com/api/v2.6/Planner/startlat/' + latDe + '/startlon/' + lonDe + '/endLat/' + latPara + '/endLon/' + lonPara + '/start/' + now.format('YYYY-MM-DD HH:mm:ss') + '/language/pt',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        };
       request(
            options,
            (err, res, body) => {
                if (err) return err;
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });
    });
};