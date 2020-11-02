
//Dette virker - random
for (let i=0; i < hverdager.length; i++) {
        
    index = Math.floor(Math.random()*tempArray.length);
    middag= tempArray[index];

    //if(middag.fredag === false && middag.søndag===false) {
    
    resultArray.push(middag);
    tempArray.splice(index, 1);  

}
