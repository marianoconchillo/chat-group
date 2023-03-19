import axios from "axios";

export const ENDPOINT = "http://localhost:5000";

const api = axios.create({
    baseURL: `${ENDPOINT}/api`,
});

export default api;
