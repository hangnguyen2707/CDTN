import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import packageReducer from "./packageReducer";
import transactionPointReducer from "./transactionPointReducer";
import warehouseReducer from "./warehouseReducer";

const commonConfix = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfix,
    key: 'auth',
    whitelist: ['isLogged', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    package: packageReducer,
    transactionPoint: transactionPointReducer,
    warehouse: warehouseReducer
})

export default rootReducer