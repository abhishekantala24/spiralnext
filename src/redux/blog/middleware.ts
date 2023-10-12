import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getBlogPostAsync, getCurrentBlogPostAsync } from "./service";

export const getBlogPostAction = createAsyncThunk<
    any
>(
    "getBlogPost",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response: AxiosResponse<any> = await getBlogPostAsync()
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
        try {
            const response: AxiosResponse<any> = await getCurrentBlogPostAsync(request)
            if (response?.status === 200) {
                return response?.data
            }
            return rejectWithValue(response)
        } catch (error: unknown) {
            return rejectWithValue(error as Error)
        }
    }
)