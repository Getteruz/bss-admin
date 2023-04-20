import urls from "../constants/urls";
import api from "axios";

export const GetService = async () => {
    const response = await api.get(urls.SERVICE);
    return response.data;
}

export const GetServicebyid = async (id: any) => {
    const response = await api.get(urls.SERVICE + `/${id}`);
    return response.data;
}
export const createService = (data: any) => api.post(urls.SERVICE, data)

export const UpdateService = (data: any, id: any) => api.put(urls.SERVICE + `/${id}`, data)


export const deleteService = (id: any) => api.delete(urls.SERVICE + `/${id}`)