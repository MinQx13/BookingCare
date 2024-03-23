import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const auserPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"]
};

const appPersistConFig = {
  ...persistCommonConfig,
  key: 'app',
  whitelist: ['Language']
}

export default (history) =>combineReducers({
    router: connectRouter(history),
    user: persistReducer(auserPersistConfig, userReducer),
    app: persistReducer(appPersistConFig,appReducer),
    admin: adminReducer
  })
