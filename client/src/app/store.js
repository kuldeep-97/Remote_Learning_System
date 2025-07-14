import { configureStore } from "@reduxjs/toolkit";
// import authSlice  from "../features/authSlice"
import rootReduser from "./rootReduser";
import { authApi } from "@/features/apis/authApi";
import { courseApi } from "@/features/apis/courseApi";

export const appStore = configureStore({
    reducer: rootReduser,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,courseApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();  