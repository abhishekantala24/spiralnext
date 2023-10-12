import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
 
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error)

const onResponse = (response: AxiosResponse): AxiosResponse => response

const onResponseError = async (error: AxiosError) => Promise.reject(error)

export const setupInterceptorsTo = (axiosObj: AxiosInstance): AxiosInstance => {
  axiosObj?.interceptors?.request?.use(onRequest, onRequestError)
  axiosObj?.interceptors?.response?.use(onResponse, onResponseError)
  return axiosObj
}