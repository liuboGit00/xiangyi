webpackJsonp([7],{4408:function(e,t,a){"use strict";var i=a("woOf"),r=a.n(i),o=a("nkcX"),s=a("xGE3"),l={props:["dialogOpt"],mounted:function(){this.getReportorganize()},data:function(){var e=function(e,t,a){""===t||void 0===t?a(new Error("输入内容不能为空")):a()};return{form:{reportTitle:"",remark:"",usefulTime1:"",usefulTime2:"",urgentType:"",allowTwice:""},defaultProps:{children:"children",label:"label"},dataleft:[],dataright:[],serverobject:s.a,rules2:{reportTitle:[{validator:e,trigger:"blur"}],remark:[{validator:e,trigger:"blur"}]}}},computed:{dialogobj:function(){return r()(this.dialogOpt)}},components:{Dialogcomponent:o.a},methods:{submitForm:function(e,t,a){var i=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;i.$emit("handlesure-dialog",t,a,i.form)})},resetForm:function(e){this.$refs[e].resetFields()},getReportorganize:function(){var e=this;e.serverobject.reportorganize("",function(t){(t.data.status="SUCCESS")&&(e.dataleft=t.data.data,e.dataleft=e.transData(e.dataleft,"orgId","orgName","orgSupId","children"))})},getCheckedNodesLeft:function(){var e=!1,t=[],a=this.$refs.trees.getCheckedNodes();this.dataright.forEach(function(i,r){e=!1,a.forEach(function(t,a){i.id==t.id&&(e=!0)}),e||t.push(i)}),this.dataright=t},getCheckedNodesRight:function(){var e=[];this.$refs.tree.getCheckedNodes().forEach(function(t,a){t.hasOwnProperty("children")||e.push(t)}),this.dataright.forEach(function(t,a){e.forEach(function(a,i){t.id==a.id&&e.splice(i,1)})}),this.dataright=this.dataright.concat(e)},dialogHandlesure:function(e,t){for(var a in this.form)""==this.form[a]&&delete this.form[a];switch(e){case"保存":this.submitForm("ruleForm2",e,t);break;case"发布":this.form.receiveUserId=this.dataright,this.$emit("handlesure-dialog",e,t,this.form)}},dialogHandle:function(e,t){this.$emit("handlecancle-dialog",e,t)},transData:function(e,t,a,i,r){for(var o=[],s={},l=t,n=a,c=i,d=r,f=0,u=0,h=0,m=e.length,p=[];h<m;h++){var g={id:e[h][l],label:e[h][n],orgSupId:e[h][c]};p[h]=g}for(;f<m;f++)s[p[f].id]=p[f];for(;u<m;u++){var v=p[u],b=s[v[c]];b?(!b[d]&&(b[d]=[]),b[d].push(v),b.disabled=!0):o.push(v)}return o},setDataToTree:function(e,t,a){if(e)for(var i=0;i<e.length;i++){var r=e[i];if(r.id==t)return this.$set(e[i],"children",[]),void(e[i].children=e[i].children.concat(a));this.setDataToTree(r.children,t,a)}},handleCheckChange:function(e,t,a){var i=this;if(!e.lastchild&&(!e.children||e.children.length<=0)){var r=e.id;s.a.reportorganizechild(r,function(t){(t.data.status="SUCCESS")&&(t.data.data=i.transData(t.data.data,"userId","userName","aliasName","children"),t.data.data.forEach(function(e,t){e.lastchild=!0}),i.setDataToTree(i.dataleft,e.id,t.data.data))})}}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("Dialogcomponent",{attrs:{dialogobj:e.dialogobj},on:{"dialog-cancle":e.dialogHandle,"dialog-sure":e.dialogHandlesure}},["发布"==e.dialogobj.title?a("div",[a("div",{staticClass:"treetransfer"},[a("el-tree",{ref:"tree",attrs:{data:e.dataleft,props:e.defaultProps,"show-checkbox":"","node-key":"id"},on:{"check-change":e.handleCheckChange}}),e._v(" "),a("div",{staticClass:"handle"},[a("span",{staticClass:"el-icon-arrow-left",on:{click:e.getCheckedNodesLeft}}),e._v(" "),a("span",{staticClass:"el-icon-arrow-right",on:{click:e.getCheckedNodesRight}})]),e._v(" "),a("el-tree",{ref:"trees",attrs:{data:e.dataright,props:e.defaultProps,"node-key":"id","show-checkbox":""},on:{"check-change":e.handleCheckChange}})],1),e._v(" "),a("el-form",{ref:"form",staticClass:"formpublic",attrs:{model:e.form,"label-width":""}},[a("el-form-item",{attrs:{label:"是否允许二次转发"}},[a("el-radio-group",{model:{value:e.form.allowTwice,callback:function(t){e.$set(e.form,"allowTwice",t)},expression:"form.allowTwice"}},[a("el-radio",{attrs:{label:"0"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"紧急程度"}},[a("el-radio-group",{model:{value:e.form.urgentType,callback:function(t){e.$set(e.form,"urgentType",t)},expression:"form.urgentType"}},[a("el-radio",{attrs:{label:"1"}},[e._v("加急")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("紧急")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("正常")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"有效期限"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy年MM月dd日 HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.form.usefulTime,callback:function(t){e.$set(e.form,"usefulTime",t)},expression:"form.usefulTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e(),e._v(" "),"保存"==e.dialogobj.title?a("div",[a("el-form",{ref:"ruleForm2",attrs:{model:e.form,rules:e.rules2}},[a("el-form-item",{attrs:{label:"请输入保存后的主题",prop:"reportTitle"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.reportTitle,callback:function(t){e.$set(e.form,"reportTitle",t)},expression:"form.reportTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e()])],1)},staticRenderFns:[]};var c=a("VU/8")(l,n,!1,function(e){a("dtoH")},"data-v-2b649d58",null);t.a=c.exports},"5LkA":function(e,t){},BHLP:function(e,t,a){"use strict";(function(e){var i=a("xbEV"),r=a("Cin5"),o=a("4408"),s=a("xGE3");t.a={data:function(){return{isLastPage:!1,pagepation:{pageNum:1,pageSize:15},serverobject:s.a,items:[],angleshowflag:!0,value1:[1,4],dialogOpt:{dialogflag:!1},suspendOpt:{position:"bottom",domClass:"list-top",offsetbottom:"10%",show:!1},dialogVisible:!1,searchtemplateId:""}},components:{FormSelectGroup:i.a,Scrollframe:r.a,Dialog:o.a},methods:{searchtemplate:function(e){var t=this;if(13==e.keyCode){var a={templateName:this.searchtemplateId,showType:1};s.a.reportlistsearch(a,function(e){var a=e.data.data;t.items=void 0==a.list?[]:a.list})}},clicktemplate:function(e,t){var a=t.templateId;this.$set(this.items[e],"infochecked",!0),this.$router.push({path:"/editedashboard",query:{templateId:a}})},downtemplate:function(t){e(t.target).find(".info").css({transition:"height .2s",height:"100%"})},ajaxshow:function(e){var t=this;t.isLastPage=!0,t.pagepation=e||this.pagepation,t.serverobject.pagepation=this.pagepation,e.showType=1,s.a.reportlisttemplate(e,function(e){var a=e.data.data;t.items=t.items.concat(a.list),t.isLastPage=a.isLastPage})},submitshow:function(e){this.pagepation={pageNum:1,pageSize:15},this.ajaxshow(e)},selectDialog:function(e,t){t?this.dialogOpt.dialogflag=!1:this.dialogOpt={dialogflag:!0,title:e}},share:function(){this.dialogVisible=!0},handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})}}}}).call(t,a("7t+N"))},dtoH:function(e,t){},wDdO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("BHLP"),r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"emptyformgroup"}),e._v(" "),a("div",{staticClass:"underlinebtn"},[a("span",{staticClass:"title"},[e._v("请选择模板")]),e._v(" "),a("div",{staticClass:"search"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchtemplateId,expression:"searchtemplateId"}],attrs:{type:"text",placeholder:"请输入关键字"},domProps:{value:e.searchtemplateId},on:{keydown:e.searchtemplate,input:function(t){t.target.composing||(e.searchtemplateId=t.target.value)}}}),e._v(" "),a("span",{staticClass:"icon el-icon-search"})])]),e._v(" "),a("Scrollframe",{staticClass:"content-frame",attrs:{isLastPage:e.isLastPage},on:{"ajax-query":e.ajaxshow}},e._l(e.items,function(t,i){return a("div",{key:i,staticClass:"receivelist",on:{mousedown:e.downtemplate,click:function(a){e.clicktemplate(i,t)}}},[a("div",{staticClass:"list-top",style:{background:t.bgcolor}},[e.angleshowflag?a("span",{staticClass:"defaultitle",attrs:{title:t.templateName}},[e._v(e._s(t.templateName))]):e._e(),e._v(" "),e._l(t.titleList,function(t,i){return e.angleshowflag?e._e():a("span",{key:i,staticClass:"multipletitle"},[e._v("\n                        "+e._s(t.templateName)+"\n                      ")])}),e._v(" "),t.publishStatus?a("div",{staticClass:"angle"},[a("div",{staticClass:"obliqueangle"},[e._v("未发布")])]):e._e()],2)])})),e._v(" "),a("Dialog",{attrs:{dialogOpt:e.dialogOpt},on:{"select-dialog":e.selectDialog}})],1)},staticRenderFns:[]};var o=function(e){a("5LkA")},s=a("VU/8")(i.a,r,!1,o,"data-v-671a2fe3",null);t.default=s.exports}});
//# sourceMappingURL=7.d2deee53c2c6f2faa1ee.js.map