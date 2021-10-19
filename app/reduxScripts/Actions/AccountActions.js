import { ADD_FRIEND } from "../Types/types";
import { CHECK_ACCOUNT } from "../Types/types";

export const addFriend = (friendsIndex) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const checkAccount = (accountID) => ({
  type: CHECK_ACCOUNT,
  payload: accountID,
});
