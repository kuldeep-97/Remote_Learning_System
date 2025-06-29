import { configureStore } from "@reduxjs/toolkit";
// import authSlice  from "../features/authSlice"
import rootReduser from "./rootReduser";
import { authApi } from "@/features/apis/authApi";

export const appStore = configureStore({
    reducer: rootReduser,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
});