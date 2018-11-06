import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportlist: function (param, callback, error) { //滚动列表加载
      let params = param;
      if (param) {
        params = Object.assign(params, this.pagepation)
      } else {
        params = this.pagepation
      }
      axios.get("/report-publishing/receiving", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    reporisreply: function (param, callback, error) {
      let params = param;
      axios.put("/report-publishing/receiving", params).then(res => {
        callback(res)
      })
    },
    reportreceivesdelete: function (param, callback, error) {
      let params = param;
      axios.delete("/report-publishing/receiving/" + params).then(res => {
        callback(res)
      })
    },
    reportreceivesput: function (param, callback, error) {
      let params = param;
      axios.put("/report-publishing/receiving", params).then(res => {
        callback(res)
      })
    },
  }
})(new Vue().axios)
