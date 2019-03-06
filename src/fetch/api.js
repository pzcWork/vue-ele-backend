import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie';
import Vue from 'vue'
const vue = new Vue();
// axios 配置
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Authorization'] = 'Basic YWRtaW46Y2hhbmdlaXQ='
axios.defaults.headers.get['Authorization'] = 'Basic YWRtaW46Y2hhbmdlaXQ='
axios.defaults.headers.get['Content-Type'] = 'application/json'

// axios.defaults.baseURL =  process.env.NODE_ENV == "production"?'/api':""
//let loadingIns={}
const showNetworkError = msg => {
    const options = typeof msg === 'object'
        ? msg
        : {
            type: 'error',
            message: msg,
            duration: 2000
        };
    Message(options).$el.style['z-index'] = '999999';
}
const showNetworkSuccess = msg => {
    const options = typeof msg === 'object'
        ? msg
        : {
            type: 'success',
            message: msg,
            duration: 2000
        };
    Message(options).$el.style['z-index'] = '999999';
}
axios.interceptors.request.use((config) => {
        if(config.method  === 'post'){
            config.data = qs.stringify(config.data);
        }
        //let loadingIns = Loading.service({fullscreen:true})
        return config
    }, (error) => {
        //loadingIns.close()
        return Promise.reject(error);
    })



axios.interceptors.response.use(function (response) {
    //loadingIns.close()
    // console.log(response)
    return response
    }, (error) => {
        //loadingIns.close()
        if (!error.response) {
            if (error.message.indexOf("timeout") == 0) {
                showNetworkError('由于网络太长时间没有回应，操作已经超时')
            } else {
                showNetworkError('您当前网络无法正常连接到服务器')
            }
        } else {
            switch (error.response.status) {
                case 401:
                    break;
                case 403:
                    showNetworkError("没有权限");
                    break;
                case 404:
                    showNetworkError("网络错误");
                    break;
                case 500:
                    showNetworkError("服务器内部错误");
                    break;
            }
        }
        return Promise.reject(error);
    })

export const fetch = (url, params) => {
    //console.log('params', params);
    let errorHandle = false;
    let notice = false;
    let showMsg = false;
    let type = 'post';
    let isShowMsg = true;
    if (params) {
        errorHandle = params.errorHandle
        notice = params.notice
        isShowMsg = params.isShowMsg
        type = params.type?params.type:'post'
        delete params.notice
        delete params.showMsg
        // delete params.errorHandle
    }
    return new Promise((resolve, reject) => {
        axios[type](url, params || {}).then(({data}) => {
                if(data == 10005 || data.code == 10005){
                    store.dispatch("loginOut");
                }
                if (errorHandle !== true) {
                    if(data == 10005 || data.code == 10005){
                        if(showMsg !== true){
                            showNetworkError('登录已失效，请重新登录');
                        }
                    }
                    if (data.code != 0 && data.msg && data.code != 10005) {
                        // const msgVm = NbMessage.error(data.Message);
                        // noticekongzhi
                        if(isShowMsg){
                            showNetworkError(data.msg)
                        }
                    }else if(data.code == 0 && notice){
                        showNetworkSuccess(notice);
                    }
                }
                resolve(data);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export const _getUserInfo = () => {
    return fetch('/admin/manager/info', {
        type:'get'
    })
}
export const _loginOut = () =>{
    return fetch('/admin/manager/logout', {
        type:'get',
    })
    
}
export const _getUserDetail= () =>{
    return fetch('http://192.168.10.7:8380/db/coll', {
        type:'get',
    })
    
}
export default {
    common(url, params) {
        return fetch(url, params)
    }
}