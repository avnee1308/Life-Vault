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

module.exports.getAssets = async (req, res, next) => 
{
    try 
    {

        const {search, category, brand, location, sort} = req.query;

        const filter = 
        {
            owner: req.user._id
        };

        // Category Filter
        if (category) 
        {
            filter["basic.assetCategory"] = category;
        }

        // Brand Filter
        if (brand) 
        {
            filter["specifications.brand"] = brand;
        }

        // Location Filter
        if (location) 
        {
            filter["specifications.location"] = location;
        }

        // Search
        if (search) 
        {
            filter.$or =
            [
                {
                    "basic.assetName": 
                    {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "specifications.brand": 
                    {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "specifications.model": 
                    {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "specifications.description": 
                    {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        // Sorting
        let sortOption = {};

        switch (sort) {
            case "latest":
                sortOption = { createdAt: -1 };
                break;

            case "oldest":
                sortOption = { createdAt: 1 };
                break;

            case "name":
                sortOption = { "basic.assetName": 1 };
                break;

            case "priceLow":
                sortOption = { "basic.purchasePrice": 1 };
                break;

            case "priceHigh":
                sortOption = { "basic.purchasePrice": -1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        }

        const allAssets = await AssetModel
            .find(filter)
            .sort(sortOption);

        return res.status(200).json(
        {
            count: allAssets.length,
            allAssets
        });

    } 
    
    catch (error) 
    {

        return res.status(500).json(
        {
            message: error.message
        });

    }
};

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
