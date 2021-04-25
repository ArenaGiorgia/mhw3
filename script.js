//ASSEGNAZIONI DI VARIABILI
const endpoint_ric = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe";
const chiave_news = "ca43d4e07c3f4958845be533bfd96ab9";
const url = 'https://newsapi.org/v2/everything?' +
    'q=coronavirus&' +
    'language=it&' +
    'pageSize=8&' +
    'from=2021-04-18&' +
    'sortBy=popularity&' +
    'apiKey=' + chiave_news;
const req = new Request(url);

//ASSEGNO L'EVENTO AL SUBMIT
const form = document.querySelector("#barra_ricerca");
form.addEventListener('submit', ricercaElementi)


function OnJsonNews(json) {
    //TODO: QUI IMPLEMENTO LA CREAZIONE DELLE NEWS RELATIVE AL COVID
    const main = document.querySelector('section').children.item(3);
    main.innerHTML = "";
    const entrate = Object.entries(json);
    const contenuto = entrate[2][1];
    for (let i = 0; i < contenuto.length; i++) {
        console.log(contenuto[i])
        const articoli = document.querySelector("section").children.item(3);
        articoli.classList.remove("hidden");
        const img = document.createElement('img');
        const dettagli = document.createElement('p');
        const autore = document.createElement('em');
        const data = document.createElement('h4');
        const link = document.createElement('a');
        img.classList.add("immagini_principali");
        const mese = (new Date(contenuto[i].publishedAt).getMonth()) + 1;
        const giorno = new Date(contenuto[i].publishedAt).getDate();
        data.textContent = giorno.toString() + " " + "/" + mese.toString();
        dettagli.textContent = contenuto[i].title;
        autore.textContent = "fonte:  " + contenuto[i].source.name;
        img.src = contenuto[i].urlToImage;
        link.href = contenuto[i].url;
        link.target = "_blank"
        link.appendChild(data);
        link.appendChild(img);
        link.appendChild(dettagli);
        link.appendChild(autore);
        articoli.appendChild(link);
    }
}

function OnResponseNews(response) {
    console.log("Risposta ricevuta")
    return response.json();
}

//APPENA RICEVO IL JSON DELLA RICERCA
function OnJsonRic(json) { //TODO:QUI IMPLEMENTO LA FUNZIONE PER LA RICERCA DEL PAESE
    console.log(json);
    const main = document.querySelector('section').children.item(1);
    main.innerHTML = "";
    const ricerca = document.querySelector('#ric').value;
    console.log(ricerca);

    for (let elem of Object.keys(json)) {
        const array = json[elem];
        if (array.Country.toLowerCase() === ricerca.toLowerCase()) {
            const container = document.querySelector('section').children.item(1);
            console.log(container);
            const div1 = document.createElement('div');
            const div2 = document.createElement('div');
            const div3 = document.createElement('div');
            const titolo1 = document.createElement('h1');
            const titolo2 = document.createElement('h1');
            const titolo3 = document.createElement('h1');
            const desc1 = document.createElement('h2');
            const desc2 = document.createElement('h2');
            const desc3 = document.createElement('h2');

            titolo1.textContent = "Paese:";
            titolo2.textContent = "Totale Casi:";
            titolo3.textContent = "Totale Decessi:";
            desc1.textContent = array.Country;
            desc2.textContent = array.TotalCases;
            desc3.textContent = array.TotalDeaths;
            container.appendChild(div1);
            container.appendChild(div2);
            container.appendChild(div3);
            div1.appendChild(titolo1);
            div1.appendChild(desc1);
            div2.appendChild(titolo2);
            div2.appendChild(desc2);
            div3.appendChild(titolo3);
            div3.appendChild(desc3);

            const barra = document.querySelector('section .sbarra');
            barra.classList.remove("hidden");

        }

    }

}

//DATA LA RISPOSTA ALLA FETCH DELLA RICERCA
function OnResponseRic(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function ricercaElementi(event) {
    //TODO: QUI IMPLEMENTO LA CREAZIONE DEGLI ELEMENTI IN MANIERA DINAMICA E
    // LA RICERCA NEL FILE JSON PER RESTITUIRMI I DATI STATISTICI RELATIVI AL COVID
    // E LE NEWS RELATIVE AL COVID

    event.preventDefault();//evita il comportamento di default
    const ricerca = document.querySelector('#ric').value;//prendo il valore della barra di ricerca
    if (ricerca) {
        fetch(endpoint_ric, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "096005b443msh9c637cfcb5b8a56p11abccjsncfe2bc870b65",
                "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
            }
        }).then(OnResponseRic).then(OnJsonRic);

        fetch(req).then(OnResponseNews).then(OnJsonNews);
    }
}


