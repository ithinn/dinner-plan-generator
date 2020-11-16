const filterInn = (arr) => {
    filteredArray = arr;
    freFilt = fredagsmiddag;
    sonFilt = sondagsmiddag;
    let meatArray = [];
    let meatArrayfre = [];
    let meatArraysun = [];
    let fishArray = [];
    let fishArrayfre = [];
    let fishArraysun = [];
    let vegArray = [];
    let vegArrayfre = [];
    let vegArraysun = [];
    let tempArray = [];
    let tag = document.querySelectorAll(".inpFilter");
   
    //Går gjennom alle tagene og sjekker om de er checked eller ikke. Hvis de er det pushes tagen inn i tempArray.
    for (let i = 0; i < tag.length; i++) {
        if (tag[i].checked) {
            tempArray.push(tag[i]);
        }
    }

    //Lager betingelser for kjøtt, fisk og vegetar, og legger dem til i filterArray, fredagsfilter og søndagsfilter
    for (let i= 0; i < tempArray.length; i++) {
        
        if (tempArray[i].id === "kjott") {
            const meat = item => item.kjottRodt === true && !item.fredag && !item.søndag;
            meatArray = filter(meat, middager);    
            
            const meatFri = item => item.kjottRodt === true && item.fredag;
            meatArrayfre = filter(meatFri, middager)
            
            const meatSun = item => item.kjottRodt === true && item.søndag;
            meatArraysun = filter(meatSun, middager);
            
            
        } else if (tempArray[i].id === "fisk") {
            const fish = item => item.fisk === true && !item.fredag && !item.søndag;
            fishArray = filter(fish, middager);    
            
            const fishFri = item => item.fisk === true && item.fredag;
            fishArrayfre = filter(fishFri, middager)
            
            const fishSun = item => item.fisk === true && item.søndag;
            fishArraysun = filter(fishSun, middager);
            

        } else if (tempArray[i].id === "vegetar") {
                
            const veg = item => item.vegetar === true && !item.fredag && !item.søndag;
            vegArray = filter(veg, middager);    
            
            const vegFri = item => item.vegetar === true && item.fredag;
            vegArrayfre = filter(vegFri, middager)
            
            const vegSun = item => item.vegetar === true && item.søndag;
            vegArraysun = filter(vegSun, middager);
            
            
        }  
            filteredArray = [].concat(meatArray, fishArray, vegArray);
            freFilt = [].concat(meatArrayfre, fishArrayfre, vegArrayfre);
            sonFilt = [].concat(meatArraysun, fishArraysun, vegArraysun);
        } 

}

//filterInn(middager);
filt.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT") {
        applyFilter(e);
        console.log("klikka");
        }
    })