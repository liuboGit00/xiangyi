import Vue from 'vue'
export default (function (axios) {
  return {
    pagepation: "", //翻页
    reportreceive: function (param, callback, error) { //滚动列表加载
      let params = param;
      // let paramreceive={};
      if (param) {
        params = Object.assign(params, this.pagepation)
      } else {
        params = this.pagepation;
      }
      // let paramsreceive = Object.assign(params, { isRead: 0 })
      // for (let key in paramsreceive) {
      //     if (key == "isReply"){
      //         delete paramsreceive[key]
      //     }
      // }
      // params['isRead'] = 0;
      axios.get("/report-publishing/receiving", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    reportpublic: function (param, callback, error) { //滚动列表加载
      let params = param;
      if (param) {
        params = Object.assign(params, this.pagepation);
      } else {
        params = this.pagepation;
      }
      // params = Object.assign(params, { isReply: 1 })
      // for (let key in params) {
      //     if (key == "isRead") {
      //         delete params[key]
      //     }
      // }      
      // params['isReply'] = 1;      
      axios.get("/report-publishing/publishing", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    staticpublic: function (param, callback, error) { //滚动列表加载
      let params = param;
      axios.get("/report-publishing/publishing/statistics", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    staticreceive: function (param, callback, error) { //滚动列表加载
      let params = param;
      axios.get("/report-publishing/receiving/statistics", {
          params: params
        })
        .then(res => {
          callback(res)
        })
    },
    datastatistics: function (param, callback, error) { //报告分类统计报告
      let params = param;
      axios.get("/reports/statistics/" + params)
        .then(res => {
          callback(res)
        })
    },
  }
})(new Vue().axios)
