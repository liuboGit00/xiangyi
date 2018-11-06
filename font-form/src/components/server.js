import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportmergerlen: function (callback, error) { //主题分类
      axios.get("/report-forms-themes").then(res => {
        callback(res)
      })
    },
  }
})(new Vue().axios)
