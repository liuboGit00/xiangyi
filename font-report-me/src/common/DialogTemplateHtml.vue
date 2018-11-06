/*
 * @Author: dengzeyuan 
 * @Date: 2018-10-15 21:17:32 
 * @File Description: ''Dialog对话框表单内容,通过v-if=true来显示对话框的表单内容 
*/

<template>
    <Dialog :dialogModalOptions="confirmOptions" :formDate="form"  v-on:reset-params="resetParmas">
      <el-form ref="ruleForm" :model="form" :rules="rules2">   
        <div v-if="$route.path == '/Report-public'">
          <!-- 选择接收人 -->
          <div v-if="confirmOptions.name == 'send'">
            <div class="treetransfer">
              <el-tree
                :data="dataleft" 
                :props="defaultProps"
                show-checkbox
                node-key="id"
                ref="tree"
                @check-change="handleCheckChange">
              </el-tree>
              <div class="handle">
                <span class="el-icon-arrow-left"  @click="getCheckedNodesLeft"></span>
                <span class="el-icon-arrow-right"  @click="getCheckedNodesRight"></span>
              </div>
              <el-tree
                :data="form.dataright" 
                :props="defaultProps"
                node-key="id"
                ref="trees"
                show-checkbox
                @check-change="handleCheckChange">
              </el-tree>
            </div>
            <!-- <el-form class="formpublic" ref="form" :model="form" label-width=""> -->
                <el-form-item label="是否允许二次转发">
                    <el-radio-group v-model="form.allowTwice">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="紧急程度">
                    <el-radio-group v-model="form.urgentType">
                    <el-radio label="1">加急</el-radio>
                    <el-radio label="2">紧急</el-radio>
                    <el-radio label="3">正常</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期限">
                    <el-date-picker
                      v-model="form.usefulTime"
                      type="datetime"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" :maxlength='200'></el-input>
                </el-form-item>
            <!-- </el-form> -->
          </div>
          <!-- 查看备注信息 -->
          <div v-if="confirmOptions.name == 'Watch-remark'" style="height:150px;">
            {{confirmOptions.content}}
          </div>
          <!-- 删除提示 -->
          <div v-if="confirmOptions.name == 'Report-delete'" style="height:100px;">
            <div class="deleteCon">
              <i class="el-icon-warning"></i>
              <span>{{confirmOptions.content}}</span>
            </div>
          </div>
          <!-- 报告修改 -->
          <div v-if="confirmOptions.name == 'Report-modify'">
              <el-form-item label="修改标题"  prop="maxLength15">
                <el-input v-model="form.reportTitle" auto-complete="off" prop="maxLength15"></el-input>
              </el-form-item>
              <el-form-item label="修改备注">
                <el-input type="textarea" v-model="form.remark"  :maxlength='200'></el-input>
              </el-form-item>
          </div>
          <!-- 回复详情信息 -->
          <div v-if="confirmOptions.name == 'Replay-Info'" class="replayInfos">
            <div>
              <span>是否允许二次转发 : <span class="result">{{confirmOptions.content[0].allowTwice ? '是' : '否'}}</span></span>
              <span>紧急程度 :
                <span class="result">
                  <span v-if="confirmOptions.content[0].urgentType == 1">加急</span>
                  <span v-if="confirmOptions.content[0].urgentType == 2">紧急</span>
                  <span v-if="confirmOptions.content[0].urgentType == 3">正常</span>
                </span>
              </span>
            </div>
            <div>
              <span>有限期限 ：<span class="result">{{confirmOptions.content[0].usefulTime | dataformat}}</span> </span>
            </div>
            <div>
              <span>备注：<span class="remarkCon result">{{confirmOptions.content[0].remark}}</span></span>
            </div>
            <div class="tables">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="receiveUserName"
                  label="发送对象"
                  align='center'
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="replyContent"
                  label="回复内容"
                  width="283">
                </el-table-column>
                <el-table-column
                  prop="replyTime"
                  label="回复时间"
                  align="center"
                  :formatter="dateFormat"
                  width="180">
                </el-table-column>
              </el-table>
              <div class="Paginator">
                <Paginator />
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.path == '/Report-receive'">
          <!-- 查看回复信息 -->
          <div v-if="confirmOptions.name == 'Watch-Replay'" style="height:150px;">
            {{confirmOptions.content}}
          </div>
          <!-- 编辑回复信息 -->
          <div v-if="confirmOptions.name == 'Edit-Replay'">  
              <p style="line-height:36px;">请输入要回复的内容</p>
              <el-input
                type="textarea"
                :rows="4"
                placeholder=""
                v-model="form.textarea">
              </el-input>
          </div>
          <!-- 选择接收人 -->
          <div v-if="confirmOptions.name == 'send'">
            <div class="treetransfer">
              <el-tree
                :data="dataleft" 
                :props="defaultProps"
                show-checkbox
                node-key="id"
                ref="tree"
                @check-change="handleCheckChange">
              </el-tree>
              <div class="handle">
                <span class="el-icon-arrow-left"  @click="getCheckedNodesLeft"></span>
                <span class="el-icon-arrow-right"  @click="getCheckedNodesRight"></span>
              </div>
              <el-tree
                :data="form.dataright" 
                :props="defaultProps"
                node-key="id"
                ref="trees"
                show-checkbox
                @check-change="handleCheckChange">
              </el-tree>
            </div>
            <el-form class="formpublic" ref="form" :model="form" label-width="">
                <el-form-item label="是否允许二次转发">
                    <el-radio-group v-model="form.allowTwice">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="紧急程度">
                    <el-radio-group v-model="form.urgentType">
                    <el-radio label="1">加急</el-radio>
                    <el-radio label="2">紧急</el-radio>
                    <el-radio label="3">正常</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期限">
                    <el-date-picker
                      v-model="form.usefulTime"
                      type="datetime"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" :maxlength='200'></el-input>
                </el-form-item>
            </el-form>
          </div>
          <!-- 编辑标题 -->
          <div v-if="confirmOptions.name == 'edit-title'">
            <el-form-item label="编辑标题"  prop="maxLength15">
              <el-input v-model="form.reportTitle" auto-complete="off"  prop="maxLength15"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="$route.path == '/Report-watch'">
          <!-- 修改信息 -->
          <div v-if="confirmOptions.name == 'Report-modify'">
              <el-form-item label="修改标题"  prop="maxLength15">
                <el-input v-model="form.reportTitle" auto-complete="off" prop="maxLength15"></el-input>
              </el-form-item>
              <el-form-item label="修改备注">
                <el-input type="textarea" v-model="form.remark"  :maxlength='200'></el-input>
              </el-form-item>
          </div>
          <!-- 查看备注信息 -->
          <div v-if="confirmOptions.name == 'Watch-remark'" style="height:150px;text-align:left;">
            {{confirmOptions.content}}
          </div>
          <!-- 回复详情信息 -->
          <div v-if="confirmOptions.name == 'Replay-Info'" class="replayInfos">
            <div>
              <span>是否允许二次转发 : <span class="result">{{confirmOptions.content.allowTwice ? '是' : '否'}}</span></span>
              <span>紧急程度 :
                <span class="result">
                  <span v-if="confirmOptions.content[0].urgentType == 1">加急</span>
                  <span v-if="confirmOptions.content[0].urgentType == 2">紧急</span>
                  <span v-if="confirmOptions.content[0].urgentType == 3">正常</span>
                </span>
              </span>
            </div>
            <div>
              <span>有限期限 ：<span class="result">{{confirmOptions.content[0].usefulTime | dataformat}}</span> </span>
            </div>
            <div>
              <span>备注：<span class="remarkCon result">{{confirmOptions.content[0].remark}}</span></span>
            </div>
            <div class="tables">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="receiveUserName"
                  label="发送对象"
                  align='center'
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="replyContent"
                  label="回复内容"
                  width="283">
                </el-table-column>
                <el-table-column
                  prop="replyTime"
                  label="回复时间"
                  align="center"
                  width="180">
                </el-table-column>
              </el-table>
              <div class="Paginator">
                <Paginator />
              </div>
            </div>
          </div>
          <!-- 编辑合并后的标题和备注 -->
          <div v-if="confirmOptions.name == 'merge'">
            <el-form-item label="请输入合并后的标题"  prop="maxLength15">
              <el-input v-model="form.reportTitle" auto-complete="off" prop="maxLength15"></el-input>
            </el-form-item>
            <el-form-item label="修改备注">
              <el-input type="textarea" v-model="form.remark"  :maxlength='200'></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="$route.path == '/Report-template'"> 
          <!-- 查看备注信息 -->
          <div v-if="confirmOptions.name == 'Watch-remark'" style="height:150px;text-align:left;">
            {{confirmOptions.content}}
          </div>
        </div>
        <!-- 自定义大屏模板页面 -->
        <div v-if="$route.path == '/Report-dashboardTempDefine'">
          <div v-if="confirmOptions.name == 'add'">
             <el-form-item label="请输入保存后的标题"  prop="number">
                <el-input v-model="form.reportTitle"  auto-complete="off" prop="number" ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 报告编辑大屏模板 -->
        <div v-if="$route.path == '/Report-dashboardTemp'">
          {{form.remark}}
        </div>
        <!-- 编辑报告模板 -->
        <div v-if="$route.path == '/Report-editChoiceTemp'">
          {{form.remark}}
        </div>
        <!-- 编辑大屏 -->
        <div v-if="$route.path == '/Report-createDashboard'">
          <div v-if="confirmOptions.name == 'dashboardSave'">
            <el-form-item label="请输入保存后的标题"  prop="maxLength15">
              <el-input v-model="form.reportTitle" auto-complete="off" prop="maxLength15"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.remark"  :maxlength='200'></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </Dialog>
</template>

<script type="text/ecmascript-6">
import Dialog from "@/common/Dialog.vue";
import tests from "../assets/js/checkout.js";
import Paginator from "./paginator.vue";
import { GetMethod } from "@/assets/js/Httpservice.js";
import {mapState} from 'vuex'
export default {
  created() {
    for (let key in tests) {
      this.rules2[key] = tests[key];
    }
    
  },
  mounted() {
    this.getReportorganize(); //获取组织结构
  },
  data() {
    return {
      //表格中的数据
      // tableData: [
      //   {
      //     receiver: "2016-05-02",
      //     replay: "王小虎",
      //     replayTime: "上海市普陀",
      //     aa: '假数据'
      //   },
      //   {
      //     receiver: "2016-05-02",
      //     replay: "王小虎",
      //     replayTime: "上海市普陀"
      //   },
      //   {
      //     receiver: "2016-05-02",
      //     replay: "王小虎",
      //     replayTime: "上海市普陀"
      //   },
      //   {
      //     receiver: "2016-05-02",
      //     replay: "王小虎",
      //     replayTime: "上海市普陀"
      //   }
      // ],
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      // 表单数据
      form: {
        //保存的表单
        reportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "3",
        allowTwice: "1",
        dataright: [], //用户列表
        textarea: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      dataleft: [], //组织架构
      // form.dataright: [], //用户列表
      rules2: {}
    };
  },
  computed: {
    confirmOptions() {
      var _this=this;
        for(let key in this.form){
          for(let keychild in this.$store.state.dialog_modalOptions.item){
            if(key == keychild){
              this.form[key] = this.$store.state.dialog_modalOptions.item[keychild]?this.$store.state.dialog_modalOptions.item[keychild]:"";
            }
          }
        }
        return this.$store.state.dialog_modalOptions;
    },
    ...mapState(['dialog_modalOptions'])
  },
  watch:{
    dialog_modalOptions(newV,oldV){   //监控数据改变监控数据
      this.tableData =  newV.content
      this.initPaginatorOpt(newV.total,this.pagepation.pageNum);  //重置分页
    }
  },
  methods: {
    initPaginatorOpt(total, pageNum) {
      //分页重置
      let _this = this;
      let paginatorOpt = {
        total: total, //报告总条数
        currentPage: Number(pageNum),
        isdialog: true,   //区分是否为对话框分页   
        dialogpaginatorFun: function(page){  //对话框专有的函数
          console.log(page,'hahhaha')
          let Info = {
            reportId: _this.$store.state.dialog_modalOptions.reportId,
            pageNum: page,
            pageSize: 6
          };
          GetMethod("report-publishing/publishing", Info, function(res) {
            _this.tableData = res.data.data.list
          });
        }
      };
      _this.$store.dispatch("setPaginatorOptions", paginatorOpt);
    },
    async getReportorganize() {
      let self = this;
      let res = await self.axios.get("/users/organize");
      if ((res.status = "SUCCESS")) {
        self.dataleft = res.data.data;
        self.dataleft = self.transData(
          self.dataleft,
          "orgId",
          "orgName",
          "orgSupId",
          "children"
        );
      }
    },
    getCheckedNodesLeft() {
      let self = this,
        samflag = false,
        newgetchecknode = [],
        checkednodes = this.$refs.trees.getCheckedNodes();
      self.form.dataright.forEach(function(obj, index) {
        samflag = false;
        checkednodes.forEach(function(objchild, indexchild) {
          if (obj.id == objchild.id) {
            samflag = true;
          }
        });
        if (!samflag) {
          newgetchecknode.push(obj);
        }
      });
      self.form.dataright = newgetchecknode;
    },
    getCheckedNodesRight() {
      let self = this,
        newgetchecknode = [],
        checkednodes = this.$refs.tree.getCheckedNodes();
      checkednodes.forEach(function(objchild, indexchild) {
        if (!objchild.hasOwnProperty("children")) {
          newgetchecknode.push(objchild);
        }
      });
      self.form.dataright.forEach(function(obj, index) {
        newgetchecknode.forEach(function(objchild, indexchild) {
          if (obj.id == objchild.id) {
            newgetchecknode.splice(indexchild, 1);
          }
        });
      });
      self.form.dataright = this.form.dataright.concat(newgetchecknode);
    },
    //将json数据转化为树形组件可识别的结构
    transData(a, orgIdStr, orgNameStr, orgSupIdStr, chindrenStr) {
      var r = [],
        hash = {},
        orgId = orgIdStr,
        orgName = orgNameStr,
        orgSupId = orgSupIdStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        k = 0,
        len = a.length;
      var b = [];
      for (; k < len; k++) {
        var tree = {
          id: a[k][orgId],
          label: a[k][orgName],
          orgSupId: a[k][orgSupId]
          // children:[]
        };
        b[k] = tree;
      }
      for (; i < len; i++) {
        hash[b[i]["id"]] = b[i];
      }
      for (; j < len; j++) {
        var aVal = b[j],
          hashVP = hash[aVal[orgSupId]];
        if (hashVP) {
          // if(hashVP[children] && hashVP[children].length==0){
          //    hashVP["disabled"]=true;
          // }
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
          hashVP["disabled"] = true;
        } else {
          r.push(aVal);
        }
      }
      return r;
    },
    setDataToTree(treeData, pId, respData) {
      if (treeData) {
        for (var i = 0; i < treeData.length; i++) {
          var td = treeData[i];
          if (td.id == pId) {
            this.$set(treeData[i], "children", []);
            treeData[i].children = treeData[i].children.concat(respData);
            return;
          } else {
            this.setDataToTree(td.children, pId, respData);
          }
        }
      }
    },
    async handleCheckChange(data, checked, indeterminate) {
      let self = this;
      if (!data.lastchild && (!data.children || data.children.length <= 0)) {
        // let params = {"orgId":data.id};
        let params = data.id;
        //请求接口
        let res = await self.axios.get("/users/organize/" + params); //用实例上的方法
        if ((res.data.status = "SUCCESS")) {
          res.data.data = self.transData(
            res.data.data,
            "userId",
            "userName",
            "aliasName",
            "children"
          );
          res.data.data.forEach((obj, index) => {
            obj.lastchild = true;
          });
          self.setDataToTree(self.dataleft, data.id, res.data.data);
        }
      }
    },
    resetParmas() {
      //重置form表单信息
      let form = this.form;
      for (let key in form) {
        form[key] = "";
      }
    },
    dateFormat(row, column, cellValue, index){   //格式化表格里的时间
      let value = row[column.property]
      if (!value) return "";
      value = value.toString();
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    }
  },
  components: {
    Dialog,
    Paginator
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

<style scoped lang="less">
//详细回复信息样式
.replayInfos {
  > div {
    margin: 12px 0;
    text-align: left;
    &.tables {
      position: relative;
      .Paginator {
        position: absolute;
        right: -30px;
        bottom: -28px;
      }
    }
  }
  .result {
    padding: 0 20px;
    color: #b7b7b7;
  }
  span.remarkCon {
    display: inline-block;
    width: 90%;
    vertical-align: top;
  }
}
// 级联选择样式
.treetransfer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .el-tree {
    border: 1px solid #eee;
    border-radius: 4px;
    height: 240px;
    width: 46%;
    overflow-y: auto;
  }
  .handle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      border-radius: 50%;
      background-color: #589cef;
      font-size: 14px;
      color: #ffffff;
      padding: 10px;
      margin-top: 20px;
    }
  }
}
.el-form.formpublic .el-form-item {
  margin-bottom: 0px;
}
.deleteCon {
  width: 250px;
  height: 100px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  span {
    font-size: 16px;
  }
  i {
    font-size: 55px;
    color: #589cef;
  }
}
</style>
<style>
.tables .el-table td,
.tables .el-table th {
  padding: 0px 0px;
  height: 30px;
}
.tables .el-table td {
  color: #b7b7b7;
}
</style>
