
//Dette virker - genrerate random

    //Går gjennom dagene i uka, henter random rett fra hhv testArray, fredagsmiddag og sondagsmiddag, og pusher test-array inn på hverdagene.
    for (let i=0; i < dager.length; i++) {
        
        //Hverdagsmiddager
        indexHverdag = Math.floor(Math.random()*testArr.length);
        hverdagsmiddag= testArr[indexHverdag];
        
        //Fredagsmiddag
        indexFredag = Math.floor(Math.random()*fredagsmiddag.length);
        fre = fredagsmiddag[indexFredag];
        
        //sondagsmiddag
        indexSon = Math.floor(Math.random()*sondagsmiddag.length);
        son = sondagsmiddag[indexSon];

        resultArray.push(hverdagsmiddag);

       // console.log(resultArray);
        testArr.splice(indexHverdag, 1);
    }
    console.log(resultArray);
    console.log(fre);
    console.log(son);

    // resultArray.forEach(el => {
    //     if(el.kjottRodt === true) {
    //         seFilter.innerHTML = `<input type="checkbox" checked id="kjott" class="showFilter" title="Velg kjøtt">
    //     <label class="cbLabel type" for="kjott">Kjøtt</label>`
    //     } else if (el.fisk === true) {
    //         seFilter.innerHTML = `<input type="checkbox" checked id="fisk" class="showFilter" title="Velg kjøtt">
    //         <label class="cbLabel type" for="fisk">Fisk</label>`

    //     }
    // })
    
    html += `
    <article id="1" class="dagWrap">
    <h3 class="dag">Mandag</h3>
    <h2 class="rett">${resultArray[0].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[0].tid}</div>
        <div class="price">${resultArray[0].pris}</div>
    </div>
    <button id="btn1" class="bytt">Bytt rett</button>
    </article>
    
    <article id="2" class="dagWrap">
    <h3 class="dag">Tirsdag</h3>
    <h2 class="rett">${resultArray[1].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[1].tid}</div>
        <div class="price">${resultArray[1].pris}</div>
    </div>
    <button id="btn2" class="bytt">Bytt rett</button>
    </article>

    <article id="3" class="dagWrap">
    <h3 class="dag">Onsdag</h3>
    <h2 class="rett">${resultArray[2].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[2].tid}</div>
        <div class="price">${resultArray[2].pris}</div>
    </div>
    <button id="btn3" class="bytt">Bytt rett</button>
    </article>

    <article id="4" class="dagWrap">
    <h3 class="dag">Torsdag</h3>
    <h2 class="rett">${resultArray[3].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[3].tid}</div>
        <div class="price">${resultArray[3].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article id="5" class="dagWrap">
    <h3 class="dag">Fredag</h3>
    <h2 class="rett">${fre.navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${fre.tid}</div>
        <div class="price">${fre.pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article id="6" class="dagWrap">
    <h3 class="dag">Lørdag</h3>
    <h2 class="rett">${resultArray[4].navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${resultArray[4].tid}</div>
        <div class="price">${resultArray[4].pris}</div>
    </div>
    <button class="bytt">Bytt rett</button>
    </article>

    <article id="7" class="dagWrap">
    <h3 class="dag">Søndag</h3>
    <h2 class="rett">${son.navn}</h2>
    <div class="icon_wrap">
        <div class="clock">${son.tid}</div>
        <div class="price">${son.pris}</div>
    </div>
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