import urls from "../constants/urls";
import api from "./axios";

export const GetNews = async () => {
    const response = await api.get(urls.NEWS);
    return response.data;
}

export const GetNewsbyid = async (id: any) => {
    const response = await api.get(urls.NEWS + `/${id}`);
    return response.data;
}
export const createNews = (data: any) => api.post(urls.NEWS, data)

export const UpdateNews = (data: any, id: any) => api.put(urls.NEWS + `/${id}`, data)


export const deleteNews = (id: any) => api.delete(urls.NEWS + `/${id}`)