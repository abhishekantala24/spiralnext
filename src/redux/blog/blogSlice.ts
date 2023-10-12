import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { getBlogPostAction, getCurrntBlogPostAction } from "./middleware"

const INITIAL_STATE: any = {
    blogData: [],
    currBlogData: null
}

const getBlogPostSlice = createSlice({
    name: "getBlogPost",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogPostAction.fulfilled, (state, { payload }) => ({
            ...state,
            blogData: payload,
        }))
        builder.addCase(getCurrntBlogPostAction.rejected, (state, { payload }) => ({
            ...state,
            currBlogData: null,
        }))
        builder.addCase(getCurrntBlogPostAction.fulfilled, (state, { payload }) => ({
            ...state,
            currBlogData: payload,
        }))
    },
})


export const blogSelector = (state: RootState) => state?.Blog

export default getBlogPostSlice.reducer