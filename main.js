
const hverdager = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Lørdag'];
const festdager = ['Fredag', 'Søndag']

let filteredArray = [];
const ukesplan = document.getElementById("ukesplan");

const generateRandom = (array) => {
    const tempArray = array;
    let middag="";
    let html = "";
    const resultArray = [];
    
    console.log(tempArray);

    ukesplan.innerHTML = "";

    //Pusher syv tilfeldige retter inn i tempArray
    for (let i=0; i < hverdager.length; i++) {
        
        index = Math.floor(Math.random()*tempArray.length);
        middag= tempArray[index];

        resultArray.push(middag);
        tempArray.splice(index, 1);
        

        //let id = tempArray[index].tid;
        //console.log(id);
        
    }
    console.log(resultArray);
    console.log(tempArray);

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

filtrertBtn.addEventListener("click", (e) => {
    applyFilter(e);
    
    console.log("Hei");
    
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




const applyFilter = (evt) => {
    ukesplan.innerHTML = "";
    filteredArray = [];
    
    //Kaller selveste filterfunksjonen

    mainFilter();
    generateRandom(filteredArray);
    
}


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
        

//Legg til ny fishArray = filter(fish, meat, middager); - ikke fastsatt antall parametre - må kunne ta både ett og flere. 

        //Slår sammen alle arrayene og lagrer dem i resultArray
        filteredArray = [].concat(fishArray, meatArray, vegArray, cheapArray, cheaperArray, exArray, glutArr, lakArr);
        console.log(filteredArray);   
    }
}