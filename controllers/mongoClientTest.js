const createJson = require('./test');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:EUVDN50YLR9ForYm@clientlog01-nfxzd.mongodb.net', {
  dbName: 'Clients'
});
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  personnel: {
    nom: String,
    prenom: String,
    telephone: String,
    email: String
  },
  entreprise: {
    nom: String,
    domaine: String,
    email1: String,
    email2: String,
    telephone1: String,
    telephone2: String,
    adresse: String
  },
  formulaire: {
    servicesVedettes: Array,
    servicesTotal: Array,
    slogan: String,
    forces: Array,
    mission: String,
    distinctions: Array,
    age: Number,
    clientsSatisfaits: Number,
    employes: Number,
    diversQuantiteNom: String,
    diversQuantite: Number,
    equipement: Array,
    expertise: String,
    mediasSociaux: Array,
    heuresOuverture: Object,
    numeroLicence: String,
    accreditations: Array,
    financement: String,
    notes: String
  },
  transfert: {
    actif: Boolean,
    nomRegistraire: String,
    emailRegistraire: String,
    nomTechnicien: String,
    emailTechnicien: String,
    courrielsTransfert: Boolean,
    nombreCourriels: Number
  },
  vente: {
    nomTelephoniste: String,
    datePremierContact: String,
    nomVendeur: String,
    dateVente: String,
    forfait: String,
    fraisDepart: String,
    nombreModules: Number,
    modulesChoisis: Array
  }
}, {
  collection: 'users'
});

var UserData = mongoose.model('UserData', userDataSchema);



module.exports = {

  async get(req, res) {

    let clients = null;
    clients = await UserData.find();
    res.send(clients);
  },
  async post(req, res) {

    try {

      let client = {
        personnel: {
          nom: req.body.personnel.nom,
          prenom: req.body.personnel.prenom,
          telephone: req.body.personnel.telephone,
          email: req.body.personnel.email
        },
        entreprise: {
          nom: req.body.entreprise.nom,
          domaine: req.body.entreprise.domain,
          email1: req.body.entreprise.email1,
          email2: req.body.entreprise.email2,
          telephone1: req.body.entreprise.telephone1,
          telephone2: req.body.entreprise.telephone2,
          adresse: req.body.entreprise.adresse
        },
        formulaire: {
          servicesVedettes: req.body.formulaire.servicesVedettes,
          servicesTotal: req.body.formulaire.servicesTotal,
          slogan: req.body.formulaire.slogan,
          forces: req.body.formulaire.forces,
          mission: req.body.formulaire.mission,
          distinctions: req.body.formulaire.distinctions,
          age: req.body.formulaire.age,
          clientsSatisfaits: req.body.formulaire.clientsSatisfaits,
          employes: req.body.formulaire.employes,
          diversQuantiteNom: req.body.formulaire.diversQuantiteNom,
          diversQuantite: req.body.formulaire.diversQuantite,
          equipement: req.body.formulaire.equipement,
          expertise: req.body.formulaire.expertise,
          mediasSociaux: req.body.formulaire.mediasSociaux,
          heuresOuverture: req.body.formulaire.heuresOuverture,
          numeroLicence: req.body.formulaire.numeroLicence,
          accreditations: req.body.formulaire.accreditations,
          financement: req.body.formulaire.financement,
          notes: req.body.formulaire.notes
        },
        transfert: {
          actif: req.body.transfert.actif,
          nomRegistraire: req.body.transfert.nomRegistraire,
          emailRegistraire: req.body.transfert.emailRegistraire,
          nomTechnicien: req.body.transfert.nomTechnicien,
          emailTechnicien: req.body.transfert.emailTechnicien,
          courrielsTransfert: req.body.transfert.courrielsTransfert,
          nombreCourriels: req.body.transfert.nombreCourriels
        },
        vente: {
          nomTelephoniste: req.body.vente.nomTelephoniste,
          datePremierContact: req.body.vente.datePremierContact,
          nomVendeur: req.body.vente.nomVendeur,
          dateVente: req.body.vente.dateVente,
          forfait: req.body.vente.forfait,
          fraisDepart: req.body.vente.fraisDepart,
          nombreModules: req.body.vente.nombreModules,
          modulesChoisis: req.body.vente.modulesChoisis
        }
      }

      await createJson.createJsonFile(client);
      let data = new UserData(client);

      await data.save();

      // createJson.replaceClientInfo(client);
      // await createJson.createJsonFile(client);
      await res.send(client);

    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the client'
      })
    }

    let clients = null;
    clients = await UserData.find();
    res.send(clients);
  }

  //   async post (req, res) {
  //     try {
  //       const client = await Client.create(req.body);
  //       // createJson.replaceClientInfo(client);
  //       await createJson.createJsonFile(client);
  //       await res.send(client);
  //     } catch (err) {
  //       res.status(500).send({
  //         error: 'an error has occured trying to create the client'
  //       })
  //     }
  //   }

}