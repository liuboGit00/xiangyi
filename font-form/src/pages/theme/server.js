import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportlist: function (param, callback, error) { //滚动列表加载
      let params = param;
      // if (param) {
      //   params = Object.assign(params, this.pagepation)
      // } else {
      //   params = this.pagepation
      // }
      axios.get("/report-forms-themes", {
        params: params
      }).then(res => {
        callback(res)
      })
    },
    reporttitles: function (param, callback, error) { //报告合并
      let params = param;
      axios.get("/report-forms", {
        params: params
      }).then(res => {
        callback(res)
      })
    },
    reportmerger: function (param, callback, error) { //报告合并
      let params = param;
      axios.put("/report-forms-themes", params).then(res => {
        callback(res)
      })
    },
    reportdelete: function (param, callback, error) { //报告合并
      let params = param;
      axios.delete("/report-forms-themes/" + params).then(res => {
        callback(res)
      })
    }
  }
})(new Vue().axios)
