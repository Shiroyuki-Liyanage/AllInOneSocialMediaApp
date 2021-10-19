import { combineReducers } from "redux";
import { ADD_FRIEND, CHECK_ACCOUNT } from "../Types/types";

const INITIAL_STATE = {
  current: [],
  possible: ["Alice", "Bob", "Sammy"],
  account: [],
};

const accountsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FRIEND:
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const { current, possible } = state;

      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      const addedFriend = possible.splice(action.payload, 1);

      // And put friend in friends.current
      current.push(addedFriend);

      // Finally, update the redux state
      var newState = { current, possible };

      return newState;
    case CHECK_ACCOUNT:
      const { account } = state;
      account.push(action.payload);
      var newState = { account };
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  accounts: accountsReducer,
});
