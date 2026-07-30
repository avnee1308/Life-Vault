import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
getDocuments,
createDocument,
deleteDocument
} from "../api/document.api";

function Documents() {

const [documents, setDocuments] = useState([]);
const [loading, setLoading] = useState(true);

const [showUploadModal, setShowUploadModal] = useState(false);

const [uploading, setUploading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal",
    document: null
});


// Fetch documents when page loads
useEffect(() => {
    fetchDocuments();
}, []);


const fetchDocuments = async () => {

    try {

        setLoading(true);
        setError("");

        const data = await getDocuments();

        setDocuments(data);

    }
    catch (err) {

        console.error("Error fetching documents:", err);

        setError(
            err.response?.data?.message ||
            "Unable to load documents."
        );

    }
    finally {

        setLoading(false);

    }

};


// Handle input changes
const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
        ...previous,
        [name]: value
    }));

};


// Handle file selection
const handleFileChange = (e) => {

    const file = e.target.files[0];

    setFormData((previous) => ({
        ...previous,
        document: file
    }));

};


// Upload document
const handleUpload = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!formData.title.trim()) {

        setError("Please enter a document title.");
        return;

    }


    if (!formData.document) {

        setError("Please select a document to upload.");
        return;

    }


    try {

        setUploading(true);


        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);

        // IMPORTANT:
        // Backend expects req.file from upload.single("document")
        data.append("document", formData.document);


        const response = await createDocument(data);


        setDocuments((previous) => [
            response.document,
            ...previous
        ]);


        setSuccess("Document uploaded successfully.");


        // Reset form
        setFormData({
            title: "",
            description: "",
            category: "Personal",
            document: null
        });


        // Reset file input
        document.getElementById("documentFileInput").value = "";


        setTimeout(() => {
            setShowUploadModal(false);
            setSuccess("");
        }, 1000);

    }
    catch (err) {

        console.error("Upload error:", err);

        setError(
            err.response?.data?.message ||
            "Failed to upload document."
        );

    }
    finally {

        setUploading(false);

    }

};


// Delete document
const handleDelete = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
        return;
    }


    try {

        setError("");

        await deleteDocument(id);

        setDocuments((previous) =>
            previous.filter((document) => document._id !== id)
        );

        setSuccess("Document deleted successfully.");

        setTimeout(() => {
            setSuccess("");
        }, 2000);

    }
    catch (err) {

        console.error("Delete error:", err);

        setError(
            err.response?.data?.message ||
            "Failed to delete document."
        );

    }

};


const closeModal = () => {

    if (uploading) {
        return;
    }

    setShowUploadModal(false);

    setError("");

    setFormData({
        title: "",
        description: "",
        category: "Personal",
        document: null
    });

};


return (

    <div className="min-h-screen bg-slate-100">

        <Navbar />


        <main className="max-w-7xl mx-auto px-6 py-10">


            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Document Vault
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Securely manage your important documents.
                    </p>

                </div>


                <button
                    onClick={() => {
                        setError("");
                        setSuccess("");
                        setShowUploadModal(true);
                    }}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                >
                    + Upload Document
                </button>

            </div>


            {/* SUCCESS MESSAGE */}

            {success && (

                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                </div>

            )}


            {/* ERROR MESSAGE */}

            {error && (

                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>

            )}


            {/* LOADING */}

            {loading ? (

                <div className="bg-white rounded-xl shadow-sm p-12 text-center">

                    <div className="text-3xl mb-4">
                        ⏳
                    </div>

                    <p className="text-slate-500">
                        Loading your documents...
                    </p>

                </div>

            ) : documents.length === 0 ? (

                /* EMPTY STATE */

                <div className="bg-white rounded-xl shadow-sm p-12 text-center">

                    <div className="text-5xl mb-4">
                        📄
                    </div>

                    <h2 className="text-xl font-semibold text-slate-700">
                        No documents yet
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Upload your important documents to keep them organized.
                    </p>

                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Upload Your First Document
                    </button>

                </div>

            ) : (

                /* DOCUMENT GRID */

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {documents.map((document) => (

                        <div
                            key={document._id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
                                        📄
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800 break-words">
                                            {document.basic?.title}
                                        </h3>

                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                            {document.basic?.category}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {document.basic?.description && (

                                <p className="text-sm text-slate-500 mt-4 line-clamp-2">
                                    {document.basic.description}
                                </p>

                            )}


                            <div className="mt-5 pt-4 border-t border-slate-100">

                                <p className="text-xs text-slate-400 mb-4">
                                    {document.file?.originalName}
                                </p>


                                <div className="flex gap-2">

                                    <a
                                        href={document.file?.secureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                                    >
                                        View
                                    </a>


                                    <button
                                        onClick={() => handleDelete(document._id)}
                                        className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-sm"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </main>


        {/* UPLOAD MODAL */}

        {showUploadModal && (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">


                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold text-slate-800">
                                Upload Document
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Add a document to your vault.
                            </p>

                        </div>


                        <button
                            onClick={closeModal}
                            disabled={uploading}
                            className="text-slate-400 hover:text-slate-700 text-2xl"
                        >
                            ×
                        </button>

                    </div>


                    <form
                        onSubmit={handleUpload}
                        className="space-y-5"
                    >


                        {/* TITLE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Document Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Aadhaar Card"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="Identity">Identity</option>
                                <option value="Financial">Financial</option>
                                <option value="Medical">Medical</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Education">Education</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Property">Property</option>
                                <option value="Legal">Legal</option>
                                <option value="Business">Business</option>
                                <option value="Personal">Personal</option>
                                <option value="Other">Other</option>

                            </select>

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Optional description..."
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* FILE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Document File
                            </label>

                            <input
                                id="documentFileInput"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={handleFileChange}
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm"
                            />

                            <p className="text-xs text-slate-400 mt-2">
                                PDF, JPG, PNG, DOC or DOCX • Maximum 10 MB
                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-3 pt-2">

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={uploading}
                                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={uploading}
                                className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                            >

                                {uploading
                                    ? "Uploading..."
                                    : "Upload Document"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        )}

    </div>

);

}

export default Documents;
