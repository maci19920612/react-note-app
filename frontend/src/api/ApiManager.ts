import Axios, { AxiosAdapter, AxiosRequestConfig } from "axios";

Axios.create({
    transformRequest: (request: AxiosRequestConfig, headers) => {
        return {
            ...request,
            data: "random"
        }
    }
});