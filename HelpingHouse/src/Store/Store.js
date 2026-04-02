import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/loginReducer.js";
import helpingHouseReducer from "./HelipngHouse/HelpingHouseReducer.js";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    helpingHouse: helpingHouseReducer,
  },
});
