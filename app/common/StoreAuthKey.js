import * as SecureStore from "expo-secure-store";
import { API_TOKEN } from "@env";

export const GetTwitterAuthKey = () => {
  const token = API_TOKEN;
  return token;
};
