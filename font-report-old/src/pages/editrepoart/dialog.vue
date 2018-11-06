<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandlesure">
        <div v-if="dialogobj.title=='发布'">
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
                :data="dataright" 
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
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" maxlength="200"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="dialogobj.title=='保存'">
          <el-form ref="ruleForm2" :model="form" :rules="rules2">
             <el-form-item label="请输入保存后的标题"  prop="reportTitle">
                <el-input v-model="form.reportTitle" auto-complete="off" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.remark" maxlength="200"></el-input>
              </el-form-item>
          </el-form>
        </div>
    </Dialogcomponent>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  props: ["dialogOpt"],
  mounted() {
    this.getReportorganize(); //获取组织结构
  },
  data() {
    var validatePass = (rule, value, callback) => {
      //表单验证
      if (value === "" || value === undefined) {
        callback(new Error("输入内容不能为空"));
      } else {
        callback();
      }
    };

    return {
      form: {
        //保存的表单
        reportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "3",
        allowTwice: "1"
      },

      rules2: {
        //表单验证
        reportTitle: [{ validator: validatePass, trigger: "blur" }]
      },

      defaultProps: {
        children: "children",
        label: "label"
      },
      dataleft: [], //组织架构
      dataright: [], //用户列表
      serverobject: server //ajax服务
    };
  },
  computed: {
    dialogobj: function() {
      let objs = Object.assign(this.dialogOpt);
      return objs;
    }
  },
  components: {
    Dialogcomponent
  },
  methods: {
    submitForm(formName, message, type) {
      //表单验证提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过
          this.$emit("handlesure-dialog", message, type, this.form); //对话框保存
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      //表单验证重置
      this.$refs[formName].resetFields();
    },

    getReportorganize() {
      let self = this;
      self.serverobject.reportorganize("", function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          self.dataleft = res.data.data;
          self.dataleft = self.transData(
            self.dataleft,
            "orgId",
            "orgName",
            "orgSupId",
            "children"
          );
        }
      });
    },
    getCheckedNodesLeft() {
      let self = this,
        samflag = false,
        newgetchecknode = [],
        checkednodes = this.$refs.trees.getCheckedNodes();
      self.dataright.forEach(function(obj, index) {
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
      self.dataright = newgetchecknode;
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
      this.dataright.forEach(function(obj, index) {
        newgetchecknode.forEach(function(objchild, indexchild) {
          if (obj.id == objchild.id) {
            newgetchecknode.splice(indexchild, 1);
          }
        });
      });
      this.dataright = this.dataright.concat(newgetchecknode);
    },
    dialogHandlesure: function(message, type) {
      //保存操作
      for (let key in this.form) {
        //过滤空的属性
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      switch (message) {
        case "保存":
          this.submitForm("ruleForm2", message, type); //表单验证
          break;
        case "发布":
          this.form["receiveUserId"] = this.dataright;
          this.$emit("handlesure-dialog", message, type, this.form);
          break;
      }
      (this.form = {
        //保存的表单
        reportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "3",
        allowTwice: "1"
      }),
        (this.dataright = []);
    },
    dialogHandle: function(message, type) {
      //取消操作
      (this.form = {
        //保存的表单
        reportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "3",
        allowTwice: "1"
      }),
        (this.dataright = []);
      this.$emit("handlecancle-dialog", message, type);
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
    handleCheckChange(data, checked, indeterminate) {
      let self = this;
      if (!data.lastchild && (!data.children || data.children.length <= 0)) {
        // let params = {"orgId":data.id};
        let params = data.id;
        server.reportorganizechild(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            // debugger
            res.data.data = self.transData(
              res.data.data,
              "userId",
              "userName",
              "aliasName",
              "children"
            );
            res.data.data.forEach((obj, index) => {
              // debugger
              obj.lastchild = true;
            });
            self.setDataToTree(self.dataleft, data.id, res.data.data);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.treetransfer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .el-tree {
    border: 1px solid #eee;
    border-radius: 4px;
    height: 300px;
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
</style>
