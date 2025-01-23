import axios from "axios";
import { Concert } from "../types/Concerts";

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export async function getConcerts(): Promise<Concert[]> {
  const concerts = (await api.get("shows")).data;
  return concerts;
}

export default api;
