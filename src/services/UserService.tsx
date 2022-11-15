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

  // update user data
  updateUserdata = (
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    designation: string,
    primaryMobile: string,
    alternativeMobile: string,
    email: string,
    roleId: string,
    profileImage: string
  ) => {
    return axios
      .put(
        API_URL + "user/" + id,
        JSON.stringify({
          firstName,
          middleName,
          lastName,
          gender,
          designation,
          primaryMobile,
          alternativeMobile,
          profileImage,
          email,
          roleId,
        }),
        {
          headers: AuthHeader(),
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response) {
          console.log(response);
        }

        return response.data;
      });
  };
  updateUser(id: number) {
    return axios.put(API_URL + "user/" + id, { headers: AuthHeader() });
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
    return axios.post(API_URL + "cash-flow/create", { headers: AuthHeader() });
  }

  addExpense() {
    return axios.post("http://103.242.116.207:9000/expense/create", {
      headers: AuthHeader(),
    });
  }
}

export default new UserService();
