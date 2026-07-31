import api from "./axios";

export const getServices = async (params = {}) => {
    const response = await api.get("/service/all", {
        params
    });
    return response.data;
};

export const getService = async (id) => {
    const response = await api.get(`/service/${id}`);
    return response.data;
};

export const createService = async (data) => {
    const response = await api.post("/service/create", data);
    return response.data;
};

export const updateService = async (id, data) => {
    const response = await api.patch(`/service/update/${id}`, data);
    return response.data;
};

export const deleteService = async (id) => {
    const response = await api.delete(`/service/delete/${id}`);
    return response.data;
};