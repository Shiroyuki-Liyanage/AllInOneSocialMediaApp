import { ADD_FRIEND } from "../Types/types";
import { ADD_TWITTER_ACCOUNT } from "../Types/types";

export const addFriend = (friendsIndex) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const AddTwitterAccount = (accountID) => ({
  type: ADD_TWITTER_ACCOUNT,
  payload: accountID,
});
