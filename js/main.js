
function openWindow(name) {
    const window_zone = document.getElementById("window-zone");
    if (window_zone.hasChildNodes())
    {
        window_zone.removeChild(window_zone.childNodes[0]);
    }
    else
    {
        let twindow = document.createElement("div");
        twindow.style = "margin: 32px; width: 700px;";
        twindow.classList.add("window", "tur");
        let title_bar = document.createElement("div");
        title_bar.classList.add("title-bar");
        let title_bar_text = document.createElement("div");
        title_bar_text.classList.add("title-bar-text");
        let title_bar_control = document.createElement("div");
        title_bar_control.classList.add("title-bar-controls");
        let butclose = document.createElement("button");
        butclose.setAttribute("aria-label", "Close");
        butclose.onclick = function () {
            window_zone.removeChild(window_zone.childNodes[0]);
        }
        title_bar_control.appendChild(butclose);
        title_bar.appendChild(title_bar_text);
        title_bar.appendChild(title_bar_control);
        let window_body = document.createElement("div");
        window_body.classList.add("window-body");
        twindow.appendChild(title_bar);
        twindow.appendChild(window_body);
        if (name === "arch")
        {
            title_bar_text.innerText = "Archivos";
            window_body.style = "height: 350px;";
            let cv = document.createElement("a");
            cv.href = "./arch/CV22.pdf";
            cv.innerText = "Curriculum Vitae";
            window_body.appendChild(cv);
            window_zone.appendChild(twindow);
        }
        if (name === "code")
        {
            window.open("https://github.com/silvericarus", '_blank').focus();
        }
        if (name === "mail")
        {
            window.open("mailto:agonzalezrosa@hotmail.com", '_blank').focus();
        }
        if (name === "term")
        {
            title_bar_text.innerText = "Terminal";
            window_body.style = "background-color: rgb(0,0,0);" +
                                "height: 350px;";
            window_zone.appendChild(twindow);
            initTerm(window_body);
        }
    }

}

function generateTime(){
    const today = new Date();
    let hours;
    let minutes;
    let timeDOM = document.getElementById("hora");
    hours = today.getHours();
    minutes = today.getMinutes();
    if (hours <= 9)
    {
        timeDOM.dateTime = "0" + hours + ":" + minutes;
        timeDOM.innerText = "0" + hours + ":" + minutes;
    }

    else if (minutes <= 9)
    {
        timeDOM.dateTime = hours + ":" + "0" + minutes;
        timeDOM.innerText = hours + ":" + "0" + minutes;
    }
    else if (hours <= 9 && minutes <= 9)
    {
        timeDOM.dateTime = "0" + hours + ":" + "0" + minutes;
        timeDOM.innerText = "0" + hours + ":" + "0" + minutes;
    }
    else
    {
        timeDOM.dateTime = hours + ":" + minutes;
        timeDOM.innerText = hours + ":" + minutes;
    }
}

function generateDate(){
    const today = new Date();
    let fechaDOM = document.getElementById("fecha");
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (month <= 9)
    {
        fechaDOM.dateTime = day + "/0" + month + "/" + year;
        fechaDOM.innerText = day + "/0" + month + "/" + year;
    }
    else if (day <= 9)
    {
        fechaDOM.dateTime = "0" + day + month + "/" + year;
        fechaDOM.innerText = "0" + day + month + "/" + year;
    }
    else if (day <= 9 && month <= 9)
    {
        fechaDOM.dateTime = "0" + day + "/0" + month + "/" + year;
        fechaDOM.innerText = "0" + day + "/0" + month + "/" + year;
    }
    else
    {
        fechaDOM.dateTime = day + "/" + month + "/" + year;
        fechaDOM.innerText = day + "/" + month + "/" + year;
    }

}

window.onload = generateTime();
window.onload = generateDate();