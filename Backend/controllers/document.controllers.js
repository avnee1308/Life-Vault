const path = require("path");
const DocumentModel = require("../models/document");

module.exports.createDoc = async (req, res) =>
{
    try
    {
        const document = await DocumentModel.create(
        {
            owner: req.user._id,
            basic:
            {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category
            },
            file:
            {
                originalName: req.body.originalName,
                filename: req.body.filename,
                mimeType: req.body.mimeType,
                extension: req.body.extension,
                size: req.body.size
            },
            ocr:
            {
                extractedText: req.body.extractedText || "",
                language: req.body.language || "",
                keywords: req.body.keywords || []
            },
            verification:
            {
                status: req.body.status || "Unverified",
                source: req.body.source || "Upload",
                verifiedAt: req.body.verifiedAt
            },
            digitalSignature:
            {
                present: req.body.present || false,
                valid: req.body.valid || false,
                issuer: req.body.issuer || "",
                signingTime: req.body.signingTime
            },
            dates:
            {
                issuedAt: req.body.issuedAt,
                expiresAt: req.body.expiresAt
            },
            security:
            {
                isEncrypted: req.body.isEncrypted || false,
                isPasswordProtected: req.body.isPasswordProtected || false,
                isArchived: false,
                isDeleted: false
            }
        });
        return res.status(201).json(
        {
            message: "Document created successfully.",
            document
        });
    }
    catch(err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};



// module.exports.uploadDoc = async (req, res) =>
// {
//     return res.status(501).json(
//     {
//         message: "Upload functionality not implemented yet."
//     });
// };



module.exports.viewDocs = async (req, res) =>
{
    try
    {
        const documents = await DocumentModel.find(
        {
            owner: req.user._id,
            "security.isDeleted": false
        });
        return res.status(200).json(documents);
    }
    catch(err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};



module.exports.getDoc = async (req, res) =>
{
    try
    {
        const document = await DocumentModel.findOne(
        {
            _id: req.params.id,
            owner: req.user._id,
            "security.isDeleted": false
        });
        if(!document)
        {
            return res.status(404).json(
            {
                message: "Document not found."
            });
        }
        return res.status(200).json(document);
    }
    catch(error)
    {
        return res.status(500).json(
        {
            message: error.message,
            error
        });
    }
};



module.exports.updateDoc = async (req, res) =>
{
    try
    {
        const updatedDocument = await DocumentModel.findOneAndUpdate(
        {
            _id: req.params.id,
            owner: req.user._id
        },
        req.body,
        {
            new: true,
            runValidators: true
        });
        if(!updatedDocument)
        {
            return res.status(404).json(
            {
                message: "Document not found."
            });
        }
        return res.status(200).json(
        {
            message: "Document updated successfully.",
            updatedDocument
        });
    }
    catch(err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};



module.exports.deleteDoc = async (req, res) =>
{
    try
    {
        const deletedDocument = await DocumentModel.findOneAndUpdate(
        {
            _id: req.params.id,
            owner: req.user._id
        },
        {
            "security.isDeleted": true,
            "security.deletedAt": new Date()
        },
        {
            new: true
        });
        if(!deletedDocument)
        {
            return res.status(404).json(
            {
                message: "Document not found."
            });
        }
        return res.status(200).json(
        {
            message: "Document deleted successfully."
        });
    }
    catch(err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};



module.exports.getDocCategory = async (req, res) =>
{
    try
    {
        const documents = await DocumentModel.find(
        {
            owner: req.user._id,
            "basic.category": req.params.category,
            "security.isDeleted": false
        });
        return res.status(200).json(documents);
    }
    catch(err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};