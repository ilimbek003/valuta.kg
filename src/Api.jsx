import axios from "axios";

export const api = axios.create({
  baseURL: "https://valuta.xbt.kg/api",
});
