const fs = require('fs');
var cleanedModulesArray = [];
var sortedFinal = [];
var modulesArray = [];
var joinedArray = null;
var modifiedArray = null;
var expression = null;
var fileName = "pageModules.json";
var templateData = fs.readFileSync(fileName);
var templateObject = JSON.parse(templateData);
var objectData = templateObject.data;
var modifiedStringABC = "";
var nom = null;
var detail = null;
var nomModif = null;

function replaceInfo(str, info) {
    var infoDefault = {

        "title": /entreprise\.nom/g,
        "tel1": /entreprise\.telephone1/g,
        "tel2": /entreprise\.telephone2/g,
        "email1": /entreprise\.email1/g,
        "email2": /entreprise\.email2/g,
        "adresse": /entreprise\.adresse/g,
        "servicesVedettesNom": [ /servicesVedettes0nom/g, /servicesVedettes1nom/g, /servicesVedettes2nom/g, /servicesVedettes3nom/g, /servicesVedettes4nom/g, /servicesVedettes5nom/g ],
        "servicesVedettesDetail": [ /servicesVedettes0detail/g, /servicesVedettes1detail/g, /servicesVedettes2detail/g, /servicesVedettes3detail/g, /servicesVedettes4detail/g, /servicesVedettes5detail/g ],
        "slogan": /formulaire\.slogan/g
    }
    console.log("replaceInfo function");
    var modif1 = str.replace(infoDefault.title, info.entreprise.nom);
    var modif2 = modif1.replace(infoDefault.tel1, info.entreprise.telephone1);
    var modif3 = modif2.replace(infoDefault.tel2, info.entreprise.telephone2);
    var modif4 = modif3.replace(infoDefault.email1, info.entreprise.email1);
    var modif5 = modif4.replace(infoDefault.email2, info.entreprise.email2);
    var modif6 = modif5.replace(infoDefault.adresse, info.entreprise.adresse);
    var modifx = modif6.replace(infoDefault.slogan, info.formulaire.slogan);

    for (let i = 0; i < info.formulaire.servicesVedettes.length; i++) {
         nomModif = modifx.replace(infoDefault.servicesVedettesNom[i], info.formulaire.servicesVedettes[i].nom);
         modifx = nomModif.replace(infoDefault.servicesVedettesDetail[i], info.formulaire.servicesVedettes[i].detail);
    }

    modifiedStringABC = modifx;
    objectData[Object.keys(objectData)[0]] = modifiedStringABC;
}

function sort(array, expression) {
    console.log("sort function");

    for (i = 0; i < array.length; i++) {
        if (expression.test(array[i])) {
            sortedFinal.push(array[i]);
        }
    }
    console.log("sort over");
}

function reJoin(array) {
    console.log("rejoin function");
    for (i = 1; i < array.length; i += 2) {
        let concatString = array[i].concat(array[i + 1]);
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


    createJsonFile(data) {
        console.log("modulesArray");
        console.log(data.vente.modulesChoisis);
        var modulesArray = data.vente.modulesChoisis;
        // var modulesArray = ["A1-A", "A2"];
        var joinedArray = modulesArray.join("|");
        var modifiedArray = "module_(?:" + joinedArray + ")";
        var expression = new RegExp(modifiedArray);
        console.log("createJsonFile function");
        var str = objectData[Object.keys(objectData)[0]];

        // const expression = /module_(?:A1-A|A2)/;
        replaceInfo(str, data);

        var splitModules = modifiedStringABC.split(/(\[et_pb_section)/);

        reJoin(splitModules);

        sort(cleanedModulesArray, expression);

        var finalString = sortedFinal.join("");

        objectData[Object.keys(objectData)[0]] = finalString;

        var newFile = JSON.stringify(templateObject, null, 2)

        fs.writeFile('clientPage.json', newFile, finished);
    }
}