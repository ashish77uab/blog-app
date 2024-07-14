import { API } from "../api";

export const createTasks = (formData) => API.post(`tasks`, formData);
export const updateTasks = (formData) => API.patch(`tasks/${formData?.slug}`, formData);
export const deleteTask = ({ slug }) => API.delete(`tasks?slug=${slug}`);
export const updateTaskStatus = ({ slug, status }) => API.put(`tasks?slug=${slug}&status=${status}`);
