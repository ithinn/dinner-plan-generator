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
    let html = "";
    let tempArr = arr;
    btnId = Number(e.target.id.slice(-1));
    console.log(btnId);
    console.log(tempArr);

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
            tagSek.innerHTML += `<label id="filt-tab${i}" for="fisk" class="filt-tag">${inpFilList[i].id}</label>`
        }
    }
}



const removeFilter = (e) => {
    //console.log(filteredArray);


    let text = e.target.innerText;

    const d = document.getElementById(text);
    console.log(d);


if (d.checked) {
    console.log(d.checked);
    d.checked = false;
} else if ( !d.checked) {
    console.log("hå");

}
console.log(d.checked);


    applyFilter();
//    for (i = 0; i < filteredArray.length; i++) {


//        if(filteredArray[i].type === text) {


//             //filteredArray.pop();
//             filteredArray.splice(filteredArray[i], 1);

//            //console.log(filteredArray);

//        }

//    }

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

