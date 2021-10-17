import AsyncStorage from "@react-native-async-storage/async-storage";
export const StoreAccountTwitterFollows = async (accountID, data) => {
  try {
    await AsyncStorage.setItem(accountID, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const GetsAccountTwitterFollows = async (accountID) => {
  try {
    var res = await AsyncStorage.getItem(accountID);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
