import {
  LOGIN_ONETIME_PASSWORD,
  LOGIN_URL,
  REGISTER_URL,
  SIGNUP_ONETIME_PASSWORD,
  VERIFY_LOGIN_ONETIME_PASSWORD,
  VERIFY_SIGNUP_ONETIME_PASSWORD,
} from "./api";
import axios from "./baseService";

export const PostSignupOneTimePass = async (user_phone) => {
  try {
    const res = await axios.post(SIGNUP_ONETIME_PASSWORD, user_phone, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const PostSignup = async (formData) => {
  try {
    const res = await axios.post(REGISTER_URL, formData, {
      headers: {},
    });
    return res;
  } catch (e) {
    console.error("Error in PostSignup:", e);
    throw e;
  }
};

export const PostLogin = async (formData) => {
  try {
    const res = await axios.post(LOGIN_URL, formData, {
      headers: {},
    });
    return res;
  } catch (e) {
    console.error("Error in PostLogin:", e);
    throw e;
  }
};

export const PostLoginOneTimePass = async (formData) => {
  try {
    const res = await axios.post(LOGIN_ONETIME_PASSWORD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const PostVerifyLoginOneTimePass = async (formData) => {
  try {
    const res = await axios.post(VERIFY_LOGIN_ONETIME_PASSWORD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const PostVerifySignupOneTimePass = async (formData) => {
  try {
    const res = await axios.post(VERIFY_SIGNUP_ONETIME_PASSWORD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const AuthService = {
  PostSignupOneTimePass,
  PostSignup,
  PostLogin,
  PostLoginOneTimePass,
  PostVerifyLoginOneTimePass,
  PostVerifySignupOneTimePass,
};

export default AuthService;
