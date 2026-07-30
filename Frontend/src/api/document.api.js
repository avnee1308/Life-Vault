import api from "./axios";

// Get all documents
export const getDocuments = async () => {
const response = await api.get("/document/view");
return response.data;
};

// Get a single document
export const getDocument = async (id) => {
const response = await api.get(`/document/get/${id}`);
return response.data;
};

// Get documents by category
export const getDocumentsByCategory = async (category) => {
const response = await api.get(
`/document/get/category/${encodeURIComponent(category)}`
);
return response.data;
};

// Upload a new document
export const createDocument = async (formData) => {
const response = await api.post("/document/create", formData);
return response.data;
};

// Update document metadata
export const updateDocument = async (id, data) => {
const response = await api.patch(`/document/update/${id}`, data);
return response.data;
};

// Delete a document
export const deleteDocument = async (id) => {
const response = await api.delete(`/document/delete/${id}`);
return response.data;
};
