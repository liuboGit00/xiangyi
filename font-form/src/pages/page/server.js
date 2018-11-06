import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportmergerEchart: function (param, callback, error) { //主题分类
      let params = param;
      axios.get("/report-forms/bi-chart/" + params).then(res => {
        callback(res)
      })
    },
  }
})(new Vue().axios)
