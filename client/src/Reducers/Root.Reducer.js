import { combineReducers } from "redux";
import RoomReducer from "./Rooms.Reducers";
import AuthReducer from "./Auth.Reducer";
import UsersReducer from "./Users.Reducer";

const RootReducer = combineReducers({
  me: AuthReducer,
  rooms: RoomReducer,
  users: UsersReducer
});

export default RootReducer;
