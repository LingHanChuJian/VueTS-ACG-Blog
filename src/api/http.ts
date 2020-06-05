import { ResponseError } from '@/types/api'
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'

const responseError: ResponseError[] = [
    {
        status: 400,
        message: '请求错误 (400)',
    },
    {
        status: 401,
        message: '未授权，请重新登录 (401)',
    },
    {
        status: 403,
        message: '拒绝访问 (403)',
    },
    {
        status: 404,
        message: '请求出错 (404)',
    },
    {
        status: 408,
        message: '请求超时 (408)',
    },
    {
        status: 500,
        message: '服务器错误 (500)',
    },
    {
        status: 501,
        message: '服务未实现 (501)',
    },
    {
        status: 502,
        message: '网络错误 (502)',
    },
    {
        status: 503,
        message: '服务不可用 (503)',
    },
    {
        status: 504,
        message: '网络超时 (504)',
    },
    {
        status: 505,
        message: 'HTTP版本不受支持 (505)',
    },
]

const instance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: true,
    timeout: 10000,
})

instance.interceptors.response.use((response: AxiosResponse) => response, (error: AxiosError) => {
    if (error && error.response) {
        const itemError: ResponseError | undefined = responseError.find((item) => item.status === (error.response as AxiosResponse).status)
        error.message = itemError ? itemError.message : `连接出错(${error.response.status})!`
    } else {
        error.message = '连接服务器失败，请检查网络连接或联系管理员'
    }
    return Promise.reject(error)
})


export default instance
