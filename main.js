
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
    
    <h3>Mandag</h3>
    <h2>${resultArray[0].navn}</h2>
    <h3>Tirsdag</h3>
    <h2>${resultArray[1].navn}</h2>
    <h3>Onsdag</h3>
    <h2>${resultArray[2].navn}</h2>
    <h3>Torsdag</h3>
    <h2>${resultArray[3].navn}</h2>
    <h3>Fredag</h3>
    <h2>${resultArray[4].navn}</h2>
    <h3>Lørdag</h3>
    <h2>${resultArray[5].navn}</h2>
    <h3>Søndag</h3>
    <h2>${resultArray[6].navn}</h2>
    `

    ukesplan.innerHTML = html;
    console.log(resultArray);
    
}


const genButton = document.getElementById("genererBtn");
genButton.addEventListener("click", generateRandom);
