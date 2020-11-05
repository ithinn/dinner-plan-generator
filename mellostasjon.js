    const algoritme = (arr) => {
        //Velg mat som tar under 30 minutter å lage på hverdager
        const t = item => item.tid === 1 || item.tid === 2 && item.fredag===false && item.søndag === false;
        tempArr = filter(t, arr);
    

    // //Jeg vil heller ikke at den henter ut oppskrifter som er fredags eller søndagsmat på hverdager
        const ingenKoseMat = item => item.fredag === false || item.søndag === false;
        tempArr = filter(ingenKoseMat, tempArr);
    }
    
    
    