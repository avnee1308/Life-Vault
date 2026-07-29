import api from "./axios";

// Get all assets
export const getAssets = async () => {
    const response = await api.get("/asset/get");
    return response.data;
};

// Get/view a single asset
export const getAsset = async (id) => {
    const response = await api.get(`/asset/view/${id}`);
    return response.data;
};

// Create a new asset
export const createAsset = async (data) => {
    const response = await api.post("/asset/create", data);
    return response.data;
};

// Update an asset
export const updateAsset = async (id, data) => {
    const response = await api.patch(`/asset/update/${id}`, data);
    return response.data;
};

// Delete an asset
export const deleteAsset = async (id) => {
    const response = await api.delete(`/asset/delete/${id}`);
    return response.data;
};