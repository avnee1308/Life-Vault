const express = require('express');
const PORT = 4444;
const app = express();
const UserRoute = require('./routes/user.routes');

app.use(express.urlencoded({extended:true}));

app.use('/user', UserRoute);

app.listen(PORT, ()=>
{
    console.log("http://localhost:"+PORT);
})