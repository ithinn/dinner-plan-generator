
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
const tagCheck = (destArr) => {

    tag.forEach(el => {
        el.unchecked = true;
        console.log(el.checked);
    })
    
    for (let i = 0; i < tag.length; i++) {
        if(tag[i].checked) {
            destArr.push(tag[i]);
        }
    }
}


//------------------------------------------------------------
//Iverksetter filteret
//------------------------------------------------------------


const applyFilter = () => {
    ukesplan.innerHTML = "";
    middagsliste = [];
    filteredArray = []; 
    filterInn(middager);
    checkIfChecked();
    fyllMiddagsliste(filteredArray, freFilt, sonFilt);
    tegnUkesplan(filteredArray, freFilt, sonFilt);
}


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
    tagCheck(tempArray);

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





//Virker ikke enda, men denne skal funke for filtrene som ikke er kjøtt/fisk/vegetar.
// const filterUt = () => {
//     let tempArray = [];
//     let newArray = filteredArray;

//     tagCheck(tempArray);
//     console.log(newArray);
//     console.log(tempArray);
//     if (filteredArray.length > 0) {

//         for (let i=0; i<tempArray.length; i++) {
//             //debugger
//             if (tempArray[i].id === "gluten") {
//                 console.log("gluten er sjekka");
                
//                 newArray.forEach(el => {
//                     if (!el.glutenfri) {
//                         newArray.splice(el)
//                     }
                    
                  
//                 })
//             }
//         }
//         console.log(filteredArray);
//     }
// }

//filterUt();



