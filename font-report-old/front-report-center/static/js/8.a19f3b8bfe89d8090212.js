webpackJsonp([8],{EPh0:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("woOf"),a=e.n(i),n={props:["dialogOpt"],data:function(){return{options:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],value:""}},computed:{dialogobj:function(){return a()(this.dialogOpt)}},components:{Dialogcomponent:e("nkcX").a},methods:{dialogHandle:function(t,s){if("close"==s)switch(t){case"编辑1":case"编辑2":console.log("执行"+t)}if("sure"==s)switch(t){case"编辑1":case"编辑2":console.log("执行"+t)}this.$emit("select-dialog",t,s)}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{},[e("Dialogcomponent",{attrs:{dialogobj:t.dialogobj},on:{"dialog-cancle":t.dialogHandle,"dialog-sure":t.dialogHandle}},["编辑1"==t.dialogobj.title?e("div",[t._v(t._s(t.dialogobj.title))]):t._e(),t._v(" "),"编辑3"==t.dialogobj.title?e("div",[t._v(t._s("33333"))]):t._e()])],1)},staticRenderFns:[]};var r,o=e("VU/8")(n,c,!1,function(t){e("tib2")},"data-v-1d67a198",null).exports,l=e("7+uW"),v=(r=(new l.default).axios,{pagepation:"",reportreceive:function(t,s,e){var i=t;i=t?a()(i,this.pagepation):this.pagepation,r.get("/report-publishing/receiving",{params:i}).then(function(t){s(t)})},reportpublic:function(t,s,e){var i=t;i=t?a()(i,this.pagepation):this.pagepation,r.get("/report-publishing/publishing",{params:i}).then(function(t){s(t)})},staticpublic:function(t,s,e){var i=t;r.get("/report-publishing/publishing/statistics",{params:i}).then(function(t){s(t)})},staticreceive:function(t,s,e){var i=t;r.get("/report-publishing/receiving/statistics",{params:i}).then(function(t){s(t)})},datastatistics:function(t,s,e){var i=t;r.get("/reports/statistics/"+i).then(function(t){s(t)})}});function p(t){return("00"+t).substr(t.length)}var u={data:function(){return{isLastPage:!1,pagepation:{pageNum:1,pageSize:10},serverobject:v,itemreceive:[],itempublic:[],staticcount:[],staticreport:[],staticpublic:{},staticreceive:{}}},components:{Dialog:o},mounted:function(){this.ajaxshow(),""==document.getElementsByClassName("page")[0].style.display&&this.$emit("typeShow",!1)},methods:{reportCheck:function(){this.$router.push({path:"/reportwatch"})},reportReception:function(){this.$router.push({path:"/reportreceive"})},ajaxshow:function(){var t=this;t.isLastPage=!0,t.serverobject.pagepation=t.pagepation,v.reportreceive({isRead:0},function(s){var e=s.data.data;t.itemreceive=e.list}),v.reportpublic({isReply:1},function(s){var e=s.data.data;t.itempublic=e.list}),v.staticpublic("",function(s){t.staticpublic=s.data.data}),v.staticreceive("",function(s){t.staticreceive=s.data.data}),v.datastatistics("1",function(s){t.staticcount=s.data.data}),v.datastatistics("2",function(s){t.staticreport=s.data.data})}},filters:{formatData:function(t){return function(t,s){/(y+)/.test(s)&&(s=s.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in e)if(new RegExp("("+i+")").test(s)){var a=e[i]+"";s=s.replace(RegExp.$1,1===RegExp.$1.length?a:p(a))}return s}(new Date(t),"yyyy-MM-dd hh:mm:ss")}}},_={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"page"},[e("div",{staticClass:"reportcentertop"},[e("div",{staticClass:"reportcenter"},[e("span",{staticClass:"line"}),t._v(" "),e("div",{staticClass:"title"},[t._v("未读报告")]),t._v(" "),e("ul",t._l(t.itemreceive,function(s,i){return e("li",{key:i},[e("span",{staticClass:"iconfont icon-jinggao iconJing",class:[1==s.urgentType?"busy":2==s.urgentType?"midbusy":"lowbusy"],attrs:{title:[1==s.urgentType?"紧急":2==s.urgentType?"警告":"正常"]}}),t._v(" "),e("span",{attrs:{title:s.receiveReportTitle}},[t._v(t._s(s.receiveReportTitle))]),t._v(" "),e("span",{attrs:{title:s.publishUserName}},[t._v(t._s(s.publishUserName))]),t._v(" "),e("span",{attrs:{title:t._f("formatData")(s.publishTime)}},[t._v(t._s(t._f("formatData")(s.publishTime)))])])}))]),t._v(" "),e("div",{staticClass:"reportcenter"},[e("span",{staticClass:"line"}),t._v(" "),e("div",{staticClass:"title"},[t._v("已发回复")]),t._v(" "),e("ul",t._l(t.itempublic,function(s,i){return e("li",{key:i,on:{click:t.reportCheck}},[e("span",{staticClass:"title",attrs:{title:s.reportTitle}},[t._v(t._s(s.reportTitle))]),t._v(" "),e("span",{staticClass:"name",attrs:{title:s.receiveUserName}},[t._v(t._s(s.receiveUserName))]),t._v(" "),e("span",{staticClass:"time",attrs:{title:s.replyContent}},[t._v(t._s(s.replyContent))])])}))])]),t._v(" "),e("div",{staticClass:"reportcenterbottom"},[e("div",{staticClass:"re-bot-model"},[t._m(0),t._v(" "),e("div",{staticClass:"bot"},[e("div",{staticClass:"box"}),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"bot-second"},[e("span",{attrs:{title:t.staticpublic.allCount}},[t._v(t._s(t.staticpublic.allCount))]),t._v(" "),e("span",{attrs:{title:t.staticpublic.readCount}},[t._v(t._s(t.staticpublic.readCount))]),t._v(" "),e("span",{attrs:{title:t.staticpublic.replyCount}},[t._v(t._s(t.staticpublic.replyCount))])])])]),t._v(" "),e("div",{staticClass:"re-bot-model"},[e("div",{staticClass:"top",on:{click:t.reportReception}},[e("span",[t._v("报告接收")])]),t._v(" "),e("div",{staticClass:"bot"},[e("div",{staticClass:"box"}),t._v(" "),t._m(2),t._v(" "),e("div",{staticClass:"bot-second"},[e("span",{attrs:{title:t.staticreceive.allCount}},[t._v(t._s(t.staticreceive.allCount))]),t._v(" "),e("span",{attrs:{title:t.staticreceive.readCount}},[t._v(t._s(t.staticreceive.readCount))]),t._v(" "),e("span",{attrs:{title:t.staticreceive.replyCount}},[t._v(t._s(t.staticreceive.replyCount))])])])]),t._v(" "),e("div",{staticClass:"re-bot-model"},[t._m(3),t._v(" "),e("div",{staticClass:"bot"},[e("div",{staticClass:"box"}),t._v(" "),t._m(4),t._v(" "),e("div",{staticClass:"bot-second"},[e("span",{attrs:{title:t.staticcount.allCount}},[t._v(t._s(t.staticcount.allCount))]),t._v(" "),e("span",{attrs:{title:t.staticcount.publishCount}},[t._v(t._s(t.staticcount.publishCount))]),t._v(" "),e("span",{attrs:{title:t.staticcount.unpublishCount}},[t._v(t._s(t.staticcount.unpublishCount))])])])]),t._v(" "),e("div",{staticClass:"re-bot-model"},[t._m(5),t._v(" "),e("div",{staticClass:"bot"},[e("div",{staticClass:"box"}),t._v(" "),t._m(6),t._v(" "),e("div",{staticClass:"bot-second"},[e("span",{attrs:{title:t.staticreport.allCount}},[t._v(t._s(t.staticreport.allCount))]),t._v(" "),e("span",{attrs:{title:t.staticreport.publishCount}},[t._v(t._s(t.staticreport.publishCount))]),t._v(" "),e("span",{attrs:{title:t.staticreport.unpublishCount}},[t._v(t._s(t.staticreport.unpublishCount))])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"top"},[s("span",[this._v("报告发布")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bot-first"},[s("span",[this._v("已发送")]),this._v(" "),s("span",[this._v("已读")]),this._v(" "),s("span",[this._v("已回复")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bot-first"},[s("span",[this._v("已接收")]),this._v(" "),s("span",[this._v("已读")]),this._v(" "),s("span",[this._v("已回复")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"top"},[s("span",[this._v("大屏统计")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bot-content"},[s("span",[this._v("统计总数")]),this._v(" "),s("span",[this._v("已发布")]),this._v(" "),s("span",[this._v("未发布")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"top"},[s("span",[this._v("报告统计")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"bot-content"},[s("span",[this._v("统计总数")]),this._v(" "),s("span",[this._v("已发布")]),this._v(" "),s("span",[this._v("未发布")])])}]};var d=e("VU/8")(u,_,!1,function(t){e("IrTh")},"data-v-28903f6c",null);s.default=d.exports},IrTh:function(t,s){},tib2:function(t,s){}});
//# sourceMappingURL=8.a19f3b8bfe89d8090212.js.map