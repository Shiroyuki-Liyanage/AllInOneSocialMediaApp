import * as SecureStore from "expo-secure-store";
import { GetTwitterAuthKey } from "./StoreAuthKey";

//Gets my personal user details
export const GetMe = async () => {
  var myHeaders = new Headers();

  var AuthToken = await GetTwitterAuthKey();

  myHeaders.append("Authorization", "Bearer " + AuthToken);
  myHeaders.append(
    "Cookie",
    'guest_id=v1%3A163434148016875536; personalization_id="v1_vbrITI2+ZEDvtB+fOYtVbQ=="'
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.twitter.com/2/users/2401655624", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

//Gets my personal user details
export const GetProfileImage = async () => {
  var myHeaders = new Headers();

  var AuthToken = await GetTwitterAuthKey();

  myHeaders.append("Authorization", "Bearer " + AuthToken);
  myHeaders.append(
    "Cookie",
    'guest_id=v1%3A163434148016875536; personalization_id="v1_vbrITI2+ZEDvtB+fOYtVbQ=="'
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    "https://api.twitter.com/1.1/users/show.json?screen_name=Yuki_Liyanage",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      //console.log(JSON.parse(result));
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};
