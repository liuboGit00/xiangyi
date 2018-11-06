import Vue from 'vue'
export default (function (axios) {
    return {
        getAllDataList: function (callback, error) {      //获取仓库所有数据列表
            axios.get("/data-tag-types/statistics").then(res => { callback(res) })
        },
        getAllData: function (callback, error) {      //获取仓库所有数据
            axios.get("/data-tag-stores/statistics").then(res => { callback(res) })
        },
        searchData: function (param,callback, error) {      //获取搜索数据
            let params = param
            axios.get("/data-tag-stores?"+params).then(res => { callback(res) })
        }
    }
})(new Vue().axios)
