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
        document.body.style.background = "url('../images/Night-Irina-Iriser.jpg')";
        credits.innerHTML = 'photo by <strong>Irina Iriser</strong> from <strong>Pexels</strong>';
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