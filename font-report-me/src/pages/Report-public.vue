<template>
    <div class="page">
        <FormSelectGroup  :module="'reportpublic'" v-on:submit-query="submitInfo" ref="formSelectGroup">
        </FormSelectGroup>
        <div class="list-area">
          <div class="card-con">
            <div class="underlinebtn">
              <SwitchChange ref="switch" :switchOpt="switchOpt" v-on:switch-change="switchChange" />
              <div class="btnGroup" v-if="isPublish == 'no'">
                <el-button type="primary"  size="small" v-show="cancelPublish" @click="cancelPublics">取消发布</el-button>
                <el-button type="primary" size="small" @click="publics">发布</el-button>
              </div>
              <el-dropdown trigger="click" v-if="isPublish == 'ok'" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{replayInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command='已回复'>已回复</el-dropdown-item>
                  <el-dropdown-item command='未回复'>未回复</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="lists">
              <div class="list-con">
                <div class="receivelist" @mouseover='showSuspend(item)' @mouseout="closeSuspend(item)" v-for="(item,index) in lists" :key="index">
                  <div class="list-top" :class="{'enter':item.show,'replied':item.isReply}">
                      <span class="defaultitle title" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']" >{{item.reportTitle}}</span>
                      <span class="defaultitle" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']" v-if="!item.ispublish">{{item.clientType == 1 ? 'pc端' : '移动端'}} {{item.showType == 1 ? '大屏' : '报告'}}</span>
                      <span class="defaultitle names" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']" v-if="item.ispublish">
                        To: <span v-for="(name,inde) in item.receiveUserName.split(',').length > 5 ? item.receiveUserName.split(',').slice(0, 4) : item.receiveUserName.split(',')" :key="inde">{{name}}</span><span v-if="item.receiveUserName.split(',').length>5">等</span>
                      </span>
                      <span class="defaultitle" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']">创建时间：{{item.createTime | dataformat}}</span>
                      <span class="defaultitle" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']" v-if="item.ispublish">发布时间：{{item.publishTime | dataformat}}</span>
                      <span class="defaultitle" :class="[(item.isReply && item.ispublish)? 'reportreceive' : '']" v-if="item.isReply && item.ispublish">回复时间：{{item.publishTime | dataformat}}</span>
                      
                      <div class="angle" v-if="item.publishStatus == 0">
                        <div class="obliqueangle">未发布</div>
                      </div>
                      <div class="angle">
                        <div class='obliquenext' v-if="item.publishStatus == 1 && item.isReply == 1">已回复</div>
                      </div>
                      <div class="angle">
                        <div class="obliqueangle" v-if="item.publishStatus == 1 && item.isReply == 0">未回复</div>
                      </div>
                  </div>
                  <CommonSuspend class="multipletitle" v-show="item.show" :parentItem="item" @handClick-suspend="handClickSuspend"/>
                  <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)" ></el-checkbox></div>      
                </div>
              </div>
            </div>
            <div class="Paginator" >
              <Paginator v-if="total" />
            </div>
          </div>
        </div>
        <DialogTemplateHtml />
    </div>
</template>
<script>
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import SwitchChange from "@/common/switchChange.vue"; //模拟滑动开关
import Paginator from "@/common/paginator.vue";
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //弹框组件
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
import CommonSuspend from "@/common/commonSuspend.vue";
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  created() {
    this.initPaginatorOpt();
  },
  mounted() {
    if(this.$route.query.publish == 1){
      this.homeToList('1')
    }else if(this.$route.query.publish == 2 && this.$route.query.replay == 1 ){
      this.homeToList('1','1')
    }else{
      this.initlist(); //初始化数据列表
    }
  },
  data() {
    return {
      lists: [], //数据列表
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      isReplyArr: [], //切换回复状态 转接数组
      isPublish: "no",
      reports: [], //勾选的报告对象集合
      checkednumber: 0, //选中的数量
      reportIdlists: [], //合并报表的id
      reportshowtype: [], //展示报表类型
      paginatorOpt: "",
      name: [1, 2, 3, 4, 5, 6],
      cancelPublish: false, //取消发布按钮显示状态
      checkboxshow: false,
      replayInfo: "全部", //下拉框选择状态
      total: 0, //用于放数据总量  分页使用
      switchOpt: {
        //滑动开关组件
        width: "130px", //总宽度
        leftName: "未发布", //左边开关的内容
        rightName: "已发布" //右边开关的内容
      },
      handleSwitch: {
        //处理传过来的数据开关
        pubSwitch: true,
        unPubSwitch: true
      }
    };
  },
  computed: {
    paginatorOpts() {
      //获取总条数用
      return this.$store.state.paginatorOptions;
    }
  },
  watch: {
    // publicedList(newData,oldData){  //已发布的报告处理
    //   if(this.handleSwitch.pubSwitch){
    //     let publicArr = []
    //     let unReplay = []
    //     let replaied = []
    //     this.handleSwitch.pubSwitch = false    //禁止循环
    //     this.publicedList.forEach(item => {
    //       publicArr.push(item)
    //     });
    //     publicArr.forEach(function(elem){
    //         if(elem.isReply == 0){  //未回复
    //           unReplay.push(elem)
    //           unReplay.sort(function(a , b){
    //             return a - b
    //           })
    //         }else if(elem.isReply == 1){
    //           replaied.push(elem)
    //           replaied.sort(function(a , b){
    //             return a - b
    //           })
    //         }
    //     });
    //     this.publicedList = this.isReplyArr = unReplay.concat(replaied)
    //     this.paginatorOpt = {
    //       total: this.lists.length,  //报告总条数
    //       currentPage:1,
    //       paginatorFunction: function(page){
    //         console.log(page)
    //       }
    //     }
    //   }
    // },
    // unPublishList(newData,oldData){ //未发布数据的处理
    //   if(this.handleSwitch.unPubSwitch){
    //   let unPublicArr = []
    //   this.handleSwitch.unPubSwitch = false    //禁止循环
    //   //未发布的报告处理
    //   this.unPublishList.forEach(item => {
    //     if(item.publishStatus == 0){  //未发布
    //       unPublicArr.push(item)
    //       unPublicArr.sort(function(a , b){
    //         return a - b
    //       })
    //     }
    //   });
    //   this.unPublishList = unPublicArr
    //   }
    // }
  },
  components: {
    FormSelectGroup,
    SwitchChange,
    Paginator,
    DialogTemplateHtml,
    CommonSuspend
  },
  methods: {
    homeToList(type, repley){
      let _this = this;
      _this.$refs.switch.switchChange()    //按钮组切换
      let param = {
        publishStatus: type,
        isReply: repley,
        pageNum: 1,
        pageSize: 6
      };
      GetMethod("reports", param, function(res) {
        let data = res.data.data.list;
        data.forEach(item => {
            item.ispublish = type; //新加字段 区分已发布未发布
        });
        _this.lists = data;
        _this.total = res.data.data.total   
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    initlist() {
      let _this = this;
      let param = {
        publishStatus: 0,
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("reports", param, function(res) {
        console.log(res)
        let data = res.data.data.list;
        data.forEach(item => {
            item.ispublish = 0; //新加字段 区分已发布未发布
        });
        _this.lists = data;
        _this.total = res.data.data.total   
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    //悬浮icon图标按钮点击
    handClickSuspend(param) {
      console.log(param);
      let _this = this;
      let confirmOptions = {};
      switch (param.handleName) {
        case "编辑报告":
          break;
        case "删除":
          // confirmOptions = {
          //   type: "dialog", //warning
          //   title: "提示", //标题自定义显示内容
          //   show: true, //对话框显示标志位
          //   width: "500px", //对话框自定义宽度
          //   name: "Report-delete", //区分对话框显示表单内容
          //   btnCancelText: "取消", //取消按钮自定义显示内容
          //   btnSubmitText: "确定", //确定按钮自定义显示内容
          //   isShowFoot: true,
          //   content: "您好，确认删除此报告？",
          //   btnSubmitFunction: function() {
          //     //保存按钮事件
          //     console.log("保存111");
          //   },
          //   btnCancelFunction: function() {
          //     //取消按钮事件
          //     console.log("取消");
          //   }
          // };
          // this.$store.dispatch("setDialogModalOptions", confirmOptions);
          Tool.prompt("您好， 是否确定删除此报告？", function success(res) {
            let reportId = param.reportId;
            DeleteMethod("reports/", reportId, function() {
              //重新请求
              _this.initlist();
            });
          });
          break;
        case "修改信息":
          confirmOptions = {
            type: "dialog", //warning
            title: "修改信息", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "500px", //对话框自定义宽度
            name: "Report-modify", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: true,
            item: param, //传给弹框的报告信息
            btnSubmitFunction: function(formdata) {
              //保存按钮事
              console.log(formdata);
              let parmas = {
                remark: formdata.remark,
                reportId: param.reportId,
                reportTitle: formdata.reportTitle
              };
              PutMethod("reports", parmas, function(res) {
                //回显信息
                _this.initlist();
              });
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
            }
          };
          this.$store.dispatch("setDialogModalOptions", confirmOptions);
          break;
        case "备注信息":
          confirmOptions = {
            type: "dialog", //warning
            title: "备注", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "500px", //对话框自定义宽度
            name: "Watch-remark", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: false,
            content: param.remark,
            btnSubmitFunction: function() {
              //保存按钮事件
              console.log("保存111");
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
            }
          };
          this.$store.dispatch("setDialogModalOptions", confirmOptions);
          break;
        case "回复信息":
          //重新调publish接口
          let Info = {
            reportId: param.reportId,
            pageNum: 1,
            pageSize: 6
          };
          GetMethod("report-publishing/publishing", Info, function(res) {
            console.log(res)
            confirmOptions = {
            type: "dialog", //warning
            title: "回复信息", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "604px", //对话框自定义宽度
            name: "Replay-Info", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: false,
            content: res.data.data.list,
            total: res.data.data.total,
            reportId: param.reportId,  //区分是哪个报告
            btnSubmitFunction: function() {
              //保存按钮事件
              console.log("保存111");
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
              //重新重置分页
              _this.initPaginatorOpt(_this.total, _this.pagepation.pageNum);
            }
          };
          _this.$store.dispatch("setDialogModalOptions", confirmOptions);
          });
          break;
        default:
          break;
      }
    },
    showSuspend(item) {
      this.$set(item, "show", true);
    },
    closeSuspend(item) {
      this.$set(item, "show", false);
    },
    changecombination(item) {
      //复选框发生change事件。
      this.reportIdlists.push(item.reportId); //报告id用于合并
      this.reportshowtype.push(item.showType); //报告类型用于判断是否可以合并
      if (item.checked) {
        this.checkednumber++;
        this.reports.push(item);
      } else {
        this.checkednumber--;
        this.reports.forEach((obj, index) => {
          if (obj.reportId == item.reportId) {
            this.reports.splice(index, 1);
          }
        });
      }
    },
    switchChange(message) {
      let _this = this;
      _this.initFormSelectGroup();
      if (message === "未发布") {
        //重置回复状态
        this.replayInfo = "全部";
        this.isPublish = "no";
        this.publicedList = this.isReplyArr;
        let param = {
          publishStatus: 0,
          pageNum: 1,
          pageSize: 6
        };
        GetMethod("reports", param, function(res) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total, '1'); //重置分页组件
          let data = res.data.data.list;
          data.forEach(item => {
            item.ispublish = 0; //新加字段 区分已发布未发布
          });
          _this.lists = data;
        });
      } else {
        //已发布
        this.initCheckedStatus();
        this.isPublish = "ok";
        //发送请求
        let param = {
          publishStatus: 1,
          pageNum: 1,
          pageSize: 6
        };
        GetMethod("reports", param, function(res) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total, '1'); //重置分页组件
          let data = res.data.data.list;
          // _this.name = res.data
          data.forEach(item => {
            item.ispublish = 1; //新加字段 区分已发布未发布
          });
          _this.lists = data;
        });
      }
    },
    publics() {
      //发布
      let _this = this;
      if (!this.checkednumber > 0) {
        this.cancelPublish = true;
        this.checkboxshow = true;
      } else {
        let confirmOptions = {
          type: "dialog", //warning
          title: "发布", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "500px", //对话框自定义宽度
          name: "send", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          isShowFoot: true,
          btnSubmitFunction: function(formdatas) {
            //保存按钮事件
            console.log(formdatas);
            let nweparam = [];
            _this.reports.forEach(function(obj) {
              formdatas.dataright.forEach(function(objChild) {
                nweparam.push({
                  reportId: obj.reportId,
                  allowTwice: formdatas.allowTwice,
                  urgentType: formdatas.urgentType,
                  usefulTime: formdatas.usefulTime,
                  remark: formdatas.remark,
                  reportTitle: obj.reportTitle,
                  receiveUserId: objChild.id,
                  receiveUserName: objChild.label
                });
              });
            });
            console.log(nweparam);
            PostMethod("report-publishing", nweparam, function(res) {
              _this.initCheckedStatus();
              _this.initlist();
            });
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          }
        };
        this.$store.dispatch("setDialogModalOptions", confirmOptions);
      }
    },
    cancelPublics() {
      this.initCheckedStatus();
    },
    handleCommand(command) {
      //选择已回复或未回复事件
      let _this = this;
      this.replayInfo = command;
      if (command == "未回复") {
        // let replaiedArr = []
        // replaiedArr = this.isReplyArr.filter(function(item,index,array){
        //    return item.isReply == '1'
        // })
        // this.publicedList = replaiedArr
        //发送请求
        let param = {
          publishStatus: 1,
          isReply: 0,
          pageNum: 1,
          pageSize: 6
        };
        GetMethod("reports", param, function(res) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total, '1'); //重置分页组件
          let data = res.data.data.list;
          data.forEach(item => {
            item.ispublish = 1;
          });
          _this.lists = data;
        });
      } else {
        // let unReplayArr = []
        // unReplayArr = this.isReplyArr.filter(function(item,index,array){
        //    return item.isReply == '0'
        // })
        // this.publicedList = unReplayArr
        let param = {
          publishStatus: 1,
          isReply: 1,
          pageNum: 1,
          pageSize: 6
        };
        GetMethod("reports", param, function(res) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total, '1'); //重置分页组件
          let data = res.data.data.list;
          data.forEach(item => {
            item.ispublish = 1;
          });
          _this.lists = data;
        });
      }
    },
    initCheckedStatus() {
      this.cancelPublish = false;
      this.checkboxshow = false;
      this.checkednumber = 0;
      this.reports.forEach(function(item) {
        item.checked = false;
      });
      this.reports = []; //清空勾选的报告集合
    },
    initPaginatorOpt(total, pageNum) {
      //分页重置
      let _this = this;
      let paginatorOpt = {
        total: total, //报告总条数
        currentPage: Number(pageNum),
        paginatorFunction: function(page) {
          _this.pagepation.pageNum = page  //保存当前页码
          if(_this.isPublish == "no"){
             let param = {
              publishStatus: 0,
              pageNum: page,
              pageSize: 6
            };
            GetMethod("/reports", param, function(res) {
              let data = res.data.data.list;
              data.forEach(item => {
                item.ispublish = 0;
              });
              _this.lists = data;
            }); 
          }else if(_this.isPublish == "ok"){
            let param = {}
            if(_this.replayInfo == '已回复'){
              param = {
                isReply: 1,
                pageNum: page,
                pageSize: 6
              };
            }else if(_this.replayInfo == '未回复'){
              param = {
                isReply: 0,
                pageNum: page,
                pageSize: 6
              };
            }else{
              param = {
                pageNum: page,
                pageSize: 6
              };
            }
            GetMethod("/report-publishing/publishing", param, function(res) {
              let data = res.data.data.list;
              data.forEach(item => {
                item.ispublish = 1;
              });
              _this.lists = data;
            });
          }
        }
      };
      _this.$store.dispatch("setPaginatorOptions", paginatorOpt);
    },
    initFormSelectGroup() {
      //清空选择组状态
      this.$refs.formSelectGroup.resetData();
    },
    submitInfo(formobj) {
      //查询条件返回数据
      console.log(formobj);
      if (this.isPublish == "no") {
        let _this = this;
        let init = {
          publishStatus: 0,
          pageNum: 1,
          pageSize: 6
        };
        let param = Object.assign(init, formobj);
        GetMethod("reports", param, function(res) {
          _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum); //重置分页组件
          let data = res.data.data.list;
          data.forEach(item => {
            item.ispublish = 0;
          });
          _this.lists = data;
        });
      } else if (this.isPublish == "ok") {
        let _this = this;
        let init = {
          publishStatus: 1,
          pageNum: 1,
          pageSize: 6
        };
        let param = Object.assign(init, formobj);
        GetMethod("reports", param, function(res) {
          _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum); //重置分页组件
          let data = res.data.data.list;
          data.forEach(item => {
            item.ispublish = 1;
          });
          _this.lists = data;
        });
      }
    }
  },
  filters: {
    dataformat: function(value) {
      if (!value) return "";
      value = value.toString();
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/variable.less";
.underlinebtn {
  justify-content: space-between;
  position: relative;
  z-index: 2;
  width: @width-containerContent;
  margin: 0 auto;
  button {
    background-color: #4c65a4;
    border: solid #4c65a4;
    padding: 3px 12px;
  }
}
.page {
  background-color: #f2f3f8;
  width: 100%;
  .list-area {
    position: relative;
    width:@width-containerContent;
    margin: 0 auto;
    top: -40px;
    height: calc(100% - 80px);
    .card-con {
      position: absolute;
      top:0;
      bottom:0;
      width:100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px 10px 0px 0px;
      .Paginator {
        position: absolute;
        right: -10px;
        bottom: 7px;
      }
      .lists {
        padding: 17px 22px 10px 22px;
        .list-con {
          flex-wrap: wrap;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: relative;
          background-color: #ffffff;
          
          .receivelist {
            margin-bottom: 27px;
            text-align: center;
            cursor: pointer;
            width: 320px;
            height: 215px;
            position: relative;
            overflow: visible !important;
            background: linear-gradient(
              #5c73ac,
              #557ec1,
              rgba(78, 137, 214, 0.84),
              rgba(64, 158, 255, 0.5)
            );
            .list-top {
              transition: all 0.2s;
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              color: #ffffff;
              font-size: 16px;
              display: flex;
              flex-direction: column;
              // justify-content: center;
              align-items: center;
              padding-top: 60px;
              .titlelist {
                display: flex;
                // flex-direction: column;
                .angles {
                  position: absolute;
                  top: 0;
                  z-index: 2;
                  left: 0;
                  width: 150px;
                  height: 150px;
                  overflow: hidden;
                  .localRelease {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 150px;
                    height: 30px;
                    background: #278df6;
                    font-size: 20px;
                    transform: translate(-25%, 77%) rotate(-45deg);
                  }
                }
              }
              .defaultitle {
                overflow: hidden;
                line-height: 28px;
                display: inline-block;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                width: 80%;
                &.title {
                  font-size: 16px;
                }
              }
              .enter {
                transition: line-height 0.3s;
                line-height: 26px;
                &.reportreceive {
                  transition: line-height 0.3s;
                  line-height: 21px;
                }
              }
              .leave {
                transition: line-height 0.3s;
                line-height: 28px;
              }
              .names {
                > span {
                  font-size: 14px;
                  margin: 0 2px;
                }
              }
              .angle {
                position: absolute;
                top: 0;
                left: 0;
                width: 150px;
                height: 150px;
                overflow: hidden;
                .obliqueangle {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 150px;
                  height: 30px;
                  background: #a3afb7;
                  font-size: 20px;
                  transform: translate(-25%, 77%) rotate(-45deg);
                }
                .obliquenext {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 150px;
                  height: 30px;
                  background: #278df6;
                  font-size: 20px;
                  transform: translate(-25%, 77%) rotate(-45deg);
                }
              }
              .multipletitle {
                .line {
                  display: block;
                  border: none;
                  height: 1px;
                  background-color: #fff;
                  margin-left: 40px;
                  width: 245px;
                  opacity: 0.66;
                  margin-top: 10px;
                  margin-bottom: 10px;
                }
              }
            }
            .list-top.enter {
              height: calc(100% - 63px);
              padding-top: 50px;
              padding-bottom: 8px;
              font-size: 14px;
              &.replied{
                height: calc(100% - 55px);
              }
            }
            .combination {
              text-align: center;
              line-height: 30px;
              position: absolute;
              bottom: -30px;
              width: 100%;
              .el-checkbox__inner {
                width: 16px;
                height: 16px;
                border: 1px solid;
              }
            }
          }
        }
        .list-con::after {
          content: "";
          width: 320px;
          display: block;
        }
      }
    }
  }
}
</style>
<style scoped>
.page .list-con .receivelist .list-top[data-v-695acfa4] {
  font-size: 16px;
}
.el-dropdown-menu {
  padding: 3px 0;
}
.el-dropdown {
  overflow: hidden;
}
.el-dropdown-menu__item {
  line-height: 29px;
}
.el-dropdown > span {
  display: block;
  width: 86px;
  height: 26px;
  background-color: #4c65a4;
  color: #fff;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  font-weight: 500;
}
.el-dropdown > span:hover {
  cursor: pointer;
}
</style>





