setInterval(time, 1000 );

function time() {
    //clock
    let clock = document.getElementById('clock')
    let credits = document.getElementById('credits')

    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()

    if (hour > 6 && hour < 12) { //dia
        document.body.style.background = "url('Morning-Steven-Hylands.jpg')";
        credits.innerHTML = 'photo by <strong>Steven Hylands</strong>';
    } else if (hour >= 12 && hour < 18) { //tarde
        document.body.style.background = "url('Evening-Indra-Gunawan.jpg')";
        credits.innerHTML = 'photo by <strong>Indra Gunawan</strong>';
    } else if (hour >= 18 && hour < 24) { //noite
        document.body.style.background = "url('Night-Caio-Queiroz.jpg')";
        credits.innerHTML = 'photo by <strong>Caio Queiroz</strong>';
    } else if (hour >= 00 && hour < 6) { //madrugada
        document.body.style.background = "url('Night-Caio-Queiroz.jpg')";
        credits.innerHTML = 'photo by <strong>Caio Queiroz</strong>';
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
                const { temperature, summary } = data.currently; //pega a temperatura do data.currently
                //muda os elementos da DOM a partir da API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
            
            
            });
        });


    }
});