import { setUser } from "@/service/token"
import axiosInstance, { isAxiosError } from "@/service/api"
 
import { LoginRequestModel, LogoutRequestModel } from "../../types/RequestTypes"
import { LoginResponseModel } from "../../types/ResponseTypes"
import { config } from "../../utils/config"

export const loginWithEmailAsync = async (loginRequest: LoginRequestModel) => {
  try {
    const response = await axiosInstance.get<LoginResponseModel>(`${config.apiURL}/api/Login/Login?email=${loginRequest.Email}&password=${loginRequest.password}&browserType=google&BrowserVersions=1.2`)

    setUser(response?.data?.token)
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}

export const logoutActionAsync = async (loginRequest: LogoutRequestModel) => {
  try {
    const response = await axiosInstance.post<LoginResponseModel>(`${config.apiURL}/api/Login/Logout`, loginRequest)

    return response
  } catch (err) {
    return isAxiosError(err)
  }
}