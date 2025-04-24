import { create } from "zustand";
import AuthService from "../../services/AuthService";

const initialState = {
  signupOneTimePassword: [],
  loading: false,
  error: null,
};

export const authStore = create((set) => ({
  ...initialState,

  getSignupOneTimePassword: async (user_phone) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostSignupOneTimePass(user_phone);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set({ signupOneTimePassword: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  postSignup: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostSignup(formData);
      console.log(response.data.status);
      set({ signupData: response.data, loading: false });
      return response.data; // Return response data to be used in the component
    } catch (error) {
      set({ error: error.message, loading: false });
      throw new Error(error.message); // Propagate the error to the component
    }
  },

  postLogin: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostLogin(formData);
      set({ loginData: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },

  getLoginOneTimePassword: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostLoginOneTimePass(formData);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set({ signupOneTimePassword: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getVerifyLoginOneTimePassword: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostVerifyLoginOneTimePass(formData);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set({ signupOneTimePassword: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getVerifySignupOneTimePassword: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.PostVerifySignupOneTimePass(formData);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set({ signupOneTimePassword: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default function useAuthService() {
  const {
    signupOneTimePassword,
    loading,
    error,
    getSignupOneTimePassword,
    postSignup,
    postLogin,
    getLoginOneTimePassword,
    getVerifyLoginOneTimePassword,
    getVerifySignupOneTimePassword,
  } = authStore();
  return {
    signupOneTimePassword,
    loading,
    error,
    getSignupOneTimePassword,
    postSignup,
    postLogin,
    getLoginOneTimePassword,
    getVerifyLoginOneTimePassword,
    getVerifySignupOneTimePassword,
  };
}
