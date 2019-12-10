window.addEventListener("load", () => {
    let long;
    let lat;
    //seta as informações de clima
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    //pega a localização
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e0ae29358565d5cf16332b555f20e8f1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json(); //pega a api e transforma em um json
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently; //pega a temperatura do data.currently
                //muda os elementos da DOM a partir dos dados recebidos pela API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                
                    setIcons(icon, document.querySelector('.icon'))
            });
        });
    }
    //icones
    function setIcons (icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // procura todas as linhas com "-" e substitui por "_"
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});