const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
let jwtSecretKey = process.env.JWT_SECRET_KEY;

// Generating JWT token
module.exports.createToken= ({username, email})=>
{
    const token = jwt.sign({username, email}, jwtSecretKey);
    return token;
}


// Verification of JWT
// try 
// {
//     const token = req.header(tokenHeaderKey);

//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) 
//     {
//         return res.send("Successfully Verified");
//     } 
//     else
//     {
//         // Access Denied
//         return res.status(401).send({ error: "InvalidToken!" });
//     }
// }
// catch (error) 
// {
//     // Access Denied
//     return res.status(401).send({ error: error.message });
// }