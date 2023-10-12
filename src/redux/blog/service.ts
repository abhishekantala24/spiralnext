import axiosInstance, { isAxiosError } from "@/service/api"


export const getBlogPostAsync = async () => {
  try {
    const response = await axiosInstance.get('https://www.melivecode.com/api/attractions')
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}

export const getCurrentBlogPostAsync = async (request: number) => {
  try {
    const response = await axiosInstance.get(`https://www.melivecode.com/api/attractions/${request}`)
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}