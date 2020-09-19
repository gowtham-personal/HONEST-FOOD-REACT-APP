import { combineReducers } from "redux";
import geoReducer from "../screens/geoCoding/geoReducers";

const rootReducer = combineReducers({
  geoReducer
});
export default rootReducer;
