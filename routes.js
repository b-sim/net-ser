const AuthenticationController = require('./controllers/AuthenticationController');
const ClientsController = require('./controllers/ClientsController');
const CreatejsonController = require('./controllers/CreatejsonController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login', 
        AuthenticationController.login)
    app.get('/clients',
        isAuthenticated,
        ClientsController.index)
    app.get('/clients/:clientId',
        isAuthenticated,
        ClientsController.show)
    app.put('/clients/:clientId',
        isAuthenticated,
        ClientsController.put)
    app.post('/clients',
        isAuthenticated,
        ClientsController.post)
}