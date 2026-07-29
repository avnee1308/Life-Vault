import { useEffect, useState } from "react";

import {
    getAssets,
    getAsset,
    createAsset,
    updateAsset,
    deleteAsset
} from "../api/asset.api";


const categories = [
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
];


const emptyForm = {
    assetName: "",
    assetImage: "",
    assetCategory: "",
    purchasePrice: "",
    boughtOn: "",
    brand: "",
    model: "",
    description: "",
    location: ""
};


function Assets() {

    const [assets, setAssets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [showView, setShowView] = useState(false);

    const [editingAsset, setEditingAsset] = useState(null);

    const [selectedAsset, setSelectedAsset] = useState(null);

    const [formData, setFormData] = useState(emptyForm);

    const [submitting, setSubmitting] = useState(false);


    // =========================================================
    // FETCH ALL ASSETS
    // =========================================================

    const fetchAssets = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAssets();

            setAssets(data.allAssets || []);

        } catch (error) {

            console.error("Error fetching assets:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load assets."
            );

        } finally {

            setLoading(false);

        }

    };


    // Fetch assets when page loads
    useEffect(() => {

        fetchAssets();

    }, []);


    // =========================================================
    // FORM INPUT HANDLER
    // =========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // =========================================================
    // OPEN ADD MODAL
    // =========================================================

    const openAddModal = () => {

        setEditingAsset(null);

        setFormData(emptyForm);

        setError("");
        setSuccess("");

        setShowForm(true);

    };


    // =========================================================
    // OPEN EDIT MODAL
    // =========================================================

    const openEditModal = (asset) => {

        setEditingAsset(asset);

        setFormData({

            assetName:
                asset.basic?.assetName || "",

            assetImage:
                asset.basic?.assetImage || "",

            assetCategory:
                asset.basic?.assetCategory || "",

            purchasePrice:
                asset.basic?.purchasePrice ?? "",

            boughtOn:
                asset.basic?.boughtOn
                    ? new Date(asset.basic.boughtOn)
                        .toISOString()
                        .split("T")[0]
                    : "",

            brand:
                asset.specifications?.brand || "",

            model:
                asset.specifications?.model || "",

            description:
                asset.specifications?.description || "",

            location:
                asset.specifications?.location || ""

        });

        setError("");
        setSuccess("");

        setShowForm(true);

    };


    // =========================================================
    // CLOSE FORM MODAL
    // =========================================================

    const closeFormModal = () => {

        if (submitting) {
            return;
        }

        setShowForm(false);

        setEditingAsset(null);

        setFormData(emptyForm);

    };


    // =========================================================
    // CREATE / UPDATE ASSET
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Frontend validation

        if (!formData.assetName.trim()) {

            setError("Asset name is required.");

            return;

        }


        try {

            setSubmitting(true);


            // IMPORTANT:
            // Your backend controller expects these fields
            // directly in req.body.
            //
            // It does NOT expect:
            //
            // {
            //     basic: {},
            //     specifications: {}
            // }
            //
            // The backend controller itself creates those
            // nested objects.


            const payload = {

                assetName:
                    formData.assetName.trim(),

                assetImage:
                    formData.assetImage.trim() || undefined,

                assetCategory:
                    formData.assetCategory || undefined,

                purchasePrice:
                    formData.purchasePrice === ""
                        ? undefined
                        : Number(formData.purchasePrice),

                boughtOn:
                    formData.boughtOn || undefined,

                brand:
                    formData.brand.trim() || undefined,

                model:
                    formData.model.trim() || undefined,

                description:
                    formData.description.trim() || undefined,

                location:
                    formData.location.trim() || undefined

            };


            // =================================================
            // EDIT EXISTING ASSET
            // =================================================

            if (editingAsset) {

                await updateAsset(
                    editingAsset._id,
                    payload
                );


                // Your backend updateAsset controller only
                // returns a message, not the updated asset.
                //
                // Therefore fetch the latest list.

                await fetchAssets();


                setSuccess(
                    "Asset updated successfully."
                );

            }


            // =================================================
            // CREATE NEW ASSET
            // =================================================

            else {

                const response = await createAsset(payload);


                // Your backend returns:
                //
                // {
                //     message: "Asset added successfully !",
                //     asset
                // }

                setAssets((previousAssets) => [

                    response.asset,

                    ...previousAssets

                ]);


                setSuccess(
                    "Asset added successfully."
                );

            }


            // Close modal

            setShowForm(false);

            setEditingAsset(null);

            setFormData(emptyForm);


        } catch (error) {

            console.error(
                "Error saving asset:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to save asset."
            );

        } finally {

            setSubmitting(false);

        }

    };


    // =========================================================
    // VIEW ASSET
    // =========================================================

    const handleView = async (id) => {

        try {

            setError("");

            const data = await getAsset(id);


            // Your backend returns:
            //
            // {
            //     asset
            // }

            setSelectedAsset(data.asset);

            setShowView(true);

        } catch (error) {

            console.error(
                "Error viewing asset:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load asset details."
            );

        }

    };


    // =========================================================
    // DELETE ASSET
    // =========================================================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this asset?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");


            await deleteAsset(id);


            // Remove deleted asset from UI

            setAssets((previousAssets) =>

                previousAssets.filter(
                    (asset) =>
                        asset._id !== id
                )

            );


            // If the deleted asset was currently open
            // in the View modal, close it.

            if (
                selectedAsset &&
                selectedAsset._id === id
            ) {

                setSelectedAsset(null);

                setShowView(false);

            }


            setSuccess(
                "Asset deleted successfully."
            );


        } catch (error) {

            console.error(
                "Error deleting asset:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete asset."
            );

        }

    };


    // =========================================================
    // LOADING STATE
    // =========================================================

    if (loading) {

        return (

            <main className="
                min-h-screen
                bg-slate-100
                px-6
                py-10
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                ">

                    <div className="animate-pulse">

                        <div className="
                            h-8
                            w-48
                            bg-slate-200
                            rounded
                            mb-3
                        " />

                        <div className="
                            h-4
                            w-80
                            bg-slate-200
                            rounded
                            mb-10
                        " />


                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        ">

                            {[1, 2, 3].map((item) => (

                                <div
                                    key={item}
                                    className="
                                        bg-white
                                        rounded-2xl
                                        h-80
                                        border
                                        border-slate-200
                                    "
                                />

                            ))}

                        </div>

                    </div>

                </div>

            </main>

        );

    }


    return (

        <main className="
            min-h-screen
            bg-slate-100
            px-6
            py-10
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">


                {/* =====================================================
                    PAGE HEADER
                ====================================================== */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                    mb-10
                ">

                    <div>

                        <p className="
                            text-sm
                            font-medium
                            text-indigo-600
                            mb-2
                        ">
                            LIFE VAULT
                        </p>


                        <h1 className="
                            text-4xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        ">
                            My Assets
                        </h1>


                        <p className="
                            mt-2
                            text-slate-500
                        ">
                            Everything you own, organized in one place.
                        </p>

                    </div>


                    <button
                        onClick={openAddModal}
                        className="
                            bg-slate-900
                            hover:bg-slate-800
                            text-white
                            font-medium
                            px-5
                            py-3
                            rounded-xl
                            shadow-sm
                            transition
                            duration-200
                        "
                    >
                        + Add Asset
                    </button>

                </div>


                {/* =====================================================
                    SUCCESS MESSAGE
                ====================================================== */}

                {success && (

                    <div className="
                        mb-6
                        rounded-xl
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-700
                    ">
                        {success}
                    </div>

                )}


                {/* =====================================================
                    ERROR MESSAGE
                ====================================================== */}

                {error && (

                    <div className="
                        mb-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                    ">
                        {error}
                    </div>

                )}


                {/* =====================================================
                    EMPTY STATE
                ====================================================== */}

                {assets.length === 0 ? (

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        shadow-sm
                        p-12
                        text-center
                    ">

                        <div className="
                            mx-auto
                            mb-5
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-indigo-50
                            text-3xl
                        ">
                            📦
                        </div>


                        <h2 className="
                            text-xl
                            font-semibold
                            text-slate-900
                        ">
                            No assets yet
                        </h2>


                        <p className="
                            mt-2
                            text-slate-500
                        ">
                            Start building your inventory by
                            adding your first asset.
                        </p>


                        <button
                            onClick={openAddModal}
                            className="
                                mt-6
                                bg-slate-900
                                hover:bg-slate-800
                                text-white
                                font-medium
                                px-5
                                py-3
                                rounded-xl
                                transition
                            "
                        >
                            + Add Your First Asset
                        </button>

                    </div>

                ) : (


                    /* =================================================
                       ASSET GRID
                    ================================================== */

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    ">

                        {assets.map((asset) => (

                            <div
                                key={asset._id}
                                className="
                                    group
                                    bg-white
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    overflow-hidden
                                    shadow-sm
                                    hover:shadow-lg
                                    hover:-translate-y-1
                                    transition-all
                                    duration-200
                                "
                            >


                                {/* IMAGE */}

                                {asset.basic?.assetImage ? (

                                    <img
                                        src={
                                            asset.basic.assetImage
                                        }
                                        alt={
                                            asset.basic.assetName
                                        }
                                        className="
                                            w-full
                                            h-48
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <div className="
                                        h-48
                                        bg-gradient-to-br
                                        from-slate-100
                                        to-slate-200
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <span className="text-5xl">
                                            📦
                                        </span>

                                    </div>

                                )}


                                {/* CARD CONTENT */}

                                <div className="p-5">


                                    {/* NAME + CATEGORY */}

                                    <div className="mb-5">

                                        <h2 className="
                                            text-xl
                                            font-semibold
                                            text-slate-900
                                            truncate
                                        ">
                                            {
                                                asset.basic
                                                    ?.assetName
                                            }
                                        </h2>


                                        {asset.basic?.assetCategory && (

                                            <span className="
                                                inline-block
                                                mt-2
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-indigo-50
                                                text-indigo-600
                                                text-xs
                                                font-medium
                                            ">
                                                {
                                                    asset.basic
                                                        .assetCategory
                                                }
                                            </span>

                                        )}

                                    </div>


                                    {/* INFORMATION */}

                                    <div className="
                                        space-y-3
                                        text-sm
                                    ">


                                        {/* PRICE */}

                                        {asset.basic?.purchasePrice != null && (

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <span className="text-slate-500">
                                                    Purchase Price
                                                </span>

                                                <span className="
                                                    font-semibold
                                                    text-slate-800
                                                ">
                                                    ₹
                                                    {Number(
                                                        asset.basic
                                                            .purchasePrice
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>

                                            </div>

                                        )}


                                        {/* BRAND */}

                                        {asset.specifications?.brand && (

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <span className="text-slate-500">
                                                    Brand
                                                </span>

                                                <span className="text-slate-700">
                                                    {
                                                        asset
                                                            .specifications
                                                            .brand
                                                    }
                                                </span>

                                            </div>

                                        )}


                                        {/* MODEL */}

                                        {asset.specifications?.model && (

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <span className="text-slate-500">
                                                    Model
                                                </span>

                                                <span className="text-slate-700">
                                                    {
                                                        asset
                                                            .specifications
                                                            .model
                                                    }
                                                </span>

                                            </div>

                                        )}


                                        {/* LOCATION */}

                                        {asset.specifications?.location && (

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <span className="text-slate-500">
                                                    Location
                                                </span>

                                                <span className="
                                                    text-slate-700
                                                    truncate
                                                    max-w-[150px]
                                                ">
                                                    {
                                                        asset
                                                            .specifications
                                                            .location
                                                    }
                                                </span>

                                            </div>

                                        )}

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="
                                        mt-6
                                        pt-4
                                        border-t
                                        border-slate-100
                                        flex
                                        gap-2
                                    ">


                                        {/* VIEW */}

                                        <button
                                            onClick={() =>
                                                handleView(
                                                    asset._id
                                                )
                                            }
                                            className="
                                                flex-1
                                                px-3
                                                py-2
                                                rounded-lg
                                                border
                                                border-slate-200
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                hover:bg-slate-50
                                                transition
                                            "
                                        >
                                            View
                                        </button>


                                        {/* EDIT */}

                                        <button
                                            onClick={() =>
                                                openEditModal(
                                                    asset
                                                )
                                            }
                                            className="
                                                flex-1
                                                px-3
                                                py-2
                                                rounded-lg
                                                bg-indigo-50
                                                text-indigo-600
                                                text-sm
                                                font-medium
                                                hover:bg-indigo-100
                                                transition
                                            "
                                        >
                                            Edit
                                        </button>


                                        {/* DELETE */}

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    asset._id
                                                )
                                            }
                                            className="
                                                flex-1
                                                px-3
                                                py-2
                                                rounded-lg
                                                bg-red-50
                                                text-red-600
                                                text-sm
                                                font-medium
                                                hover:bg-red-100
                                                transition
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* =========================================================
                ADD / EDIT MODAL
            ========================================================== */}

            {showForm && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/50
                    p-4
                ">

                    <div className="
                        w-full
                        max-w-2xl
                        max-h-[90vh]
                        overflow-y-auto
                        rounded-2xl
                        bg-white
                        shadow-2xl
                    ">


                        {/* MODAL HEADER */}

                        <div className="
                            sticky
                            top-0
                            z-10
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-200
                            bg-white
                            px-6
                            py-5
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-bold
                                    text-slate-900
                                ">
                                    {
                                        editingAsset
                                            ? "Edit Asset"
                                            : "Add New Asset"
                                    }
                                </h2>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                ">
                                    {
                                        editingAsset
                                            ? "Update your asset information."
                                            : "Add something you own to your vault."
                                    }
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={closeFormModal}
                                className="
                                    h-9
                                    w-9
                                    rounded-lg
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    text-xl
                                "
                            >
                                ×
                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="
                                p-6
                                space-y-7
                            "
                        >


                            {/* BASIC INFORMATION */}

                            <section>

                                <h3 className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                ">
                                    Basic Information
                                </h3>


                                <div className="
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                ">


                                    {/* NAME */}

                                    <div className="sm:col-span-2">

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Asset Name *
                                        </label>

                                        <input
                                            type="text"
                                            name="assetName"
                                            value={
                                                formData.assetName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. MacBook Air M3"
                                            required
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Category
                                        </label>

                                        <select
                                            name="assetCategory"
                                            value={
                                                formData.assetCategory
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        >

                                            <option value="">
                                                Select category
                                            </option>

                                            {categories.map(
                                                (category) => (

                                                    <option
                                                        key={
                                                            category
                                                        }
                                                        value={
                                                            category
                                                        }
                                                    >
                                                        {category}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>


                                    {/* PRICE */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Purchase Price (₹)
                                        </label>

                                        <input
                                            type="number"
                                            name="purchasePrice"
                                            value={
                                                formData.purchasePrice
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            min="0"
                                            placeholder="e.g. 85000"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* PURCHASE DATE */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Purchase Date
                                        </label>

                                        <input
                                            type="date"
                                            name="boughtOn"
                                            value={
                                                formData.boughtOn
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* IMAGE URL */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Image URL
                                        </label>

                                        <input
                                            type="url"
                                            name="assetImage"
                                            value={
                                                formData.assetImage
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="https://..."
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>

                                </div>

                            </section>


                            {/* SPECIFICATIONS */}

                            <section>

                                <h3 className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                ">
                                    Specifications
                                </h3>


                                <div className="
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                ">


                                    {/* BRAND */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Brand
                                        </label>

                                        <input
                                            type="text"
                                            name="brand"
                                            value={
                                                formData.brand
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Apple"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* MODEL */}

                                    <div>

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Model
                                        </label>

                                        <input
                                            type="text"
                                            name="model"
                                            value={
                                                formData.model
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. M3"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* LOCATION */}

                                    <div className="sm:col-span-2">

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={
                                                formData.location
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Bedroom desk"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="sm:col-span-2">

                                        <label className="
                                            mb-1.5
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            value={
                                                formData.description
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            rows="4"
                                            placeholder="Add any additional details..."
                                            className="
                                                w-full
                                                resize-none
                                                rounded-xl
                                                border
                                                border-slate-200
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        />

                                    </div>

                                </div>

                            </section>


                            {/* FORM BUTTONS */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                border-t
                                border-slate-100
                                pt-5
                            ">

                                <button
                                    type="button"
                                    onClick={
                                        closeFormModal
                                    }
                                    disabled={submitting}
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-200
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        hover:bg-slate-50
                                        disabled:opacity-50
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        rounded-xl
                                        bg-slate-900
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        hover:bg-slate-800
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >

                                    {submitting

                                        ? "Saving..."

                                        : editingAsset
                                            ? "Save Changes"
                                            : "Add Asset"

                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =========================================================
                VIEW ASSET MODAL
            ========================================================== */}

            {showView && selectedAsset && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/50
                    p-4
                ">

                    <div className="
                        w-full
                        max-w-xl
                        max-h-[90vh]
                        overflow-y-auto
                        rounded-2xl
                        bg-white
                        shadow-2xl
                    ">


                        {/* HEADER */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-200
                            px-6
                            py-5
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-indigo-600
                                ">
                                    Asset Details
                                </p>

                                <h2 className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                ">
                                    {
                                        selectedAsset.basic
                                            ?.assetName
                                    }
                                </h2>

                            </div>


                            <button
                                onClick={() =>
                                    setShowView(false)
                                }
                                className="
                                    h-9
                                    w-9
                                    rounded-lg
                                    text-xl
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                "
                            >
                                ×
                            </button>

                        </div>


                        <div className="p-6">


                            {/* IMAGE */}

                            {selectedAsset.basic?.assetImage && (

                                <img
                                    src={
                                        selectedAsset
                                            .basic
                                            .assetImage
                                    }
                                    alt={
                                        selectedAsset
                                            .basic
                                            .assetName
                                    }
                                    className="
                                        mb-6
                                        h-56
                                        w-full
                                        rounded-xl
                                        object-cover
                                    "
                                />

                            )}


                            {/* BASIC INFORMATION */}

                            <div className="space-y-5">

                                <div>

                                    <h3 className="
                                        mb-3
                                        text-sm
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    ">
                                        Basic Information
                                    </h3>


                                    <div className="
                                        rounded-xl
                                        bg-slate-50
                                        p-4
                                        space-y-3
                                    ">

                                        <Detail
                                            label="Category"
                                            value={
                                                selectedAsset
                                                    .basic
                                                    ?.assetCategory
                                            }
                                        />


                                        <Detail
                                            label="Purchase Price"
                                            value={
                                                selectedAsset
                                                    .basic
                                                    ?.purchasePrice != null
                                                    ? `₹${Number(
                                                        selectedAsset
                                                            .basic
                                                            .purchasePrice
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}`
                                                    : null
                                            }
                                        />


                                        <Detail
                                            label="Purchase Date"
                                            value={
                                                selectedAsset
                                                    .basic
                                                    ?.boughtOn
                                                    ? new Date(
                                                        selectedAsset
                                                            .basic
                                                            .boughtOn
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : null
                                            }
                                        />

                                    </div>

                                </div>


                                {/* SPECIFICATIONS */}

                                <div>

                                    <h3 className="
                                        mb-3
                                        text-sm
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    ">
                                        Specifications
                                    </h3>


                                    <div className="
                                        rounded-xl
                                        bg-slate-50
                                        p-4
                                        space-y-3
                                    ">

                                        <Detail
                                            label="Brand"
                                            value={
                                                selectedAsset
                                                    .specifications
                                                    ?.brand
                                            }
                                        />


                                        <Detail
                                            label="Model"
                                            value={
                                                selectedAsset
                                                    .specifications
                                                    ?.model
                                            }
                                        />


                                        <Detail
                                            label="Location"
                                            value={
                                                selectedAsset
                                                    .specifications
                                                    ?.location
                                            }
                                        />


                                        <Detail
                                            label="Description"
                                            value={
                                                selectedAsset
                                                    .specifications
                                                    ?.description
                                            }
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="
                                mt-6
                                flex
                                gap-3
                            ">

                                <button
                                    onClick={() => {

                                        setShowView(false);

                                        openEditModal(
                                            selectedAsset
                                        );

                                    }}
                                    className="
                                        flex-1
                                        rounded-xl
                                        bg-indigo-600
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        hover:bg-indigo-700
                                    "
                                >
                                    Edit Asset
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            selectedAsset._id
                                        )
                                    }
                                    className="
                                        rounded-xl
                                        bg-red-50
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        text-red-600
                                        hover:bg-red-100
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </main>

    );

}


// =============================================================
// DETAIL COMPONENT
// =============================================================

function Detail({ label, value }) {

    if (!value) {
        return null;
    }


    return (

        <div className="
            flex
            items-start
            justify-between
            gap-5
            text-sm
        ">

            <span className="text-slate-500">
                {label}
            </span>


            <span className="
                max-w-[65%]
                text-right
                font-medium
                text-slate-800
            ">
                {value}
            </span>

        </div>

    );

}


export default Assets;
