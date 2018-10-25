const {Client} = require('../models');
const createJson = require('./test');

module.exports = {
  async index (req, res) {
    try {
      let clients = null
      const search = req.query.search
      if (search) {
        clients = await Client.findAll({
          where: {
            $or: [
              'nom', 'email', 'forfait', 'domaine', 'telephoneEntreprise'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        clients = await Client.findAll({
          limit: 99999
        })
      }
      res.send(clients)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the clients'
      })
    }
  },
  async show (req, res) {
    try {
      const client = await Client.findById(req.params.clientId)
      res.send(client)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the clients'
      })
    }
  },
  async post (req, res) {
    try {
      const client = await Client.create(req.body);
      // createJson.replaceClientInfo(client);
      await createJson.createJsonFile(client);
      await res.send(client);
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the client'
      })
    }
  },
  async put (req, res) {
    try {
      await Client.update(req.body, {
        where: {
          id: req.params.clientId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the client'
      })
    }
  }
}

