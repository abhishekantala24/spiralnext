import { combineReducers } from "redux"

import authReducer from "./auth/authSlice"
import getBlogPostReducer from "./blog/blogSlice"
import lemReducer from './lem/lemSlice'

const reducer = combineReducers({
  Auth: authReducer,
  Blog: getBlogPostReducer,
  Lem: lemReducer,
})

export default reducer