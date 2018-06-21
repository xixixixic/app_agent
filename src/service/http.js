import axios from 'axios'
import router from '../router'
import store from 'store/index'
import {BASE_URL, PAY_BASE_URL, APPOINT_BASE_URL} from 'service/base-url.js'
import {RET_NOLOGIN, RET_CLIENT, RET_SERVER} from 'service/variable.js'
import {loginUrl, clientloginUrl} from 'service/login-url.js'
export function fetch (options) {
    return new Promise((resolve, reject) => {
        let instance
        if (options.payBaseUrlFlag === true) {
            instance = axios.create({
                baseURL: PAY_BASE_URL
            })
        } else if (options.appointFlag === true) {
            instance = axios.create({
                baseURL: APPOINT_BASE_URL
            })
        } else {
            instance = axios.create({
                baseURL: BASE_URL
            })
        }
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            if (store.state.token) {
                config.headers.token = `${store.state.token}`
            }
            return config
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error)
        })
        instance.interceptors.request.use(function (response) {
            // 请求拦截
            return response
        }, function (error) {
            return Promise.reject(error)
        })
        instance(options).then(response => {
            const res = response.data
            switch (res.ret) {
                case RET_NOLOGIN: {
                    console.log(store.state.webStatus + ' NOLOGINwebStatus')
                    if (store.state.webStatus === true) {
                        location.href = loginUrl
                        console.log('代理人')
                    } else {
                        location.href = clientloginUrl
                        console.log('客户')
                    }
                    reject(res)
                    break
                }
                case RET_CLIENT: {
                    router.push({
                        path: '/clientError',
                        query: {
                            msg: res.msg
                        }
                    })
                    reject(res)
                    break
                }
                case RET_SERVER: {
                    router.push({
                        path: '/serverError',
                        query: {
                            msg: res.msg
                        }
                    })
                    reject(res)
                    break
                }
            }
            resolve(res)
        }).catch(error => {
            console.log('error', error)
            reject(error)
        })
    })
}