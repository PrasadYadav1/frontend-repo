import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://103.242.116.207:9000/api/";
// const getPublicContent = () => {
//   return axios.get("all");
// };
class UserService {
  // users
  getAllUser() {
    // get all user
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getUser(id: number) {
    // get user by id
    return axios.get(API_URL + "user/" + id, { headers: authHeader() });
  }

  findUserByEmail(email: string) {
    return axios.get(API_URL + "user/" + email, { headers: authHeader() });
  }

  // cashflow
  showCashFlow() {
    return axios.get(API_URL + "cash-flow/all", { headers: authHeader() });
  }

  showCashFlowById(id: number) {
    return axios.get(API_URL + "cash-flow/" + id, { headers: authHeader() });
  }

  createCashFlow() {
    return axios.get(API_URL + "cash-flow/create", { headers: authHeader() });
  }
}

export default new UserService();
