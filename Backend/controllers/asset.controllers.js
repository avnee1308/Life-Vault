const express = require('express');
const path = require('path');
const AssetModel = require('../models/asset');

module.exports.createAsset = async (req, res, next)=>
{
    const {assetName, assetImage, assetCategory, purchasePrice, boughtOn, brand, model, description, location} = req.body;

    if(!assetName)
    {
        return res.status(400).json(
            {
                message: "Name is a required field :P"
            }
        )
    }

    try
    {
        let asset = await AssetModel.create(
            {
                owner: req.user._id,
                basic: 
                {
                    assetName,
                    assetImage,
                    assetCategory,
                    purchasePrice,
                    boughtOn
                },
                specifications: 
                {
                    brand,
                    model,
                    description,
                    location
                }
            }
            )
         return res.status(201).json(
                {
                    message: "Asset added successfully !",
                    // asset:
                    // {
                    //     assetImage,
                    //     assetName
                    // }
                    asset
                })
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

module.exports.getAssets = async (req, res, next)=>
{
    try
    {
        const allAssets = await AssetModel.find({owner: req.user._id});
        if(allAssets.length===0)
        {
            return res.status(200).json(
                {
                    message:"No assets :(",
                    allAssets
                }
            )
        }
        return res.status(200).json(
            {
                allAssets
            }
        )
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

module.exports.updateAsset = async (req,res,next)=>
{
    const { id } = req.params;
    const {assetName, assetImage, assetCategory, purchasePrice, boughtOn, brand, model, description, location} = req.body;

    if (!id) 
    {
        return res.status(400).json({
            message: "Please provide ID to update the asset"
        })
    }

    try 
    {
        const editAsset = await AssetModel.findOne({_id:id, owner:req.user._id});

        editAsset.basic.assetName = assetName ?? editAsset.basic.assetName;
        editAsset.basic.assetImage = assetImage ?? editAsset.basic.assetImage;
        editAsset.basic.assetCategory = assetCategory ?? editAsset.basic.assetCategory;
        editAsset.basic.purchasePrice = purchasePrice ?? editAsset.basic.purchasePrice;
        editAsset.basic.boughtOn = boughtOn ?? editAsset.basic.boughtOn;
        editAsset.specifications.brand = brand ?? editAsset.specifications.brand;
        editAsset.specifications.model = model ?? editAsset.specifications.model;
        editAsset.specifications.description = description ?? editAsset.specifications.description;
        editAsset.specifications.location = location ?? editAsset.specifications.location;

        await editAsset.save();

        res.status(200).json(
        {
            message: "Asset updated successfully"
        })
    } 
    catch (error) 
    {
         res.status(500).json(
        {
            message: error.message,
            error
        })
    }
}

module.exports.deleteAsset = async (req, res, next)=>
{
    const { id } = req.params;
    if (!id) 
    {
        return res.status(400).json({
            message: "Please provide ID to delete an asset"
        })
    }
    try 
    {
        await AssetModel.deleteOne({_id: id, owner: req.user._id})

        res.status(200).json(
        {
            message: "Asset deleted successfully"
        })
    } 
    catch (error) 
    {
        res.status(500).json(
        {
            message: error.message,
            error
        })
    }
}

module.exports.viewAsset = async (req, res, next)=>
{
    const { id } = req.params;
    try 
    {
        let asset = await AssetModel.findOne(
        {
            _id: id,
            owner: req.user._id
        });


        if (!asset) return res.status(404).json(
        {
            message: "Asset not found"
        })

        return res.status(200).json(
        {
            asset
        })
    }
    catch (error) 
    {
        return res.status(500).json(
        {
            message: error.message,
            error
        })
    }
}
