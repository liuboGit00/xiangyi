import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportlistpublish: function (param, callback, error) { //滚动列表加载
      let params = param;
      if (param) {
        params = Object.assign(params, this.pagepation)
      } else {
        params = this.pagepation
      }
      axios.get("/report-publishing/publishing", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    reportlist: function (param, callback, error) { //滚动列表加载
      let params = param;
      if (param) {
        params = Object.assign(params, this.pagepation)
      } else {
        params = this.pagepation
      }
      axios.get("/reports", {
        params: params
      }).then(res => {
        callback(res)
      })
    },
    reportsdelete: function (param, callback, error) {
      let params = param;
      axios.delete("/reports/" + params).then(res => {
        callback(res)
      })
    },
    reportspublishdelete: function (param, callback, error) {
      let params = param;
      axios.delete("/report-publishing/publishing/" + params).then(res => {
        callback(res)
      })
    },
    reportthemeupdate: function (param, callback, error) {
      let params = param;
      axios.put("/reports", params).then(res => {
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
  }
})(new Vue().axios)
