import axios from 'axios';
import { baseUrl, cancleHTTP } from "./env.js";
import {Tool} from '@/assets/js/tool.js';

axios.defaults.withCredentials = true;  //保持sessionid一样
var $axios = axios.create({
    baseURL: baseUrl + 'data-menu-center',
    headers: {
    }
});

//POST传参序列化
$axios.interceptors.request.use((config) => {
    Tool.loading()      //加载遮罩
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});


export default $axios
