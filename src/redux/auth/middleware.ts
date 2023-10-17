'use client'
import { createAsyncThunk } from "@reduxjs/toolkit"
import firebase from '@/firebase'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { toastConfig } from "../lem/types";
import { hideLoader, showLoader } from "../lem/lemSlice";

export const logoutAction = createAsyncThunk
  ("auth/logout",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        Cookies.remove('user')
        return true
      } catch (error: unknown) {
        return rejectWithValue(error as Error)
      }
    }
  )


export const loginUserByEmailAction = createAsyncThunk<
  any, any
>(
  "auth/loginByEmail",
  async (loginRequest: any, { rejectWithValue, dispatch }) => {
    dispatch(showLoader({ loading: true, message: 'empty' }))
    try {
      const auth = getAuth(firebase);
      const response = await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password)
      dispatch(hideLoader())

      if (response.user.email) {
        Cookies.set('user', response.user.email);
        return response.user
      }
      return rejectWithValue(response)
    } catch (error: unknown) {
      dispatch(hideLoader())
      return rejectWithValue(error as Error)
    }
  }
)

export const createAccountAction = createAsyncThunk<
  any, any
>(
  "auth/createAccount",
  async (loginRequest: any, { rejectWithValue, dispatch }) => {
    dispatch(showLoader({ loading: true, message: 'empty' }))
    try {
      const auth = getAuth(firebase);
      const response = await createUserWithEmailAndPassword(auth, loginRequest.email, loginRequest.password)
      const user = response.user
      await updateProfile(user, { displayName: loginRequest.username })
      dispatch(hideLoader())
      if (response.user.email) {
        return response.user
      }
      return rejectWithValue(response)
    } catch (error: any) {
      dispatch(hideLoader())
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use", toastConfig)
      }
      return rejectWithValue(error as Error)
    }
  }
) 