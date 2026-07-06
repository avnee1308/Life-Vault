const express = require('express');
const PORT = 4444;
const app = express();

app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>
{
    console.log("http://localhost:"+PORT);
})