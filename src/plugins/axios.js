import axios from "axios";

export const appAxios = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}${process.env.VUE_APP_API_URL}/api/`
});