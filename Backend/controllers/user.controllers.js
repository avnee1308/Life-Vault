const express = require('express');
const path = require('path');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const {createToken} = require('../auth/jwt')

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

    const CheckEmail = await UserModel.findOne({ "contact.email": email });
    const CheckUsername = await UserModel.findOne({ "profile.username": username });

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
                profile:
                {
                    username,
                    name:
                    {
                        first,
                        last: last || ""
                    },
                    profileImage: profileImage || undefined
                },

                password,

                contact:
                {
                    email
                }
            }
        );

        return res.status(201).json(
            {
                message: "Signed up successfully!",
                User:
                {
                    profileImage: User.profile.profileImage,
                    username: User.profile.username,
                    first: User.profile.name.first,
                    last: User.profile.name.last,
                    email: User.contact.email
                }
            }
        )
    }
    catch(error)
    {
        return res.status(500).json(
            {
                message: error.message,
                error
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
                { "contact.email": identifier },
                { "profile.username": identifier }
            ]
        });

        if(user)
        {
            const Match = await bcrypt.compare(password, user.password);

            if(Match)
            {
                const JWTtoken = createToken(
                    {
                        username: user.profile.username,
                        email : user.contact.email
                    }
                )

                return res.status(200).json(
                    {
                        message: "Logged in succesfully",
                        token: JWTtoken
                    }
                )
            }

            return res.status(401).json(
                {
                    message: "Invalid credentials"
                }
            )
        }

        return res.status(401).json(
            {
                message: "Invalid credentials"
            }
        );

    } catch (error)
    {
        return res.status(500).json(
        {
            message: error.message,
            error
        }
        )
    }
}