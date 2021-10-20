import { combineReducers } from "redux";

import {
  ADD_FRIEND,
  ADD_REDDIT_ACCOUNT,
  ADD_TWITTER_ACCOUNT,
} from "../Types/types";

const INITIAL_STATE = {
  twitterAccounts: [],
  redditAccounts: [],
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  const { twitterAccounts, redditAccounts } = state;
  let updatedTwitterAccounts = twitterAccounts;
  let updatedRedditAccounts = redditAccounts;
  switch (action.type) {
    case ADD_TWITTER_ACCOUNT:
      updatedTwitterAccounts = AddTwitterAccount(twitterAccounts, action);
      break;
    case ADD_REDDIT_ACCOUNT:
      updatedRedditAccounts = AddRedditAccount(redditAccounts, action);
      break;
    default:
      return state;
  }

  return {
    twitterAccounts: updatedTwitterAccounts,
    redditAccounts: updatedRedditAccounts,
  };
};

const AddTwitterAccount = (twitterAccounts, action) => {
  var accountID = action.payload;
  var newState = {};
  //Check if twitter account exist
  for (var accountIndex in twitterAccounts) {
    if (twitterAccounts[accountIndex] == accountID) {
      return twitterAccounts;
    }
  }
  //Add New twitter account
  twitterAccounts.push(action.payload);
  return twitterAccounts;
};

const AddRedditAccount = (redditAccounts, action) => {
  var accountID = action.payload;
  //Check if reddit account exist
  for (var accountIndex in redditAccounts) {
    if (redditAccounts[accountIndex] == accountID) {
      return redditAccounts;
    }
  }
  //Add New reddit account
  redditAccounts.push(action.payload);
  return redditAccounts;
};

export default combineReducers({
  accounts: accountsReducer,
});
