import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    // reportlist: function (param, callback, error) {      //滚动列表加载
    //     let params = param;
    //     if (param) {
    //         params = Object.assign(params, this.pagepation)
    //     } else {
    //         params = this.pagepation
    //     }
    //     axios.get("/report-forms-themes", { params: params }).then(res => { callback(res)})
    // },
    reportmergerlen: function (callback, error) { //主题分类
      axios.get("/report-forms-themes").then(res => {
        callback(res)
      })
    },
    reportmergerTheme: function (param, callback, error) { //主题分类
      let params = param;
      axios.post("/report-forms-themes", params).then(res => {
        callback(res)
      })
    },
    reportmergernew: function (param, callback, error) { //新增报表
      let params = param;
      axios.post("/report-forms", params).then(res => {
        callback(res)
      })
    },
  }
})(new Vue().axios)
