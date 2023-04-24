import urls from "../constants/urls";
import api from "./axios";

export const UploadImg = (data: any) => api.post(urls.MULTER, data)