const express = require('express');
const path = require('path');
const UserModel = require('../models/user');

module.exports.SignUp = (req, res, next)=>
{
    const {username, password, first, last, email, profileImage} = req.body;

    if(!username || !password || !first || !email )
    {
        return res.status(400).json(
            {
                message: "Required field is missing."
            }
        )
    }
}

module.exports.Login = (req, res, next)=>
{
    const {username, password} = req.body;

}