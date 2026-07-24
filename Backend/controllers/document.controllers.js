const path = require("path");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const DocumentModel = require("../models/document");

module.exports.createDoc = async (req, res) =>
{
    try
    {
        if (!req.file)
        {
            return res.status(400).json(
            {
                message: "Please upload a document."
            });
        }

        const
        {
            title,
            description,
            category,

            extractedText,
            language,
            keywords,

            status,
            source,
            verifiedAt,

            present,
            valid,
            issuer,
            signingTime,

            issuedAt,
            expiresAt,

            isEncrypted,
            isPasswordProtected
        } = req.body;

        if (!title || !category)
        {
            return res.status(400).json(
            {
                message: "Title and category are required."
            });
        }

        const document = await DocumentModel.create(
        {
            owner: req.user._id,

            basic:
            {
                title,
                description,
                category
            },

            file:
            {
                originalName: req.file.originalname,
                filename: req.file.filename,
                mimeType: req.file.mimetype,
                extension: path.extname(req.file.originalname),
                size: req.file.size
            },

            ocr:
            {
                extractedText: extractedText || "",
                language: language || "",
                keywords: keywords || []
            },

            verification:
            {
                status: status || "Unverified",
                source: source || "Upload",
                verifiedAt
            },

            digitalSignature:
            {
                present: present || false,
                valid: valid || false,
                issuer: issuer || "",
                signingTime
            },

            dates:
            {
                issuedAt,
                expiresAt
            },

            security:
            {
                isEncrypted: isEncrypted || false,
                isPasswordProtected: isPasswordProtected || false,
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
    catch (err)
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

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