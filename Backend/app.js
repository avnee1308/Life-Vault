require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const PORT = 4444;
const app = express();
const UserRoute = require('./routes/user.routes');
const AssetRoute = require('./routes/asset.routes');
const { mongoose } = require('mongoose');

dotenv.config();

app.use(express.urlencoded({extended:true}));

app.use('/user', UserRoute);
app.use('/asset', AssetRoute);

mongoose.connect('mongodb://localhost:27017/LifeVault')
    .then(() => 
    {
        app.listen(PORT, ()=>
        {
            console.log("http://localhost:"+PORT);
        })
    })
    .catch(err => 
    {
        console.log(err);
    })