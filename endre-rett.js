ukesplan.addEventListener("click", (e) => {
    if(e.target.nodeName === "BUTTON") {
        if (filteredArray.length > 0) {
            endreRett(e, filteredArray);
        } else {
            endreRett(e, middager);
        }
    }
})

const endreRett = (e, arr) => {
    
    let tempArr = arr;
    btnId = Number(e.target.id.slice(-1));
    
    //Velg mat som tar under 30 minutter å lage på hverdager
    const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
    tempArr = filter(t, arr);
    

    // //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
    const ingenKoseMat = item => item.fredag === false || item.søndag === false;
    tempArr = filter(ingenKoseMat, tempArr);
    

   for (let i=0; i<dager.length; i++) {
    const index = Math.floor(Math.random()* tempArr.length);
    const ifre = Math.floor(Math.random()* fredagsmiddag.length);
    const fre = fredagsmiddag[ifre];
    const isun = Math.floor(Math.random()* sondagsmiddag.length);
    const sun = sondagsmiddag[isun];

       if (i === btnId) {

        if (dager[i].type === "hverdag") {
            const h2 = document.getElementById(`rett${i}`);
            h2.innerHTML = `${tempArr[index].navn}`;

            const wrap = document.getElementById(`i_wrap${i}`);
            console.log(wrap);
            wrap.innerHTML = `
                <div class="clock">${tempArr[index].tid}</div>
                <div class="price">${tempArr[index].pris}</div>`;

        } else if (dager[i].type === "fredag") {
            const h2 = document.getElementById(`rett${i}`);
            h2.innerHTML = `${fre.navn}`;

            const wrap = document.getElementById(`i_wrap${i}`);
            console.log(wrap);
            wrap.innerHTML = `
                <div class="clock">${fre.tid}</div>
                <div class="price">${fre.pris}</div>`;
        } else {
            const h2 = document.getElementById(`rett${i}`);
            h2.innerHTML = `${sun.navn}`;

            const wrap = document.getElementById(`i_wrap${i}`);
            //console.log(wrap);
            wrap.innerHTML = `
                <div class="clock">${sun.tid}</div>
                <div class="price">${sun.pris}</div>`;
        }
       }
   }
}




tagSek.addEventListener("click", (e) => {
    if(e.target.nodeName === "LABEL") {
        removeFilter(e);
        }
})



const inpFilList = document.querySelectorAll(".inpFilter")

const checkIfChecked = () => {
    for (let i = 0; i<inpFilList.length; i++) {

        if (inpFilList[i].checked) {
            tagSek.innerHTML += `<label id="filt-tab${i}" class="filt-tag">${inpFilList[i].id}</label>`
            filt.style.top = "70vh";
            
            labelSection.style.top = "7em";
            ukesplan.style.top = "8em";
            filtLab.style.top = "-30em;"
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
        //filtLab.style.top = "2em";
        //filt.style.top = "-4em";
    
    } else if ( !d.checked) {    
    }

    applyFilter();
}

const clickFilterLabel = (evt) => {

if (evt.target.checked) {
    console.log("virker, sjekka");
    genButton.style.top = "112em"
    filtLab.style.top = "45vh"
    filt.style.top = "55vh";
    filt.style.opacity = "1";
    filtLab.innerText = "Velg"
    
} else if (!evt.target.checked){
    console.log("her var alt tomt");
    filt.style.top = "-200vh";
    filtLab.innerText = "Filter"
    filtLab.style.top = "30vh";
}
}


filtCB.addEventListener("click", clickFilterLabel)


const clickGenerateButton = (e) => {

}

// const labelSection = document.getElementById("filterlabler")
// labelSection.addEventListener("click", (e) => {

// if (e.target.nodeName === "LABEL") {
//     removeFilter();
// }
// })
// const generateOne = arr => {

//     console.log(index);
// }

