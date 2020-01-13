function getLocalizacao() {
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

function encontrarParagemMaisProxima(elemento) {
    getLocalizacao().then(function(gps) {
        $.ajax({
            url: '/get/estacaomaisproxima/' + gps.latitude + '/' + gps.longitude,
            contentType: 'application/json',
            type: 'GET',
            success: ((res) => {
                elemento.val(res[0].id);
                elemento.selectpicker('refresh');
                let texto = "A paragem mais próxima de si é: " + res[0].name + "\n\n" + "Distância: " + res[0].distance + "km";
                swal({
                    title: "Paragem encontrada!",
                    text: texto,
                    icon: "success",
                    html: true
                });
            }),
            error: ((error) => {
                console.log("Error:", error);
            })
        })
    });
}