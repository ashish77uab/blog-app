import { API } from "../api";

export const login = (formData) => API.post(`auth/login`, formData);
export const register = (formData) => API.post(`auth/register`, formData);
export const forgotRequest = (formData) =>
    API.post(`auth/requestResetPassword`, formData);
export const resetPassword = (formData) =>
    API.post(`auth/resetPassword`, formData);