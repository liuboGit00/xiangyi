webpackJsonp([3],{"6FHW":function(e,t){},A6kL:function(e,t,a){e.exports=a.p+"static/img/image-02.2bdb098.png"},CezL:function(e,t,a){e.exports=a.p+"static/img/image-01.d96c637.png"},HilV:function(e,t,a){e.exports=a.p+"static/img/image-04.ac85362.png"},Iy9s:function(e,t,a){"use strict";var o=a("woOf"),i=a.n(o),s=a("nkcX"),l=(a("j/p0"),{props:["dialogOpt","itemIds","title"],data:function(){return{labels:"",remarks:"",options:[{value:"1",label:"财务"},{value:"2",label:"人力"},{value:"3",label:"固资"},{value:"4",label:"运营"},{value:"5",label:"生产"},{value:"6",label:"其他"}],value:"",form:{reportFormsTitle:"",propertyType:"",remark:""}}},watch:{itemIds:function(){var e=this;this.form.reportFormsTitle=this.itemIds.reportFormsTitle,this.remarks=this.itemIds.remark,this.options.find(function(t){t.value==e.itemIds.propertyType&&(e.labels=t.label)}),this.form.remark=this.itemIds.remark}},mounted:function(){},computed:{dialogobj:function(){return i()(this.dialogOpt)}},components:{Dialogcomponent:s.a},methods:{selectOp:function(e){this.form.propertyType=e},dialogHandlesure:function(e,t){if("编辑"==e){if(""==this.form.reportFormsTitle)return this.$message({message:"请填写编辑标题!",type:"warning"}),!1;if(""==this.form.remark)return void this.$message({message:"请填写备注!",type:"warning"});if(""==this.form.propertyType)return void this.$message({message:"请填写性质分类!",type:"warning"});for(var a in this.form)""==this.form[a]&&delete this.form[a];switch(e){case"编辑":this.$emit("handlesure-dialog",e,t,this.form),this.$message({message:"修改成功!",type:"warning"})}}if("删除"==e)switch(e){case"删除":this.$emit("handlesure-dialog",e,t,this.form),this.$message({message:"删除成功!",type:"warning"})}},dialogHandle:function(e,t){this.form.reportFormsTitle=this.itemIds.reportFormsTitle,this.form.remark=this.itemIds.remark,this.$emit("handlecancle-dialog",this.itemIds.reportFormsTitle,this.itemIds.remark,t)}}}),r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("Dialogcomponent",{attrs:{dialogobj:e.dialogobj},on:{"dialog-cancle":e.dialogHandle,"dialog-sure":e.dialogHandlesure}},["编辑"==e.dialogobj.title?a("div",[a("el-form",{ref:"form",attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"编辑"}},[a("el-input",{attrs:{required:!0,maxlength:20},model:{value:e.form.reportFormsTitle,callback:function(t){e.$set(e.form,"reportFormsTitle",t)},expression:"form.reportFormsTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",maxlength:200},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性质分类"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectOp},model:{value:e.labels,callback:function(t){e.labels=t},expression:"labels"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1):e._e(),e._v(" "),"删除"==e.dialogobj.title?a("div",[a("el-form",{ref:"form",attrs:{model:e.form}},[a("el-form-item",{attrs:{label:""}},[e._v("\n                是否确定删除？\n            ")])],1)],1):e._e(),e._v(" "),"备注"==e.dialogobj.title?a("div",[a("el-form",{ref:"form"},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",maxlength:200},model:{value:e.remarks,callback:function(t){e.remarks=t},expression:"remarks"}},[e._v(e._s(e.remarks))])],1)],1)],1):e._e()])],1)},staticRenderFns:[]};var n=a("VU/8")(l,r,!1,function(e){a("6FHW")},"data-v-5356a94f",null);t.a=n.exports},QnMT:function(e,t,a){e.exports=a.p+"static/img/image-03.d8ecd97.png"},VOfL:function(e,t){},"j/p0":function(e,t,a){"use strict";var o,i=a("7+uW");t.a=(o=(new i.default).axios,{pagepation:"",reportlist:function(e,t,a){var i=e;o.get("/report-forms",{params:i}).then(function(e){t(e)})},reportmerger:function(e,t,a){var i=e;o.put("/report-forms",i).then(function(e){t(e)})},reportdelete:function(e,t,a){var i=e;o.delete("/report-forms/"+i).then(function(e){t(e)})}})},kY1J:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("l7rJ"),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("FormSelectGroup",{attrs:{module:"reportwatch"},on:{"submit-query":e.submitshow}}),e._v(" "),a("CommonSuspend",{staticClass:"content-area",attrs:{suspendobj:e.suspendOpt},on:{"select-dialog":e.selectDialog}},[a("Scrollframe",{staticClass:"content-frame",attrs:{isLastPage:e.isLastPage},on:{"ajax-query":e.ajaxshow}},e._l(e.items,function(t,o){return a("div",{key:o,staticClass:"receivelist",on:{click:e.openPage,mousedown:function(a){e.rewId(t)}}},[a("div",{staticClass:"list-top",style:{backgroundImage:"url("+t.imgBags+")"}},[e.angleshowflag?a("span",{staticClass:"defaultitle",attrs:{title:t.reportFormsTitle}},[e._v(e._s(t.reportFormsTitle))]):e._e(),e._v(" "),e.angleshowflag?a("div",{staticClass:"defaultitle",attrs:{title:t.remark}},[e._v(e._s(t.remark))]):e._e(),e._v(" "),a("span",{staticClass:"multipletitle",attrs:{title:t.createTime}},[e._v("\n                  "+e._s(t.createTime)+"\n                ")]),e._v(" "),e.angleshowflag?e._e():a("div",{staticClass:"angle"},[a("div",{staticClass:"obliqueangle"},[e._v("财务")])]),e._v(" "),e.angleshowflag?a("div",{staticClass:"angle"},[a("div",{staticClass:"obliquenext"},[e._v("运营")])]):e._e()]),e._v(" "),e.checkboxshow?a("div",{staticClass:"combination"},[a("el-checkbox",{on:{change:function(a){e.changecombination(t)}},model:{value:t.checked,callback:function(a){e.$set(t,"checked",a)},expression:"item.checked"}})],1):e._e()])}))],1),e._v(" "),a("Dialog",{attrs:{dialogOpt:e.dialogOpt,itemIds:e.listForms},on:{"handlecancle-dialog":e.selectDialog,"handlesure-dialog":e.submitDialog}})],1)},staticRenderFns:[]};var s=function(e){a("u/tj")},l=a("VU/8")(o.a,i,!1,s,"data-v-6d129582",null);t.default=l.exports},l7rJ:function(e,t,a){"use strict";(function(e){var o=a("woOf"),i=a.n(o),s=a("xbEV"),l=a("gY1r"),r=a("Cin5"),n=a("Iy9s"),m=a("j/p0");t.a={data:function(){return{imgBags:"",titleData:"",isLastPage:!1,formTit:"",formId:"",listForms:"",formName:"",formTitle:"",pagepation:{pageNum:1,pageSize:15},serverobject:m.a,items:[],reportIdlists:[],checkboxshow:!1,checkednumber:0,angleshowflag:!0,dialogOpt:{dialogflag:!1,width:"25%"},suspendOpt:{name:"报表查看",position:"bottom",domClass:"list-top",offsetbottom:"0%",show:!0},options:[],reportFormsCodes:""}},components:{FormSelectGroup:s.a,Scrollframe:r.a,CommonSuspend:l.a,Dialog:n.a},created:function(){var e=this;-1!=window.location.href.indexOf("sessionId")?this.axios.get("/users/"+window.location.href.split("=")[1]).then(function(t){localStorage.setItem("photo",t.data.data.photo),localStorage.setItem("userName",t.data.data.userName),localStorage.setItem("sessionId",window.location.href.split("=")[1]),e.ajaxshow()}):this.axios.get("/users/"+localStorage.getItem("sessionId")).then(function(t){e.ajaxshow()})},mounted:function(){""==document.getElementsByClassName("page")[0].style.display&&this.$emit("typeShow",!1)},methods:{rewId:function(e){this.formTit=e,this.formId=e.reportFormsId,localStorage.setItem("reportFormsCodes",e.reportFormsCode)},openPage:function(){e(".content-area").clone().html();window.open("#/newPage","_blank")},changecombination:function(e){this.reportIdlists.push(e.reportId),e.checked?this.checkednumber++:this.checkednumber--},share:function(){this.selectDialog("发布")},combinations:function(){this.checkboxshow=!0,this.checkednumber>0&&this.selectDialog("合并")},ajaxshow:function(e){var t=this;t.isLastPage=!0,t.pagepation=e||t.pagepation,t.serverobject.pagepation=t.pagepation,m.a.reportlist(e,function(e){var o=e.data.data;t.items=o.list,t.items.map(function(e){1==e.formsType&&(e.imgBags=a("HilV")),2==e.formsType&&(e.imgBags=a("CezL")),3==e.formsType&&(e.imgBags=a("CezL")),4==e.formsType&&(e.imgBags=a("QnMT")),5==e.formsType&&(e.imgBags=a("A6kL"))}),t.isLastPage=o.isLastPage})},submitshow:function(e){this.options=[],this.items=[],this.pagepation={pageNum:1,pageSize:15},this.items=[];var t=i()(e,this.pagepation);this.ajaxshow(t)},selectDialog:function(e,t){this.listForms=this.formTit,t?this.dialogOpt.dialogflag=!1:this.dialogOpt={dialogflag:!0,title:e,width:"25%"}},submitDialog:function(e,t,a){var o=this;if(o.items=[],"编辑"===e){var s=i()(a,{reportFormsId:o.formId});m.a.reportmerger(s,function(e){(e.data.status="SUCCESS")&&(o.dialogOpt.dialogflag=!1,o.ajaxshow())})}"删除"===e&&m.a.reportdelete(o.formId,function(e){(e.data.status="SUCCESS")&&(o.dialogOpt.dialogflag=!1,o.ajaxshow())})}}}}).call(t,a("7t+N"))},"u/tj":function(e,t){},xbEV:function(e,t,a){"use strict";var o,i=a("7+uW"),s=(o=(new i.default).axios,{pagepation:"",reportmergerlen:function(e,t){o.get("/report-forms-themes").then(function(t){e(t)})}}),l={props:["module"],data:function(){return{options:[],items1:[],items:[],value:"",value1:"",value2:"",options1:[{value:"",label:"全部"},{value:"1",label:"分组表"},{value:"2",label:"垂直柱状图"},{value:"3",label:"折线图"},{value:"4",label:"饼图"}],options2:[{value:"",label:"全部"},{value:"1",label:"财务"},{value:"2",label:"人力"},{value:"3",label:"固资"},{value:"4",label:"运营"},{value:"5",label:"生产"},{value:"6",label:"其他"}],formInline:{themeId:"",themeName:"",formsType:"",propertyType:"",templateName:"",reportFormsTitle:"",publishStatus:""}}},created:function(){var e=this;-1!=window.location.href.indexOf("sessionId")?this.axios.get("/users/"+window.location.href.split("=")[1]).then(function(t){localStorage.setItem("sessionId",window.location.href.split("=")[1]),e.themeName()}):this.axios.get("/users/"+localStorage.getItem("sessionId")).then(function(t){e.themeName()})},methods:{themeName:function(){var e=this;s.reportmergerlen(function(t){var a=t.data.data;e.items1=a.list,e.options.push({value:"",label:"全部"}),e.items1.map(function(t){e.options.push({value:t.themeId,label:t.themeName})})})},selectNum:function(){this.formInline.themeId=this.value},selectNum1:function(){this.formInline.formsType=this.value1},selectNum2:function(){this.formInline.propertyType=this.value2,console.log(this.options2[this.formInline.propertyType].label)},onSubmit:function(){for(var e in this.formInline)""==this.formInline[e]&&delete this.formInline[e];this.$emit("submit-query",this.formInline)}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"define-select-group"},["reportwatch"==e.module?a("div",{staticClass:"group-content"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"报表类型"}},[a("el-select",{attrs:{placeholder:""},on:{change:e.selectNum1},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}},e._l(e.options1,function(e){return a("el-option",{key:e.index,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"性质分类"}},[a("el-select",{attrs:{placeholder:""},on:{change:e.selectNum2},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}},e._l(e.options2,function(e){return a("el-option",{key:e.index,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"主题分类"}},[a("el-select",{attrs:{placeholder:""},on:{change:e.selectNum},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return a("el-option",{key:e.index,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"关键词"}},[a("el-input",{attrs:{placeholder:"请输入报表标题"},model:{value:e.formInline.reportFormsTitle,callback:function(t){e.$set(e.formInline,"reportFormsTitle",t)},expression:"formInline.reportFormsTitle"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1):e._e(),e._v(" "),"reportheme"==e.module?a("div",{staticClass:"group-content"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"主题名"}},[a("el-input",{attrs:{placeholder:"请输入主题报表名称"},model:{value:e.formInline.themeName,callback:function(t){e.$set(e.formInline,"themeName",t)},expression:"formInline.themeName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1):e._e()])},staticRenderFns:[]};var n=a("VU/8")(l,r,!1,function(e){a("VOfL"),a("z/P0")},"data-v-416175bc",null);t.a=n.exports},"z/P0":function(e,t){}});
//# sourceMappingURL=3.ec8e61ceb805346768ac.js.map