const fs = require('fs');


function createJsonFile(clientObject) {

  const fileName = "pageModules.json";
  //const templateData = fs.readFileSync(fileName);
  //const templateData = clientObject;
  const templateObject = JSON.parse(templateData);
  const objectData = templateObject.data;
  const str = objectData[Object.keys(objectData)[0]];

  //  const expression = /module_(?:A1-A|A2)/;

  const modulesArray = ["A1-A", "A2"];
  const joinedArray = modulesArray.join("|");
  const modifiedArray = "module_(?:" + joinedArray + ")";
  const expression = new RegExp(modifiedArray);

  const dataString = str;
  const splitModules = dataString.split(/(\[et_pb_section)/);
  const cleanedModulesArray = [];
  const sortedFinal = [];  

  reJoin(splitModules);

  sort(cleanedModulesArray);     

  const finalString = sortedFinal.join("");

  objectData[Object.keys(objectData)[0]] = finalString;

  function sort(array) {
      
      for(i=0; i < array.length; i++) {
          if (expression.test(array[i])) {
              sortedFinal.push(array[i]);
          }


          // if (array[i].indexOf(expression) != -1) {
          //     sortedFinal.push(array[i]);
          // }
      }
  }

  function reJoin(array) {
      for (i=1; i  <array.length; i += 2) {
          let concatString = array[i].concat(array[i+1]);
          cleanedModulesArray.push(concatString);
      }
  }



  var newFile = JSON.stringify(templateObject, null, 2)

  fs.writeFile('clientPage.json', newFile, finished);

  function finished(err) {
    console.log('file created !');
  };


}

module.exports = {
  async post (req, res) {
    try {
      const client = await Client.create(req.body)
      res.send(client)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the JSON'
      })
    }
  }
}

