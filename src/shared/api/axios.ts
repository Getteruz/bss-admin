import axios from "axios";
// const BASE_URL = "https://api.bss-safety.uz"


const instance = axios.create({
    baseURL: 'https://api.bss-safety.uz'
    // baseURL: 'http://localhost:9000'

});
instance.interceptors.request.use((config) => {



    return config
})

export default instance;