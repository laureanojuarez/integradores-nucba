import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistedReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
