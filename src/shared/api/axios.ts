import axios from "axios";
// const BASE_URL = "https://api.bss-safety.uz"


const instance = axios.create({
    baseURL: 'https://api.bss-safety.uz'
});
instance.interceptors.request.use((config) => {



    return config
})

export default instance;