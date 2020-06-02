import querystring from 'querystring'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const instance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    responseType: 'json',
    transformRequest: [
        (data) => querystring.stringify(data),
    ],
    timeout: 60000,
})

instance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
}, (err: AxiosError<any>): Promise<any> => Promise.reject(err))

instance.interceptors.response.use((response: AxiosResponse<any>) => response, (err: AxiosError<any>) => {
    if (err && err.response) {
        // mesage
    }
})

const requests = (options: AxiosRequestConfig) => {
    // 实现
}

export default instance
