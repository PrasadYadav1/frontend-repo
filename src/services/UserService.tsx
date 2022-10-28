import axios from "axios";
import AuthHeader from "./AuthHeader";
const API_URL = "http://103.242.116.207:9000/api/";
// const getPublicContent = () => {
//   return axios.get("all");
// };
class UserService {
  // users
  getAllUser() {
    // get all user
    return axios.get(API_URL + "user", { headers: AuthHeader() });
  }

  getUser(id: number) {
    // get user by id
    return axios.get(API_URL + "user/" + id, { headers: AuthHeader() });
  }

  findUserByEmail(email: string) {
    return axios.get(API_URL + "user/" + email, { headers: AuthHeader() });
  }

  // cashflow
  showCashFlow() {
    return axios.get(API_URL + "cash-flow/all", { headers: AuthHeader() });
  }

  showCashFlowById(id: number) {
    return axios.get(API_URL + "cash-flow/" + id, { headers: AuthHeader() });
  }

  createCashFlow() {
    return axios.get(API_URL + "cash-flow/create", { headers: AuthHeader() });
  }
}

export default new UserService();
