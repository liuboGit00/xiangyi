<template>
  <div class="patient-main">
    <div class="patient-tool">
      <div class="tool">
        <span class="edit-tool" @click="add">
          <i class="icon iconfont icon-xinjian"></i>
          <span>新建</span>
        </span>
        <span class="edit-tool" @click="removeMore">
          <i class="icon iconfont icon-shanchu1"></i>
          <span>删除</span>
        </span>
        <span class="edit-tool">
          <i class="icon iconfont icon-qishi"></i>
          <span>起始</span>
        </span>
        <span class="edit-tool">
          <i class="icon iconfont icon-xiangqian"></i>
          <span>向前</span>
        </span>
        <span class="edit-tool">
          <i class="icon iconfont  icon-xianghou"></i>
          <span>向后</span>
        </span>
        <span class="edit-tool">
          <i class="icon iconfont icon-zuihou"></i>
          <span>结束</span>
        </span>
      </div>
      <div class="patient-input">
        <!-- <el-select class="text-input" v-model="searchInput" clearable filterable remote reserve-keyword @change='getSearch()' placeholder="请输入姓名/身份证号" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
        <!-- <span class="search-btn">
          <i class=" icon iconfont icon-sousuo"></i>
        </span> -->
          <el-button>上传</el-button>
      </div>
    </div>
    <div class="patient-center">
      <template>
        <!-- 病人个人信息 -->
        <el-table :data="tableData" border height="546" style="width: 100%" :header-cell-style="{background:'#eceff6'}" show-overflow-tooltip="true" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <!-- 病人信息详情 -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.records" border style="width: 100%" :header-cell-style="{background:'#cbe3fd'}" show-overflow-tooltip="true" tooltip-effect="dark" @selection-change="innerSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column v-for="detailCol in detailCols" :prop="detailCol.props" :label="detailCol.label" :key="detailCol.id" align="center" :width="detailCol.innerWidth">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                  <template slot-scope="scope">
                    <el-button class="icon iconfont icon-shanchu" type="text" size="small" @click="deleteClick(scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <!-- 病人个人信息 -->
          <el-table-column prop="sex" label="性别" width="76" :formatter="formatRole">
          </el-table-column>
          <el-table-column v-for="(col, index) in cols" :label="col.label" :prop="col.prop" :key="index" align="center" :class="{active:idx === index}" :width="col.infoWidth">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button class="icon iconfont icon-chakan1" type="text" size="small" @click="seeClick(scope.row)"></el-button>
              <el-button class="icon iconfont icon-shanchu" type="text" size="small" @click="deleteClick(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      url: "http://10.6.243.133:8083", //获取列表数据
      deleteUrl: "http://10.6.243.133:8083", //根据ID数组批量删除病史
      active: null, //数据列表动态样式绑定参数
      idx: null, //数据列表动态样式绑定参数
      searchInput: "", //输入框参数
      restaurants: [], //输入框查询数据列表
      multipleSelection: [], //个人信息复选框选中数据
      innerSelection: [], //个人病例信息复选框选中数据
      // 查询参数
      options: [],
      searchInput: "",
      loading: false,
      list: [],
      // 个人信息表表头
      cols: [
        {
          prop: "idNumber",
          label: "身份证号",
          infoWidth: "200"
        },
        {
          prop: "name",
          label: "姓名",
          infoWidth: "140"
        },
        // {
        //   prop: "sex",
        //   label: "性别",
        //   infoWidth: "76"
        // },
        {
          prop: "birthday",
          label: "出生日期",
          infoWidth: "140"
        },

        {
          prop: "phone",
          label: "联系方式",
          infoWidth: "160"
        },
        {
          prop: "address",
          label: "家庭住址 ",
          infoWidth: "300"
        }
      ],
      // 个人病历信息表头
      detailCols: [
        // { props: "isUploaded", label: "上传与否", innerWidth: "100" }, //待定
        { props: "organ.name", label: "检查部位", innerWidth: "150" },
        // { props: "address", label: "超声分组", innerWidth: "100" }, //待定
        { props: "doctor.name", label: "超声医生", innerWidth: "150" },
        { props: "ultrasonicReport", label: "超声报告", innerWidth: "200" },
        // { props: "diagnosis", label: "超声诊断", innerWidth: "100" },
        { props: "pathologicDiagnosis", label: "病理诊断", innerWidth: "100" },
        { props: "medicalHistory", label: "病史", innerWidth: "240" },
        { props: "clinicalDiagnosis", label: "临床诊断", innerWidth: "240" },
        { props: "doctor.section.name", label: "科室", innerWidth: "180" },
        { props: "checkingDate", label: "检查日期", innerWidth: "180" },
        {
          props: "equipment.instrumentModel",
          label: "仪器型号",
          innerWidth: "150"
        },
        { props: "exampleImageUrl", label: "图像路径 ", innerWidth: "200" }
        // { props: "ultrasonicNumber", label: "超声号", innerWidth: "200" } //待定
      ],
      // 表格数据
      tableData: [],
      nameData: null, //搜索框姓名列表数据
      idCardData: null //搜索框身份证号列表数据
    };
  },
  watch: {
    searchInput() {
      if (this.searchInput !== "") {
        this.getSearch();
      } else {
        this.getData();
      }
    }
  },
  computed: {
    ...mapState(["patient_information"])
  },
  methods: {
    // 获取病人列表数据
    getData() {
      this.axios
        .get(this.deleteUrl + "/tmiPatient/list", {
          tmiPatient: ""
        })
        .then(res => {
          if (res.data.status == "SUCCESS") {
            this.tableData = res.data.data;
          } else {
            this.$message({
              message: res.data.info,
              type: "warning"
            });
          }
        });
    },
    //性别显示转换
    formatRole(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    // 新建
    add() {
      this.$router.push({
        path: "patient-information"
      });
    },
    // 查看
    seeClick(row) {
      this.$store.dispatch("getRow", { row });
      this.$router.replace("/patient-information");
    },
    // 个人信息表-监听复选框选择数据变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 个人病历信息表-监听复选框选择数据变化
    innerSelectionChange(val) {
      this.innerSelection = val;
    },
    // 批量删除
    removeMore() {
      //批量删除病史
      //获取 个人病例信息被选中数据的id
      let idinner = [];
      if (this.innerSelection) {
        for (var i = 0; i < this.innerSelection.length; i++) {
          idinner.push(this.innerSelection[i].id);
        }
      }
      this.$confirm("此操作不可撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(
              this.deleteUrl +
                "/medicalRecord/batchRemove?ids=" +
                idinner.toString()
            )
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$confirm(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  showClose: false,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // 批量删除个人信息
      // 获取个人信息id
      let idCard = [];
      if (this.multipleSelection) {
        for (var j = 0; j < this.multipleSelection.length; j++) {
          idCard.push(this.multipleSelection[j].idNumber);
        }
      }
      this.$confirm("此操作不可撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(this.url + "/tmiPatient/batchRemove?ids=" + idCard)
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$confirm(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  showClose: false,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 单个删除
    deleteClick(row) {
      // 单个删除病史
      let ids = row.id;
      this.$confirm("此操作不可撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(this.deleteUrl + "/medicalRecord/remove?id=" + ids)
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$confirm(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  showClose: false,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // 单个删除个人信息
      let idcards = row.idNumber;
      this.$confirm("此操作不可撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete(this.url + "/tmiPatient/remove?idNumber=" + idcards)
            .then(res => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData();
              } else {
                this.$confirm(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  showClose: false,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 输入框下拉选择数据
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 输入框下拉数据选中后列表数据查询
    getSearch() {
      var idNumber = this.searchInput.split("/")[1];
      var obj = this.patient_information.find(
        item => item.idNumber === idNumber
      );
      let objArr = [];
      objArr.push(obj);
      this.tableData = objArr;
    }
  },
  mounted() {
    this.getData();
    this.$store.dispatch("getPatientInformation", () => {
      this.list = this.patient_information.map(item => {
        return {
          value: item.name + "/" + item.idNumber,
          label: item.name + "/" + item.idNumber
        };
      });
    });
  }
};
</script>

<style lang="less" scoped>
.patient-main {
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
}
.patient-tool {
  width: 100%;
  height: 68px;
  display: flex;
  border-bottom: 1px solid #b7b7b7;
  padding: 0 20px;
  color: #a6a6a6;
  font-size: 14px;
  .tool {
    width: 50%;
    float: left;
    .edit-tool {
      width: 28px;
      height: 68px;
      line-height: 46px;
      // padding: 4px;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      .iconfont {
        width: 28px;
        height: 28px;
        display: block;
        font-size: 28px;
      }
      span {
        font-size: 14px;
      }
      &:hover {
        color: #0b95f8;
      }
    }
  }

  .patient-input {
    width: 50%;
    height: 68px;
    float: right;
    padding: 10px 0;
    position: relative;
    text-align: right;
    .text-input {
      float: right;
      margin: 0 10px 10px 0;
    }
    .search-btn {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}

.patient-center {
  height: 100%;
  overflow: auto;
  margin: 20px;
  // height: calc(100vh - 120px);
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table .cell {
    text-align: center;
  }
  .active {
    background: #f5f7f8;
  }
}
.pageSize {
  padding: 10px 0;
  text-align: right;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 20px;
}
.el-input__suffix {
  right: 40px;
}
.el-input--suffix .el-input__inner {
  padding-right: 70px;
}
</style>
