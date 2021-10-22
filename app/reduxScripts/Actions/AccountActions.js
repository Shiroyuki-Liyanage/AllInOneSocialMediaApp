import {
  ADD_FRIEND,
  ADD_TWITTER_ACCOUNT,
  ADD_REDDIT_ACCOUNT,
  UPDATE_ACCOUNTS,
} from "../Types/types";

export const addFriend = (friendsIndex) => ({
  type: ADD_FRIEND,
  payload: friendsIndex,
});

export const AddTwitterAccount = (accountID) => ({
  type: ADD_TWITTER_ACCOUNT,
  payload: accountID,
});

export const AddRedditAccount = (accountID) => ({
  type: ADD_REDDIT_ACCOUNT,
  payload: accountID,
});

export const UpdateAccounts = (accounts) => ({
  type: UPDATE_ACCOUNTS,
  payload: accounts,
});
