

import { courseApi } from "@/features/apis/courseApi";
import { authApi } from "../features/apis/authApi";

import authReducer from "../features/authSlice"

import { combineReducers } from "@reduxjs/toolkit"

 const rootReduser = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth:authReducer
})

export default rootReduser;