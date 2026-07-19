const mongoose = require("mongoose");
const { Schema } = mongoose;
// const UserModel = require('../models/user');

const AssetSchema = new mongoose.Schema(
    {
        owner:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        basic:
        {
            assetName:
            {
                type: String,
                required: true
            },
            assetImage:
            {
                type: String
            },
            assetCategory:
            {
                type: String,
                enum:
            [
                "Electronics",
                "Computers",
                "Mobile Devices",
                "Home Appliances",
                "Furniture",
                "Kitchen Appliances",
                "Kitchenware",
                "Vehicles",
                "Clothing",
                "Footwear",
                "Jewellery",
                "Watches",
                "Books",
                "Documents",
                "Tools",
                "Sports Equipment",
                "Musical Instruments",
                "Gaming",
                "Photography",
                "Medical Equipment",
                "Health & Fitness",
                "Baby Products",
                "Office Equipment",
                "Garden Equipment",
                "Travel Gear",
                "Collectibles",
                "Home Decor",
                "Subscriptions",
                "Insurance Policies",
                "Other"
            ]
                //change to enum 
                // once i have a set list of categories
            },
            purchasePrice:
            {
                type:  Number
                // making this local specific rn
                // default value will be in INR currency only
            },
            boughtOn:
            {
                type: Date
            }
        },
        specifications:
        {
            brand:
            {
                type: String
            },
            model:
            {
                type: String
            },
            description:
            {
                type: String
            },
            location:
            {
                type: String
            }

        }
        // Repairs:
        // {
        //     // would prefer to have an array type object stored in this field
        //     // that object would further contain all the details about the repair
        //     // or i could simply link that object to the info from my repair tab that i'm yet to make
        //     type: Date
        // },
        // Documents field but i want to link it to the documents tab, not sure how to do that
        // same with warranty
        // same with insurance, reminders, etc

    }
)

module.exports = mongoose.model("Asset", AssetSchema);