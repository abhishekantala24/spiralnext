import axios, { AxiosInstance } from "axios"

import { setupInterceptorsTo } from "./setupInterceptor"

import { config } from "../utils/config"

import { ErrorResponse } from "./SuccessResponse"

const instance: AxiosInstance = axios.create({
  baseURL: config.apiURL,
  timeout: 1000 * 50,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  },
})
const specificInstance: AxiosInstance = setupInterceptorsTo(instance)

export const isAxiosError = (err: any): ErrorResponse | any => {
  console.log(err);
  
  if (axios.isAxiosError(err)) {
    
    if (err?.response && err?.response?.data) {
      if (err?.response?.status === 404) return { status: 404, statusText: err?.message } as ErrorResponse
      return err?.response?.data as ErrorResponse
    }
    return { status: err?.code, statusText: err?.message } as ErrorResponse
  }
  return { status: err?.code, statusText: err?.message } as ErrorResponse
}

export default specificInstance