import * as SecureStore from "expo-secure-store";

//Gets my personal user details
const GetMe = async () => {
  var myHeaders = new Headers();

  var Token = await SecureStore.getItemAsync("secure_token");
  console.log(Token);
  myHeaders.append("Authorization", "Bearer " + Token);
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

export default GetMe;
