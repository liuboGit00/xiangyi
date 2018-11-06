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
      axios.get("/report-publishing/publishing", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    }
  }
})(new Vue().axios)
