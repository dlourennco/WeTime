setInterval(time, 1000 );

function time() {
    //clock
    let clock = document.getElementById('clock')
    let credits = document.getElementById('credits')

    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()

    if (hour > 6 && hour < 12) { //dia
        document.body.style.background = "url('../images/Morning-brotiN-biswaS.jpg')";
        credits.innerHTML = 'photo by <strong>brotiN biswaS</strong> from <strong>Pexels</strong>';
    } else if (hour >= 12 && hour < 18) { //tarde
        document.body.style.background = "url('../images/Afternoon-Essow-Kedelina.jpg')";
        credits.innerHTML = 'photo by <strong>Essow Kedelina</strong> from <strong>Pexels</strong>';
    } else if (hour >= 18 && hour < 24) { //noite
        document.body.style.background = "url('../images/Night-Mauricio-Mascaro.jpg')";
        credits.innerHTML = 'photo by <strong>Maurício Mascaro</strong> from <strong>Pexels</strong>';
    } else if (hour >= 00 && hour < 6) { //madrugada
        document.body.style.background = "url('../images/Code-Gally.jpg')";
        credits.innerHTML = 'photo by <strong>Gally</strong> from <strong>Pexels</strong>';
    }

    if (minutes < 10) {
        clock.innerHTML = `${hour}h0${minutes}`
    } else {
        clock.innerHTML = `${hour}h${minutes}`
    }
}

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