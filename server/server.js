// --------------------------------------------------
//  Server
// --------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const app = express();

//Server PORT
const PORT = 4300;

app.use(bodyParser.json());

//Cors handling
app.use(cors());

//Use API
app.use('/api', api);

//Start Server
app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
});

module.exports = app