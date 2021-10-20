import { combineReducers } from "redux";
import { ADD_FRIEND, ADD_TWITTER_ACCOUNT } from "../Types/types";

const INITIAL_STATE = {
  twitterAccounts: [],
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TWITTER_ACCOUNT:
      const { twitterAccounts } = state;
      return AddTwitterAccount(twitterAccounts, action);
    default:
      return state;
  }
};

const AddTwitterAccount = (twitterAccounts, action) => {
  var accountID = action.payload;
  var newState = {};
  //Check if twitter account exist
  for (var accountIndex in twitterAccounts) {
    if (twitterAccounts[accountIndex] == accountID) {
      console.log(":o");
      newState = { twitterAccounts };
      return newState;
    }
  }
  //Add New twitter account
  twitterAccounts.push(action.payload);
  newState = { twitterAccounts };
  return newState;
};

export default combineReducers({
  accounts: accountsReducer,
});
