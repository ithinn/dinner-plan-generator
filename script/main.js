//Tomme arrayer som brukes av flere funksjoner
let middagsliste = [];
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
let tag = document.querySelectorAll(".inpFilter");



//---------------------------------------------------------------------
//OPPRETT HTML basert på middagsliste-arrayet
//---------------------------------------------------------------------

const tegnUkesplan = () => {
    let html = "";
    
    //Returnerer et ferdig filtrert middagsarray (middagsliste)
    fyllMiddagsliste(filterListe(), fredagsMiddag(), sondagsMiddag());
    
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
    tegnUkesplan();
})



//----------------------------------------------------------------------------------------------
//FYLL MIDDAGSLISTE - Fyller et middagsarray med en rett per dag.
//----------------------------------------------------------------------------------------------

const fyllMiddagsliste = (array, arrayFre, arraySun) => {
    let tempArr = array;
    middagsliste = [];


    //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime.
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, array);

    //Utelukker oppskrifter som er fredags eller søndagsmat
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);

    //Pusher inn hverdagsretter
    for (let i = 0; i <= 4; i++) {
        let m = plukkUtRett(tempArr);

        let middag = tempArr[m];

        middagsliste.push(middag)

        tempArr.splice(m, 1);
    }

    //Pusher inn fredagsmiddag
    let f = plukkUtRett(arrayFre);
    let fMiddag = arrayFre[f];
    middagsliste.splice(4, 0, fMiddag);
    arrayFre.splice(f, 1);

    //Pusher inn søndagsmiddag
    let s = plukkUtRett(arraySun);
    let sMiddag = arraySun[s];
    middagsliste.splice(6, 0, sMiddag);
    arraySun.splice(s, 1);

    //Sjekker om bruker har ekstra dårlig tid noen dager, og bytter i såfall ut de aktuelle middagene. 
    liteTidRiktigDag();

    return middagsliste;
}


//---------------------------------------------------------------
//ENDRER RETT NÅR DU TRYKKER "BYTT-RETT"-KNAPPEN
//---------------------------------------------------------------
const endreRett = (e) => {
    let html;
    let middagsArr = filterListe();
    console.log(middagsArr);
    let freArr = fredagsMiddag();
    let sonArr = sondagsMiddag();
    let sjekketInp = tagCheck();
    let liteTidArr = liteTid();
    let btnId = Number(e.target.id.slice(-1));
    let nyRett = "";
    let nyRettFre = "";
    let nyRettSon = ""
    
    //Velger mat som tar under 30 minutter å lage på hverdager
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    middagsArr = filter(t, middagsArr);

    //Utelukker oppskrifter som er fredags eller søndagsmat på hverdager
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    middagsArr = filter(ingenKoseMat, middagsArr);

    //Plukker ut nye indexer fra diverse arrayer
    let index = plukkUtRett(liteTidArr);
    let nyIndex = plukkUtRett(middagsArr);
    let nyIndexFre = plukkUtRett(freArr);
    let nyIndexSon = plukkUtRett(sonArr);
    
    //Sjekker om det noen filter er sjekket av, og om de i såfall er dager med dårlig tid.
    //Definerer nyRett, nyRettFre og nyRettSon. 
    if (sjekketInp.length > 0) {
        
        sjekketInp.forEach(el=> {
            if(el.id === "mandag" || el.id === "tirsdag" || el.id === "onsdag" || el.id === "torsdag" || el.id === "fredag" || el.id === "lørdag" || el.id === "søndag") {
                
                nyRett = liteTidArr[index];
                liteTidArr.splice(nyRett, 1);
                
                nyRettFre = liteTidArr[index];
                liteTidArr.splice(nyRettFre, 1);

                nyRettSon = liteTidArr[index];
                liteTidArr.splice(nyRettSon, 1);

            } else {

                nyRett = middagsArr[nyIndex];
                middagsArr.splice(nyRett, 1);

                nyRettFre = freArr[nyIndexFre];
                freArr.splice(nyRettFre);

                nyRettSon = sonArr[nyIndexSon];
                sonArr.splice(nyRettSon);

            }
        })

    } else {
            nyRett = middagsArr[nyIndex];
            middagsArr.splice(nyRett, 1);

            nyRettFre = freArr[nyIndexFre];
            freArr.splice(nyRettFre);

            nyRettSon = sonArr[nyIndexSon];
            sonArr.splice(nyRettSon);   
    }
    
    //Sjekker at riktig button skifter riktig rett. 
    if (btnId <=3 || btnId === 5) {
        middagsliste.splice(btnId, 1, nyRett);
    } else if (btnId === 4) {
        middagsliste.splice(btnId, 1, nyRettFre);  
    } else {
        middagsliste.splice(btnId, 1, nyRettSon);
    }

    
    //Oppretter HTML
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
        endreRett(e)
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

//Sjekker om bruker har dårlig tid noen dager, og sørger for at den dagen får en rett det tar kort tid å lage
const liteTidRiktigDag = () => {
    let sjekketInp = tagCheck();
    let liteTidArr = liteTid();

    let index = plukkUtRett(liteTidArr);
    let travelMiddag = liteTidArr[index];
 
    sjekketInp.forEach(el => {
        if (el.id === "mandag") {
            middagsliste.splice(0, 1, travelMiddag);
        } else if (el.id === "tirsdag") {
            middagsliste.splice(1, 1, travelMiddag);
        } else if (el.id === "onsdag") {
            middagsliste.splice(2, 1, travelMiddag);
        } else if (el.id === "torsdag") {
            middagsliste.splice(3, 1, travelMiddag);
        } else if (el.id === "fredag") {
            middagsliste.splice(4, 1, travelMiddag);
        } else if (el.id === "lørdag") {
            middagsliste.splice(5, 1, travelMiddag);
        } else if (el.id === "søndag") {
            middagsliste.splice(6, 1, travelMiddag);
        } 
    })
}
