import urls from "../constants/urls";
import api from "./axios";

export const GetAboutUs = async () => {
    const response = await api.get(urls.ABOUTUS);
    return response.data;
}

export const UpdateAboutUs = (data: any, id: any) => api.put(urls.ABOUTUS + `/${id}`, data)


