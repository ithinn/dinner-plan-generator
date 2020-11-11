let middagsliste = [];
let fredagsmiddag = [];
let sondagsmiddag = [];
let filteredArray = [];


//const main = document.getElementsByTagName("main");

const minUke = document.getElementById("ukesplan_h2");
const mainBtn = document.getElementById("genererBtn")
const ukesplan = document.getElementById("ukesplan");
const filtLab = document.getElementById("filterLabel");
const filt = document.getElementById("filter");
const cb = document.getElementById("cb");
const tagSek = document.getElementById("filterlabler");
const videre = document.getElementById("videre");
const lagretBtn = document.getElementById("lagretBtn");

const tegnUkesplan = (arr2) => {
    let html = "";
   
    fyllMiddagsliste(arr2)
    console.log(middagsliste);
  
    for (let i = 0; i < middagsliste.length; i++) {
            html += `
            <article id=${i} class="dagWrap">
            <h3 class="dag">${dager[i].dag}</h3>
            <h2 id="rett${i}" class="rett">${middagsliste[i].navn}</h2>
            <div id="i_wrap${i}" class="icon_wrap">
                <div class="clock">${middagsliste[i].tid}</div>
                <div class="price">${middagsliste[i].pris}</div>
            </div>
            <button id="btn${i}" class="bytt">Bytt rett</button>
            </article>
            `
           
            
    }
    ukesplan.innerHTML = html;
    //console.log(ukesplan);
    mainBtn.style.display = "none";
    filtLab.style.display = "block";
    videre.innerHTML = `
    <button id="lagre">Lagre</button>
    
    
    <input type="email" id="mail" placeholder="Skriv din epost-adresse">
    <button id="sendmail">Send ukesplan</button>
    `

    const send = document.getElementById("sendmail");
    send.addEventListener("click", alertMail);

    const lagre = document.getElementById("lagre");
    lagre.addEventListener("click", lagreLocal);

    lagretBtn.style.display = "none";
    //finnLocal();
}



//-------------------------LOCALSTORAGE
const lagreLocal = () => {
    const arrStrMiddager = JSON.stringify(middagsliste);
    localStorage.setItem("Ukeplan", arrStrMiddager);
    console.log(arrStrMiddager);
    console.log("virker");
}

const finnLocal = () => {
    if (localStorage.getItem("Ukeplan") === null) {
        console.log("Det er ikke noe i local");

        
    } else {
        console.log("Den tror det er noe i localstor")
        let returnertString = localStorage.getItem("Ukeplan");
        let arrayFraString = JSON.parse(returnertString);
        //console.log(arrayFraString);
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
        //console.log(html);
        //main.innerHTML = `<h2 id="ukesplan_h2">Min ukesplan</h2>`
        minUke.style.display = "block";
        ukesplan.innerHTML = html;
        
        mainBtn.style.display = "none";
        lagretBtn.innerText = "Lag en ny ukesplan";
        lagretBtn.style.border = "4px solid white";
        lagretBtn.style.padding = "1em";
        lagretBtn.style.background = "#355c7d";
        lagretBtn.style.borderRadius = "10em";
        lagretBtn.addEventListener("click", tilbake);
        ukesplan.style.marginTop = ".1em";
        })
    }
    
    
}

const tilbake = () => {
    
    window.scrollTo(0, 0);
    location.reload()
    
}

window.onload = finnLocal();
//-------------------------------------------

mainBtn.addEventListener("click", () => {
    tegnUkesplan(middager);
})



//Generell filterfunksjon
const filter = (condition, collection) => {
    const result = [];

    for (let item of collection) {
        if (condition(item)) {
            result.push(item);
        }
    }
    return result;
}

const fancyMat = (fArray, sArray, array) => {
    console.log(filteredArray);
    if (filteredArray.length > 0) {
        for (const key in filteredArray) {
            let f = array[key].fredag;
            let s = array[key].søndag;
            
            if (f === true) {
                fArray.push(array[key]);
            } else if (s===true) {
                sArray.push(array[key]);
            } 
        }
    } else {
    for (const key in middager) {
        let f = array[key].fredag;
        let s = array[key].søndag;
        
        if (f === true) {
            fArray.push(array[key]);
        } else if (s===true) {
            sArray.push(array[key]);
        } 
    }
}
}


const plukkUtRett = (arr) => {

    let index = Math.floor(Math.random()*arr.length)
    //arr.splice(index, 1)
    return index;
}


fancyMat(fredagsmiddag, sondagsmiddag, middager);

console.log(fredagsmiddag);

const alertMail = () => {
    alert("Ukesplanen er sendt til din epostadresse");
}


const fyllMiddagsliste = (array) => {
    let tempArr = [];
    middagsliste = [];
    
    //checkIfChecked();
   
    //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime.
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false; 
    tempArr = filter(t, array);
    //console.log(tempArr);

    //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);
    //console.log(tempArr);

    for (let i = 0; i <= 4; i++) {
        let m = plukkUtRett(tempArr);
        //console.log(m);
        let middag = tempArr[m];
        //console.log(middag);
        middagsliste.push(middag)
        
        tempArr.splice(m, 1);
       
        
        //console.log(middagsliste);
    }

    //console.log(tempArray);

    
    let f = plukkUtRett(fredagsmiddag);
    let fMiddag = fredagsmiddag[f];
    middagsliste.splice(4, 0, fMiddag);

    //console.log(middagsliste);

    let s = plukkUtRett(sondagsmiddag);
    let sMiddag = sondagsmiddag[s];
    middagsliste.splice(6, 0, sMiddag);
    //console.log(middagsliste);
}

//fyllMiddagsliste(middager);

const applyFilter = () => {
    ukesplan.innerHTML = "";
    middagsliste = [];
    filteredArray = [];
    //console.log(filteredArray);
    
    mainFilter(middager);
    //console.log(filteredArray);
    checkIfChecked();
    //fancyMat(fredagsmiddag, sondagsmiddag, filteredArray);
    console.log(fredagsmiddag);

    fyllMiddagsliste(filteredArray)
    //console.log(middagsliste)

    tegnUkesplan(middagsliste, filteredArray);
    //console.log(middagsliste);
    
}

//---------------------------------------------------------------------------

//SELVESTE FILTERFUNKSJONEN
const mainFilter = (arr) => {
    let tempArray = [];

    //Setter verdien til resultArray til middags-arrayet, slik at det slår inn når ingen andre filtre er i kraft
    filteredArray = arr;
    let meatArray = [];
    let fishArray = [];
    let vegArray = [];
    let cheapArray = [];
    let cheaperArray = [];
    let exArray = [];
    let glutArr = [];
    let lakArr = [];
    let tag = document.querySelectorAll(".inpFilter");
    

    //Går gjennom alle tagene og sjekker om de er checked eller ikke. Hvis de er det pushes tagen inn i tempArray.
    for (let i = 0; i < tag.length; i++) {
        if (tag[i].checked) {
            tempArray.push(tag[i]);
        }
    }
    
    // //Går gjennom tempArray, og avgjør hva produktene skal filtreres på ut fra klassenavnet på tagen (som er element i tempArray)
     for (let i = 0; i < tempArray.length; i++) {
        tagSek.innerHTML = "";
        //console.log(tempArray[i]);

        //Lagrer resultatet av filtreringen i egne arrayer
        if (tempArray[i].id === "kjott") {
            const meat = item => item.kjottRodt === true;
            meatArray = filter(meat, arr);
            
        } else if (tempArray[i].id ==="fisk") {
            const fish = item => item.fisk === true;
            fishArray = filter(fish, arr);

        } else if (tempArray[i].id === "vegetar") {
            const veg = item => item.vegetar === true;
            vegArray = filter(veg, arr);
        
        } else if (tempArray[i].id === "gluten") {
            const glu = item => item.glutenfri === true;
            glutArr = filter(glu, arr);
        
        } else if (tempArray[i].id === "laktose") {
            const lak = item => item.laktosefri === true;
            lakArr = filter(lak, arr);
        
        } else if (tempArray[i].id === "billigst") {
            const billigst = item => item.pris === 1;
            cheapArray = filter(billigst, arr);
        
        } else if (tempArray[i].id === "billig") {
            const billig = item => item.pris === 2 || item.pris === 1;
            cheaperArray = filter(billig, arr);
        
        } else if (tempArray[i].id === "dyrt") {
            const dyrt = item => item.pris === 3;
            exArray = filter(dyrt, arr);
        } 
        

        //Slår sammen alle arrayene og lagrer dem i resultArray
        filteredArray = [].concat(fishArray, meatArray, vegArray, cheapArray, cheaperArray, exArray, glutArr, lakArr);
        console.log(filteredArray);
       // fancyMat(fredagsmiddag, sondagsmiddag, filteredArray);
        //console.log(fredagsmiddag);
    }
}


        //Øverst OG, ikke eller

        //Neste //Fjern ting fra første bolken

        //Ny prosess: Fjern alle som har to og tre i tid



filt.addEventListener("click", (e) => {
    if(e.target.nodeName === "INPUT") {
        applyFilter(e);
        }
})





const inpFilList = document.querySelectorAll(".inpFilter")

const checkIfChecked = () => {
    tagSek.innerHTML = "";

    for (let i = 0; i<inpFilList.length; i++) {

        if (inpFilList[i].checked) {
            console.log("Inputen er sjekka")
            tagSek.style.display = "flex";
            tagSek.innerHTML += `<label id="filt-tab${i}" class="filt-tag">${inpFilList[i].id}</label>`
            console.log(tagSek);
            //filt.style.top = "70vh";
            //tagSek.style.display = "flex";
            //labelSection.style.top = "7em";
            //ukesplan.style.marginTop = "8em";
            //filtLab.style.top = "-30em;"
        } else {
            //tagSek.style.display = "none";
        }
    }
}



const removeFilter = (e) => {

    //Finner html-elementet som har samme id som teksten i tagen vi har klikka på. 
    let text = e.target.innerText;
    const d = document.getElementById(text);
    
    //Hvis det elementet er sjekka, blir det satt til ikke-sjekka, og tagen forsvinner. 
    if (d.checked) {
        d.checked = false;
        tagSek.innerHTML = "";
        //tagSek.style.display = "none";
        //ukesplan.style.marginTop = "9em";
        //filtLab.style.top = "2em";
        //filt.style.top = "-4em";
    
    } else if ( !d.checked) {   
        tagSek.style.display = "none"; 
    } 

    applyFilter();
}

//LYTTER
tagSek.addEventListener("click", (e) => {
    if(e.target.nodeName === "LABEL") {
        removeFilter(e);
        }
})

//--------------------------------------------------

const clickFilterLabel = (evt) => {

if (evt.target.checked) {
    mainBtn.style.display = "none";
    console.log("virker, sjekka");
    //genButton.style.top = "112em"
    filtLab.style.top = "70em";
   // tagSek.style.display = "none";
    filt.style.top = "40vh";
    filt.style.opacity = "1";
    filtLab.innerText = "Velg"
    overlay.style.opacity = "1";
    overlay.style.left = "0";
    
} else if (!evt.target.checked){
    console.log("her var alt tomt");
    filt.style.top = "-200vh";
    filtLab.innerText = "Filter"
    filtLab.style.top = "12.17em"
    //filtLab.style.top = "30vh";
    overlay.style.opacity = "0";
    overlay.style.left = "-155vh";
    tagSek.style.marginTop = "10em"
    ukesplan.style.marginTop = "0em";
}
}

cb.addEventListener("click", clickFilterLabel);

//---------------------------------------------------------


// const endreRett = (e, arr) => {
    
//     let tempArr = arr;
//     btnId = Number(e.target.id.slice(-1));
    
//     //Velg mat som tar under 30 minutter å lage på hverdager
//     const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
//     tempArr = filter(t, arr);

//     // //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
//     const ingenKoseMat = item => item.fredag === false || item.søndag === false;
//     tempArr = filter(ingenKoseMat, tempArr);
    
//    for (let i=0; i<dager.length; i++) {
//         const index = plukkUtRett(tempArr);
//         const ifre = plukkUtRett(fredagsmiddag);
//         const fre = fredagsmiddag[ifre];
//         const isun = plukkUtRett(sondagsmiddag);
//         const sun = sondagsmiddag[isun];

//         if (i === btnId) {

//         if (dager[i].type === "hverdag") {
//             const h2 = document.getElementById(`rett${i}`);
//             h2.innerHTML = `${tempArr[index].navn}`;

//             const wrap = document.getElementById(`i_wrap${i}`);
//             console.log(wrap);
//             wrap.innerHTML = `
//                 <div class="clock">${tempArr[index].tid}</div>
//                 <div class="price">${tempArr[index].pris}</div>`;

//         } else if (dager[i].type === "fredag") {
//             const h2 = document.getElementById(`rett${i}`);
//             h2.innerHTML = `${fre.navn}`;

//             const wrap = document.getElementById(`i_wrap${i}`);
//             console.log(wrap);
//             wrap.innerHTML = `
//                 <div class="clock">${fre.tid}</div>
//                 <div class="price">${fre.pris}</div>`;
//         } else {
//             const h2 = document.getElementById(`rett${i}`);
//             h2.innerHTML = `${sun.navn}`;

//             const wrap = document.getElementById(`i_wrap${i}`);
            
//             wrap.innerHTML = `
//                 <div class="clock">${sun.tid}</div>
//                 <div class="price">${sun.pris}</div>`;
//         }
//        }
//    }
// }

const endreRett = (e, arr) => {
    console.log(middagsliste);
    console.log(e.target);
    let html;
    let tempArr = arr;
    btnId = Number(e.target.id.slice(-1));
    console.log(btnId);

    //Velg mat som tar under 30 minutter å lage på hverdager
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, arr);

    //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);
    
    console.log(tempArr);
    let nyIndex = plukkUtRett(tempArr);
    let nyRett = tempArr[nyIndex];
    
    let nyIndexFre = plukkUtRett(fredagsmiddag);
    let nyRettFre = fredagsmiddag[nyIndexFre];
    
    let nyIndexSon = plukkUtRett(sondagsmiddag);
    let nyRettSon = sondagsmiddag[nyIndexSon];
    
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
        html += `
        <article id=${i} class="dagWrap">
        <h3 class="dag">${dager[i].dag}</h3>
        <h2 id="rett${i}" class="rett">${middagsliste[i].navn}</h2>
        <div id="i_wrap${i}" class="icon_wrap">
            <div class="clock">${middagsliste[i].tid}</div>
            <div class="price">${middagsliste[i].pris}</div>
        </div>
        <button id="btn${i}" class="bytt">Bytt rett</button>
        </article>
        `   
}
ukesplan.innerHTML = html;
}

ukesplan.addEventListener("click", (e) => {
    if(e.target.nodeName === "BUTTON") {
        if (filteredArray.length > 0) {
            endreRett(e, filteredArray);
        } else {
            endreRett(e, middager);
        }
    }
})

//------------------------------------------------------------