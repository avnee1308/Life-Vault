const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema = new mongoose.Schema(
{
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    basic:
    {
        title:
        {
            type: String,
            required: true,
            trim: true
        },
        description:
        {
            type: String,
            default: ""
        },
        category:
        {
            type: String,
            required: true,
            enum:
            [
                "Identity",
                "Financial",
                "Medical",
                "Insurance",
                "Education",
                "Vehicle",
                "Property",
                "Legal",
                "Business",
                "Personal",
                "Other"
            ]
        }
        // tags:
        // [
        //     {
        //         type: String,
        //         trim: true
        //     }
        // ]
    },
    file:
    {
        originalName:
        {
            type: String,
            required: true
        },
        filename:
        {
            type: String,
            required: true
        },
        mimeType:
        {
            type: String,
            required: true
        },
        extension:
        {
            type: String
        },
        size:
        {
            type: Number,
            required: true
        }
        // storageProvider:
        // {
        //     type: String,
        //     enum: ["Local", "Cloudinary", "S3"],
        //     default: "Local"
        // },
        // storagePath:
        // {
        //     type: String,
        //     required: true
        // },

        // thumbnail:
        // {
        //     type: String,
        //     default: ""
        // },

        // checksum:
        // {
        //     type: String
        // }
    },
    ocr:
    {
        extractedText:
        {
            type: String,
            default: ""
        },

        language:
        {
            type: String,
            default: ""
        },

        keywords:
        [
            {
                type: String
            }
        ]
    },
    verification:
    {
        status:
        {
            type: String,
            enum:
            [
                "Unverified",
                "Format Valid",
                "Government Verified"
            ],
            default: "Unverified"
        },
        source:
        {
            type: String,
            enum:
            [
                "Upload",
                "Scanner",
                "Email",
                "DigiLocker"
            ],
            default: "Upload"
        },
        // method:
        // {
        //     type: String,
        //     default: ""
        // },
        verifiedAt:
        {
            type: Date
        },
        issuer:
        {
            type: String,
            default: ""
        }
    },
    digitalSignature:
    {
        present:
        {
            type: Boolean,
            default: false
        },
        valid:
        {
            type: Boolean,
            default: false
        },
        issuer:
        {
            type: String,
            default: ""
        },
        signingTime:
        {
            type: Date
        }
    },
    dates:
    {
        issuedAt:
        {
            type: Date
        },
        expiresAt:
        {
            type: Date
        }
    },
    security:
    {
        isEncrypted:
        {
            type: Boolean,
            default: false
        },
        isPasswordProtected:
        {
            type: Boolean,
            default: false
        },
        isArchived:
        {
            type: Boolean,
            default: false
        },
        isDeleted:
        {
            type: Boolean,
            default: false
        },
        deletedAt:
        {
            type: Date
        }
    },
    // relations:
    // [
    //     {
    //         type:
    //         {
    //             type: String,
    //             required: true
    //         },

    //         reference:
    //         {
    //             type: Schema.Types.ObjectId,
    //             required: true
    //         }
    //     }
    // ],

    // favourite:
    // {
    //     type: Boolean,
    //     default: false
    // },

    // starred:
    // {
    //     type: Boolean,
    //     default: false
    // }
},
{
    timestamps: true
});

module.exports = mongoose.model("Document", DocumentSchema);