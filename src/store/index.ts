import { configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth";
import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store