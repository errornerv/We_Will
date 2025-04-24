import { PRODUCTS_LIST_URL } from "./api";
import axios from "./baseService";

export const GetProducts = async () => {
  try {
    const res = await axios.get(PRODUCTS_LIST_URL);
    return res;
  } catch (e) {
    console.log(e);
  }
};



const dataService = {
  GetProducts,
};

export default dataService;
