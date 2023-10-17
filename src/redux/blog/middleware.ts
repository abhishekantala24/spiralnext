import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getBlogPostAsync, getCurrentBlogPostAsync } from "./service";
import { hideLoader, showLoader } from "../lem/lemSlice";

export const getBlogPostAction = createAsyncThunk<
    any
>(
    "getBlogPost",
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(showLoader({ loading: true, message: 'empty' }))
        try {
            const response: AxiosResponse<any> = await getBlogPostAsync()
            dispatch(hideLoader())
            if (response?.status === 200) {
                return response?.data
            }
            return rejectWithValue(response)
        } catch (error: unknown) {
            return rejectWithValue(error as Error)
        }
    }
)

export const getCurrntBlogPostAction = createAsyncThunk<
    any, any
>(
    "getCurrentBlogPost",
    async (request: number, { rejectWithValue, dispatch }) => {
        dispatch(showLoader({ loading: true, message: 'empty' }))
        try {
            const response: AxiosResponse<any> = await getCurrentBlogPostAsync(request)
            dispatch(hideLoader())
            if (response?.status === 200) {
                return response?.data
            }
            return rejectWithValue(response)
        } catch (error: unknown) {
            return rejectWithValue(error as Error)
        }
    }
)