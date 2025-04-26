import { api } from ".";
import { Tops } from "../types";

export const getTops = async (): Promise<Tops> => {
  const { data } = await api.get("/tops");
  return data;
};
