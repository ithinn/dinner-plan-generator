//Tomme arrayer som brukes av flere funksjoner
let middagsliste = [];
let fredagsmiddag = [];
let sondagsmiddag = [];
let filteredArray = [];
let freFilt = [];
let sonFilt = [];

//HTML-elementer
const lukk_filter_btn = document.getElementById("lukk_filter_Btn");
const minUke = document.getElementById("ukesplan_h2");
const mainBtn = document.getElementById("genererBtn")
const ukesplan = document.getElementById("ukesplan");
const filtLab = document.getElementById("filterLabel");
const filt = document.getElementById("filter");
const cb = document.getElementById("cb");
const tagSek = document.getElementById("filterlabler");
const videre = document.getElementById("videre");
const lagretBtn = document.getElementById("lagretBtn");
const dagWrap = document.getElementsByClassName("dagWrap");
const rettH3 = document.querySelectorAll(".rett"); 
let tag = document.querySelectorAll(".inpFilter");




//------------------------------------------------------
//TEGN UT UKESPLANEN
//------------------------------------------------------

//Fyll fredagsmiddags/søndagsmiddag-arrayet
middager.forEach(el => {
    if (el.fredag) {
        fredagsmiddag.push(el);
    } else if (el.søndag) {
        sondagsmiddag.push(el);
    }
})


//Opprett HTML
const tegnUkesplan = (arr1, arr2, arr3 ) => {
    let html = "";

    fyllMiddagsliste(arr1, arr2, arr3);

    for (let i = 0; i < middagsliste.length; i++) {

        let tid = visTid(middagsliste[i].tid)
        
        html += `
            <article id=${i} class="dagWrap">
            <h3 class="dag">${dager[i].dag}</h3>
            <h2 id="rett${i}" class="rett">${middagsliste[i].navn}</h2>
            <div id="i_wrap${i}" class="icon_wrap">
                <div class="clock">${tid}</div>
            </div>
            <button tabindex=0 id="btn${i}" class="bytt">Bytt rett</button>
            </article>
            `
    }

    let html_videre = `
        <button id="lagre">Lagre</button>
        <input aria-label="Email-adress" type="email" id="mail" placeholder="Skriv din epost-adresse">
        <button type="submit" id="sendmail">Send ukesplan</button>
        `

    ukesplan.innerHTML = html;
    videre.innerHTML = html_videre;

    mainBtn.style.display = "none";
    filtLab.style.display = "block";
    lagretBtn.style.display = "none";
    
    //Lyttere til "Lagre" og "Send ukesplan"-button
    const send = document.getElementById("sendmail");
    send.addEventListener("click", alertMail);

    const lagre = document.getElementById("lagre");
    lagre.addEventListener("click", lagreLocal);
}


//Lytter - tegnUkesplan
mainBtn.addEventListener("click", () => {
    tegnUkesplan(middager, fredagsmiddag, sondagsmiddag);
})



//--------------------------------------------------------------
//FYLL MIDDAGSLISTE
//--------------------------------------------------------------
const fyllMiddagsliste = (array, arrayFre, arraySun) => {
    let tempArr = [];
    middagsliste = [];

    //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime.
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, array);

    //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);

    for (let i = 0; i <= 4; i++) {
        let m = plukkUtRett(tempArr);

        let middag = tempArr[m];

        middagsliste.push(middag)

        tempArr.splice(m, 1);
    }

    let f = plukkUtRett(arrayFre);
    let fMiddag = arrayFre[f];
    middagsliste.splice(4, 0, fMiddag);

    let s = plukkUtRett(arraySun);
    let sMiddag = arraySun[s];
    middagsliste.splice(6, 0, sMiddag);
}



//---------------------------------------------------------------
//ENDRER RETT NÅR DU TRYKKER KNAPPEN
//---------------------------------------------------------------
const endreRett = (e, arr) => {

    let html;
    let tempArr = arr;
    btnId = Number(e.target.id.slice(-1));
    

    //Velg mat som tar under 30 minutter å lage på hverdager
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, arr);

    //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);

    let nyRett = "";
    let nyRettFre = "";
    let nyRettSon = "";


    if (filteredArray.length > 0) {
        tempArr = filteredArray;
        let nyIndex = plukkUtRett(tempArr);
        nyRett = tempArr[nyIndex];
    
        let nyIndexFre = plukkUtRett(freFilt);
        nyRettFre = freFilt[nyIndexFre];
    
        let nyIndexSon = plukkUtRett(sonFilt);
        nyRettSon = sonFilt[nyIndexSon];
    } else {
        let nyIndex = plukkUtRett(tempArr);
        nyRett = tempArr[nyIndex];
    
        let nyIndexFre = plukkUtRett(fredagsmiddag);
        nyRettFre = fredagsmiddag[nyIndexFre];
    
        let nyIndexSon = plukkUtRett(sondagsmiddag);
        nyRettSon = sondagsmiddag[nyIndexSon];
    }
   
 
    if (btnId <=3 || btnId === 5) {
        middagsliste.splice(btnId, 1, nyRett);
        console.log("hverdag");
    } else if (btnId === 4) {
        middagsliste.splice(btnId, 1, nyRettFre);
        console.log("fredag");
    } else {
        middagsliste.splice(btnId, 1, nyRettSon);
        console.log("Søndag");
    }

    for (let i = 0; i < middagsliste.length; i++) {
        let tid = visTid(middagsliste[i].tid)
        
        html += `
        <article id=${i} class="dagWrap">
        <h3 class="dag">${dager[i].dag}</h3>
        <h2 id="rett${i}" class="rett">${middagsliste[i].navn}</h2>
        <div id="i_wrap${i}" class="icon_wrap">
            <div class="clock">${tid}</div>
        </div>
        <button tabindex="0" id="btn${i}" class="bytt">Bytt rett</button>
        </article>
        `
}
    ukesplan.innerHTML = html;
    document.getElementById(e.target.id).focus();
}


//Lytter til endre rett
ukesplan.addEventListener("click", (e) => {
    if(e.target.nodeName === "BUTTON") {
        console.log(e.target.id);

        if (filteredArray.length > 0) {
            endreRett(e, filteredArray);
        } else {
            endreRett(e, middager);
        }
    }
})



//------------------------------------------------------
//LOCAL STORAGE
//------------------------------------------------------

const lagreLocal = () => {
    const arrStrMiddager = JSON.stringify(middagsliste);
    localStorage.setItem("Ukeplan", arrStrMiddager);
    alert("Din ukesplan er lagret, og vil være tilgjengelig neste gang du laster inn siden.")
}

const finnLocal = () => {

    if (localStorage.getItem("Ukeplan") === null) {
        console.log("Det er tomt i local");

    } else {

        let returnertString = localStorage.getItem("Ukeplan");
        let arrayFraString = JSON.parse(returnertString);

        lagretBtn.style.display = "block";

        lagretBtn.addEventListener("click", () => {
            let html = "";
            for (let i = 0; i < arrayFraString.length; i++) {
                html += `
                <article id=${i} class="dagWrap">
                <h3 class="dag">${dager[i].dag}</h3>
                <h2 id="rett${i}" class="rett">${arrayFraString[i].navn}</h2>
                <div id="i_wrap${i}" class="icon_wrap">
                    <div class="clock">${arrayFraString[i].tid}</div>
                    <div class="price">${arrayFraString[i].pris}</div>
                </div>
                <button id="btn${i}" class="bytt">Bytt rett</button>
                </article>
                `
        }
        minUke.style.display = "block";
        ukesplan.innerHTML = html;
        mainBtn.style.display = "none";
        lagretBtn.innerText = "Lag en ny ukesplan";
        lagretBtn.style.border = "4px solid white";
        lagretBtn.style.padding = "1em";
        lagretBtn.style.background = "#355c7d";
        lagretBtn.style.borderRadius = "10em";
        lagretBtn.addEventListener("click", tilbake);

        })
    }
}

window.onload = finnLocal();



//--------------------------------------------------------
//SMÅFUNKSJONER
//--------------------------------------------------------

//setter tab-fokus
const riktigFokus = (cName) => {
    document.querySelector(cName).focus();
} 

//Refresher til forsiden når du trykker "Lag ny ukesplan"-button
const tilbake = () => {
    window.scrollTo(0, 0);
    location.reload()
}

//Skifter status for "Filter"-sjekkboksen
const seFiltrert = () => {
    if (cb.checked) {
        cb.checked = false;
        window.scrollTo(0, 0);
    } else if (!cb.checked) {
        cb.checked = true;
        riktigFokus(".cbLabel");
    }
}

//Plukker ut random index fra et array
const plukkUtRett = (arr) => {
    let index = Math.floor(Math.random()*arr.length)
    return index;
}

//Varsler om at epost er sendt. 
const alertMail = () => {
    alert("Ukesplanen er sendt til din epostadresse");
}

//Viser hvor mye tid matretten tar å lage
const visTid = (alt1) => {
    if (alt1 === 1) {
        return "20 minutter";
    } else if (alt1 === 2) {
        return "30 minutter";
    } else {
        return "45 minutter +"
    }  
}



