import * as SecureStore from "expo-secure-store";

export const GetTwitterAuthKey = async () => {
  const token = await SecureStore.getItemAsync("secure_token");
  return token;
};
