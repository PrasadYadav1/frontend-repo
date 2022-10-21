import { AnyARecord } from "dns";
import React from "react";
import axios from "../api/axios";
const RefreshToken = () => {
  let currUser: string | any = window.localStorage.getItem("my_app_user");
  let getUserFormData = new FormData();
  getUserFormData.append("grant_type", "refresh_token");
  getUserFormData.append("refresh_token", currUser.refresh_token);
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/token/url/`, getUserFormData, {
        headers: {
          Authorization: "Basic {secret_key}",
        },
      })
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default RefreshToken;
