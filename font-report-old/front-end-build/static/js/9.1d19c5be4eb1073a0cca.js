webpackJsonp([9],{"/eS5":function(e,t){},"7KsL":function(e,t){},YaZz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("woOf"),r=a.n(i),s=a("xbEV"),o=a("gY1r"),l=a("Cin5"),n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("div",{staticClass:"switch",style:e.switchstyle,on:{click:e.switchChange}},[a("div",{staticClass:"switch-left",class:{active:e.isActive}},[e._v(e._s(e.switchOpt.leftName))]),e._v(" "),a("div",{staticClass:"switch-right",class:{active:!e.isActive}},[e._v(e._s(e.switchOpt.rightName))])])])},staticRenderFns:[]};var c,d=a("VU/8")({props:["switchOpt"],data:function(){return{isActive:"true",switchstyle:{width:this.switchOpt.width}}},components:{},methods:{switchChange:function(){this.isActive=!this.isActive;var e=this.isActive?this.switchOpt.leftName:this.switchOpt.rightName;this.$emit("switch-change",e)}}},n,!1,function(e){a("7KsL")},"data-v-6a3aa568",null).exports,p=a("nkcX"),h=a("7+uW"),u=(c=(new h.default).axios,{pagepation:"",reportlistpublish:function(e,t,a){var i=e;i=e?r()(i,this.pagepation):this.pagepation,c.get("/report-publishing/publishing",{params:i}).then(function(e){t(e)})},reportlist:function(e,t,a){var i=e;i=e?r()(i,this.pagepation):this.pagepation,c.get("/reports",{params:i}).then(function(e){t(e)})},reportsdelete:function(e,t,a){var i=e;c.delete("/reports/"+i).then(function(e){t(e)})},reportspublishdelete:function(e,t,a){var i=e;c.delete("/report-publishing/publishing/"+i).then(function(e){t(e)})},reportthemeupdate:function(e,t,a){var i=e;c.put("/reports",i).then(function(e){t(e)})},reportorganize:function(e,t,a){var i=e;c.get("/users/organize",i).then(function(e){t(e)})},reportorganizechild:function(e,t,a){var i=e;c.get("/users/organize/"+i).then(function(e){t(e)})},reportpublish:function(e,t,a){var i=e;c.post("/report-publishing",i).then(function(e){t(e)})}}),f={props:["dialogOpt"],mounted:function(){this.getReportorganize()},data:function(){return{form:{reportTitle:"",remark:"",usefulTime1:"",usefulTime2:"",urgentType:"",allowTwice:""},defaultProps:{children:"children",label:"label"},dataleft:[],dataright:[],serverobject:u,rules2:{reportTitle:[{validator:function(e,t,a){""===t||void 0===t?a(new Error("输入内容不能为空")):a()},trigger:"blur"}]}}},computed:{dialogobj:function(){return r()(this.dialogOpt)}},components:{Dialogcomponent:p.a},methods:{submitForm:function(e,t,a){var i=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;i.$emit("handlesure-dialog",t,a,i.form)})},resetForm:function(e){this.$refs[e].resetFields()},getReportorganize:function(){var e=this;e.serverobject.reportorganize("",function(t){(t.data.status="SUCCESS")&&(e.dataleft=t.data.data,e.dataleft=e.transData(e.dataleft,"orgId","orgName","orgSupId","children"))})},getCheckedNodesLeft:function(){var e=!1,t=[],a=this.$refs.trees.getCheckedNodes();this.dataright.forEach(function(i,r){e=!1,a.forEach(function(t,a){i.id==t.id&&(e=!0)}),e||t.push(i)}),this.dataright=t},getCheckedNodesRight:function(){var e=[];this.$refs.tree.getCheckedNodes().forEach(function(t,a){t.hasOwnProperty("children")||e.push(t)}),this.dataright.forEach(function(t,a){e.forEach(function(a,i){t.id==a.id&&e.splice(i,1)})}),this.dataright=this.dataright.concat(e)},dialogHandlesure:function(e,t){for(var a in this.form)""==this.form[a]&&delete this.form[a];switch(e){case"保存":this.submitForm("ruleForm2",e,t);break;case"发布":this.form.receiveUserId=this.dataright,this.$emit("handlesure-dialog",e,t,this.form);break;case"修改主题分类":this.submitForm("ruleForm2",e,t);break;case"删除":this.$emit("handlesure-dialog",e,t,this.form)}},dialogHandle:function(e,t){this.$emit("handlecancle-dialog",e,t)},transData:function(e,t,a,i,r){for(var s=[],o={},l=t,n=a,c=i,d=r,p=0,h=0,u=0,f=e.length,g=[];u<f;u++){var m={id:e[u][l],label:e[u][n],orgSupId:e[u][c]};g[u]=m}for(;p<f;p++)o[g[p].id]=g[p];for(;h<f;h++){var v=g[h],b=o[v[c]];b?(!b[d]&&(b[d]=[]),b[d].push(v),b.disabled=!0):s.push(v)}return s},setDataToTree:function(e,t,a){if(e)for(var i=0;i<e.length;i++){var r=e[i];if(r.id==t)return this.$set(e[i],"children",[]),void(e[i].children=e[i].children.concat(a));this.setDataToTree(r.children,t,a)}},handleCheckChange:function(e,t,a){var i=this;if(!e.lastchild&&(!e.children||e.children.length<=0)){var r=e.id;u.reportorganizechild(r,function(t){(t.data.status="SUCCESS")&&(t.data.data=i.transData(t.data.data,"userId","userName","aliasName","children"),t.data.data.forEach(function(e,t){e.lastchild=!0}),i.setDataToTree(i.dataleft,e.id,t.data.data))})}}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("Dialogcomponent",{attrs:{dialogobj:e.dialogobj},on:{"dialog-cancle":e.dialogHandle,"dialog-sure":e.dialogHandlesure}},["发布"==e.dialogobj.title?a("div",[a("div",{staticClass:"treetransfer"},[a("el-tree",{ref:"tree",attrs:{data:e.dataleft,props:e.defaultProps,"show-checkbox":"","node-key":"id"},on:{"check-change":e.handleCheckChange}}),e._v(" "),a("div",{staticClass:"handle"},[a("span",{staticClass:"el-icon-arrow-left",on:{click:e.getCheckedNodesLeft}}),e._v(" "),a("span",{staticClass:"el-icon-arrow-right",on:{click:e.getCheckedNodesRight}})]),e._v(" "),a("el-tree",{ref:"trees",attrs:{data:e.dataright,props:e.defaultProps,"node-key":"id","show-checkbox":""},on:{"check-change":e.handleCheckChange}})],1),e._v(" "),a("el-form",{ref:"form",staticClass:"formpublic",attrs:{model:e.form,"label-width":""}},[a("el-form-item",{attrs:{label:"是否允许二次转发"}},[a("el-radio-group",{model:{value:e.form.allowTwice,callback:function(t){e.$set(e.form,"allowTwice",t)},expression:"form.allowTwice"}},[a("el-radio",{attrs:{label:"0"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"紧急程度"}},[a("el-radio-group",{model:{value:e.form.urgentType,callback:function(t){e.$set(e.form,"urgentType",t)},expression:"form.urgentType"}},[a("el-radio",{attrs:{label:"1"}},[e._v("加急")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("紧急")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("正常")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"有效期限"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.form.usefulTime,callback:function(t){e.$set(e.form,"usefulTime",t)},expression:"form.usefulTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e(),e._v(" "),"保存"==e.dialogobj.title?a("div",[a("el-form",{ref:"ruleForm2",attrs:{model:e.form,rules:e.rules2}},[a("el-form-item",{attrs:{label:"请输入保存后的主题",prop:"reportTitle"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.reportTitle,callback:function(t){e.$set(e.form,"reportTitle",t)},expression:"form.reportTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e(),e._v(" "),"修改主题分类"==e.dialogobj.title?a("div",[a("el-form",{ref:"ruleForm2",attrs:{model:e.form,rules:e.rules2}},[a("el-form-item",{attrs:{label:"请输入保存后的主题",prop:"reportTitle"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.reportTitle,callback:function(t){e.$set(e.form,"reportTitle",t)},expression:"form.reportTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e(),e._v(" "),"删除"==e.dialogobj.title?a("div",[a("div",{staticStyle:{width:"100%",height:"100%",display:"flex","justify-content":"center","font-size":"20px",color:"#6c6e70"}},[e._v("确定删除？")])]):e._e()])],1)},staticRenderFns:[]};var m=a("VU/8")(f,g,!1,function(e){a("Z9x5")},"data-v-2c6eb729",null).exports,v={data:function(){return{isLastPage:!1,pagepation:{pageNum:1,pageSize:15},serverobject:u,items:[],angleshowflag:!0,dialogOpt:{dialogflag:!1,width:"536px"},suspendOpt:{name:"报告查看",position:"bottom",domClass:"receivelist",offsetbottom:"10%",show:!0,bgshow:!1},switchOpt:{width:"150px",leftName:"全部",rightName:"已发布"},publicflag:!0,reports:[],reportsindex:{},checkednumber:0,reportIdlists:[],reportshowtype:[],checkboxshow:!1}},components:{FormSelectGroup:s.a,Scrollframe:l.a,CommonSuspend:o.a,Dialog:m,SwitchChange:d},methods:{overreportlist:function(e){this.$set(this.suspendOpt,"editshowflag",e.isMerger)},popclick:function(e){this.reportsindex=e},switchChange:function(e){var t=this;t.items=[],t.pagepation={pageNum:1,pageSize:15},"全部"==e?(t.publicflag=!0,t.angleshowflag=!0,t.$set(t.suspendOpt,"name","报告查看"),t.isLastPage=!0,t.serverobject.pagepation=t.pagepation,u.reportlist("",function(e){var a=e.data.data;t.items=t.items.concat(a.list),t.isLastPage=a.isLastPage})):(t.checkboxshow=!1,t.publicflag=!1,t.angleshowflag=!1,t.$set(t.suspendOpt,"name","报告发布"),t.isLastPage=!0,t.serverobject.pagepation=t.pagepation,u.reportlistpublish("",function(e){var a=e.data.data;t.items=t.items.concat(a.list),t.isLastPage=a.isLastPage}))},publics:function(){this.checkboxshow=!0,this.publicsflag=!0,this.checkednumber>0&&this.selectDialog("发布")},changecombination:function(e){var t=this;this.reportIdlists.push(e.reportId),this.reportshowtype.push(e.showType),e.checked?(this.checkednumber++,this.reports.push(e)):(this.checkednumber--,this.reports.forEach(function(a,i){a.reportId==e.reportId&&t.reports.splice(i,1)}))},selectDialog:function(e,t){t?(this.dialogOpt.dialogflag=!1,self.publicsagainflag=!1):this.dialogOpt={dialogflag:!0,width:"536px",title:e}},ajaxshow:function(e){var t=this;t.isLastPage=!0,t.pagepation=e||t.pagepation,t.serverobject.pagepation=t.pagepation,u.reportlist(e,function(e){var a=e.data.data;t.items=t.items.concat(a.list),t.isLastPage=a.isLastPage,console.dir(t.items)})},submitshow:function(e){this.pagepation={pageNum:1,pageSize:15},this.items=[];var t=r()(e,this.pagepation);this.ajaxshow(t)},submitDialog:function(e,t,a){var i=this,s=a;if("发布"==e){var o=[];i.reports.forEach(function(e){s.receiveUserId.forEach(function(t){o.push({reportId:e.reportId,allowTwice:s.allowTwice,urgentType:s.urgentType,usefulTime:s.usefulTime,remark:s.remark,reportTitle:e.reportTitle,receiveUserId:t.id,receiveUserName:t.label})})}),u.reportpublish(o,function(e){(e.data.status="SUCCESS")&&(i.items=[],i.checkboxshow=!1,i.dialogOpt.dialogflag=!1,i.publicsagainflag=!1,i.ajaxshow())})}if("修改主题分类"==e){var l=r()({reportId:i.reportsindex.reportId},a);u.reportthemeupdate(l,function(e){(e.data.status="SUCCESS")&&(i.dialogOpt.dialogflag=!1,i.items=[],i.ajaxshow())})}if("删除"==e)if(i.publicflag){var n=i.reportsindex.reportId;u.reportsdelete(n,function(e){(e.data.status="SUCCESS")&&(i.dialogOpt.dialogflag=!1,i.items=[],i.switchChange("全部"))})}else{var c=i.reportsindex.publishId;u.reportspublishdelete(c,function(e){(e.data.status="SUCCESS")&&(i.dialogOpt.dialogflag=!1,i.items=[],i.switchChange("已发布"))})}}}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("FormSelectGroup",{attrs:{module:"reportpublic"},on:{"submit-query":e.submitshow}}),e._v(" "),a("CommonSuspend",{staticClass:"content-area",attrs:{suspendobj:e.suspendOpt},on:{"select-dialog":e.selectDialog}},[a("div",{staticClass:"underlinebtn"},[a("SwitchChange",{attrs:{switchOpt:e.switchOpt},on:{"switch-change":e.switchChange}}),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.publicflag,expression:"publicflag"}],attrs:{type:"primary",size:"small"},on:{click:e.publics}},[e._v("发布")])],1),e._v(" "),a("Scrollframe",{staticClass:"content-frame",attrs:{isLastPage:e.isLastPage},on:{"ajax-query":e.ajaxshow}},e._l(e.items,function(t,i){return a("div",{key:i,staticClass:"receivelist",on:{mouseover:function(a){e.overreportlist(t)},mousedown:function(a){e.popclick(t)}}},[a("div",{staticClass:"list-top"},[e.publicflag?a("span",{attrs:{title:t.reportTitle}},[e._v(e._s(t.reportTitle))]):e._e(),e._v(" "),e.publicflag?e._e():a("div",{staticClass:"titlelist"},[a("div",[a("span",{attrs:{title:t.reportTitle}},[e._v(e._s(t.reportTitle))])]),e._v(" "),a("div",[a("span",[e._v("接收人：")]),a("span",{attrs:{title:t.reportTitle}},[e._v(e._s(t.receiveUserName))])]),e._v(" "),a("div",[a("span",[e._v("发布时间：")]),a("span",{attrs:{title:t.reportTitle}},[e._v(e._s(t.publishTime))])])]),e._v(" "),e.angleshowflag?a("div",{directives:[{name:"show",rawName:"v-show",value:!t.publishStatus,expression:"!item.publishStatus"}],staticClass:"angle"},[a("div",{staticClass:"obliqueangle"},[e._v("未发布")])]):e._e()]),e._v(" "),e.checkboxshow?a("div",{staticClass:"combination"},[a("el-checkbox",{on:{change:function(a){e.changecombination(t)}},model:{value:t.checked,callback:function(a){e.$set(t,"checked",a)},expression:"item.checked"}})],1):e._e()])}))],1),e._v(" "),a("Dialog",{attrs:{dialogOpt:e.dialogOpt},on:{"handlecancle-dialog":e.selectDialog,"handlesure-dialog":e.submitDialog}})],1)},staticRenderFns:[]};var w=a("VU/8")(v,b,!1,function(e){a("/eS5")},"data-v-1bd84d75",null);t.default=w.exports},Z9x5:function(e,t){}});
//# sourceMappingURL=9.1d19c5be4eb1073a0cca.js.map