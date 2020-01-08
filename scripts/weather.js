window.addEventListener("load", () => {
    let long;
    let lat;
    
    let getTemperatureDescription = document.querySelector('.temperature-description');
    let getTemperatureDegree = document.querySelector('.temperature-degree');
    let getLocationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.temperature-span')
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e0ae29358565d5cf16332b555f20e8f1/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently; //pega a temperatura, summary e icone do data.currently
                //muda os elementos da DOM a partir dos dados recebidos pela API
                
                let celsius = (temperature - 32) * (5 / 9)

                getTemperatureDegree.textContent = Math.floor(celsius);
                getTemperatureDescription.textContent = summary;
                getLocationTimezone.textContent = data.timezone;

                    setIcons(icon, document.querySelector('.icon'))

                degreeSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'ºF'){
                        temperatureSpan.textContent = 'ºC';
                        getTemperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = 'ºF';
                        getTemperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }
    //icones
    function setIcons (icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});