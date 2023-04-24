import axios from "axios";
const BASE_URL = "https://api.bss-safety.uz"

const instance = axios.create({
    baseURL: BASE_URL
});
instance.interceptors.request.use((config) => {



    return config
})

export default instance;