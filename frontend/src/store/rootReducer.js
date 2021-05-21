import {combineReducers} from "redux";
import usersSlice from "./slices/userSlices";
import cocktailSlice from "./slices/cocktailSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  cocktails: cocktailSlice.reducer,
});

export default rootReducer;