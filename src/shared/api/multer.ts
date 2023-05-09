import urls from "../constants/urls";
import api from "./axios";

export const UploadImg = async (data: any) => await api.post(urls.MULTER, data)

export const DeleteImg = async (data: any) => await api.delete(urls.MULTER, { data })