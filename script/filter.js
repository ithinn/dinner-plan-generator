
//------------------------------------------------------------
//Generell filterfunksjon
//------------------------------------------------------------

const filter = (condition, collection) => {
    const result = [];

    for (let item of collection) {
        if (condition(item)) {
            result.push(item);
        }
    }
    return result;
}


//------------------------------------------------------------------------------------------------------------------------
//Sørger for at tager er unchecked i utgangspunktet, sjekker hvilke som er sjekket, og pusher dem inn i eget arr
//------------------------------------------------------------------------------------------------------------------------
const tagCheck = () => {
    let array = [];

    tag.forEach(el => {
        el.unchecked = true;  
    })

    for (let i = 0; i < tag.length; i++) {
        if(tag[i].checked) {
            array.push(tag[i]);
        }
    }
    return array;
}


//------------------------------------------------------------
//Iverksetter filteret
//------------------------------------------------------------


const applyFilter = () => {
    ukesplan.innerHTML = "";
    middagsliste = [];
    filteredArray = [];
    //filterInn(middager);
    remFilt();
    //fredFilt();
    //filterUt();
    checkIfChecked();
    fyllMiddagsliste(remFilt(), freFilt, sonFilt);
    tegnUkesplan(remFilt(), freFilt, sonFilt);
}


let meatArray = [];
let meatArrayfre = [];
let meatArraysun = [];
let fishArray = [];
let fishArrayfre = [];
let fishArraysun = [];
let vegArray = [];
let vegArrayfre = [];
let vegArraysun = [];

//-------------------------------------------------------------------------------------------
//Filtrerer fisk, kjøtt og vegetar
//-------------------------------------------------------------------------------------------

const filterInn = (arr) => {
    filteredArray = arr;
    freFilt = fredagsmiddag;
    sonFilt = sondagsmiddag;
    let meatArray = [];
    let meatArrayfre = [];
    let meatArraysun = [];
    let fishArray = [];
    let fishArrayfre = [];
    let fishArraysun = [];
    let vegArray = [];
    let vegArrayfre = [];
    let vegArraysun = [];
    let tempArray = [];

    //Går gjennom alle tagene og sjekker om de er checked eller ikke. Hvis de er det pushes tagen inn i tempArray.
    tempArray = tagCheck();

    //filtAll(tempArray, "kjott", "kjottRodt", meatArray, meatArrayfre, meatArraysun);
    //console.log(meatArray);
    //Lager betingelser for kjøtt, fisk og vegetar, og legger dem til i filterArray, fredagsfilter og søndagsfilter
    for (let i= 0; i < tempArray.length; i++) {

        if (tempArray[i].id === "kjott") {
            const meat = item => item.kjottRodt === true && !item.fredag && !item.søndag;
            meatArray = filter(meat, middager);

            const meatFri = item => item.kjottRodt === true && item.fredag;
            meatArrayfre = filter(meatFri, middager)

            const meatSun = item => item.kjottRodt === true && item.søndag;
            meatArraysun = filter(meatSun, middager);


        } else if (tempArray[i].id === "fisk") {
            const fish = item => item.fisk === true && !item.fredag && !item.søndag;
            fishArray = filter(fish, middager);

            const fishFri = item => item.fisk === true && item.fredag;
            fishArrayfre = filter(fishFri, middager)

            const fishSun = item => item.fisk === true && item.søndag;
            fishArraysun = filter(fishSun, middager);


        } else if (tempArray[i].id === "vegetar") {

            const veg = item => item.vegetar === true && !item.fredag && !item.søndag;
            vegArray = filter(veg, middager);

            const vegFri = item => item.vegetar === true && item.fredag;
            vegArrayfre = filter(vegFri, middager)

            const vegSun = item => item.vegetar === true && item.søndag;
            vegArraysun = filter(vegSun, middager);


       }
        //Slår sammen de filtrerte listene
            filteredArray = [].concat(meatArray, fishArray, vegArray);
            freFilt = [].concat(meatArrayfre, fishArrayfre, vegArrayfre);
            sonFilt = [].concat(meatArraysun, fishArraysun, vegArraysun);
       }

}

//Lytter til filterInn
filt.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT") {
        applyFilter(e);
        }
    })



//--------------------------------------------------------------------------------
//OPPRETTER TAGS SOM VISER HVILKE FILTRE SOM ER AKTIVE
//----------------------------------------------------------------------------------------

const checkIfChecked = () => {
    tagSek.innerHTML = "";

    for (let i = 0; i<tag.length; i++) {

        if (tag[i].checked) {
            tagSek.style.display = "flex";
            tagSek.innerHTML += `<label tabindex="0" id="filt-tab${i}" class="filt-tag">${tag[i].id}</label>`
        }
    }
}


//-----------------------------------------------------------------------------------
//FJERNER FILTERTAGS OG FILTRERINGEN NÅR MAN TRYKKER PÅ DEM
//------------------------------------------------------------------------------------


const removeFilter = (e) => {

    //Finner html-elementet som har samme id som teksten i tagen vi har klikka på.
    let text = e.target.innerText;
    const d = document.getElementById(text);

    //Hvis det elementet er sjekka, blir det satt til ikke-sjekka, og tagen forsvinner.
    if (d.checked) {
        d.checked = false;
        tagSek.innerHTML = "";

    } else if ( !d.checked) {
        tagSek.style.display = "none";
    }

    applyFilter();
}



let filtOfFilt = [];

//Virker ikke enda, men denne skal funke for filtrene som ikke er kjøtt/fisk/vegetar.
const filterUt = () => {
    let tempArray = [];
    tagCheck(tempArray);

    filtOfFilt = filteredArray;
    console.log(tempArray);

//    tempArray.forEach(el => {
//         if(filtOfFilt.length > 0 && el.id === "gluten") {
//             console.log("Den er lengre enn 0")
//             filtOfFilt = filtOfFilt.filter(el => el.glutenfri);
//         }

        testFilt(tempArray, "gluten", "glutenfri");
        testFilt(tempArray, "laktose", "laktosefri")
        
         //console.log(filtOfFilt);
//     })
    //filterInn(filtOfFilt);
}

//filterUt();


const testFilt = (arr1, id, attribute, num) => {

   arr1.forEach(el => {
   
    if (filtOfFilt.length > 0 && el.id === id) {
        console.log("Den er lengre enn 0")
        filtOfFilt = filtOfFilt.filter(el => el[attribute]);
        console.log(filtOfFilt);
        console.log(filteredArray);
    }

   })


}

//Jeg prøver å lage en mer generell filterfunksjon jeg kan kalle inni de andre

const filtAll = (arr, id, attribute, arr2, freArr, sonArr) => {
    
    arr.forEach(el => {
        debugger
        if (el.id === id) {
            let test = item => !item.fredag && !item.søndag;
            arr2 = filter(test, middager)

            let test2 = item => item[attribute] &&item.fredag;
            freArr = filter(test2, middager);

            let test3 = item => item[attribute] && item.søndag;
            sonArr = filter(test3, middager);
        }
    })
}



//NY START

const remFilt = () => {

    let tempArray = tagCheck();
    tempArray.forEach(el => console.log(el));
    let resultArray = middager;

    console.log(resultArray);
     //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime.
     const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
     resultArray = filter(t, resultArray);
    
     console.log(resultArray);
     //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat
     const ingenKoseMat = item => item.fredag === false || item.søndag === false;
     resultArray = filter(ingenKoseMat, resultArray);

    

    for (let i=0; i < tempArray.length; i++) {

        if (tempArray[i].id === "kjott" || tempArray[i].id === "fisk" || tempArray[i].id === "vegetar") {
            resultArray = resultArray.filter(middag => middag.type === tempArray[i].id);   
        } else if (tempArray[i].id === "gluten") {
            resultArray = resultArray.filter(middag => middag.glutenfri === true);
        } else if (tempArray[i].id === "laktose") {
            resultArray = resultArray.filter(middag => middag.laktosefri === true);
        } else if (tempArray[i].id === "billigst") {
            resultArray = resultArray.filter(middag => middag.pris === 1);
        } else if (tempArray[i].id === "billig") {
            resultArray = resultArray.filter(middag => middag.pris === 2);
        } else if (tempArray[i].id === "dyrt") {
            resultArray = resultArray.filter(middag => middag.pris === 3);

            //Her blir det kødd
        } else if (tempArray[i].className === "inpFilter travel") {
            resultArray = resultArray.filter(middag => middag.tid === 1);
        }

        
    }

    
    console.log(resultArray);
    return resultArray;
    
}

//console.log(remFilt());

//middagsliste
// const fredFilt = () => {
//     let fredagsArray = remFilt(); 
//     //arr[4] = Math.floor(Math.random()*arr.length);

//     return arrayet
//     console.log(fredagsArray);
// } 


//Ok! remFilt kalles inni fyllMiddagsliste. Nå må jeg bare lage fredagsarrayet og søndagsarrayet og kalle det der også, så tror jeg at jeg har den. 
