

let fredagsmiddag = []
let sondagsmiddag = []
let filteredArray = [];
const ukesplan = document.getElementById("ukesplan");

const fancyMat = (fArray, sArray, array) => {
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

const algoritme = (arr) => {
    //Velg mat som tar under 30 minutter å lage på hverdager
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, arr);


// //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);
}
    

const generateRandom = (array) => {
    //let tempArray = array;
    let hverdagsmiddag="";
    let fre = "";
    let son = "";
    let html = "";
    const resultArray = [];
    let tempArr = [];

    //Tømmer ukesplanen 
    ukesplan.innerHTML = "";

    //Stanser animasjonen hvis en trykker på knappen
    let label = document.getElementById("filterLabel");
    let header = document.getElementById("header");
    
    label.style.animationDelay = "0s";
    header.style.animationDelay = "0s";


    fancyMat(fredagsmiddag, sondagsmiddag, middager);

    //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime.
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false; 
    tempArr = filter(t, array);
    //console.log(testArr);

    //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);
    //console.log(testArr);

    


    //Går gjennom dagene i uka, henter random rett fra hhv testArray, fredagsmiddag og sondagsmiddag, og pusher test-array inn på hverdagene.
    for (let i=0; i < dager.length; i++) {
        
        //Hverdagsmiddager
        indexHverdag = Math.floor(Math.random()*tempArr.length);
        hverdagsmiddag= tempArr[indexHverdag];
        
        //Fredagsmiddag
        indexFredag = Math.floor(Math.random()*fredagsmiddag.length);
        fre = fredagsmiddag[indexFredag];
        
        //sondagsmiddag
        indexSon = Math.floor(Math.random()*sondagsmiddag.length);
        son = sondagsmiddag[indexSon];

        resultArray.push(hverdagsmiddag);

       // console.log(resultArray);
        tempArr.splice(indexHverdag, 1);

        if (dager[i].type === "hverdag") {
            html += `
        <article id=${i} class="dagWrap">
        <h3 class="dag">${dager[i].dag}</h3>
        <h2 id="rett${i}" class="rett">${resultArray[i].navn}</h2>
        <div id="i_wrap${i}" class="icon_wrap">
            <div class="clock">${resultArray[i].tid}</div>
            <div class="price">${resultArray[i].pris}</div>
        </div>
        <button id="btn${i}" class="bytt">Bytt rett</button>
        </article>

        `

        } else if (dager[i].type === "fredag") {
            html += `
            <article id=${i} class="dagWrap">
            <h3 class="dag">${dager[i].dag}</h3>
            <h2  id="rett${i}" class="rett">${fre.navn}</h2>
            <div id="i_wrap${i}" class="icon_wrap">
                <div class="clock">${fre.tid}</div>
                <div class="price">${fre.pris}</div>
            </div>
            <button id="btn${i}" class="bytt">Bytt rett</button>
            </article>
            ` 
        } else {
            html += `
            <article id=${i} class="dagWrap">
            <h3 class="dag">${dager[i].dag}</h3>
            <h2 id="rett${i}" class="rett">${son.navn}</h2>
            <div id="i_wrap${i}" class="icon_wrap">
                <div class="clock">${son.tid}</div>
                <div class="price">${son.pris}</div>
            </div>
            <button id="btn${i}" class="bytt">Bytt rett</button>
            </article>
            ` 
        }

             
    }
    ukesplan.innerHTML = html; 
    genButton.style.display = "none";
    //filtLab.style.opacity = "1";
    filtLab.style.opacity = "1";
    //kursiv.innerText = "Ingen oppskrift - bare ideer"
    //ukesplan.style.top = "60vh";
}
const kursiv = document.getElementById("kursiv");

//------------------------------------------------------------------------

//Lytter til generelt filter
const genButton = document.getElementById("genererBtn");
genButton.addEventListener("click", function() {
    generateRandom(middager);
});

//Legg til lyttere på alle labels/input på filterseksjonen
const filterLabels = document.getElementById("filter");
filterLabels.addEventListener("click", (e) => {
    if(e.target.nodeName === "INPUT") {
        applyFilter(e);
        }
})

//Lytter til generer filter
const filtrertBtn = document.getElementById("genererFiltrertBtn");
const filt = document.getElementById("filter");
const overlay = document.getElementById("overlay");
const filtLab = document.getElementById("filterLabel");
const filtCB = document.getElementById("cb");
const labelSection = document.getElementById("filterlabler");

//----------------------------------------------------------------------


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




const applyFilter = (evt) => {
    ukesplan.innerHTML = "";
    
    filteredArray = [];
    mainFilter();
    generateRandom(filteredArray);
    checkIfChecked();
}

//---------------------------------------------------------------------------

//SELVESTE FILTERFUNKSJONEN
const mainFilter = () => {
    let tempArray = [];

    //Setter verdien til resultArray til middags-arrayet, slik at det slår inn når ingen andre filtre er i kraft
    filteredArray = middager;
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
        console.log(tempArray[i]);

        //Lagrer resultatet av filtreringen i egne arrayer
        if (tempArray[i].id === "kjott") {
            const meat = item => item.kjottRodt === true;
            meatArray = filter(meat, middager);
            
        } else if (tempArray[i].id ==="fisk") {
            const fish = item => item.fisk === true;
            fishArray = filter(fish, middager);

        } else if (tempArray[i].id === "vegetar") {
            const veg = item => item.vegetar === true;
            vegArray = filter(veg, middager);
        
        } else if (tempArray[i].id === "gluten") {
            const glu = item => item.glutenfri === true;
            glutArr = filter(glu, middager);
        
        } else if (tempArray[i].id === "laktose") {
            const lak = item => item.laktosefri === true;
            lakArr = filter(lak, middager);
        
        } else if (tempArray[i].id === "billigst") {
            const billigst = item => item.pris === 1;
            cheapArray = filter(billigst, middager);
        
        } else if (tempArray[i].id === "billig") {
            const billig = item => item.pris === 2 || item.pris === 1;
            cheaperArray = filter(billig, middager);
        
        } else if (tempArray[i].id === "dyrt") {
            const dyrt = item => item.pris === 3;
            exArray = filter(dyrt, middager);
        } 
        

        //Slår sammen alle arrayene og lagrer dem i resultArray
        filteredArray = [].concat(fishArray, meatArray, vegArray, cheapArray, cheaperArray, exArray, glutArr, lakArr);
    }
}


        //Øverst OG, ikke eller

        //Neste //Fjern ting fra første bolken

        //Ny prosess: Fjern alle som har to og tre i tid

const tagSek = document.getElementById("filterlabler");



