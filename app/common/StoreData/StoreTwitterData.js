import AsyncStorage from "@react-native-async-storage/async-storage";
export const StoreAccountTwitterFollows = async (accountID, data) => {
  try {
    await AsyncStorage.setItem(accountID, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const GetsAccountTwitterFollows = async (accountID, update) => {
  try {
    if (typeof update !== "undefined") {
      await AsyncStorage.removeItem(accountID);
      console.log("Removed");
      return null;
    }
    var res = await AsyncStorage.getItem(accountID);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
