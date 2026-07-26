import api from "./axios";

export const loginUser = async (data) => 
{
    const response = await api.post("/user/Login", data);
    return response.data;
};

export const signupUser = async (data) => 
{
    const response = await api.post("/user/SignUp", data);
    return response.data;
};