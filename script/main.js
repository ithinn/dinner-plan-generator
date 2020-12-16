//Tomme arrayer som brukes av flere funksjoner
let dinnerList = [];

//HTML-elementer
const exitFilterBtn = document.getElementById("exit_filter_btn");
const myWeekH2 = document.getElementById("dinner_plan_h2");
const mainBtn = document.getElementById("main_btn")
const dinnerPlan = document.getElementById("dinner_plan");
const filtLab = document.getElementById("filter_label");
const filt = document.getElementById("filter");
const cb = document.getElementById("cb");
const tagSek = document.getElementById("filterlabler");
const action = document.getElementById("action");
const viewSavedBtn = document.getElementById("view_saved_btn");
const dayWrap = document.getElementsByClassName("day-wrap");
let tag = document.querySelectorAll(".inp-filter");



//---------------------------------------------------------------------
//OPPRETT HTML basert på middagsliste-arrayet
//---------------------------------------------------------------------

const drawPlan = () => {
    let html = "";
    
    //Returnerer et ferdig filtrert middagsarray (middagsliste)
    fillDinnerList(filterList(), friDinner(), sunDinner());
    
    for (let i = 0; i < dinnerList.length; i++) {

        let time = showTime(dinnerList[i].time)
        
        html += `
            <article id=${i} class="day-wrap">
            <h3 class="day">${days[i].day}</h3>
            <h2 id="course_h2_${i}" class="course-h2">${dinnerList[i].course}</h2>
            <div id="i_wrap${i}" class="icon-wrap">
                <div class="clock">${time}</div>
            </div>
            <button tabindex=0 id="btn${i}" class="change-btn">Bytt rett</button>
            </article>
            ` 
    }

    let html_action = `
        <button id="save_btn">Lagre</button>
        <input aria-label="Email-adress" type="email" id="mail" placeholder="Skriv din epost-adresse">
        <button type="submit" id="send_mail">Send ukesplan</button>
        `

    dinnerPlan.innerHTML = html;
    action.innerHTML = html_action;
    
    mainBtn.style.display = "none";
    filtLab.style.display = "block";
    viewSavedBtn.style.display = "none";
    
    //Lyttere til "Lagre" og "Send ukesplan"-button
    const send = document.getElementById("send_mail");
    send.addEventListener("click", alertMail);

    const save = document.getElementById("save_btn");
    save.addEventListener("click", saveLocal);
}


//Lytter - drawPlan
mainBtn.addEventListener("click", () => {
    drawPlan();
})



//----------------------------------------------------------------------------------------------
//FYLL MIDDAGSLISTE - Fyller et middagsarray med en rett per dag.
//----------------------------------------------------------------------------------------------

const fillDinnerList = (array, arrayFre, arraySun) => {
    let tempArr = array;
    dinnerList = [];

    //Jeg vil at den i utgangspunktet bare skal hente ut oppskrifter som tar under en halvtime, og som ikke er fredags/søndagsmat.
    const course = item => item.time === 1 || item.time === 2 && item.friday===false && item.sunday === false;
    tempArr = filter(course, array);


    //Push inn hverdagsretter
    for (let i = 0; i <= 4; i++) {
        let index = randomIndex(tempArr);
        let dinner = tempArr[index];
        dinnerList.push(dinner)
        tempArr.splice(index, 1);
    }

    //Push inn fredagsmiddag
    let i = randomIndex(arrayFre);
    let fDinner = arrayFre[i];
    dinnerList.splice(4, 0, fDinner);
    arrayFre.splice(i, 1);

    //Push inn søndagsmiddag
    let s = randomIndex(arraySun);
    let sDinner = arraySun[s];
    dinnerList.splice(6, 0, sDinner);
    arraySun.splice(s, 1);

    //Sjekker om bruker har ekstra dårlig tid noen dager, og bytter i såfall ut de aktuelle middagene. 
    fastFoodFilter();

    return dinnerList;
}


//---------------------------------------------------------------
//ENDRER RETT NÅR DU TRYKKER "BYTT-RETT"-KNAPPEN
//---------------------------------------------------------------
const changeCourse = e => {
    let html;
    let weekdayArr = filterList();
    let friArr = friDinner();
    let sunArr = sunDinner();
    let checkedInputs = tagCheck();
    let fastFoodArr = fastFood();
    let btnId = Number(e.target.id.slice(-1));
    let newCourse = "";
    let newCourseFri = "";
    let newCourseSun = ""
    
    //Velger mat som tar under 30 minutter å lage på hverdager
    //Utelukker oppskrifter som er fredags eller søndagsmat på hverdager
    const course = item => item.time === 1 || item.time === 2 && item.friday===false && item.sunday === false;
    weekdayArr = filter(course, weekdayArr);


    //Plukker ut nye indexer fra diverse arrayer
    let index = randomIndex(fastFoodArr);
    let newWeekIndex = randomIndex(weekdayArr);
    let newFriIndex = randomIndex(friArr);
    let newSonIndex = randomIndex(sunArr);
    
    //Sjekker om det noen filter er sjekket av, og om de i såfall er dager med dårlig tid.
    //Definerer newCourse, newCourseFri og newCourseSun. 
    if (checkedInputs.length > 0) {
        
        checkedInputs.forEach(el=> {
            if(el.id === "mandag" || el.id === "tirsdag" || el.id === "onsdag" || el.id === "torsdag" || el.id === "fredag" || el.id === "lørdag" || el.id === "søndag") {
                
                newCourse = fastFoodArr[index];
                fastFoodArr.splice(newCourse, 1);
                
                newCourseFri = fastFoodArr[index];
                fastFoodArr.splice(newCourseFri, 1);

                newCourseSun = fastFoodArr[index];
                fastFoodArr.splice(newCourseSun, 1);

            } else {

                newCourse = weekdayArr[newWeekIndex];
                weekdayArr.splice(newCourse, 1);

                newCourseFri = friArr[newFriIndex];
                friArr.splice(newCourseFri);

                newCourseSun = sunArr[newSonIndex];
                sunArr.splice(newCourseSun);

            }
        })

    } else {
            newCourse = weekdayArr[newWeekIndex];
            weekdayArr.splice(newCourse, 1);

            newCourseFri = friArr[newFriIndex];
            friArr.splice(newCourseFri);

            newCourseSun = sunArr[newSonIndex];
            sunArr.splice(newCourseSun);   
    }
    
    //Sjekker at riktig button skifter riktig rett. 
    if (btnId <=3 || btnId === 5) {
        dinnerList.splice(btnId, 1, newCourse);
    } else if (btnId === 4) {
        dinnerList.splice(btnId, 1, newCourseFri);  
    } else {
        dinnerList.splice(btnId, 1, newCourseSun);
    }

    
    //Oppretter HTML
    html = "";
    for (let i = 0; i < dinnerList.length; i++) {
        let time = showTime(dinnerList[i].time)
        
        html += `
        <article id=${i} class="day-wrap">
        <h3 class="day">${days[i].day}</h3>
        <h2 id="course_h2_${i}" class="course-h2">${dinnerList[i].course}</h2>
        <div id="i_wrap${i}" class="icon-wrap">
            <div class="clock">${time}</div>
        </div>
        <button tabindex="0" id="btn${i}" class="change-btn">Bytt rett</button>
        </article>
        `
}
    dinnerPlan.innerHTML = html;
    document.getElementById(e.target.id).focus();
}

//Lytter til endre rett
dinnerPlan.addEventListener("click", (e) => {
    if(e.target.nodeName === "BUTTON") {   
        changeCourse(e)
    }
})



//------------------------------------------------------
//LOCAL STORAGE
//------------------------------------------------------

const saveLocal = () => {
    const arrStrDinners = JSON.stringify(dinnerList);
    localStorage.setItem("Weekplan", arrStrDinners);
    alert("Din ukesplan er lagret, og vil være tilgjengelig neste gang du laster inn siden.")
}

const findLocal = () => {

    if (localStorage.getItem("Weekplan") === null) {
        console.log("Det er tomt i local");

    } else {

        let returnedStr = localStorage.getItem("Weekplan");
        let arrFromString = JSON.parse(returnedStr);

        viewSavedBtn.style.display = "block";

        viewSavedBtn.addEventListener("click", () => {
            let html = "";
            for (let i = 0; i < arrFromString.length; i++) {
                
                let time = showTime(arrFromString[i].time)

                html += `
                <article id=${i} class="day-wrap">
                <h3 class="day">${days[i].day}</h3>
                <h2 id="course_h2_${i}" class="course-h2">${arrFromString[i].course}</h2>
                <div id="i_wrap${i}" class="icon-wrap">
                    <div class="clock">${time}</div>
                    
                </div>
                <button id="btn${i}" class="change-btn">Bytt rett</button>
                </article>
                `
        }
        myWeekH2.style.display = "block";
        dinnerPlan.innerHTML = html;
        mainBtn.style.display = "none";
        viewSavedBtn.innerText = "Lag en ny ukesplan";
        viewSavedBtn.style.border = "4px solid white";
        viewSavedBtn.style.padding = "1em";
        viewSavedBtn.style.background = "#355c7d";
        viewSavedBtn.style.borderRadius = "10em";
        viewSavedBtn.addEventListener("click", reload);
        })
    }
}

window.onload = findLocal();


//--------------------------------------------------------
//SMÅFUNKSJONER
//--------------------------------------------------------

//setter tab-fokus
const rightFocus = (cName) => {
    document.querySelector(cName).focus();
} 

//Refresher til forsiden når du trykker "Lag ny ukesplan"-button
const reload = () => {
    window.scrollTo(0, 0);
    location.reload()
}

//Skifter status for "Filter"-sjekkboksen
const toggleFiltBtn = () => {
    if (cb.checked) {
        cb.checked = false;
        window.scrollTo(0, 0);
    } else if (!cb.checked) {
        cb.checked = true;
        rightFocus(".cb-label");
    }
}

//Plukker ut random index fra et array
const randomIndex = (arr) => {
    let index = Math.floor(Math.random()*arr.length)
    return index;
}

//Varsler om at epost er sendt. 
const alertMail = () => {
    alert("Ukesplanen er sendt til din epostadresse");
}

//Viser hvor mye tid matretten tar å lage
const showTime = (alt1) => {
    if (alt1 === 1) {
        return "20 minutter";
    } else if (alt1 === 2) {
        return "30 minutter";
    } else {
        return "45 minutter +"
    }  
}

//Sjekker om bruker har dårlig tid noen dager, og sørger for at den dagen får en rett det tar kort tid å lage
const fastFoodFilter = () => {
    let checkedInputs = tagCheck();
    let fastFoodArr = fastFood();

    let index = randomIndex(fastFoodArr);
    let fastCourse = fastFoodArr[index];
 
    checkedInputs.forEach(el => {
        if (el.id === "mandag") {
            dinnerList.splice(0, 1, fastCourse);
        } else if (el.id === "tirsdag") {
            dinnerList.splice(1, 1, fastCourse);
        } else if (el.id === "onsdag") {
            dinnerList.splice(2, 1, fastCourse);
        } else if (el.id === "torsdag") {
            dinnerList.splice(3, 1, fastCourse);
        } else if (el.id === "fredag") {
            dinnerList.splice(4, 1, fastCourse);
        } else if (el.id === "lørdag") {
            dinnerList.splice(5, 1, fastCourse);
        } else if (el.id === "søndag") {
            dinnerList.splice(6, 1, fastCourse);
        } 
    })
}
