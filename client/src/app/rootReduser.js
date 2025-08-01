

import { courseApi } from "@/features/apis/courseApi";
import { authApi } from "../features/apis/authApi";

import authReducer from "../features/authSlice"

import { combineReducers } from "@reduxjs/toolkit"
import { purchaseApi } from "@/features/apis/purchaseApi";
import reducer from "../features/authSlice";
import { courseProgressApi } from "@/features/apis/progressApi";

 const rootReduser = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,

    auth:authReducer
})

export default rootReduser;