
const hverdager = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Lørdag'];
const festdager = ['Fredag', 'Søndag']
const resultArray = [];
const tempArray = middager;

const generateRandom = () => {

    let middag="";
    let html = "";
    const ukesplan = document.getElementById("ukesplan");

    ukesplan.innerHTML = "";

    //Pusher syv tilfeldige retter inn i tempArray
    for (let i=0; i < hverdager.length; i++) {
        
        index = Math.floor(Math.random()*tempArray.length);
        middag= tempArray[index];

        

        //if(middag.fredag === false && middag.søndag===false) {
        resultArray.push(middag);
        tempArray.splice(index, 1);  
        //}

        console.log(tempArray);
        console.log(resultArray);

        //if (resultArray.length < 5) {
        //     resultArray.push(middag);
        //     tempArray.splice(index, 1);  
        // }

        console.log(tempArray);
        console.log(resultArray);
    
    }


    
    //console.log(resultArray);


    html += `
    <article class="dagWrap">
    <h3 class="dag">Mandag</h3>
    <h2 class="rett">${resultArray[0].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[0].tid}</div>
        <div class="price">${resultArray[0].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>
    
    <article class="dagWrap">
    <h3 class="dag">Tirsdag</h3>
    <h2 class="rett">${resultArray[1].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[1].tid}</div>
        <div class="price">${resultArray[1].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article class="dagWrap">
    <h3 class="dag">Onsdag</h3>
    <h2 class="rett">${resultArray[2].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[2].tid}</div>
        <div class="price">${resultArray[2].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article class="dagWrap">
    <h3 class="dag">Torsdag</h3>
    <h2 class="rett">${resultArray[3].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[3].tid}</div>
        <div class="price">${resultArray[3].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article class="dagWrap">
    <h3 class="dag">Fredag</h3>
    <h2 class="rett">"Fredag"</h2>
    <button class="bytt">Bytt rett</button>
    </article>

    <article class="dagWrap">
    <h3 class="dag">Lørdag</h3>
    <h2 class="rett">${resultArray[4].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[4].tid}</div>
        <div class="price">${resultArray[4].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article class="dagWrap">
    <h3 class="dag">Søndag</h3>
    <h2 class="rett">"søndag"</h2>
    <button class="bytt">Bytt rett</button>
    </article>
    
    <section id="handling">
            <button id="print">Skriv ut ukeplan</button>
            <div id="mail_wrap">
                <button type="submit" id="btnMail">Send til:</button>
                <input type="email" title="Skriv inn epostadresse" id="inpMail">
            </div>
    </section>
    
    `
    ukesplan.innerHTML = html;
    genButton.style.display= "none";
}


const genButton = document.getElementById("genererBtn");
genButton.addEventListener("click", generateRandom);


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

const filterLabels = document.getElementById("filter");

//Legg til lyttere på alle buttons på filterseksjonen
filterLabels.addEventListener("click", (e) => {
    if(e.target.nodeName === "INPUT") {
        applyFilter(e);
        }
})

let mainCatChoosen = false,underCatChoosen = false, sizeCatSelected = false;
let mainHolderArray = [], subHolderArray = [], sizeHolderArray = [];

const applyFilter = (evt) => {
    
    console.log(evt.target.checked);
    //Endrer value til en checkbox basert på om den er checked eller ikke, og endrer style hvis den er det. 
    // if (!evt.target.checked){
    //     evt.target.checked = true;
    //     console.log(evt.target.checked);
        
        
    // } else if (evt.target.checked) {
    //     evt.target.checked = false;
        
    //     console.log(evt.target.checked);
        
    // }

    //Kaller selveste filterfunksjonen
    mainFilter(evt);
}




//SELVESTE FILTERFUNKSJONEN
const mainFilter = (evt) => {
    let tempArray = [];
    //Setter verdien til resultArray til products-arrayet, slik at det slår inn når ingen andre filtre er i kraft
    let resultArray = middager;
    let tag = document.querySelectorAll(".inpFilter");

    //Går gjennom alle tagene og sjekker om de er checked eller ikke. Hvis de er det pushes tagen inn i tempArray.
    for (let i = 0; i < tag.length; i++) {
        if (tag[i].checked) {
            tempArray.push(tag[i]);
        }
    }
    

    console.log(tempArray);
    // //Går gjennom tempArray, og avgjør hva produktene skal filtreres på ut fra klassenavnet på tagen (som er element i tempArray)
     for (let i = 0; i < tempArray.length; i++) {
        
        if (tempArray[i].id === "kjott") {
            const meat = item => item.kjottRodt === true;
            resultArray = filter(meat, middager);
            
        } else if (tempArray[i].id ==="fisk") {
            const fish = item => item.fisk === true;
            resultArray = filter(fish, resultArray);
            
        }

        console.log(resultArray);



    }
    //     if (tempArray[i].className == "cbLabel type") {
           
    //        //Lager betingelsen som filterfunksjonen skal bruke, kaller filter() med den betingelsen, og lagrer resultatet i resultArray.  
    //        const mainCat = item => item. == tempArray[i].id
    //        resultArray = filter(mainCat, products); 
           

    //     } else if (tempArray[i].className == "tag cat_tag") {
    //         const subCat = item => item.cathegory_under == tempArray[i].id;
    //         resultArray = filter(subCat, resultArray);
            

    //     } else if (tempArray[i].className == "tag cat_size") {
    //         //Lagrer elementets id som et nummmer, bruker det som et parameter i filterSizes() og kaller filterSizes(), og lagrer resultatet i resultArray
    //         let val = Number(tempArray[i].id);
    //         resultArray = filterSizes(val, resultArray);
            

    //     } else if(tempArray[i].className == "tag att_tag") {
    //         resultArray = filterAtt(tempArray[i].id, resultArray);
            

    //     } else if (tempArray[i].className == "tag clr_large radio_clr") {
    //         resultArray = filterClr(tempArray[i].id, resultArray);

    //     }  

    //     if (resultArray.length === 0) {
    //         alert("Ingen produkter matcher søket ditt");   
    //     }
    // }

    // addObjects(resultArray);
    // addEventButton();
    }