import axios from "axios";

export const ENDPOINT = "https://chat-group-production-af1d.up.railway.app";

const api = axios.create({
    baseURL: `${ENDPOINT}/api`,
});

export default api;
