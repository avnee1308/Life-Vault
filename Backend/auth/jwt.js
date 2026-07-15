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

function getTokenThroughAuthenticationHeader(req, res) 
{
    const authHeader = req.headers['authorization'] || req.get('Authorization');

    if (!authHeader) 
    {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    const parts = authHeader.split(' ');

    if (parts.length === 2 && parts[0] === 'Bearer') 
    {
        const token = parts[1];
        return token;
    } 
    else 
    {
        return res.status(401).json({ error: 'Header format must be Bearer <token>' });
    }
}

module.exports.verifyTokenAndAuthenticateUser = async (req, res, next) => 
{
    let token = getTokenThroughAuthenticationHeader(req, res);

    console.log("Authorization Header:", req.headers.authorization);
    console.log("Extracted Token:", token);

    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { username, email } = decoded;
    if (!username || !email) {
        return res.status(400).json(
        {
            message: "Username or email missing, incorrect JWT"
        })
    }

    try 
    {
        let user = await UserModel.findOne(
        {
            "profile.username": username
        });

        if (!user) 
        {
            return res.status(400).json(
            {
                message: "User not found, JWT error"
            })
        }

        req.user = user;
        next();
    } 
    catch (error) 
    {
        return res.status(500).json(
        {
            message: "Contact admin, db not available to access users",
            error
        })
    }
}

module.exports.getTokenThroughAuthenticationHeader = getTokenThroughAuthenticationHeader;