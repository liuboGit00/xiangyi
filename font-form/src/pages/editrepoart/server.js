import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportlisttemplate: function (param, callback, error) { //模板列表
      let params = param;
      if (param) {
        params = Object.assign(params, this.pagepation)
      } else {
        params = this.pagepation
      }
      axios.get("/report-templates", {
        params: params
      }).then(res => {
        callback(res)
      })
    },
    reportsave: function (param, callback, error) { //模板保存
      let params = param;
      axios.post("/reports", params).then(res => {
        callback(res)
      })
    },
    reportorganize: function (param, callback, error) { //获取组织架构
      let params = param;
      axios.get("/users/organize", params).then(res => {
        callback(res)
      })
    },
    reportorganizechild: function (param, callback, error) { //获取组织架构
      let params = param;
      axios.get("/users/organize/" + params).then(res => {
        callback(res)
      })
    },
    reportpublish: function (param, callback, error) { //模板保存
      let params = param;
      axios.post("/report-publishing", params).then(res => {
        callback(res)
      })
    },
    reportforms: function (param, callback, error) { //获取组织架构
      let params = param;
      axios.get("/report-forms", params).then(res => {
        callback(res)
      })
    },
    reportformstheme: function (param, callback, error) { //获取组织架构
      let params = param;
      axios.get("/report-forms/themes", params).then(res => {
        callback(res)
      })
    },
  }
})(new Vue().axios)
