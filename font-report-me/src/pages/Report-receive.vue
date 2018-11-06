<template>
  <div class="page">
    <FormSelectGroup  :module="'reportreceive'" v-on:submit-query="submitInfo" ref="formSelectGroup">
    </FormSelectGroup>
    <div class="list-area">
      <div class="card-con">
        <div class="underlinebtn">
          <SwitchChange :switchOpt="switchOpt" v-on:switch-change="switchChange" />
          <div class="btnGroup" v-show="isTransmit == '转发'">
            <el-button type="primary"  size="small" v-show="isCancelTransmit"  @click="cancelTransmit" class="transmitBtn">取消转发</el-button>
            <el-button type="primary" size="small" @click="handlerTransmit"  class="transmitBtn">转发</el-button>
          </div>
        </div>
        <div class="lists">
          <div class="list-con">
            <div class="receivelist" v-for="(item,index) in lists" :key="index" @mouseover='showSuspend(item)' @mouseout="closeSuspend(item)">
              <div class="list-top" >
                  <span class="defaultitle title">{{item.receiveReportTitle}}</span>
                  <span class="defaultitle">From: <span>{{item.publishUserName}}</span></span>
                  <span class="defaultitle">{{item.clientType == 1 ? 'pc端' : '移动端'}} {{item.showType ==1 ? '大屏' : '报告'}}</span>
                  <span class="defaultitle">接收时间：{{item.publishTime | dataformat}}</span>
                  <span class="defaultitle">截至时间：{{item.usefulTime | dataformat}}</span>
                  <div class="angle">
                    <div class="urgent" v-if="item.urgentType == 1">加急</div>
                  </div>
                  <div class="angle">
                    <div class="normal" v-if="item.urgentType == 3">正常</div>
                  </div>
                  <div class="angle">
                    <div class="urgency" v-if="item.urgentType == 2">紧急</div>
                  </div>
                  <div class="replays">
                    <div class="replied" v-if="item.isReply == 1" @click="watchReplayInfo(item)">已回复</div>
                    <div class="norReplied" v-if="item.isReply == 0" @click="editReplayInfo(item)">未回复</div>
                    <div class="overtime" v-if="(new Date(item.usefulTime).getTime()) < Date.now()">已过期</div>
                  </div>
                  <CommonSuspend class="multipletitle top" v-show="item.show" :parentItem="item" @handClick-suspend="handClickSuspend"/>
              </div>
              <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)" ></el-checkbox></div>
            </div>
            <div class="Paginator">
              <Paginator v-if="total" />
            </div>
            <DialogTemplateHtml />
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>
<script>
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import SwitchChange from "@/common/switchChange.vue"; //模拟滑动开关
import Paginator from '@/common/paginator.vue';
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue";   //弹框组件
import CommonSuspend from "@/common/commonSuspend.vue";
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
import { GetMethod, 
        DeleteMethod,
        PutMethod,
        PostMethod } from "@/assets/js/Httpservice.js";
export default {
  mounted(){
    if(this.$route.query.replay == 1){
      this.homeToList('1')
    }else if(this.$route.query.replay == 0){
      this.homeToList('0')
    }else{
      this.initList()
    }
    this.initPaginatorOpt()
  },
  computed:{
    paginatorOpts(){    //获取总条数用
      return this.$store.state.paginatorOptions
    },
  },
  data(){
    return {
      lists: '',
      isTransmit: '全部', //是否可转发
      isCancelTransmit: false,
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      paginatorOpt:'',  //分页组件配置
      checkboxshow: false,
      checkednumber: 0,    //选中的数量
      reports:[],  //放勾选转发报告的集合
      total: 0, //用于放数据总量  分页使用
      switchOpt: {
        //滑动开关组件
        width: "130px", //总宽度
        leftName: "全部", //左边开关的内容
        rightName: "可转发" //右边开关的内容
      }
    }
  },
  components:{
    FormSelectGroup,
    SwitchChange,
    Paginator,
    DialogTemplateHtml,
    CommonSuspend
  },
  methods:{
    homeToList(replay){
      let _this = this;
      let param = {
        isReply: replay,
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("report-publishing/receiving", param, function(res) {
        _this.total = res.data.data.total
        _this.lists = res.data.data.list;
        _this.initPaginatorOpt(res.data.data.total,_this.pagepation.pageNum)
      });
    },
    initList(){
      let _this = this;
      let param = {
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("report-publishing/receiving", param, function(res) {
        _this.total = res.data.data.total
        _this.lists = res.data.data.list;
        _this.initPaginatorOpt(res.data.data.total,_this.pagepation.pageNum)
      });
    },
    initPaginatorOpt(total,pageNum) {  //分页重置
      let _this = this;
      let paginatorOpt = {
        total: total, //报告总条数
        currentPage: Number(pageNum),
        paginatorFunction: function(page) {
          _this.pagepation.pageNum = page  //保存当前页码
          let param = {
            pageNum: page,
            pageSize: 6
          };
          GetMethod(
            "report-publishing/receiving",
            param,
            function(res) {
              _this.lists = res.data.data.list;
            }
          );
        }
      };
      _this.$store.dispatch('setPaginatorOptions',paginatorOpt)
    },
    initFormSelectGroup(){   //清空选择组状态
      this.$refs.formSelectGroup.resetData()
    },
    initCheckedStatus(){
      this.isCancelTransmit = false
      this.checkboxshow = false
      this.checkednumber = 0
      this.reports.forEach(function(item){
        item.checked = false
      })
      this.reports = []  //清空勾选的报告集合
    },
    handClickSuspend(param){   //点击悬浮窗
      let _this = this;
      console.log(param);
      let confirmOptions = {};
      switch (param.handleName) {
        case "修改标题":
          confirmOptions = {
            type: "dialog", //warning
            title: "编辑标题", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "500px", //对话框自定义宽度
            name: "edit-title", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: true,
            item: param, //传给弹框的报告信息
            btnSubmitFunction: function(formdata) {
              //保存按钮事
              console.log(formdata);
              let parmas = {
                publishId: param.publishId,
                receiveReportTitle: formdata.reportTitle,
              };
              PutMethod("report-publishing/receiving", parmas, function(res) {
                //回显信息
                _this.initList()
              });
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
            }
          };
          this.$store.dispatch("setDialogModalOptions", confirmOptions);
          break;
        case "删除报告":
          Tool.prompt("您好， 是否确定删除此报告？", function success(res) {
            let publishId = param.publishId
            DeleteMethod('report-publishing/receiving/',publishId,function(){
              //重新请求
              _this.initList()
            })
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
    switchChange(message){
      let _this = this;
      _this.initFormSelectGroup()
      if(message === '全部'){
        _this.isTransmit = '全部'
        _this.initCheckedStatus()  //重置勾选状态
        let param = {
          pageNum: 1,
          pageSize: 6
        };
        GetMethod("report-publishing/receiving", param, function(
          res
        ) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total,'1')  //重置分页组件
          _this.lists = res.data.data.list;
        });
      }else{  //可转发
        this.isTransmit = '转发'
        //请求可转发的请求
        let param = {
          allowTwice: 1,
          pageNum: 1, 
          pageSize: 6
        };
        GetMethod("report-publishing/receiving", param, function(
          res
        ) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total,'1')  //重置分页组件
          _this.lists = res.data.data.list;
        });
      }
    },
    changecombination(item) {  //复选框发生change事件。
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
    handlerTransmit(){  //转发
      let _this = this
      if(!this.checkednumber > 0){
        _this.isCancelTransmit = true
        _this.checkboxshow = true
      }else{
        let confirmOptions = {
          type: "dialog", //warning
          title: "转发", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "500px", //对话框自定义宽度
          name: "send", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          isShowFoot: true,
          btnSubmitFunction: function(formdatas) {
            //保存按钮事件
            console.log(formdatas)
            let nweparam = [];
            _this.reports.forEach(function(obj){
              formdatas.dataright.forEach(function(objChild){
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
              })
            })
            console.log(nweparam)
            PostMethod('report-publishing',nweparam,function(res){
              _this.initCheckedStatus()
              _this.initList()
            })
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          }
        };
        this.$store.dispatch("setDialogModalOptions", confirmOptions);
      }
    },
    cancelTransmit(){  
      this.initCheckedStatus()
    },
    watchReplayInfo(item){
      let _this = this
      let confirmOptions = {
          type: "dialog", //warning
          title: "我的回复", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "500px", //对话框自定义宽度
          name: "Watch-Replay", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          content: item.replyContent,
          isShowFoot: false,
          btnSubmitFunction: function() {
            //保存按钮事件
            console.log("保存111");
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          _this.initPaginatorOpt(_this.total, _this.pagepation.pageNum);
          }
        };
        this.$store.dispatch("setDialogModalOptions", confirmOptions);
    },
    editReplayInfo(item){
      let _this = this
      let confirmOptions = {
          type: "dialog", //warning
          title: "回复", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "500px", //对话框自定义宽度
          name: "Edit-Replay", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          isShowFoot: true,
          btnSubmitFunction: function(formdata) {
            //保存按钮事件
            console.log(item)
            console.log(formdata);
              let parmas = {
                isReply: 1,
                reportId:  item.reportId,
                publishId: item.publishId,
                replyContent: formdata.textarea,
              };
              PutMethod("report-publishing/receiving", parmas, function(res) {
                //回显信息
                _this.initList()
              });
            
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          }
        };
        this.$store.dispatch("setDialogModalOptions", confirmOptions);
    },
    submitInfo(formobj){   //查询条件组返回数据
      console.log(formobj)
      let _this = this
      if(_this.isTransmit == '全部'){
        let init = {
          pageNum: 1,
          pageSize: 6
        };
        let param = Object.assign(init, formobj)
        GetMethod("report-publishing/receiving", param, function(
          res
        ) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total,_this.pagepation.pageNum)  //重置分页组件
          _this.lists= res.data.data.list;
        });
      }else if(_this.isTransmit == '转发'){
        let init = {
          allowTwice: 1,
          pageNum: 1,
          pageSize: 6
        };
        let param = Object.assign(init, formobj)
        GetMethod("report-publishing/receiving", param, function(
          res
        ) {
          _this.total = res.data.data.total
          _this.initPaginatorOpt(res.data.data.total,_this.pagepation.pageNum)  //重置分页组件
          _this.lists= res.data.data.list;
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
}
</script>
<style lang="less" scoped>
  @import "../assets/less/variable.less";
  [v-cloak]{
    display: none;
  }
  .page{
    background-color: #f2f3f8;
    width: 100%;
    .list-area{
      position: relative;
      width: @width-container;
      height: calc(100% - 120px);
      margin: 0 auto;
      .card-con{
        position: absolute;
        top: -40px;
        left: 40px;
        @width-containerContent: 1046px;
        height: 106%;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px 10px 0px 0px;
        .underlinebtn {
          justify-content: space-between;
          position: relative;
          z-index: 2;
          width: @width-containerContent;
          margin: 0 auto;
          .btnGroup{
            margin-right: 3px;
            .transmitBtn{
              background-color: #4c65a4;
              border: solid #4c65a4;
            }
          }
        }
        .lists{
          padding: 22px 22px 0 ;
          height: 90%;
          .list-con{
            position: relative;
            background-color: #ffffff;
            width: 1003px;   //定义宽度
            height: 103%;
            .Paginator{
              position: absolute;
              right: -20px;
              bottom: 7px;
            }
            .receivelist {
              min-width: 320px;
              min-height: 215px;
              width: 320px;
              height: 215px;
              float: left;
              position: relative;
              overflow: visible !important;
              margin-right: 20px;
              margin-bottom: 30px;
              &:nth-child(3n){
                margin-right: 0;
              }
              .list-top {
                width: 100%;
                height: 100%;
                text-align: center;
                color: #ffffff;
                font-size: 20px;
                // background: linear-gradient(#6886db, #4b63a7);
                background-image: linear-gradient(180deg, 
                #5c73ac 0%, 
                #557ec1 25%, 
                rgba(78, 137, 214, 0.77) 50%, 
                rgba(64, 158, 255, 0.3) 100%);
                box-shadow: 0px 3px 5px 0px 
                rgba(0, 0, 0, 0.19);
                padding-top: 53px;
                .multipletitle {
                  position: absolute;
                  left: 0;
                  display: inline-block;
                  width: 100%;
                  line-height: 30px;
                }
                .titlelist {
                  display: flex;
                  flex-direction: column;
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
                  line-height: 24px;
                  display: block;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 80%;
                  margin: 0 auto;
                  font-size: 14px;
                  span{
                    margin-right: 4px;
                  }
                  &.title{
                    font-size: 16px;
                  }
                }
                .names{
                  >span{
                    font-size: 14px;
                    margin:0 2px;
                  }
                }
                .replays{
                  width: 100%;
                  >div{
                    margin: 1px auto;
                    width: 68px;
                    height: 31px;
                    text-align: center;
                    line-height: 31px;
                    font-size: 14px;
                    &:hover{
                      cursor: pointer;
                    }
                    &.replied{
                      border-radius: 4px;
                      border: solid 1px #2b8ef4;
                      color: #278df6;
                    }
                    &.norReplied{
                      background-color: #2b8ef4;
                      border-radius: 4px;
                      color: #ffffff
                    }
                    &.overtime{
                      color: #2b8ef4
                    }
                  }
                }
                .angle {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 130px;
                  height: 150px;
                  overflow: hidden;
                  z-index: 1;
                  .urgent {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 150px;
                    height: 30px;
                    background-color: #e75052;
                    font-size: 20px;
                    transform: translate(-25%, 77%) rotate(-45deg);
                  }
                  .urgency {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 150px;
                    height: 30px;
                    background: #eec552;
                    font-size: 20px;
                    transform: translate(-25%, 77%) rotate(-45deg);
                  }
                  .normal {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 150px;
                    height: 30px;
                    background: #3390f1;
                    font-size: 20px;
                    transform: translate(-25%, 77%) rotate(-45deg);
                  }
                }
                
              }
              .combination {
                text-align: center;
                line-height: 30px;
                .el-checkbox__inner {
                  width: 16px;
                  height: 16px;
                  border: 1px solid;
                }
              }
            }
          }
        }
      }
      
    }
    
  }
</style>

