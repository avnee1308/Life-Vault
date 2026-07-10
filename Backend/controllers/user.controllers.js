const express = require('express');
const path = require('path');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');

module.exports.SignUp = async (req, res, next)=>
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

    const CheckEmail = await UserModel.findOne({email});
    const CheckUsername = await UserModel.findOne({username});

    if(CheckEmail || CheckUsername)
    {
        return res.status(409).json(
            {
                message: "An account with this email or username already exists"
            }
        )
    }

    try
    {
        const User = await UserModel.create(
            {
                username,
                password,
                first,
                last: last || "",
                email,
                profileImage
            }
        )
        return res.status(201).json(
            {
                message: "Signed up successfully!",
                User:
                {
                    profileImage,
                    username,
                    first,
                    last,
                    email
                }
            }
        )
    }
    catch(error)
    {
        return res.status(500).json(
            {
                message: "Failed to create account.Please try again later."
            }
        )
    }
}

module.exports.Login = async (req, res, next)=>
{
    const {identifier, password} = req.body;

    if(!identifier || !password)
    {
        return res.status(400).json(
            {
                message: "username or password is missing"
            }
        )
    }

    try {
        const user = await UserModel.findOne({
            $or: 
            [
                { email: identifier },
                { username: identifier }
            ]
        });
    
        if(user)
        {
            const Match = await bcrypt.compare(password, user.password);
    
            if(Match)
            {
                const JWTtoken = createToken(
                    {
                        username: user.username,
                        email : user.email
                    }
                )
                return res.status(200).json(
                    {
                        message: "Logged in succesfully",
                        token
                    }
                )
            }
            return res.status(401).json(
                {
                    message: "Invalid credentials"
                }
            )
        }
    } catch (error) 
    {
        return res.status(500).json(
        {
            error
        }
        )
    }
}