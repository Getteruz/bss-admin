import urls from "../constants/urls";
import api from "./axios";

export const GetObjects = async () => {
    const response = await api.get(urls.OBJECTS);
    return response.data;
}

export const GetObjectsbyid = async (id: any) => {
    const response = await api.get(urls.OBJECTS + `/${id}`);
    return response.data;
}
export const createObjects = (data: any) => api.post(urls.OBJECTS, data)

export const UpdateObjects = (data: any, id: any) => api.put(urls.OBJECTS + `/${id}`, data)


export const deleteObjects = (id: any) => api.delete(urls.OBJECTS + `/${id}`)