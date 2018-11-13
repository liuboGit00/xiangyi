<template>
    <div class='main forSign'>
        <div class='fromSelect'>
            <div class='selectlist'>
                <el-select v-model="value2" clearable placeholder="选择人员"  @change='selval(value2)'>
                    <el-option
                    v-for="item in options2"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                    </el-option>
                </el-select>
            </div>
            <div class='selectlist1'>
                <el-select v-model="value1" clearable placeholder="选择分类">
                    <el-option
                    v-for="item in options1"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                    </el-option>
                </el-select>
            </div>
            <div class='inputSearch'>
                <el-input
                    placeholder="请输入数签名"
                    v-model="input10"
                    clearable>
                </el-input>
            </div>
            <div class='searchBtn'>
                <button type="primary" @click='searchBtn'>搜&nbsp;&nbsp;&nbsp;索</button>
            </div>
        </div>
        <div class='container'>
            <div class='navmenu'>
                <el-tabs v-model="activeName" @tab-click="handleClick" style='width: 1046px;margin: 0 auto;'>
                    <el-tab-pane :label="userNames+'创建'" name="first">
                        <div class='bookSigning'>
                            <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown="applyforId(item)">
                                <img :src="pag" alt="">
                                <h3 @click='details' :title="item.tagName">{{ item.tagName }}</h3>
                                <!-- <p @click='details' :title="item.info" v-html='item.info'></p> -->
                                <strong :title="item.typeName">{{ item.typeName }}</strong>   
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="userNames+'修改'" name="second">
                      <div class='bookSigning1'>
                        <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown='modifythe(item)'>
                            <img :src="pag" alt="">
                            <h3 @click='details2' :title="item.tagName">{{ item.tagName }}</h3>
                            <!-- <p @click='details' :title="item.info" v-html='item.info'></p> -->
                            <strong :title="item.typeName">{{ item.typeName }}</strong>   
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane :label="userNames+'收藏'" name="third">
                      <div class='bookSigning1'>
                        <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown='collectionlist(item)'>
                            <img :src="pag" alt="">
                            <h3 @click='details1' :title="item.tagName">{{ item.tagName }}</h3>
                            <!-- <p @click='details' :title="item.info" v-html='item.info'></p> -->
                            <strong :title="item.typeName">{{ item.typeName }}</strong>   
                        </div>
                      </div>
                    </el-tab-pane>
                </el-tabs>
                <!--分页-->
                <div class="fenye" v-if='createlist.length'>
                  <div class='numli'>
                    <el-pagination @prev-click='prev' @next-click='next' prev-text='上一页' next-text='下一页' background @current-change="currentHandler" :current-page="curPage" :page-size="pageSize" layout="prev, pager, next" :total="total">
                    </el-pagination>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios.js";
export default {
  data() {
    return {
      createlist: [],
      collection1: null,
      personId: null,
      personIdSc: null,
      resData: null,
      userId: null,
      modifytheId: null,
      pag: require("../../assets/img/pag.png"),
      xing: require("../../assets/img/xingTrue.png"),
      options: null,
      collection: null,
      options1: null,
      options2: null,
      userNames: "组织",
      userNamesX: "组织",
      value1: "",
      value2: "",
      value: "",
      input10: "", //搜素内容
      activeName: "first",
      value4: "",
      curPage: 1, //当前页数
      pageSize: 12, //每页显示条目个数
      total: 0, //总条目数
      numandcread: 1, //我的创建 或者是 我的收藏
      tablab: "组织创建",
      storeId: "",
      pageShow: true,
      titleNam: 0,
      formobj: {},
      usernam: ''
    };
  },
  mounted() {
    this.organization(); //人员数据
    this.classification(); //选择分类 select
    this.currentHandler(); //数签列表
  },
  methods: {
    organization() {
      //获取人员数据
      this.axios
        .get("/data-tag-orgs/users")
        .then(res => {
          this.options2 = res.data.data;
          this.tool.close(); //遮罩层消失
        })
        .catch(error => {
          this.tool.close(); //遮罩层消失
          console.log(error);
        });
    },
    classification() {
      //选择分类 select
      this.axios
        .get("/data-tag-types")
        .then(res => {
          this.options1 = res.data.data;
          this.tool.close(); //遮罩层消失
        })
        .catch(error => {
          this.tool.close(); //遮罩层消失
          console.log(error);
        });
    },
    selval(vals) {
       let self = this
      this.options2.map(val => {
        if (val.userId == vals) {
          self.userNamesX = val.userName
        }
      });
      this.usernam =vals
      if(vals == ''){
        this.userNames = "组织"
      }
    },
    searchBtn() {//点击搜索按钮 获取-选择分类-搜索内容
      this.curPage = 1;
      this.userNames = this.userNamesX;
      if(this.usernam == ''){
        this.userNames = "组织"
      }
      this.titleNam = 1      
      this.currentHandler();
    },
    handleClick(tab, event) {//tab标签页切换
      this.value1 = "";
      this.input10 = "";
      this.pageShow = true;
      this.tablab = tab.label;
      this.curPage = 1;
    //   this.numberlist()
      this.currentHandler();
    },
    details() {
      //点击编辑 可以编辑当前内容
      this.axios
        .get("/data-tag-orgs/" + this.personId)
        .then(res => {
          this.resData = res.data.data;
          this.$router.push({
            path: "/organization",
            query: {
              resData: this.resData,
              tagName: this.resData.tagName
            }
          });
          this.tool.close(); //遮罩层消失
        })
        .catch(error => {
          this.tool.close(); //遮罩层消失
          console.log(error);
        });
    },
    details1() {
      //点击编辑 可以编辑当前内容
      this.axios
        .get("/data-tag-orgs/" + this.personIdSc)
        .then(res => {
          this.resData = res.data.data;
          this.$router.push({
            path: "/organization",
            query: {
              resData: this.resData,
              tagName: this.resData.tagName
            }
          });
          this.tool.close(); //遮罩层消失
        })
        .catch(error => {
          this.tool.close(); //遮罩层消失
          console.log(error);
        });
    },
    details2() {
      //点击编辑 可以编辑当前内容
      this.axios
        .get("/data-tag-orgs/" + this.modifytheId)
        .then(res => {
          this.resData = res.data.data;
          this.$router.push({
            path: "/organization",
            query: {
              resData: this.resData,
              tagName: this.resData.tagName
            }
          });
          this.tool.close(); //遮罩层消失
        })
        .catch(error => {
          this.tool.close(); //遮罩层消失
          console.log(error);
        });
    },
    prev() {
      this.pageShow = true;
      //   this.numberlist()
      //   this.currentHandler(1)
    },
    next() {
      this.pageShow = true;
      //   this.numberlist()
      //   this.currentHandler()
    },
    currentHandler(page) {
      this.createlist=''
      //点击分页 改变时会触发
      let numandcread = "";
      let url="";
      if(this.titleNam == 1){
        this.formobj ={
          userId:this.value2,
          typeId:this.value1,
          tagName:this.input10,
          pageNum:this.curPage=page?page:this.curPage,
          pageSize:this.pageSize,
        }
      }else {

         this.formobj = {
            // userId:this.value2,
            typeId:this.value1,
            tagName:this.input10,
            pageNum:this.curPage=page?page:this.curPage,
            pageSize:this.pageSize,
         };
      }
      
      for(let key in this.formobj){
          if(this.formobj[key] == ""){
              delete this.formobj[key]
          }else{
            //   if(key == "pageNum"){
            //       let curpage = page?page:formobj[key];
            //       url = url + "&"+key+"="+curpage;
            //   }else{
                  url = url + "&"+key+"="+this.formobj[key];
            //   }
          }
      }
      if (this.activeName == "first") {
        numandcread = "isOwner";
      } else if (this.activeName == "second") {
        numandcread = "isUpdate";
      } else {
        numandcread = "isFavorite";
      }

      this.axios
            .get("/data-tag-orgs?"+numandcread+"=1"+url)
            .then(res => {
            this.createlist = res.data.data.list;
            this.total = res.data.data.total;
            if(this.createlist.length == 0){
                this.pageShow = false
            }
            this.tool.close(); //遮罩层消失
            })
            .catch(error => {
            this.tool.close(); //遮罩层消失
            console.log(error);
            });
  },
  collectionlist(item) {
    ////tab 点击我的收藏获取所有数据
    this.personIdSc = item.personId; // 获取personId
    this.storeId = item.storeId; // 获取storeId
  },
  //   stars(){ //点击五角星取消当前数签的收藏
  //     this.axios.delete('/data-tag-favorites/'+this.storeId).then( res => {
  //         this.collection.splice(index, 1)
  //     }).catch((error) =>{
  //         console.log(error)
  //     })
  //   },
  applyforId(item) {
    //tab 点击我的创建获取所有数据
    this.userId = item.userId; // 获取userId
    this.personId = item.personId; // 获取personId
  },
  modifythe(item) {
    //tab 点击我的修改获取所有数据
    //   this.userId = item.userId;
    this.modifytheId = item.personId; // 获取personId
  }
  //   applyfor(){
  //     if(this.userId == 0){
  //         this.userId =1
  //     }
  //     if(this.userId ==1){
  //         this.userId =2
  //     }
  //     if(this.userId ==2){
  //         this.userId =3
  //     }
  //     if(this.userId ==3){
  //         this.userId =4
  //     }
  //     this.axios.put('/data-tag-orgs',{
  //         userId: this.userId,
  //         personId: this.personId
  //     }).then( res => {
  //          this.numberlist()
  //     }).catch((error) =>{
  //         console.log(error)
  //     })
  //   }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f4f6f9;
}
.fromSelect {
  height: 100px;
  display: flex;
  width: 100%;
  padding-left: 11.54%;
  background: #4c65a4;
  .selectlist {
    line-height: 100px;
    width: 180px;
    height: 42px;
  }
  .selectlist1 {
    margin-left: 10px;
    line-height: 100px;
    width: 180px;
    height: 42px;
  }
  .inputSearch {
    margin-left: 10px;
    line-height: 100px;
    width: 480px;
    height: 42px;
    display: flex;
  }
  .searchBtn {
    line-height: 100px;
    margin-left: 30px;
    button {
      cursor: pointer;
      width: 108px;
      height: 42px;
      background-color: #278df6;
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      border: none;
      font-size: 18px;
      color: #fefefe;
    }
  }
}
.container {
  width: 100%;
  .navmenu {
    width: 100%;
    height: 104px;
    background: #f9f9f9;
    padding: 20px 40px 0px 40px;
    .bookSigning {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .bookName {
        width: 514px;
        height: 50px;
        margin-bottom: 11px;
        background-color: #ffffff;
        border-left: 4px solid #f56986;
        line-height: 50px;
        display: flex;
        position: relative;
        img {
          width: 18px;
          height: 19px;
          // vertical-align: middle;
          margin-left: 14px;
          margin-top: 14px;
        }
        h3 {
          cursor: pointer;
          font-size: 18px;
          padding-left: 14px;
          width: 240px;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          cursor: pointer;
          padding-left: 19px;
          width: 188px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
          color: #999999;
        }
        strong {
          color: #2f90f3;
          margin-left: 130px;
          font-size: 15px;
          width: 99px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: default
        }
        .selectOp {
          width: 99px;
          height: 25px;
          margin-left: 60px;
        }
      }
      div:nth-child(even) {
        margin-left: 18px;
      }
    }
    .bookSigning1 {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .bookName {
        width: 514px;
        height: 50px;
        margin-bottom: 11px;
        background-color: #ffffff;
        border-left: 4px solid #f56986;
        line-height: 50px;
        display: flex;
        position: relative;
        img {
          width: 18px;
          height: 19px;
          // vertical-align: middle;
          margin-left: 14px;
          margin-top: 14px;
        }
        h3 {
          cursor: pointer;
          font-size: 18px;
          padding-left: 14px;
          width: 240px;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          cursor: pointer;
          padding-left: 19px;
          width: 188px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
          color: #999999;
        }
        strong {
          color: #2f90f3;
          margin-left: 130px;
          width: 99px;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: default
        }
        .selectOp {
          width: 99px;
          height: 25px;
          margin-left: 60px;
        }
      }
      div:nth-child(even) {
        margin-left: 18px;
      }
    }
    .fenye {
      width: 1196px;
      height: 16px;
      position: fixed;
      bottom: 82px;
      .numli {
        padding: 16px 40px 0px 40px;
        float: right;
      }
    }
  }
}
</style>
<style lang="less">
/* .el-input__inner{
    padding: 0 8px;
} */
.forSign{
    .el-input--suffix .el-input__inner {
  background-color: #4c65a4;
  color: #ffffff;
  padding: 20px;
}
.selectOp .el-input--suffix .el-input__inner {
  background-color: #f4f5fb;
  border: none;
  width: 99px;
  height: 25px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.el-button {
  background-color: #278df6;
  border: none;
  font-size: 18px;
  color: #fff;
  width: 108px;
  height: 42px;
}
.el-tabs__header {
  background: #fff;
  width: 1046px;
  height: 65px;
  margin: 0 0 39px !important;
  border-radius: 6px;
}
.el-tabs__nav-wrap {
  line-height: 65px;
  margin-left: 20px;
  border-radius: 6px;
}
.el-tabs__nav-wrap::after {
  background-color: #fff;
}
.el-tabs__active-bar {
  width: 82px;
}
.el-tabs__item.is-active {
  font-size: 20px !important;
}
.el-tabs__item {
  font-size: 20px !important;
}
.selectOp .el-input--suffix .el-input__inner {
  font-size: 12px;
  color: #278df6;
}
.el-tabs__active-bar {
  width: 108px !important;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 14px !important;
}
.el-tabs__item {
  padding: 0 29px !important;
}
.el-tabs__nav-wrap:after{
    background-color: #fff !important;
}
.el-pagination.is-background .el-pager li {
  border: 1px solid #409eff;
  color: #409eff;
}
.el-pagination.is-background .btn-next {
  border: 1px solid #409eff;
  color: #409eff;
}
.el-pagination.is-background .btn-prev {
  border: 1px solid #409eff;
  color: #409eff;
}
.el-pagination.is-background .btn-next:disabled {
  border: 1px solid #c0c4cc;
  color: #bbbbbb
}
.el-pagination.is-background .btn-prev:disabled {
  border: 1px solid #c0c4cc;
  color: #bbbbbb
}
.btn-next {
  color: #409eff;
}
.btn-prev {
  color: #409eff;
}
.el-pagination span:not([class*="suffix"]) {
  padding: 0px 10px;
}
}

</style>



