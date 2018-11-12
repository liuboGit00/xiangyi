<template>
  <div class="page">
        <el-breadcrumb class="branch" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            <el-button type="primary" @click="upload">{{uploadTitle}}</el-button>
        </el-breadcrumb>
        <div class="search-list" v-for="(item,index) in medicalInfoData" :key="index">
            <div class="content-list">
                <div class="left"> 
                    <div class="left">
                      <!-- <i class="el-icon-time"></i> -->
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox :label="item.medicalId" value='item.medicalId' :key="item.medicalId"></el-checkbox>
                      </el-checkbox-group>
                      <span class="time">{{item.entryTime}}</span>
                    </div>
                </div>
                <!-- <div class="right">
                  <span @click.stop="audit(item.examineData)" v-show="item.sendBack">被退回</span>
                  <span v-show="past" @click="historical(item.medicalId)">处理历史</span>
                  <i class="el-icon-delete" v-show="delData" @click='del(item.medicalId)'></i></div> -->
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
                        <li><span>设备类型 ：</span><span>{{item.equipmentType}}</span></li></ul>
                    </div>
                    <div class="table-list table-three">
                        <ul><li><span>学科编码 ：</span><span>{{item.subjectClassificationName}}</span></li>
                        <li><span>检查医师 ：</span><span>{{item.doctorName}}</span></li></ul>                    
                    </div>
                </div>
                <div class=" table-four" >
                  <el-button type="mini" @click="historical(item.medicalId)" v-show="past">处理历史</el-button>
                  <el-button type="mini" @click.stop="audit(item.examineData)" v-show="item.sendBack">被退回</el-button>
                  <el-button type="mini" v-show="delData" @click='del(item.medicalId)'>删除</el-button>
                  <el-button type="mini" @click.stop="onBack(item.medicalId,item.status)" v-if="back">退回</el-button>
                  <el-button type="mini" @click.stop="onSubmit(item.medicalId)" v-if="submit">查看</el-button>
                  <el-button type="mini" @click.stop="onEdit(item.medicalId,item.organName,item.organId)" v-if="edit">编辑</el-button>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="pagation" v-show="pageShow">
            <el-pagination
            layout="prev, pager, next"
            :total="totalAll"
            :page-size="5"
            @current-change="pages">
            </el-pagination>
        </div>
  </div>
</template>
<script type="text/ecmascript-6">
 import axios from '../axios/axios'
export default {
  props:['load'],
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      uploadTitle:'',
      title:"",
      checkList:[],
      totalAll:0,
      medicalInfoData:[],
      menu:[],
      menuList:[],
      edit:false,
      submit:false,
      back:false,
      delData:false,
      sendBack:false,
      past:false,
      returned:[],  //被退回
      pageShow:true,
      newLoad:''
    }
  },
  created(){
    let title = JSON.parse(sessionStorage.getItem("leftList"))
    if(title.length === 3){
        this.uploadTitle = '提交上传'
        this.title = '样本提交'
    }else{
        this.uploadTitle = title[0].name.slice(2) + '上传'
        this.title = title[0].name
    }
    this.axiosGet('/medical-imaging-collect/permission-package','menuList')
    this.pages(1)
  },
  mounted(){
    // this.axiosGet('/medical-imaging-collect/medicalInfoView/approve','medicalInfoData')//列表
    this.axiosGet('/medical-imaging-collect/organ','apparatusList')//器官
  },
  watch:{
    returned(){
      let num = this.returned.length
      for(let i in this.returned){
        for(let n in this.medicalInfoData){
          if(this.returned[i].id == this.medicalInfoData[n].medicalId){
            this.medicalInfoData[n].sendBack = true
            this.medicalInfoData[n].examineData = this.returned[i].examineData
          }
        }
      }
    },
    load(){
      this.newLoad = this.load
      if(this.newLoad != ''){
        this.pages(1)
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
          }else if(info == 'medicalInfoData'){
            // 重置
            _this.medicalInfoData = []
            if(res.data.data.list.length == '0'){
              _this.pageShow = false 
              return 
            }
            _this.totalAll = res.data.data.total
            for(let i of  res.data.data.list){
              _this.medicalInfoData.push({
                diagnosticClassificationName : i.diagnosticClassificationName,
                doctorName : i.doctorName,
                entryTime : i.entryTime.split("T")[0],
                equipmentName : i.equipmentName,
                equipmentType : i.equipmentType,
                medicalId : i.medicalId,
                organId : i.organId,
                organName : i.organName,
                subjectClassificationName : i.subjectClassificationName,
                src:i.organPhoto,
                sendBack:false,
                examineData:'',
                status:i.status
              })
            }
            _this.sendback(res.data.data.list)
          }else if(info == 'menuList'){
            _this.menuList = res.data.data
            if(res.data.data.length > 0){
                for(let i of res.data.data){
                  if(i.name == '编辑'){
                    _this.edit = true
                  }else if(i.name == '查看'){
                    _this.submit = true
                  }else if(i.name == '退回'){
                    _this.back = true
                  }else if(i.name == '删除'){
                    _this.delData = true
                  }else if(i.name == "被退回"){
                    _this.sendBack = true
                  }else if(i.name == '处理历史'){
                    _this.past = true
                  }
                }
              }
            }else if(info == 'returned'){
              if(res.data.data){
                _this.returned.push({
                  examineData: res.data.data.examineData,
                  id:res.data.data.medicalId
                })
              }
            }else if(info == 'historical'){
              this.$emit("showType",3,res.data.data)
            }
        }else if(res.data.infoCode == '1' && res.data.info == '请求异常：用户不存在，请登录'){
          _this.$router.push({path:'/login'})
        }
      })
    },
    //查看历史
    historical(val){
      this.axiosGet('/medical-imaging-collect/medical-info-examine-approve/'+val,'historical')
    },
    //上传
    upload(){
      console.log(this.checkList)
      let dataInfo = []
      let _this = this
      let newData = []
      for(let i in this.checkList){
        for(let n in this.medicalInfoData){
          if(this.checkList[i] == this.medicalInfoData[n].medicalId){
            newData.push(this.medicalInfoData[n])
          }
        }
      }
      for(let i of newData){
        dataInfo.push({
          "medicalId":i.medicalId,
          "status":i.status,
          "examineData":i.examineData,
          "commitFlag":1
        })
      }
      if(dataInfo.length == 0){
        this.$message({
          message: '上传信息为空！请选择上传信息',
          type: 'warning'
        });
        return
      }
      this.axios.post("/medical-imaging-collect/medical-info-examine-approve",dataInfo).then(function(res){
        if(res.data.infoCode == '0'){
          _this.$message({
            message: res.data.info,
            type: 'success'
          });
          _this.pages(1)
        }else{
          _this.$message({
            message: res.data.info,
            type: 'warning'
          });
        }
      })
    },
    //被退回
    sendback(data){
      if(data.length != 0){
        for(let i in data){
          this.axiosGet('/medical-imaging-collect/medical-info-examine-approve/findMedicInfo?medicalId='+data[i].medicalId+'&status='+data[i].status,'returned')
        }
      }
    },
    //编辑
    onEdit(val,a,b){
      console.log(a,b)
      sessionStorage.setItem("apparatus",b)
      sessionStorage.setItem("apparatusName",a)
      this.$router.push({
        path:"/patient-newForm",
        query: {
          id: val, //企业用户名单id
        }
      })
    },
    //删除
    del(val){
      let _this = this
      this.$confirm('此操作将删除该样本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/medical-imaging-collect/receiving-entity?medicalInfoId='+val,'del').then(function(response) {
            if(response.data.infoCode == '0'){
              _this.$message({
                message: response.data.info,
                type: 'success'
              });
            }else{
              _this.$message({
                message: response.data.info,
                type: 'warning'
              });
            }
            _this.pages(1)
          })
        }).catch(() => {
         return         
        });

    },
    //查看
    onSubmit(val) {
      this.$router.push({
        path:"/CreateAsample-toView",
        query:{
          medicalId: val, //企业用户名单id
        }
      })
    },
    //搜索
    onSubmitSearch(){

    },
    //审核弹窗
    audit(val){
        console.log(val)
        this.$emit("showType",1,val)
    },
    //分页
    pages(val){
      this.axiosGet('/medical-imaging-collect/medicalInfoView/approve?pageNum='+val+'&pageSize=5','medicalInfoData')
    },
    //退回
    onBack(val,id){
      console.log(val,id)
      this.$emit("showType",2,val,id)
    },
    look(val){
        console.log(val)
    }
  }
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
    button{
        height: 40px;
        float: right;
        margin-right: 50px;
        font-size: 18px;
        background: #0190d4;
    }
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
        height: 30px;
        .time {
          font-size: 16px;
          margin-left: 20px;
        }
        i {
          color: #a7a7a7;
          margin-right: 10px;
        }
        .el-checkbox-group{
            display: inline;
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
          border-color: #0190d4;
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
      // padding-top: 8px;
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
          // top: 40px;
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
          border: solid 2px #0190d4;
          color: #ffffff;
        }
        // .look{
        //    top: 40px; 
        // }
        // button:first-child{
        //   top:2px;
        // }
        // button:nth-child(3){
        //   top:40px;
        //   left: -220px;
        // }
      }
      .table-flex {
        display: flex;
        width: 65%;
        float: left;
      }
    }
  }
  .pagation {
    margin-top: 28px;
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
      font-size: 18px !important;
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
.left .el-checkbox-group .el-checkbox__label{
    display: none;
}
</style>

