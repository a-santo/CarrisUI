function currentLocation() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (location) {
            resolve(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    accuracy: location.coords.accuracy
                }
            );
        });
    });
}

function encontrarEstacaoMaisProxima() {
    currentLocation().then(function(gps) {
        $.ajax({
            url: '/get/estacaomaisproxima/' + gps.latitude + '/' + gps.longitude,
            contentType: 'application/json',
            type: 'GET',
            success: ((res) => {
                console.log(res);
                $('#estacao').text('Estação mais próxima de si: ' + res[0].name + ' | ' + 'Distancia: ' + res[0].distance + ' km');
                L.marker([res[0].lat, res[0].lng]).addTo(mapa);
            }),
            error: ((error) => {
                console.log("Error:", error);
            })
        })
    });
}