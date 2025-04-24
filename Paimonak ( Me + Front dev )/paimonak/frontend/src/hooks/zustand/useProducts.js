import { create } from "zustand";
import dataService from "../../services/dataService";

const initialState = {
  productsList: [],
  loading: false,
  error: null,
};

export const productStore = create((set) => ({
  ...initialState,

  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await dataService.GetProducts();
      set({ productsList: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default function useProductService() {
  const { productsList, loading, error, getProducts } = productStore();
  return {
    productsList,
    loading,
    error,
    getProducts,
  };
}
