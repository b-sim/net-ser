const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {
    sequelize
} = require('./models');
const config = require('./config/config');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./passport');

require('./routes')(app);

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 8081, listening);
    });

function listening() {
    console.log(`listening on port ${config.port}...`)
}

app.use(express.static(path.join(__dirname, '../client/public')));