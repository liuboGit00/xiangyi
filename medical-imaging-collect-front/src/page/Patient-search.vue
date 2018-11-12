<template>
  <div class="page">
        <el-breadcrumb class="branch" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>样本查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search-form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="选择器官 :">
                    <el-select class="form-item" v-model="organId" placeholder="请选择">
                      <el-option
                        v-for="item in apparatusList"
                        :key="item.organId"
                        :label="item.organName"
                        :value="item.organId">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="条件查询 :">
                    <el-select class="form-item" v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in searchList"
                          :key="item.name"
                          :label="item.label"
                          :value="item.name">
                        </el-option>
                    </el-select>
                    <span class="heng">一</span>
                    <el-input class="form-item" v-model="searchVal" placeholder="" :disabled="showType"></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="search-list" v-for="(item,index) in medicalInfoData" :key="index">
            <div class="content-list">
                <div class="left"><i class="el-icon-time"></i><span class="time">{{item.entryTime}}</span></div>
                <!-- <div class="right"><span @click="audit(item.yingxiangbianhao)">操作记录</span></div> -->
            </div>
            <div class="content-table">
                <div class="table-img"><img :src="item.src" alt=""></div>
                <div class="table-flex">
                    <div class="table-list table-one">
                        <ul><li><span>检查部位 ：</span><span>{{item.organName}}</span></li>
                        <li><span>仪器设备 ：</span><span>{{item.equipmentName}}</span></li></ul>
                    </div>
                    <div class="table-list table-two">
                        <ul><li><span>临床诊断 ：</span><span>{{item.diagnosticClassificationName}}</span></li>
                        <li><span>仪器类型 ：</span><span>{{item.equipmentType}}</span></li></ul>
                    </div>
                    <div class="table-list table-three">
                        <ul><li><span>学科编码 ：</span><span>{{item.subjectClassificationCode}}</span></li>
                        <li><span>检查医师 ：</span><span>{{item.doctorName}}</span></li></ul>                    
                    </div>
                </div>
                <div class=" table-four">
                    <el-button type="primary" @click="onSubmit(item.medicalId)">查看</el-button>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="pagation" v-show="pagination">
            <el-pagination
            layout="prev, pager, next"
            :total="totalAll"
            :page-size="4"
            @current-change="pages">
            </el-pagination>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../axios/axios'
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      showType:true,
      pagination:true,
      apparatusList:[],//器官列表
      totalAll:0,
      medicalInfoData : [],
      searchList:[{
        name:"",
        label:"全部"
      },{
        name:"doctorName",
        label:"检查医师"
      },{
        name:"equipmentName",
        label:"仪器设备"
      },{
        name:"subjectClassificationCode",
        label:"学科编码"
      }],
      organId:"",
      type:'',
      searchVal:''
    };
  },
  created(){
    
  },
  mounted(){
    // this.axiosGet('/medical-imaging-collect/medicalInfoView','medicalInfoData')//列表
    this.axiosGet('/medical-imaging-collect/organ','apparatusList')//器官
    this.pages(1)
  },
  watch:{
    type(){
      if(this.type != ''){
        this.showType = false
      }else{
         this.showType = true 
         this.searchVal = ''
      }
    }
  },
  methods: {
    // get请求
    axiosGet(url,info){
      let _this = this
      axios.get(url).then((res)=>{
        if(res.data.infoCode == '0'){
          if(info == 'apparatusList'){
            _this.$data[info] = res.data.data
            _this.apparatusList.unshift({
              organId : "",
              organName : "全部"
            })
          }else if(info == 'medicalInfoData'){
            // 重置
            _this.medicalInfoData = []
            _this.totalAll = res.data.data.total
            if(res.data.data.list.length == 0){
              _this.pagination = false
              return 
            } 
            for(let i of res.data.data.list){
              _this.medicalInfoData.push({
                diagnosticClassificationName : i.diagnosticClassificationName,
                doctorName : i.doctorName,
                entryTime : i.entryTime.split("T")[0],
                equipmentName : i.equipmentName,
                equipmentType : i.equipmentType,
                medicalId : i.medicalId,
                organId : i.organId,
                organName : i.organName,
                subjectClassificationCode : i.subjectClassificationName,
                src:i.organPhoto
              })
            }
          }
          // _this.$data[info] = res.data.data
        }else{
          
        }
      })
    },
    //查看
    onSubmit(val) {
      // this.$emit("showType", "3")
        this.$router.push({
          path:"/CreateAsample-toView",
          query:{
            medicalId: val, //企业用户名单id
          }
        })
      // this.$router.push({path:"/createAsample-toView"})
    },
    //搜索
    onSubmitSearch(){
      this.axiosGet('/medical-imaging-collect/medicalInfoView?organId='+this.organId+'&'+this.type+'=' + this.searchVal+'&pageNum=1&pageSize=4','medicalInfoData')//器官
    },
    //审核弹窗
    audit(id){
      
    },
    pages(val){
      this.axiosGet('/medical-imaging-collect/medicalInfoView?organId='+this.organId+'&'+this.type+'=' + this.searchVal+'&pageNum='+val+'&pageSize=4','medicalInfoData')
    }
  },
};
</script>

<style scoped lang="less">
.page {
  background-color: #f2f3f8;
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  border-radius: 5px;
  position: relative;
  .branch {
    height: 40px;
    line-height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #8a8a8a;
    margin: 10px 0;
  }
  .search-form {
    height: 83px;
    background-color: #ffffff;
    border-radius: 2px;
    margin-bottom: 15px;
    form {
      height: 100%;
      padding-top: 22px;
      padding-left: 27px;
      padding-right: 37px;
      position: relative;
      border-top: 1px solid #0190d4;
    }
    .el-form-item {
      margin-right: 39px;
    }
    .form-item {
      width: 150px;
      height: 40px;
      background-color: #f7f7fb;
      border-radius: 2px;
    }
    .heng {
      margin: 0 20px;
    }
    .submit {
      margin: 0;
      position: absolute;
      right: 57px;
      top: 22px;
      width: 80px;
      height: 40px;
      //   background-color: #0190d4;
      border-radius: 4px;
      overflow: hidden;
      button,
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  .search-list {
    .content-list {
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      box-shadow: 0px 9px 17px 1px rgba(184, 184, 184, 0.41);
      padding-left: 9px;
      clear: both;
      color: #a7a7a7;
      padding-right: 32px;
      .left {
        height: 30px;
        float: left;
        .time {
          font-size: 16px;
        }
        i {
          color: #a7a7a7;
          margin-right: 10px;
        }
      }
      .right {
        float: right;
        span {
          display: inline-block;
          width: 80px;
          height: 24px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a7a7a7;
          border: 1px solid #aaaaaa;
          border-radius: 8px;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
        }
        span:hover {
          background-color: #0190d4;
          color: #ffffff;
        }
        i {
          margin-left: 16px;
          font-size: 18px;
          color: #888888;
          cursor: pointer;
        }
      }
    }
    .content-table {
      height: 83px;
      background-color: #ffffff;
      box-shadow: 0px 9px 17px 1px rgba(184, 184, 184, 0.41);
      padding-bottom: 7px;
      padding-left: 28px;
      margin-bottom: 10px;
      .table-img {
        width: 68px;
        height: 68px;
        background-color: #ffffff;
        border-radius: 2px;
        border: solid 1px #7ecef4;
        margin-right: 25px;
        float: left;
        text-align: center;
        line-height: 68px;
        img {
          width: 85%;
          height: 85%;
          vertical-align: middle;
        }
      }
      .table-list {
        float: left;
        height: 56px;
        margin-top: 6px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          li {
            height: 20px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #a7a7a7;
            span:last-child {
              display: inline-block;
              width: 150px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              vertical-align: top;
            }
          }
          li::before {
            vertical-align: middle;
            content: " ";
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #5d8df0;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
      .table-one {
        min-width: 280px;
        width: 35%;
      }
      .table-two {
        min-width: 280px;
        width: 30%;
      }
      .table-three {
        min-width: 280px;
        width: 35%;
      }
      .table-four {
        float: right;
        position: relative;
        width: 25%;
        height: 100%;
        padding-right: 20px;
        line-height: 83px;
        button {
          background-color: #ffffff;
          border: solid 2px #f0f0f0;
          // position: absolute;
          // top: 2px;
          // right: 23px;
          padding: 4px 6px;
          border-radius: 4px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a7a7a7;
          float: right;
          margin-left: 20px;
          margin-top: 18px;
        }
        button:hover {
          background-color: #0190d4;
          color: #ffffff;
          border-color: #0190d4;
        }
      }
      .table-flex {
        display: flex;
        width: 65%;
        float: left;
      }
    }
  }
  .pagation {
    margin-top: 48px;
    text-align: right;
    padding-right: 11px;
  }
}
</style>
<style lang="less">
.search-form {
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #a7a7a7;
  }
}
.pagation {
  .el-pager li {
    background: #f2f3f8;
    color: #a9a9ad;
  }
  .el-pager li:hover{
      color: #0190d4;
  }
  .el-pager li.active{
    color: #0190d4;
  }
  .el-pagination button {
    width: 38px;
    height: 38px;
    background-color: #ffffff;
    padding: 0;
    i {
      font-size: 18px;
    }
  }
  .el-pagination button:not([disabled="disabled"]) {
    i {
      color: #0190d4;
    }
  }
  .el-pager .number {
    height: 38px;
    line-height: 38px;
  }
}
.el-input__inner{
    background: #f7f7fb;
}
.el-select .el-input .el-select__caret{
  color:#666;
  font-weight:700;
}
</style>

