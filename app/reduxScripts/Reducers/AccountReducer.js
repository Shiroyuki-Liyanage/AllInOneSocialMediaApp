import { combineReducers } from "redux";

import {
  ADD_FRIEND,
  ADD_REDDIT_ACCOUNT,
  ADD_TWITTER_ACCOUNT,
  UPDATE_ACCOUNTS,
  REMOVE_ACCOUNTS,
  UPDATE_ACCOUNT,
  CLEAR_ACCOUNT,
} from "../Types/types";

const INITIAL_STATE = {
  twitterAccounts: [],
  redditAccounts: [],
  accountUpdate: "",
  accountAction: "",
  accountValue: "",
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  const {
    twitterAccounts,
    redditAccounts,
    accountUpdate,
    accountAction,
    accountValue,
  } = state;
  let updatedTwitterAccounts = twitterAccounts;
  let updatedRedditAccounts = redditAccounts;
  let updatedAccountUpdate = accountUpdate;
  let updatedAccountAction = accountAction;
  let updatedAccountValue = accountValue;

  let accounts = {};

  switch (action.type) {
    case ADD_TWITTER_ACCOUNT:
      updatedTwitterAccounts = AddTwitterAccount(twitterAccounts, action);
      break;
    case ADD_REDDIT_ACCOUNT:
      updatedRedditAccounts = AddRedditAccount(redditAccounts, action);
      break;
    case UPDATE_ACCOUNTS:
      accounts = UpdateAccounts(twitterAccounts, redditAccounts, action);
      updatedTwitterAccounts = accounts.twitterAccounts;
      updatedRedditAccounts = accounts.redditAccounts;
      break;
    case REMOVE_ACCOUNTS:
      accounts = RemoveAccount(twitterAccounts, redditAccounts, action);
      updatedTwitterAccounts = accounts.twitterAccounts;
      updatedRedditAccounts = accounts.redditAccounts;
      break;
    case UPDATE_ACCOUNT:
      account = UpdateAccount(
        accountUpdate,
        accountAction,
        accountValue,
        action
      );
      updatedAccountUpdate = account.accountUpdate;
      updatedAccountAction = account.accountAction;
      updatedAccountValue = account.accountValue;
      break;
    case CLEAR_ACCOUNT:
      updatedTwitterAccounts = [];
      updatedRedditAccounts = [];
      updatedAccountUpdate = "";
      updatedAccountAction = "";
      updatedAccountValue = "";
      break;
    default:
      return state;
  }

  return {
    twitterAccounts: updatedTwitterAccounts,
    redditAccounts: updatedRedditAccounts,
    accountUpdate: updatedAccountUpdate,
    accountAction: updatedAccountAction,
    accountValue: updatedAccountValue,
  };
};

const UpdateAccount = (accountUpdate, accountAction, accountValue, action) => {
  accountUpdate = action.payload.accountID;
  accountAction = action.payload.action;
  accountValue = action.payload.value;

  return {
    accountUpdate: accountUpdate,
    accountAction: accountAction,
    accountValue: accountValue,
  };
};

const RemoveAccount = (twitterAccounts, redditAccounts, action) => {
  var accountID = action.payload;

  for (var accountIndex in twitterAccounts) {
    if (twitterAccounts[accountIndex] == accountID) {
      twitterAccounts.splice(accountIndex, 1);
      console.log(twitterAccounts);
      return {
        redditAccounts: redditAccounts,
        twitterAccounts: twitterAccounts,
      };
    }
  }

  for (var accountIndex in redditAccounts) {
    if (redditAccounts[accountIndex] == accountID) {
      redditAccounts.splice(accountIndex, 1);
      return {
        redditAccounts: redditAccounts,
        twitterAccounts: twitterAccounts,
      };
    }
  }
};

const UpdateAccounts = (twitterAccounts, redditAccounts, action) => {
  var accounts = action.payload;
  for (var accountID in accounts) {
    if (accounts[accountID].accountType == "Reddit") {
      if (!redditAccounts.includes(accountID)) {
        redditAccounts.push(accountID);
      }
    } else if (accounts[accountID].accountType == "Twitter") {
      if (!twitterAccounts.includes(accountID)) {
        twitterAccounts.push(accountID);
      }
    }
  }

  return {
    redditAccounts: redditAccounts,
    twitterAccounts: twitterAccounts,
  };
};

const AddTwitterAccount = (twitterAccounts, action) => {
  var accountID = action.payload;
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
