import Vue from 'vue'
export default (function (axios) {
    return {
        login: function (param, callback, error) {      //登录验证
            let params = param;
            axios.post("/users/session", params).then(res => { callback(res) })
        }
    }
})(new Vue().axios)
