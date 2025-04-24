import axios from "axios";
import { BASE_URL } from "./api";

axios.defaults.baseURL = BASE_URL;

export default axios;
