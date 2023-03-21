import axios from "axios";

export const ENDPOINT = "http://192.168.0.47:5000";

const api = axios.create({
    baseURL: `${ENDPOINT}/api`,
});

export default api;
