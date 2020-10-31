
const dager = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
const resultArray = [];
const tempArray = middager;

const generateRandom = () => {

    let middag="";
    let html = "";
    const ukesplan = document.getElementById("ukesplan");

    ukesplan.innerHTML = "";
    for (let i=0; i < dager.length; i++) {

        index = Math.floor(Math.random()*tempArray.length);
        middag= tempArray[index];

        resultArray.push(middag);
        
        tempArray.splice(index, 1);  
    }

    html += `
    
    <h3 class="dag">Mandag</h3>
    <h2 class="rett">${resultArray[0].navn}</h2>
    <h3 class="dag">Tirsdag</h3>
    <h2 class="rett">${resultArray[1].navn}</h2>
    <h3 class="dag">Onsdag</h3>
    <h2 class="rett">${resultArray[2].navn}</h2>
    <h3 class="dag">Torsdag</h3>
    <h2 class="rett">${resultArray[3].navn}</h2>
    <h3 class="dag">Fredag</h3>
    <h2 class="rett">${resultArray[4].navn}</h2>
    <h3 class="dag">Lørdag</h3>
    <h2 class="rett">${resultArray[5].navn}</h2>
    <h3 class="dag">Søndag</h3>
    <h2 class="rett">${resultArray[6].navn}</h2>
    
    <section id="handling">
            <button id="print">Skriv ut ukeplan</button>
            <div id="mail_wrap">
                <button type="submit" id="btnMail">Send til:</button>
                <input type="email" title="Skriv inn epostadresse" id="inpMail">
            </div>
    </section>
    
    `

    ukesplan.innerHTML = html;
    console.log(resultArray);
    
}


const genButton = document.getElementById("genererBtn");
genButton.addEventListener("click", generateRandom);
