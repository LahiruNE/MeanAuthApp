const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users= require('./routes/users');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Connected to the databse " + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("Database error " + err);
});

const app = express();

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.use('/users', users);

app.get('/', (req,res)=>{
    res.send("Hukazzz v1.002");
});

app.listen(port, () => {
    console.log("Server started on port"+port);
});