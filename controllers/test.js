const fs = require('fs');
var request = require('request');

// dropbox


var dropboxAccessToken = "krIEyXFB2bAAAAAAAAOQ4YyRWhnhD-zuVKFS3JNhfPOy8piAJbtR_OYzwUAnWP6I";
var dropboxOptions = null;


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
var newfileName = null;
var nomEntreprise = null;
var date = null;

function processTel(numero) {
    let processed = "(" + numero.slice(0, 3) + ") " + numero.slice(3, 6) + "-" + numero.slice(6, 10);
    return processed
}

function replaceInfo(str, info) {
    var infoDefault = {

        "title": /entreprise\.nom/g,
        "tel1": /entreprise\.telephone1/g,
        "tel2": /entreprise\.telephone2/g,
        "email1": /entreprise\.email1/g,
        "email2": /entreprise\.email2/g,
        "adresse": /entreprise\.adresse/g,
        "age": /formulaire\.age/g,
        "clientsSatisfaits": /formulaire\.clientsSatisfaits/g,
        "employes": /formulaire\.employes/g,
        "diversQuantite": /formulaire\.diversQuantite/g,
        "diversQuantiteNom": /formulaire\.diversQNom/g,
        "servicesVedettesNom": [/servicesVedettes0nom/g, /servicesVedettes1nom/g, /servicesVedettes2nom/g, /servicesVedettes3nom/g, /servicesVedettes4nom/g, /servicesVedettes5nom/g],
        "servicesVedettesDetail": [/servicesVedettes0detail/g, /servicesVedettes1detail/g, /servicesVedettes2detail/g, /servicesVedettes3detail/g, /servicesVedettes4detail/g, /servicesVedettes5detail/g],
        "slogan": /formulaire\.slogan/g
    }

    nomEntreprise = info.entreprise.nom;

    var modif1 = str.replace(infoDefault.title, info.entreprise.nom);
    var modif2 = modif1.replace(infoDefault.tel1, processTel(info.entreprise.telephone1));
    var modif3 = modif2.replace(infoDefault.tel2, processTel(info.entreprise.telephone2));
    var modif4 = modif3.replace(infoDefault.email1, info.entreprise.email1);
    var modif5 = modif4.replace(infoDefault.email2, info.entreprise.email2);
    var modif6 = modif5.replace(infoDefault.adresse, info.entreprise.adresse);
    var modif7 = modif6.replace(infoDefault.age, info.formulaire.age);
    var modif8 = modif7.replace(infoDefault.clientsSatisfaits, info.formulaire.clientsSatisfaits);
    var modif9 = modif8.replace(infoDefault.employes, info.formulaire.employes);
    var modif10 = modif9.replace(infoDefault.diversQuantite, info.formulaire.diversQuantite);
    var modif11 = modif10.replace(infoDefault.diversQuantiteNom, info.formulaire.diversQuantiteNom);
    var modifx = modif11.replace(infoDefault.slogan, info.formulaire.slogan);

    for (let i = 0; i < info.formulaire.servicesVedettes.length; i++) {
        nomModif = modifx.replace(infoDefault.servicesVedettesNom[i], info.formulaire.servicesVedettes[i].nom);
        modifx = nomModif.replace(infoDefault.servicesVedettesDetail[i], info.formulaire.servicesVedettes[i].detail);
    }

    modifiedStringABC = modifx;
    objectData[Object.keys(objectData)[0]] = modifiedStringABC;
}

function sort(array, expression) {

    for (i = 0; i < array.length; i++) {
        if (expression.test(array[i])) {
            sortedFinal.push(array[i]);
        }
    }
}

function reJoin(array) {
    for (i = 1; i < array.length; i += 2) {
        let concatString = array[i].concat(array[i + 1]);
        cleanedModulesArray.push(concatString);
    }
}

function finished(err) {
    console.log('file created !');
}


module.exports = {



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
        var modulesArray = data.vente.modulesChoisis;
        // var modulesArray = ["A1-A", "A2"];
        var joinedArray = modulesArray.join("|");
        var modifiedArray = "module_(?:" + joinedArray + ")";
        var expression = new RegExp(modifiedArray);
        var str = objectData[Object.keys(objectData)[0]];

        // const expression = /module_(?:A1-A|A2)/;
        replaceInfo(str, data);

        var splitModules = modifiedStringABC.split(/(\[et_pb_section)/);

        reJoin(splitModules);

        sort(cleanedModulesArray, expression);

        var finalString = sortedFinal.join("");

        objectData[Object.keys(objectData)[0]] = finalString;

        // var newFile = JSON.stringify(templateObject, null, 2);
        var dropBoxFile = JSON.stringify(templateObject, null, 2);

        date = new Date();
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };

        let timeColon = date.toLocaleDateString("en-US", options);
        let time = timeColon.replace(':', 'h');

        newfileName = nomEntreprise + " " + time + ".json";


        dropboxOptions = {
            method: "POST",
            url: 'https://content.dropboxapi.com/2/files/upload',
            headers: {
                "Content-Type": "application/octet-stream",
                "Authorization": "Bearer " + dropboxAccessToken,
                "Dropbox-API-Arg": "{\"path\": \"/NetBlB - moi/Production/PagesClients/" + newfileName + "\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
            },
            body: dropBoxFile
        };


        request(dropboxOptions, function (err, res, body) {
            console.log("Err : " + err);
            console.log("res : " + res);
            console.log("body : " + body);
        });

        // fs.writeFile(newfileName, newFile, finished);
    }
}