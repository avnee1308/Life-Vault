require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const PORT = 4444;
const app = express();
const UserRoute = require('./routes/user.routes');
const AssetRoute = require('./routes/asset.routes');
const DocumentRoute = require('./routes/document.routes');
const ServiceRoute = require('./routes/service.routes');
const { mongoose } = require('mongoose');

dotenv.config();

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', UserRoute);
app.use('/asset', AssetRoute);
app.use('/document', DocumentRoute);
app.use("/service", ServiceRoute);

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