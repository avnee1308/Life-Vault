const path = require("path");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const DocumentModel = require("../models/document");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

module.exports.createDoc = async (req, res) =>
{
    try
    {
        if (!req.file)
        {
            return res.status(400).json({
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
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: "Title and category are required."
            });
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "life-vault/documents",
                resource_type: "auto"
            }
        );

        // Delete local temporary file
        fs.unlinkSync(req.file.path);

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
                mimeType: req.file.mimetype,
                extension: path.extname(req.file.originalname),
                size: req.file.size,
                storageProvider: "Cloudinary",
                publicId: uploadResult.public_id,
                secureUrl: uploadResult.secure_url,
                resourceType: uploadResult.resource_type
            },
            ocr:
            {
                extractedText: extractedText || "",
                language: language || "",
                keywords: keywords
                    ? keywords.split(",").map(k => k.trim())
                    : []
            },
            verification:
            {
                status: status || "Unverified",
                source: source || "Upload",
                verifiedAt
            },
            digitalSignature:
            {
                present: present === "true",
                valid: valid === "true",
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
                isEncrypted: isEncrypted === "true",
                isPasswordProtected: isPasswordProtected === "true",
                isArchived: false,
                isDeleted: false
            }
        });

        return res.status(201).json(
        {
            message: "Document uploaded successfully.",
            document
        });
    }

    catch (err)
    {
        // to remove temporary file if it still exists
        if (req.file && fs.existsSync(req.file.path))
        {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.viewDocs = async (req, res) => {
    try {

        const {
            search,
            category,
            extension,
            mimeType,
            status,
            sort
        } = req.query;

        const filter = {
            owner: req.user._id,
            "security.isDeleted": false
        };

        // Category Filter
        if (category) {
            filter["basic.category"] = category;
        }

        // File Extension Filter
        if (extension) {
            filter["file.extension"] = extension;
        }

        // MIME Type Filter
        if (mimeType) {
            filter["file.mimeType"] = mimeType;
        }

        // Verification Status Filter
        if (status) {
            filter["verification.status"] = status;
        }

        // Search
        if (search) {
            filter.$or = [
                {
                    "basic.title": {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "basic.description": {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "file.originalName": {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "ocr.extractedText": {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    "ocr.keywords": {
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

            case "title":
                sortOption = { "basic.title": 1 };
                break;

            case "sizeLow":
                sortOption = { "file.size": 1 };
                break;

            case "sizeHigh":
                sortOption = { "file.size": -1 };
                break;

            case "expiry":
                sortOption = { "dates.expiresAt": 1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        }

        const documents = await DocumentModel
            .find(filter)
            .sort(sortOption);

        return res.status(200).json({
            count: documents.length,
            documents
        });

    } catch (err) {

        return res.status(500).json({
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

// module.exports.getDocCategory = async (req, res) =>
// {
//     try
//     {
//         const documents = await DocumentModel.find(
//         {
//             owner: req.user._id,
//             "basic.category": req.params.category,
//             "security.isDeleted": false
//         });
//         return res.status(200).json(documents);
//     }
//     catch(err)
//     {
//         return res.status(500).json(
//         {
//             message: err.message
//         });
//     }
// };