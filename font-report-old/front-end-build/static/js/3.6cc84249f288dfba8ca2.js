webpackJsonp([3],{"5b5o":function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),r=a("nkcX"),o=a("nOsQ"),l={props:["dialogOpt"],mounted:function(){this.getReportorganize()},data:function(){return{form:{reportTitle:"",remark:"",usefulTime1:"",usefulTime2:"",urgentType:"",allowTwice:""},rules2:{reportTitle:[{validator:function(e,t,a){""===t||void 0===t?a(new Error("输入内容不能为空")):a()},trigger:"blur"}]},defaultProps:{children:"children",label:"label"},dataleft:[],dataright:[],serverobject:o.a}},computed:{dialogobj:function(){return s()(this.dialogOpt)}},components:{Dialogcomponent:r.a},methods:{submitForm:function(e,t,a){var i=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;i.$emit("handlesure-dialog",t,a,i.form)})},resetForm:function(e){this.$refs[e].resetFields()},getReportorganize:function(){var e=this;e.serverobject.reportorganize("",function(t){(t.data.status="SUCCESS")&&(e.dataleft=t.data.data,e.dataleft=e.transData(e.dataleft,"orgId","orgName","orgSupId","children"))})},getCheckedNodesLeft:function(){var e=!1,t=[],a=this.$refs.trees.getCheckedNodes();this.dataright.forEach(function(i,s){e=!1,a.forEach(function(t,a){i.id==t.id&&(e=!0)}),e||t.push(i)}),this.dataright=t},getCheckedNodesRight:function(){var e=[];this.$refs.tree.getCheckedNodes().forEach(function(t,a){t.hasOwnProperty("children")||e.push(t)}),this.dataright.forEach(function(t,a){e.forEach(function(a,i){t.id==a.id&&e.splice(i,1)})}),this.dataright=this.dataright.concat(e)},dialogHandlesure:function(e,t){for(var a in this.form)""==this.form[a]&&delete this.form[a];switch(e){case"保存":this.submitForm("ruleForm2",e,t);break;case"发布":this.form.receiveUserId=this.dataright,this.$emit("handlesure-dialog",e,t,this.form)}},dialogHandle:function(e,t){this.$emit("handlecancle-dialog",e,t)},transData:function(e,t,a,i,s){for(var r=[],o={},l=t,n=a,c=i,d=s,u=0,m=0,p=0,f=e.length,h=[];p<f;p++){var g={id:e[p][l],label:e[p][n],orgSupId:e[p][c]};h[p]=g}for(;u<f;u++)o[h[u].id]=h[u];for(;m<f;m++){var v=h[m],b=o[v[c]];b?(!b[d]&&(b[d]=[]),b[d].push(v),b.disabled=!0):r.push(v)}return r},setDataToTree:function(e,t,a){if(e)for(var i=0;i<e.length;i++){var s=e[i];if(s.id==t)return this.$set(e[i],"children",[]),void(e[i].children=e[i].children.concat(a));this.setDataToTree(s.children,t,a)}},handleCheckChange:function(e,t,a){var i=this;if(!e.lastchild&&(!e.children||e.children.length<=0)){var s=e.id;o.a.reportorganizechild(s,function(t){(t.data.status="SUCCESS")&&(t.data.data=i.transData(t.data.data,"userId","userName","aliasName","children"),t.data.data.forEach(function(e,t){e.lastchild=!0}),i.setDataToTree(i.dataleft,e.id,t.data.data))})}}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("Dialogcomponent",{attrs:{dialogobj:e.dialogobj},on:{"dialog-cancle":e.dialogHandle,"dialog-sure":e.dialogHandlesure}},["发布"==e.dialogobj.title?a("div",[a("div",{staticClass:"treetransfer"},[a("el-tree",{ref:"tree",attrs:{data:e.dataleft,props:e.defaultProps,"show-checkbox":"","node-key":"id"},on:{"check-change":e.handleCheckChange}}),e._v(" "),a("div",{staticClass:"handle"},[a("span",{staticClass:"el-icon-arrow-left",on:{click:e.getCheckedNodesLeft}}),e._v(" "),a("span",{staticClass:"el-icon-arrow-right",on:{click:e.getCheckedNodesRight}})]),e._v(" "),a("el-tree",{ref:"trees",attrs:{data:e.dataright,props:e.defaultProps,"node-key":"id","show-checkbox":""},on:{"check-change":e.handleCheckChange}})],1),e._v(" "),a("el-form",{ref:"form",staticClass:"formpublic",attrs:{model:e.form,"label-width":""}},[a("el-form-item",{attrs:{label:"是否允许二次转发"}},[a("el-radio-group",{model:{value:e.form.allowTwice,callback:function(t){e.$set(e.form,"allowTwice",t)},expression:"form.allowTwice"}},[a("el-radio",{attrs:{label:"0"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"紧急程度"}},[a("el-radio-group",{model:{value:e.form.urgentType,callback:function(t){e.$set(e.form,"urgentType",t)},expression:"form.urgentType"}},[a("el-radio",{attrs:{label:"1"}},[e._v("加急")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("紧急")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("正常")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"有效期限"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy年MM月dd日 HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.form.usefulTime,callback:function(t){e.$set(e.form,"usefulTime",t)},expression:"form.usefulTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e(),e._v(" "),"保存"==e.dialogobj.title?a("div",[a("el-form",{ref:"ruleForm2",attrs:{model:e.form,rules:e.rules2}},[a("el-form-item",{attrs:{label:"请输入保存后的主题",prop:"reportTitle"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.reportTitle,callback:function(t){e.$set(e.form,"reportTitle",t)},expression:"form.reportTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1):e._e()])],1)},staticRenderFns:[]};var c=a("VU/8")(l,n,!1,function(e){a("VDZE")},"data-v-e2b7dc3c",null);t.a=c.exports},IerA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("vhUd"),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"emptyformgroup"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.preview}},[e._v("预览")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.savetemplate}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.publics}},[e._v("发布")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.suspendflag,expression:"suspendflag"}],staticClass:"topsuspend"},[a("div",{staticClass:"childsuspend"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.choicesuspend}},[e._v("媒体"),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("div",{staticClass:"tooltip"},[a("el-tabs",{attrs:{stretch:"true"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"图片",name:"first"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.actions,"file-list":e.fileList,accept:".gif,.jpg,.bmp,.png,.jpeg","on-success":e.successfulupload,limit:1,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器")])],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"childsuspend"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.choicesuspend}},[e._v("图表"),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("div",{staticClass:"tooltip"},[a("el-tabs",{attrs:{stretch:"true"},on:{"tab-click":e.handleClick},model:{value:e.activeNametwo,callback:function(t){e.activeNametwo=t},expression:"activeNametwo"}},[a("el-tab-pane",{staticClass:"clearfix",attrs:{label:"分组表",name:"first2"}},e._l(e.itemsform,function(t,i){return a("el-button",{key:i,attrs:{type:"primary",size:"small"},on:{click:function(a){e.successreportform(t)}}},[e._v(e._s(t.reportFormsTitle))])})),e._v(" "),a("el-tab-pane",{staticClass:"clearfix",attrs:{label:"垂直柱状图",name:"second2"}},e._l(e.itemsform,function(t,i){return a("el-button",{key:i,attrs:{type:"primary",size:"small"},on:{click:function(a){e.successreportform(t)}}},[e._v(e._s(t.reportFormsTitle))])})),e._v(" "),a("el-tab-pane",{staticClass:"clearfix",attrs:{label:"水平柱状图",name:"third2"}},e._l(e.itemsform,function(t,i){return a("el-button",{key:i,attrs:{type:"primary",size:"small"},on:{click:function(a){e.successreportform(t)}}},[e._v(e._s(t.reportFormsTitle))])})),e._v(" "),a("el-tab-pane",{staticClass:"clearfix",attrs:{label:"折线图",name:"four2"}},e._l(e.itemsform,function(t,i){return a("el-button",{key:i,attrs:{type:"primary",size:"small"},on:{click:function(a){e.successreportform(t)}}},[e._v(e._s(t.reportFormsTitle))])})),e._v(" "),a("el-tab-pane",{staticClass:"clearfix",attrs:{label:"饼图",name:"five2"}},e._l(e.itemsform,function(t,i){return a("el-button",{key:i,attrs:{type:"primary",size:"small"},on:{click:function(a){e.successreportform(t)}}},[e._v(e._s(t.reportFormsTitle))])}))],1)],1)],1),e._v(" "),a("div",{staticClass:"childsuspend"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.choicesuspend}},[e._v("主题"),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("div",{staticClass:"tooltip"},[a("div",{staticClass:"filter"},[a("div",[a("label",{staticStyle:{color:"black"}},[e._v("主题分类")]),e._v(" "),a("el-select",{attrs:{placeholder:"主题分类"},on:{change:e.themechange},model:{value:e.themevalue,callback:function(t){e.themevalue=t},expression:"themevalue"}},e._l(e.reportthemelist,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)]),e._v(" "),a("div",{staticClass:"filter-btn clearfix"},e._l(e.formthemelist,function(t,i){return a("el-button",{key:i,attrs:{type:"primary"},on:{click:function(a){e.successtheme(t,i)}}},[e._v(e._s(t.reportFormsTitle))])})),e._v(" "),a("div",{staticClass:"filter-foot"},[a("el-button",{attrs:{type:"primary"},on:{click:e.savetheme}},[e._v("确定")]),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("取消")])],1)])],1)])],1),e._v(" "),a("div",{staticClass:"dashboardtemplate"},[a("div",{staticClass:"contents"},e._l(e.items,function(t,i){return a("div",{key:i,staticClass:"lists templatelist",style:{width:t.basewidth,height:t.baseheight}},[a("div",{staticClass:"header"},[a("span",{style:{background:t.bgcolor}}),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.header,expression:"item.header"}],attrs:{type:"text",id:t.headerid},domProps:{value:t.header},on:{change:function(a){e.addtextcontent(t)},input:function(a){a.target.composing||e.$set(t,"header",a.target.value)}}}),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.info,expression:"item.info"}],attrs:{type:"text",id:t.Infoid},domProps:{value:t.info},on:{change:function(a){e.addtextcontent(t)},input:function(a){a.target.composing||e.$set(t,"info",a.target.value)}}})]),e._v(" "),a("div",{staticClass:"graphe",attrs:{id:t.Graphid}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.addGraphflag,expression:"item.addGraphflag"}],staticClass:"addcen el-icon-circle-plus",on:{click:function(a){e.addgraphe(t.Graphid,i)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.deleteflag,expression:"item.deleteflag"}],staticClass:"delete iconfont icon-shanchu"}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.imgflag,expression:"item.imgflag"}],attrs:{width:"100%",height:"100%",src:t.src,alt:""}}),e._v(" "),t.textflag?a("span",{staticClass:"formcontent"},[e._v(e._s(t.reportFormsTitle))]):e._e()]),e._v(" "),a("div",{staticClass:"footer"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"item.description"}],attrs:{id:t.descriptionid},domProps:{value:t.description},on:{change:function(a){e.addtextcontent(t)},input:function(a){a.target.composing||e.$set(t,"description",a.target.value)}}}),e._v(" "),a("div",{staticClass:"scrollby"},[a("span",{ref:"prev",refInFor:!0,staticClass:"el-icon-arrow-up",on:{click:e.scrollpage}}),e._v(" "),a("span",{ref:"next",refInFor:!0,staticClass:"el-icon-arrow-down",on:{click:e.scrollpage}})])])])}))]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.suspendflag,expression:"suspendflag"}],staticClass:"addelement"}),e._v(" "),a("Dialog",{attrs:{dialogOpt:e.dialogOpt},on:{"handlecancle-dialog":e.selectDialog,"handlesure-dialog":e.submitDialog}})],1)},staticRenderFns:[]};var r=function(e){a("m7w5")},o=a("VU/8")(i.a,s,!1,r,"data-v-4ba2ef8a",null);t.default=o.exports},VDZE:function(e,t){},m7w5:function(e,t){},mvHQ:function(e,t,a){e.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(e,t,a){var i=a("FeBl"),s=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},vhUd:function(e,t,a){"use strict";(function(e){var i=a("woOf"),s=a.n(i),r=a("mvHQ"),o=a.n(r),l=a("5b5o"),n=a("nOsQ");t.a={mounted:function(){this.ajaxshow()},data:function(){return{reportthemelist:[],themevalue:"",formthemelist:[],report:{reportTitle:"",reportId:""},publicsagainflag:!1,publicsflag:!1,templateId:this.$route.query.templateId,serverobject:n.a,suspendflag:!1,dialogOpt:{dialogflag:!1,width:"536px"},form:{region:""},action:window.localStorage.getItem("baseURL"),imgBaseURL:window.localStorage.getItem("imgBaseURL"),fileList:[],itemsform:[],moduleCode:"",moduleCodeindex:"",activeName:"first",activeNametwo:"first2",backgroundColor:["linear-gradient(to top, #6a89d9,#4c65a4)","linear-gradient(to top, #f56986,#c77081)","linear-gradient(to top, #86e6d8,#59ada1)","linear-gradient(to top, #56aea1,#50a194)"],items:[]}},computed:{actions:function(){return this.action+"upload/image"}},components:{Dialog:l.a},methods:{successreportform:function(e,t){this.suspendflag=!1,this.itemsform=[],this.addgraphecontent(e,1)},queryreporttheme:function(){var e=this;n.a.reportformstheme("",function(t){(t.data.status="SUCCESS")&&(e.reportthemelist=[],t.data.data.list.forEach(function(t,a){e.reportthemelist.push({value:String(t.themeId),label:t.themeName})}))})},successtheme:function(e,t){this.suspendflag=!1,this.formthemelist=[],this.addgraphecontent(e,2)},themechange:function(){var e=this,t={themeId:this.themevalue};n.a.reportforms(t,function(t){(t.data.status="SUCCESS")&&(e.formthemelist=t.data.data.list)})},successforms:function(t){var a=this,i={formsType:t};n.a.reportforms(i,function(i){(i.data.status="SUCCESS")&&(e("#reportform_"+t).css({display:"none"}),a.itemsform=i.data.data.list)})},addgraphecontent:function(e,t){3==t&&(this.items[this.moduleCodeindex].src=e,this.items[this.moduleCodeindex].imgflag=!0),1==t&&(this.items[this.moduleCodeindex].reportFormsTitle=e.reportFormsTitle,this.items[this.moduleCodeindex].textflag=!0,this.items[this.moduleCodeindex].reportFormsCode=e.reportFormsCode,this.items[this.moduleCodeindex].imgflag=!1),2==t&&(this.items[this.moduleCodeindex].reportFormsTitle=e.reportFormsTitle,this.items[this.moduleCodeindex].textflag=!0,this.items[this.moduleCodeindex].imgflag=!1),this.items[this.moduleCodeindex].addGraphflag=!1,this.items[this.moduleCodeindex].dataType=t},successfulupload:function(e,t,a){"SUCCESS"==e.status&&(this.suspendflag=!1,this.fileList=[],this.addgraphecontent(this.imgBaseURL+e.data.fileName,3))},submitUpload:function(){this.$refs.upload.submit()},scrollpage:function(e){"el-icon-arrow-up"==e.target.className?e.target.parentElement.previousElementSibling.scrollBy(0,-10):e.target.parentElement.previousElementSibling.scrollBy(0,10)},preview:function(){var t=e(".dashboardtemplate").clone().html();localStorage.setItem("reportshare",t),localStorage.setItem("items",o()(this.items)),window.open("#/reportpreview","_blank")},savetheme:function(){this.suspendflag=!1},choicesuspend:function(t){e(".tooltip").css("display","none"),e(t.target).offsetParent().find(".tooltip").css("display","block"),this.queryreporttheme(),this.successforms("1")},handleClick:function(e,t){switch(this.itemsform=[],e.label){case"分组表":this.successforms("1");break;case"垂直柱状图":this.successforms("2");break;case"水平柱状图":this.successforms("3");break;case"折线图":this.successforms("4");break;case"饼图":this.successforms("5")}},addgraphe:function(e,t){this.suspendflag=!0,this.moduleCode=e,this.moduleCodeindex=t},addtextcontent:function(e){},ajaxshow:function(e){for(var t=0,a=1,i=2,s="auto",r="auto",o=0;o<9;o++){var l=o+1,n=this.backgroundColor,c="";t==o&&(c=n[0],t+=3),a==o&&(c=n[1],a+=3),i==o&&(c=n[2],i+=3),s="3.5rem",r="calc(3.5rem - 100px)",o>5&&(s="100%",r="3.5rem"),o>6&&(s="5.28rem",r="5.28rem"),this.items.push({header:"",info:"",src:"",description:" ",bgcolor:c,basewidth:s,baseheight:r,deleteflag:!1,addGraphflag:!0,imgflag:!1,textflag:!1,Graphid:"regionReportGraph_0"+l,Infoid:"regionReportInfo_0"+l,descriptionid:"regionReportdescri_0"+l,headerid:"regionReportHeader_0"+l,reportFormsTitle:"",dataType:"",reportFormsCode:""})}console.info(this.items)},selectDialog:function(e,t){t?(this.dialogOpt.dialogflag=!1,self.publicsagainflag=!1):this.dialogOpt={dialogflag:!0,width:"536px",title:e}},submitDialog:function(e,t,a){var i=this;if(a.templateId=i.templateId,i.publicsagainflag){var r=[];a.receiveUserId.forEach(function(e){r.push({reportId:i.report.reportId,allowTwice:a.allowTwice,urgentType:a.urgentType,usefulTime:a.usefulTime,remark:a.remark,reportTitle:i.report.reportTitle,receiveUserId:e.id,receiveUserName:e.label})}),n.a.reportpublish(r,function(e){(e.data.status="SUCCESS")&&(i.dialogOpt.dialogflag=!1,i.publicsagainflag=!1,i.$router.push({path:"/reportpublic"}))})}else{this.report.reportTitle=a.reportTitle;var o={report:a},l={reportModules:[]};i.items.forEach(function(e,t){l.reportModules.push({moduleCode:e.headerid,dataType:2,dataContent:e.header}),l.reportModules.push({moduleCode:e.Infoid,dataType:2,dataContent:e.info}),l.reportModules.push({moduleCode:e.descriptionid,dataType:2,dataContent:e.description}),1==e.dataType?l.reportModules.push({moduleCode:e.Graphid,dataType:1,dataContent:e.reportFormsTitle,reportFormsCode:e.reportFormsCode}):2==e.dataType?l.reportModules.push({moduleCode:e.Graphid,dataType:2,dataContent:e.reportFormsTitle}):3==e.dataType?l.reportModules.push({moduleCode:e.Graphid,dataType:3,dataContent:e.src.substr(e.src.lastIndexOf("/")+1)}):l.reportModules.push({moduleCode:e.Graphid,dataType:"",dataContent:e.src.substr(e.src.lastIndexOf("/")+1)})});var c=s()(l,o);n.a.reportsave(c,function(e){(e.data.status="SUCCESS")&&(i.dialogOpt.dialogflag=!1,i.publicsflag?(i.selectDialog("发布"),i.publicsagainflag=!0,i.report.reportId=e.data.data.reportId):i.$router.push({path:"/reportwatch"}))})}},handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},share:function(){this.selectDialog("发布")},savetemplate:function(){var t=e(".dashboardtemplate").clone().html();localStorage.setItem("reportshare",t),localStorage.setItem("items",o()(this.items)),this.selectDialog("保存")},publics:function(){var t=e(".dashboardtemplate").clone().html();localStorage.setItem("reportshare",t),localStorage.setItem("items",o()(this.items)),this.publicsflag=!0,this.selectDialog("保存")}}}}).call(t,a("7t+N"))}});
//# sourceMappingURL=3.6cc84249f288dfba8ca2.js.map