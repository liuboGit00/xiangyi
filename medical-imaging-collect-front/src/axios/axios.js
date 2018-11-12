import axios from 'axios';
import qs from 'qs';

// function getUrlParam(sessionId) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return decodeURIComponent(r[2].split("#")[0]);
//     return null;
// }

axios.defaults.withCredentials = true;
var reg = new RegExp("(^|&)sessionId=([^&]*)(&|$|#)");
var urls = window.location.search.substr(1).match(reg);

// var url = '';
// if (urls != null) {
//     url = decodeURIComponent(urls[2].split("#")[0]);
// } else {
//     url = '4c944608b74c45f8994dadb66590ccc7'
// }
// console.log(url);
// sessionStorage.setItem('sessionId', url);

var $axios = axios.create({
    baseURL: 'http://10.6.244.5:8877',
    //    baseURL : 'http://172.19.23.169:8877',
    // baseURL: 'http://suneee.dcp.weilian.cn',
    // timeout: 5000,
    // headers: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    // }
});

//POST传参序列化
$axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        // if(config.headers['Content-Type'] = 'application/x-www-form-urlencoded'){
        //     config.data = qs.stringify(config.data);
        // }
        
    }
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

export default $axios
