const fs = require('fs');
var cleanedModulesArray = [];
var sortedFinal = [];  
var modulesArray = ["A1-B", "A2"];
var joinedArray = modulesArray.join("|");
var modifiedArray = "module_(?:" + joinedArray + ")";
var expression = new RegExp(modifiedArray);
var fileName = "pageModules.json";
var templateData = fs.readFileSync(fileName);
var templateObject = JSON.parse(templateData);
var objectData = templateObject.data;
var modifiedStringABC = "";

function replaceInfo(str, info){
    var infoDefault = {

        "title": /titre principal/g,
        "tel": /8888888888/g,
        "email": /email@gmail.com/g,
        "adresse": /8888, rue du Parc, Québec G1G 1G1/g,
        "sousTitre": /sous-titre/g    
    }
    console.log("replaceInfo function");
    var modif1 = str.replace(infoDefault.email, info.email);
    var modif2 = modif1.replace(infoDefault.tel, info.telephoneEntreprise);
    console.log("test");
    // var modif3 = modif2.replace(infoDefault.email, info.email);
    // var modif4 = modif3.replace(infoDefault.adresse, info.adresse);
    // var modif5 = modif4.replace(infoDefault.sousTitre, info.sousTitre);
    modifiedStringABC = modif2;
    objectData[Object.keys(objectData)[0]] = modifiedStringABC;
}

function sort(array) {
    console.log("sort function");
            
    for(i=0; i < array.length; i++) {
        if (expression.test(array[i])) {
            sortedFinal.push(array[i]);
        }
    }
    console.log("sort over");
}

function reJoin(array) {    
    console.log("rejoin function");
    for (i=1; i  <array.length; i += 2) {
        let concatString = array[i].concat(array[i+1]);
        cleanedModulesArray.push(concatString);
    }
}

function finished(err) {
    console.log('file created !');
}


module.exports = {
    

    testFunction() {
        console.log("test function");
    },
    testFunction2() {
        console.log("test function2");
    },

    // replaceClientInfo(data) {
    //     console.log("replaceClientInfo function");
    //     var clientInfo = data.dataValues;
    //     // var infoClient = JSON.parse(fs.readFileSync('clientInfo.json'));    
    //     infoClient = clientInfo;  
    //     console.log(infoClient);  
        
    //     var fileName = "pageModules.json";
    //     var templateData = fs.readFileSync(fileName);
    //     console.log(templateData);
    //     var templateObject = JSON.parse(templateData);
    //     var objectData = templateObject.data;
    //     var stringToReplace = objectData[Object.keys(objectData)[0]]; 
    //     console.log(objectData);
            
    //     replaceInfo(stringToReplace);        
    // },


    createJsonFile (data) {
        console.log("createJsonFile function"); 
        var clientInfo = data.dataValues; 
        var infoClient = clientInfo; 
        console.log(infoClient);    
        var str = objectData[Object.keys(objectData)[0]];
        
        // const expression = /module_(?:A1-A|A2)/;
        replaceInfo(str, infoClient);     
        
        var splitModules = modifiedStringABC.split(/(\[et_pb_section)/);
        
        reJoin(splitModules);
        
        sort(cleanedModulesArray);     
        
        var finalString = sortedFinal.join("");
        
        objectData[Object.keys(objectData)[0]] = finalString;
        
        var newFile = JSON.stringify(templateObject, null, 2)
        
        fs.writeFile('clientPage.json', newFile, finished);
    }
}