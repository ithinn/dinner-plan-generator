
//Alle checkbokser i filterseksjonen. 
//Trykker du enter: endre status for checkboxen
//Hvis checkboksen ikke er sjekka fra før, kaller du også checked if checked. 
// Den går gjennom alle checkboksene og sjekker om de er sjekka. Hvis de er det, dukker det opp et element i tabSek
filt.addEventListener("keydown", (e) => {
    
    if (e.target.nodeName = "INPUT") {
        
        if (e.key === "Escape") {
            toggleFiltBtn();
        }

        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.checked) {
                e.target.checked = false;
                
            } else if (!e.target.checked) {
                e.target.checked = true;
                checkIfChecked();
                applyFilter();          
            }
        } 
    } 
    
    if (e.target.nodeName = "DIV") {
        if (e.key === "Escape") {
            toggleFiltBtn();
        }
    }
})


//Legger lytter på alle labler i tagSek
//Kaller removeFilter. Den endrer status på checkboxen til false, og fjerner labelen. 
tagSek.addEventListener("click", (e) => {
    if(e.target.nodeName === "LABEL") {
        removeFilter(e);
        }
})

tagSek.addEventListener("keydown", (e) => {
    if(e.target.nodeName === "LABEL") {
        if(e.key === "Enter") {
            removeFilter(e);
        }
    }
})


//Legger lytter på lukk-filter-knappen
//Kaller toggleFiltBtn, som unchecker #cb, og dermed fjerner filterseksjonen
//Setter fokus til filter_label

exitFilterBtn.addEventListener("click", (e) => {
    toggleFiltBtn();
    rightFocus("#filter_label");
    }
    );

filtLab.addEventListener("keydown", (e) => {
    e.preventDefault();
    
    if (e.key === "Enter") {
        toggleFiltBtn();

    } else if (e.shiftKey && e.key === "Tab") {
        rightFocus(".filt-tag");

    }else if (e.key === "Tab") {
        rightFocus(".change-btn")
    }      
})