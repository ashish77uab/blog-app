import { API } from '../api';

export const getUsersList = async (data) => {
    try {
        const response = await API.get('users?page=1&limit=10');
        return response.data;
    } catch (error) {
        return error
    }
};