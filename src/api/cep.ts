import type { Address } from "@/types/Address";
import axios from "axios";

const URL = "https://viacep.com.br/ws/";

export const findAddress = async (CEP: string): Promise<Address> => {
  const res = await axios.get(URL + CEP + "/json");

  if (res && res.status === 200) {
    return res.data;
  }

  return {} as Address;
};
