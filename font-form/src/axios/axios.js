import axios from 'axios';
import qs from 'qs';
import { baseUrl, cancleHTTP } from "./env.js";
axios.defaults.withCredentials = true;  //保持sessionid一样
// function getUrlParam(sessionId) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return decodeURIComponent(r[2].split("#")[0]);
//     return null;
// }

// axios.defaults.withCredentials = true;
// var reg = new RegExp("(^|&)sessionId=([^&]*)(&|$|#)");
// var urls = window.location.search.substr(1).match(reg);
// var url = '';
// if (urls != null) {
//     url = decodeURIComponent(urls[2].split("#")[0]);
// } else {
//     url = '4c944608b74c45f8994dadb66590ccc7'
// }
var $axios = axios.create({
    baseURL: baseUrl + "report-forms-center/",
    headers: {
    }
});

//POST传参序列化
$axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
    }
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});


export default $axios
