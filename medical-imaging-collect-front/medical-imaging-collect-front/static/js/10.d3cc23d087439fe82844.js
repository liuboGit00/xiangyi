webpackJsonp([10],{"53zD":function(t,a){},M7Mo:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("BO1k"),i=e.n(n),r=(e("Havv"),{data:function(){return{apparatus:[],indexNum:null}},created:function(){var t=this;this.axios.get("/medical-imaging-collect/organ/with-sample").then(function(a){if("0"==a.data.infoCode){var e=!0,n=!1,r=void 0;try{for(var s,o=i()(a.data.data);!(e=(s=o.next()).done);e=!0){var u=s.value;t.apparatus.push({img:u.organPhoto,num:u.sampleCount,title:u.organName,id:u.organId})}}catch(t){n=!0,r=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}}})},methods:{handleStyle:function(t,a){this.indexNum=t,sessionStorage.setItem("apparatus",t),sessionStorage.setItem("apparatusName",a),this.$router.push("/patient-newForm")}}}),s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"apparatus"},[e("p"),t._v(" "),e("ul",t._l(t.apparatus,function(a,n){return e("li",{key:n,class:{active:t.indexNum===a.index},on:{click:function(e){t.handleStyle(a.id,a.title)}}},[e("div",{staticClass:"contant"},[e("img",{attrs:{src:a.img,alt:a.title}}),t._v(" "),e("span",[t._v(t._s(a.title))]),t._v(" "),e("em",[t._v("入库样本数："+t._s(a.num))])])])}))])},staticRenderFns:[]};var o=e("VU/8")(r,s,!1,function(t){e("53zD")},"data-v-067d9f7c",null);a.default=o.exports}});
//# sourceMappingURL=10.d3cc23d087439fe82844.js.map