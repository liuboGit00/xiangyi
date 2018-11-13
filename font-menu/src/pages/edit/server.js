import Vue from 'vue'
export default (function (axios) {
    return {
        signInfoId: function (param, callback, error) {      //通过storedId获取信息
            let params = param;
            axios.get("/data-tag-stores/"+params).then(res => { callback(res) })    
        },
        saveData: function (param, callback, error) {      //通过storedId获取信息
            let params = param;
            axios.put("/data-tag-stores",params).then(res => { callback(res) })
        },
        AnumSign: function (param, callback, error) {      //通过personId获取信息---个人数签
            let params = param;
            axios.get("/data-tag-persons/"+params).then(res => { callback(res) })
        },
        saveAnumSign: function (param, callback, error) {      //通过personId获取信息---个人数签
            let params = param;
            axios.put("/data-tag-persons",params).then(res => { callback(res) })
        },
        uploadImg: function (param, callback, error) {      //通过personId获取信息---个人数签
            let params = param;
            axios.post("/upload/image",params,{"Content-Type": "multipart/form-data"}).then(res => { callback(res) })
        },
    }
})(new Vue().axios)
