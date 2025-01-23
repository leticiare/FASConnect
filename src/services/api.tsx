import axios from "axios";
import { Concert } from "../types/Concerts";
import { Stage } from "../types/Stage";

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export async function getConcerts(): Promise<Concert[]> {
  const concerts = (await api.get("shows")).data;
  return concerts;
}
export async function getStages(): Promise<Stage[]> {
  const stages = (await api.get("palcos")).data;
  return stages;
}
export default api;
