import * as SecureStore from "expo-secure-store";

export const StoreAuthKey = async () => {
  await SecureStore.setItemAsync("secure_token", "");
};

export const GetAuthKey = async () => {
  const token = await SecureStore.getItemAsync("secure_token");
  return token;
};
