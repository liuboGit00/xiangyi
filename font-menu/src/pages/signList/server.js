import Vue from 'vue'
export default (function (axios) {
    return {
        signList: function (param, callback, error) {      
            let params = param;
            axios.get("/data-tag-stores?"+params).then(res => { callback(res) })
        },
        signListSearch: function (param, callback, error) {      
            let params = param;
            axios.get("/data-tag-stores?"+params).then(res => { callback(res) })
        },
        favoritesPost: function (param, callback, error) {      //收藏
            let params = param;
            axios.post("/data-tag-favorites/"+params).then(res => { callback(res) })
        },
        favoritesDel: function (param, callback, error) {      //取消收藏
            let params = param;
            axios.delete("/data-tag-favorites/"+params).then(res => { callback(res) })
        }
    }
})(new Vue().axios)