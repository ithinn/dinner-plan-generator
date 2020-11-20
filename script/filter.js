
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
    checkIfChecked();
    fyllMiddagsliste(filterListe(), fredagsMiddag(), sondagsMiddag());
    tegnUkesplan();
}

//Lytter til applyFilter
filt.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT") {
        applyFilter(e);
        }
    })


//---------------------------------------------------------------------------------------------
//OPPRETTER EN FILTRERT LISTE (HVIS FILTRE ER VALGT. HVIS IKKE RETURNERES HELE MIDDAGSARRAYET)
//---------------------------------------------------------------------------------------------

const filterListe = () => {

    let tempArray = tagCheck();
    
    let resultArray = middager;

    console.log(tempArray);
    
    
    for (let i=0; i < tempArray.length; i++) {
        
        // if (tempArray[i].id === "kjott" || tempArray[i].id === "fisk" || tempArray[i].id === "vegetar") {
        //     resultArray = resultArray.filter(middag => middag.type === tempArray[i].id);   
        if (tempArray[i].id === "fisk") {
            resultArray = resultArray.filter(middag => middag.type === "fisk");
            console.log(resultArray);
        } else if (tempArray[i].id === "vegetar") {
            resultArray = resultArray.filter(middag => middag.type === "vegetar")
            console.log(resultArray);
        } else if (tempArray[i].id === "kjott") {
            resultArray = resultArray.filter(middag => middag.type === "kjott");
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
        } 
    }
    
    //console.log(resultArray);
    return resultArray;
}


//------------------------------------------------------
//Returnerer liste med fredagsmiddager
//------------------------------------------------------

const fredagsMiddag = () => {

    let fredagsmiddag = [];
    let tempArray = filterListe(); 
    
    tempArray.forEach(el => {
       
        if(el.fredag) {
            fredagsmiddag.push(el);
        }
    })
    return fredagsmiddag; 
} 

//---------------------------------------------------------
//Returnerer liste med søndagsmiddager
//---------------------------------------------------------

const sondagsMiddag = () => {
    let sondagsmiddag = [];
    let tempArray = filterListe();

    tempArray.forEach(el => {
        if (el.søndag) {
            sondagsmiddag.push(el);
        }
    })

    return sondagsmiddag;
}

//-----------------------------------------------------------
//Returnerer liste med retter som tar kort tid å lage
//-----------------------------------------------------------
const liteTid = () => {
    let tempArray = filterListe();
    let liteTidArr = [];

    tempArray.forEach(el => {
        if (el.tid === 1) {
            liteTidArr.push(el);
        }
    })
     
    return liteTidArr;
}


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
