
//------------------------------------------------------------
//Generell filterfunksjon - brukes i andre funksjoner
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
    dinnerPlan.innerHTML = "";
    dinnerList = [];
    checkIfChecked();
    meatFishVeg();
    fillDinnerList(filterList(), friDinner(), sunDinner());
    drawPlan();
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

const filterList = () => {

    let tempArray = tagCheck();
    let resultArray = meatFishVeg();


    for (let i=0; i < tempArray.length; i++) {
         
        if (tempArray[i].id === "gluten") {
            resultArray = resultArray.filter(dinner => dinner.glutenFree === true);
        } else if (tempArray[i].id === "laktose") {
            resultArray = resultArray.filter(dinner => dinner.lactoseFree === true);
        } else if (tempArray[i].id === "billigst") {
            resultArray = resultArray.filter(dinner => dinner.price === 1);
        } else if (tempArray[i].id === "billig") {
            resultArray = resultArray.filter(dinner => dinner.price === 2);
        } else if (tempArray[i].id === "dyrt") {
            resultArray = resultArray.filter(dinner => dinner.price === 3);
        } 
    }
    
    return resultArray;
}


const meatFishVeg = () => {
    let tempArr = tagCheck();
    let resultArr = courses;
    let meatArr = [];
    let fishArr = [];
    let vegArr = [];

    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].id === "fisk") {
            let fish = item => item.type === "fish";
            fishArr = filter(fish, resultArr);
       
        } else if (tempArr[i].id === "vegetar") {
            let veg = item => item.type === "veg";
            vegArr = filter(veg, resultArr);
    
        } else if (tempArr[i].id === "kjott") {
            let meat = item => item.type === "meat";
            meatArr = filter(meat, resultArr);
        }
    }
   
    if (fishArr.length > 0 || vegArr.length > 0 || meatArr.length > 0) {
        resultArr = [...fishArr, ...vegArr, ...meatArr];
    }

    return resultArr
}

//------------------------------------------------------
//Returnerer liste med fredagsmiddager
//------------------------------------------------------

const friDinner = () => {

    let fridayDinners = [];
    let tempArray = filterList(); 
    
    tempArray.forEach(el => {
       
        if(el.friday) {
            fridayDinners.push(el);
        }
    })
    return fridayDinners; 
} 

//---------------------------------------------------------
//Returnerer liste med søndagsmiddager
//---------------------------------------------------------

const sunDinner = () => {
    let sundayDinners = [];
    let tempArray = filterList();

    tempArray.forEach(el => {
        if (el.sunday) {
            sundayDinners.push(el);
        }
    })

    return sundayDinners;
}

//-----------------------------------------------------------
//Returnerer liste med retter som tar kort tid å lage
//-----------------------------------------------------------
const fastFood = () => {
    let tempArray = filterList();
    let fastFoodArr = [];

    tempArray.forEach(el => {
        if (el.time === 1) {
            fastFoodArr.push(el);
        }
    })
     
    return fastFoodArr;
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
    const input = document.getElementById(text);

    //Hvis det elementet er sjekka, blir det satt til ikke-sjekka, og tagen forsvinner.
    if (input.checked) {
        input.checked = false;
        tagSek.innerHTML = "";

    } else if ( !input.checked) {
        tagSek.style.display = "none";
    }

    applyFilter();
}
