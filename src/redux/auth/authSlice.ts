import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { getUser } from "@/service/token"
import { LoginResponseModel } from "@/types/ResponseTypes"
import { createAccountAction, loginUserByEmailAction, logoutAction } from "./middleware"

const INITIAL_STATE: LoginResponseModel = {
  response: 0,
  responsemassage: "",
  userDetails: null,
  account: null
}

const authSlice = createSlice({
  name: "Auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutAction.fulfilled, (state) => ({
      ...state,
      userDetails: undefined,
    }))
    builder.addCase(loginUserByEmailAction.fulfilled, (state, { payload }) => ({
      ...state,
      userDetails: payload
    }))
    builder.addCase(createAccountAction.fulfilled, (state, { payload }) => ({
      ...state,
      account: payload
    }))
  },
})

export const authSelector = (state: RootState) => state?.Auth

export default authSlice.reducer