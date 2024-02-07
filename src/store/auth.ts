import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user_id?: string;
  email?: string;
  name?: string;
  isAuthenticated?: boolean;
}

const initialAuthState: AuthState = {};

const AuthSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    isAuthenticated(state){
      if(localStorage.getItem("isAuthenticated")!==null){
        state = {
          isAuthenticated: true,
          email: localStorage.getItem("email")!,
          name: localStorage.getItem("name")!,
          user_id: localStorage.getItem("user_id")!,
        };
      } else {
        state = {
          isAuthenticated: false
        };
      }
      return state;
    },
    login(
      state,
      {
        payload,
      }: { payload: { email: string; name: string; user_id: string } },
    ) {
      localStorage.setItem("email",payload.email);
      localStorage.setItem("name",payload.name);
      localStorage.setItem("user_id", payload.user_id);
      localStorage.setItem("isAuthenticated", "true");
      state = {
        isAuthenticated: true,
        ...payload,
      };
      return state
    },
    logout(state) {
      state = {
        isAuthenticated: false,
      };
      localStorage.removeItem("isAuthenticated")
      return state;
    },
  },
});

export const { login, logout, isAuthenticated } = AuthSlice.actions;
export default AuthSlice.reducer;
