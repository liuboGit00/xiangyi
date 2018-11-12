<template>
    <div class="Patient-Information">
      <el-container class="wrap">
        <el-container>
          <el-main>
            <!-- 面包屑导航 -->
            <div>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>样本创建</el-breadcrumb-item>
                <el-breadcrumb-item>{{apparatusName}}</el-breadcrumb-item>
                <el-button type="primary" @click="save">保存</el-button>
              </el-breadcrumb>
            </div>
            <!-- 内容 -->
            <el-tabs v-model="top" type="card" @tab-click="handleClick">
              <template v-for="(item,num) in infoList">
                <el-tab-pane :label="item.label" :name="item.name" :key="item.label" :disabled="item.type">
                  <!-- 基本信息页面表单 -->
                  <template v-if="item.label == '基本信息'">
                    <el-form ref="form" :inline="true">
                      <div class="wrap_0 wrapAll">
                        <el-form-item label="搜索：">
                          <el-input v-model="search" placeholder="请输入内容" :class=" {inputStyle: search != '' }"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-select v-model="searchId" placeholder="" ref="sel" @focus="focur" id="serachList" @change="showData">
                            <el-option
                              v-for="item in searchList"
                              :key="item.patientId"
                              :label="item.patientName"
                              :value="item.patientId">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="searchInfo">
                            <label for="serachList">搜索</label>
                          </el-button>
                        </el-form-item>
                      </div>
                        <div class="wrap_1 wrapAll">
                          <el-form-item label="姓名：">
                            <i class="must"></i>
                            <el-input v-model="uploadForm.patientName" placeholder="姓名："  :class=" {inputStyle: uploadForm.patientName != '' }"></el-input>
                          </el-form-item>
                          <el-form-item label="性别：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.patientSex" placeholder="性别" :class=" {inputStyle: uploadForm.patientSex == '1' || uploadForm.patientSex == '0'}">
                              <el-option
                                v-for="(item,index) in sexList"
                                :key="item"
                                :label="item"
                                :value="index">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap_2 wrapAll">
                          <el-form-item label="年龄：">
                            <i class="must"></i>
                            <el-input v-model="uploadForm.patientBirthDate" placeholder="年龄" :class="{inputStyle: uploadForm.patientBirthDate != ''}"></el-input>
                          </el-form-item>
                          <el-form-item label="联系电话：">
                            <i class="must"></i>
                            <el-input v-model="uploadForm.patientPhone" placeholder="联系电话：" :class=" {inputStyle: uploadForm.patientPhone != '' }"></el-input>
                          </el-form-item>
                        </div>
                        <div class="wrap-3 wrapAll">
                          <el-form-item label="身份证号：">
                            <i class="must"></i>
                            <el-input v-model="uploadForm.patientCardId" placeholder="身份证号：" :class=" {inputStyle: uploadForm.patientCardId != '' }"></el-input>
                          </el-form-item>
                          <el-form-item label="家庭住址：">
                            <el-input v-model="uploadForm.patientAddress" placeholder="家庭住址：" :class=" {inputStyle: uploadForm.patientAddress != '' }"></el-input>
                          </el-form-item>
                        </div>
                        <div class="wrap-4 wrapAll">
                          <el-form-item label="住院号：">
                            <i class="must"></i>
                            <el-input v-model="uploadForm.hospitalNo" placeholder="住院号：" :class=" {inputStyle: uploadForm.hospitalNo != '' }"></el-input>
                          </el-form-item>
                           <el-form-item label="检查医院：">
                             <i class="must"></i>
                            <el-select v-model="uploadForm.hospitalId" placeholder="请选择" :class=" {inputStyle: uploadForm.hospitalId != '' }">
                              <el-option
                                v-for="item in hospitalList"
                                :key="item.hospitalName"
                                :label="item.hospitalName"
                                :value="item.hospitalId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap-5 wrapAll">
                          <el-form-item label="检查科室：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.sectionId" placeholder="请选择" :class=" {inputStyle: uploadForm.sectionId != '' }">
                              <el-option
                                v-for="item in OfficeList"
                                :key="item.sectionId"
                                :label="item.sectionName"
                                :value="item.sectionId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="超声医师：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.doctorId" placeholder="请选择" :class=" {inputStyle: uploadForm.doctorId != '' }">
                              <el-option
                                v-for="item in doctorList"
                                :key="item.doctorName"
                                :label="item.doctorName"
                                :value="item.doctorId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap-6 wrapAll">
                          <el-form-item label="检查部位：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.organId" placeholder="请选择" :class=" {inputStyle: uploadForm.organId != '' }" disabled>
                              <el-option
                                v-for="item in apparatusList"
                                :key="item.organName"
                                :label="item.organName"
                                :value="item.organId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="临床诊断：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.diagnosticClassificationId" placeholder="临床诊断：" :class=" {inputStyle: uploadForm.diagnosticClassificationId != '' }">
                              <el-option
                                v-for="item in diagnoseList"
                                :key="item.diagnosticClassificationName"
                                :label="item.diagnosticClassificationName"
                                :value="item.diagnosticClassificationId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap-7 wrapAll">
                          <el-form-item label="学科编码：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.subjectClassificationId" :class=" {inputStyle: uploadForm.subjectClassificationId != '' }">
                              <el-option
                                v-for="item in disciplineList"
                                :key="item.subjectClassificationName"
                                :label="item.subjectClassificationName"
                                :value="item.subjectClassificationId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="国际疾病分类：">
                            <i class="must" style="left:-132px;"></i>
                            <el-select v-model="uploadForm.pathologyId" placeholder="请选择" :class=" {inputStyle: uploadForm.pathologyId != '' }">
                              <el-option
                                v-for="item in illnessList"
                                :key="item.pathologyName"
                                :label="item.pathologyName"
                                :value="item.pathologyId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap-8 wrapAll">
                          <el-form-item label="录入时间：" :class=" {inputStyle: uploadForm.entryTime != '' }">
                            <i class="must"></i>
                            <el-date-picker
                              v-model="uploadForm.entryTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              :picker-options="pickerOptions"
                              placeholder="请选择日期">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="仪器设备：">
                            <i class="must"></i>
                            <el-select v-model="uploadForm.equipmentId" placeholder="请选择" @change="equipmentData" :class=" {inputStyle: uploadForm.equipmentId != '' }">
                              <el-option
                                v-for="item in facilityList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="wrap-9 wrapAll">
                          <el-form-item label="仪器类型：">
                            <el-input v-model="uploadForm.equipmentType" placeholder="仪器类型：" disabled=""></el-input>
                          </el-form-item>
                          <el-form-item label="仪器厂家：">
                            <el-input v-model="uploadForm.equipmentManufactor" placeholder="仪器厂家：" disabled=""></el-input>
                          </el-form-item>
                        </div>
                      </el-form>
                  </template>
                  <!-- 其他页面内容 -->
                  <template v-else-if="item.label != '病史'">
                    <div class="onloadImg">
                        <span>图像上传：</span>
                        <div class="urlInfo">
                            <ul>
                                <li v-for="(imgInfo,index) in imgList" :key="imgInfo.url">
                                    <template v-if="index == 0">
                                        <input type="file" :id='"file"+num'  @change="imgUpload" multiple="multiple" class="fileImg" :ref='"file"+num'/>
                                        <label :for='"file"+num' class="file">
                                          <i class="el-icon-plus"></i>
                                        </label>
                                    </template>
                                    <template v-else>
                                      <template v-if="item.label == 'US报告'">
                                        <template v-if="imgInfo.type == 'video'">
                                          <video controls="controls" height="220px" width="260px" preload="metadata" :ref='"video"+index' @click="videoClick(imgInfo.videoType,index)">
                                            <source :src="imgInfo.url" type='video/mp4' />
                                          </video>
                                          <div class="video" v-show="imgInfo.videoType != 2">
                                            <div class="videoType">
                                              <div class="videoShowrao" @click="playType(imgInfo.videoType,index)">
                                                <img src="../assets/img/pauseOn.png" alt="" v-if="imgInfo.videoType == 0">
                                                <img src="../assets/img/playOn.png" alt="" v-else-if="imgInfo.videoType == 1">
                                                <img src="../assets/img/palyErr.png" alt="" v-else-if="imgInfo.videoType == 2">
                                                <img src="../assets/img/playOk.png" alt="" v-else-if="imgInfo.videoType == 3">
                                              </div>
                                              <p>{{imgInfo.value}}</p>
                                            </div>
                                            <canvas width="60px" height="60px" :ref='"canvas"+index' v-show="imgInfo.videoType != 3"></canvas>
                                          </div>
                                          <i class="el-icon-close del" @click="del(imgInfo.url,index,imgInfo.type)"></i>
                                        </template>
                                        <template v-else-if="imgInfo.type == 'image'">
                                          <img :src="imgInfo.url" alt="" :key="index" @dblclick="imgBlog(imgInfo.url)">
                                          <i class="el-icon-close del" @click="del(imgInfo.url,index,imgInfo.type)"></i>
                                        </template>
                                      </template>
                                      <template v-else>
                                        <img :src="imgInfo.url" alt="" :key="index" @dblclick="imgBlog(imgInfo.url)">
                                        <i class="el-icon-close del" @click="del(imgInfo.url,index,imgInfo.type)"></i>
                                      </template>
                                    </template>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <el-form ref="form"  label-width="100px">
                            <el-form-item label="报告内容：">
                                <el-input type="textarea"  style="height:240px;" v-model="uploadForm.reportRemark"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                  </template>
                  <template v-else>
                    <el-form ref="form"  label-width="100px">
                          <el-form-item label="报告内容：">
                              <el-input type="textarea" v-model="uploadForm.medicalHistory" placeholder="请输入："></el-input>
                          </el-form-item>
                      </el-form>
                  </template>
                </el-tab-pane>
              </template>
            </el-tabs>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import axios from "../axios/axios";
import Vue from 'vue';
import jquery from 'jquery'
// import verify from '../assets/commitJS/verification.js'
// import request from "../assets/commitJS/request.js";
export default {
  props:["delType"],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      top: "data1",
      showNum: true,
      infoList: [
        {
          label: "基本信息",
          name: "data1",
          type: false
        },
        {
          label: "病史",
          name: "data2",
          type: false
        },
        {
          label: "US报告",
          name: "data3",
          type: false
        },
        {
          label: "CT报告",
          name: "data4",
          type: false
        },
        {
          label: "MRI报告",
          name: "data5",
          type: false
        },
        {
          label: "DR报告",
          name: "data6",
          type: false
        },
        {
          label: "X线报告",
          name: "data7",
          type: false
        },
        {
          label: "ECG报告",
          name: "data8",
          type: false
        },
        {
          label: "病理报告",
          name: "data9",
          type: false
        },
        {
          label: "其他",
          name: "data10",
          type: false
        }
      ],
      imgList: [
        {
          url: ""
        }
      ],
      //表格信息
      search: "", //搜索
      uploadForm: {
        patientName: "", //患者名称
        patientSex: "", //（0女，1男）
        patientBirthDate: "", //患者年龄
        patientPhone: "", //手机号
        patientCardId: "", //身份证
        patientAddress: "", // 患者地址
        hospitalNo: "", //住院号
        hospitalId: "", //医院id
        sectionId: "", //科室id
        doctorId: "", //医生id
        subjectClassificationId: "", //学科分类id
        organId: "", //器官id
        diagnosticClassificationId: "", //诊断分类id
        pathologyId: "", //国际疾病分类id
        entryTime: "", //录入时间
        equipmentId: "", //设备id
        equipmentType: "", //仪器类型
        equipmentManufactor: "", //仪器厂家
        reportType: "", //（1检查报告，2超声报告，3病理报告，4CT报告，5MRI报告，6X报告，7核医学报告，8其他 ） 报告分类
        medicalHistory: "", //病例
        reportRemark: ""
      },
      pageChange: true,
      input: "",
      isInterested: 0, //是否上传视频,
      videoUrl:'',  //视频上传成功返回路劲,
      videoPercentage:0,  //视频上传百分比
      nowDomVideo:'',  //当前视频dom
      videoUploadType:false,
      //列表信息
      sexList: ["女", "男"],
      doctorList: [], //医生列表
      facilityList: [], //设备列表
      OfficeList: [], //科室列表
      hospitalList: [], //医院列表
      apparatusList: [], //器官列表
      examineList: [], //检查分类列表
      diagnoseList: [], //诊断分类列表
      illnessList: [], //疾病列表
      disciplineList: [], //学科分类列表
      //报告
      dialogVisible: false, //  图片上传
      dialogType: "", //显示top
      formURL: {},
      //上传表格信息
      idsStr: "",
      brr: [],
      crr: [], //存放回显的图片数组,
      reportBoolean: false,
      status: "", //审批状态
      seaPatarr: [],
      isActived: false,
      dataNum: "",
      apparatusName: "",
      searchList: [],
      searchId: "",
      cutType: "",
      fileData: [],
      uploadType: false
    };
  },
  created() {
    // this.verifyForm = verify
    if (sessionStorage.getItem("apparatus") != "") {
      this.uploadForm.organId = JSON.parse(sessionStorage.getItem("apparatus"));
      this.apparatusName = sessionStorage.getItem("apparatusName");
    }
    if (this.$router.history.current.query.id) {
      this.axios
        .get(
          "/medical-imaging-collect/receiving-entity?medicalInfoId=" +
            this.$router.history.current.query.id
        )
        .then(res => {
          let patient = res.data.data;
          this.status = patient.status;
          this.uploadForm.medicalInfoId = patient.medicalInfoId;
          this.uploadForm.diagnosisId = patient.diagnosisId;
          this.uploadForm.reportRemark = patient.reportRemark;
          this.uploadForm.medicalHistory = patient.medicalHistory;
          this.uploadForm.reportType = patient.reportType;
          // this.uploadForm.patientId = patient.patientId;
          this.uploadForm.patientName = patient.patientName;
          this.uploadForm.patientSex = patient.patientSex;
          this.uploadForm.patientBirthDate = patient.patientBirthDate;
          this.uploadForm.patientPhone = patient.patientPhone;
          this.uploadForm.patientCardId = patient.patientCardId;
          this.uploadForm.patientAddress = patient.patientAddress;
          this.uploadForm.hospitalNo = patient.hospitalNo;
          this.uploadForm.hospitalId = patient.hospitalId;
          this.uploadForm.sectionId = patient.sectionId;
          this.uploadForm.doctorId = patient.doctorId;
          this.uploadForm.organId = patient.organId;
          this.uploadForm.diagnosticClassificationId = patient.diagnosticClassificationId;
          this.uploadForm.subjectClassificationId =  patient.subjectClassificationId;
          this.uploadForm.pathologyId = patient.pathologyId;
          this.uploadForm.entryTime = patient.entryTime;
          this.uploadForm.equipmentId = patient.equipmentId;
          this.uploadForm.equipmentType = patient.equipmentType;
          this.uploadForm.equipmentManufactor = patient.equipmentManufactor;
          this.patientId = patient.patientId;
          this.isInterested = patient.isInterested;
          this.crr = patient.urlList[0];
          if (this.crr.url != "") {
            if (this.crr.url.indexOf("&") == -1) {
              if(this.crr.url.indexOf("mp4") != -1){
                this.imgList.push({
                  url: this.crr.url,
                  type: "video",
                  videoType:3,
                  value:''
                });
                
              }else{
                this.imgList.push({
                  url: this.crr.url,
                  type: "image"
                });
              }
            } else {
              let urlArr = this.crr.url.split("&");
              for (let i = 0; i < urlArr.length; i++) {
                if(urlArr[i].indexOf("mp4") != -1){
                  this.imgList.push({
                    url: urlArr[i],
                    type: "video",
                    videoType:3,
                    value:''
                  });
                  
                }else{
                  this.imgList.push({
                    url: urlArr[i],
                    type: "image"
                  });
                }
              }
            }
          }
          for (let i in this.infoList) {
            if (i == 0 || i == 1 || i == parseInt(this.uploadForm.reportType) + 1 ) {
              this.infoList[i].type = false;
            } else {
              this.infoList[i].type = true;
            }
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.axiosGet("/medical-imaging-collect/doctor", "doctorList"); //医生
    this.axiosGet("/medical-imaging-collect/equipment", "facilityList"); //设备
    this.axiosGet("/medical-imaging-collect/section", "OfficeList"); //科室
    this.axiosGet("/medical-imaging-collect/hospital", "hospitalList"); //医院
    this.axiosGet("/medical-imaging-collect/organ", "apparatusList"); //器官
    this.axiosGet("/medical-imaging-collect/checking-type", "examineList"); //检查
    this.axiosGet(
      "/medical-imaging-collect/diagnostic-classification",
      "diagnoseList"
    ); //诊断
    this.axiosGet("/medical-imaging-collect/pathology", "illnessList"); //病理
    this.axiosGet(
      "/medical-imaging-collect/subject-classification",
      "disciplineList"
    ); //学科

  },
  methods: {
    //搜索回显
    showData() {
      for (let i of this.searchList) {
        if (i.patientId == this.searchId) {
          this.uploadForm.patientName = i.patientName; //患者名称
          this.uploadForm.patientSex = i.patientSex; //（0女，1男）
          this.uploadForm.patientBirthDate = i.patientBirthDate; //患者年龄
          this.uploadForm.patientPhone = i.patientPhone; //手机号
          this.uploadForm.patientCardId = i.patientCardId; //身份证
          this.uploadForm.patientAddress = i.patientAddress; // 患者地址
        }
      }
    },
    searchInfo() {
      this.searchList = [];
      if (this.search == "") {
        this.$message({
          message: "请输入搜索内容",
          type: "warning"
        });
        return;
      } else {
        let language = "";
        let verify = /^[\u4e00-\u9fa5]+$/;
        if (!verify.test(this.search)) {
          language = "patientCardId";
        } else {
          language = "patientName";
        }
        this.axiosGet(
          "/medical-imaging-collect/patient?" + language + "=" + this.search,
          "searchList"
        );
      }
    },
    focur() {},
    // get请求
    axiosGet(url, info) {
      let _this = this;
      axios.get(url).then(res => {
        if (res.data.infoCode == "0") {
          _this.$data[info] = res.data.data;
          if (info == "searchList") {
            _this.focur();
          }
        } else {
          if (info == "searchList") {
            _this.focur();
          }
        }
      });
    },
    blur(val, a) {},
    //保存
    save() {
      let _this = this;
      for(let i of this.imgList){
        if(i.type == "video" && i.videoType != 3 && i.videoType != 2){
           this.$message({
            message: "视频尚未上传完成，请等待！",
            type: "warning"
          });
          return 
        }
      }
      if (this.uploadType) {
        this.$message({
          message: "操作未完成，请勿反复操作！",
          type: "warning"
        });
        return;
      } else {
        _this.uploadType = true;
      }
      if (!this.$router.history.current.query.id) {
        var data = new FormData();
        for (let i in this.uploadForm) {
          if (i == "reportType") {
            data.append("reportType", this.dialogType);
          } else {
            data.append(i, this.uploadForm[i]);
          }
        }

        for (let i = 1; i < this.imgList.length; i++) {
          if (this.imgList[i].type.split("/")[0] != "video") {
            data.append("file", this.imgList[i].uploadData);
          } else {
            this.isInterested = 1;
          }
        }
        data.append("isInterested", this.isInterested);
        data.append("url", this.videoUrl);
        axios.post("/medical-imaging-collect/receiving-entity", data, {"Content-Type": "multipart/form-data"})
          .then(function(res) {
            if (res.data.infoCode == "0") {
              _this.$message({
                message: res.data.info,
                type: "success"
              });
              _this.$router.push({
                path: "/patient-upload"
              });
            } else {
              _this.uploadType = false;
              _this.$message({
                message: res.data.info,
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log("err------: ");
          });
      } else {
        var data = new FormData();
        data.append("patientId", this.patientId);

        //console.log(this.uploadForm)
        for (let i in this.uploadForm) {
          data.append(i, this.uploadForm[i]);
        }
        //console.log(this.formURL)
        for (let i = 1; i < this.imgList.length; i++) {
          if (this.imgList[i].type.split("/")[0] != "video") {
            data.append("file", this.imgList[i].uploadData);
          } else {
            this.isInterested = 1;
          }
        }
        data.append("url", this.videoUrl);
        data.append("isInterested", this.isInterested);
        data.append("status", this.status);
        data.append("deleteIds", this.idsStr);
        console.log(this.idsStr);
        axios.post("/medical-imaging-collect/receiving-entity/update", data, {
            "Content-Type": "multipart/form-data"
          }).then(function(res) {
            if (res.data.infoCode == "0") {
              _this.$message({
                message: res.data.info,
                type: "success"
              });
              _this.$router.push({
                path: "/patient-upload"
              });
            } else {
              _this.uploadType = false;
              _this.$message({
                message: res.data.info,
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleClick(tab, event) {
      if (parseInt(tab.index) >= 2) {
        this.dialogType = parseInt(tab.index) - 1;
      }
    },
    imgUpload(event) {
      let files = event.target.files;
      this.formURL = files;
      for (let i in files) {
        if (typeof files[i] === "object") {
          if (files[i].type.split("/")[0] == "video") {
            if(files[i].type.split("/")[1] != 'mp4'){
              this.$message({
                message: "仅支持MP4格式视频上传！",
                type: "warning"
              });
              document.getElementById("file" + (parseInt(this.dialogType) + 1)).value = "";
              return 
            }
            if (this.dialogType != 1) {
              this.$message({
                message: "该报告不允许上传视频文件",
                type: "warning"
              });
              document.getElementById(
                "file" + (parseInt(this.dialogType) + 1)
              ).value =
                "";
            } else {
              this.imgList.push({
                url: (window.URL || window.webkitURL).createObjectURL(files[i]),
                type: "video",
                uploadData: files[i],
                videoType:0,
                value:'等待中'
              });

              //上传视频
              let _this = this
              // //获取canvas的加载进度条
              setTimeout(function(){
                _this.uploadVideo(_this.imgList[_this.imgList.length - 1])
               let num = jquery(".urlInfo").find("canvas").length - 1
                _this.setCanvas(jquery(".urlInfo").find("canvas")[num],"#00ADFF")
              },100)
              
            }
          } else {
            this.imgList.push({
              url: (window.URL || window.webkitURL).createObjectURL(files[i]),
              type: "image",
              uploadData: files[i]
            });
          }
        }
      }
     
      // console.log(document.getElementsByClassName("video"))
      // document.getElementsByClassName("video")[0].appendChild(canvas)
    },
    videoClick(data,index){
      let videoDom = this.$refs["video"+index][0]
      videoDom.paused ? videoDom.play() : videoDom.pause()
      videoDom.paused ? videoDom.videoType  = 3 : videoDom.videoType  = 2
    },
    //canvas绘制圆形加载进度条
    setCanvas(canvas,color){
      let radian = this.videoPercentage
      // //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
      var ctx = canvas.getContext("2d");
      //开始一个新的绘制路径
      ctx.beginPath();
      //设置弧线的颜色为蓝色
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      var circle = {
          x : 30,    //圆心的x轴坐标值
          y : 30,    //圆心的y轴坐标值
          r : 28     //圆的半径
      };
      let num = 0
      //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
      if(radian <= 50){
        num = Math.PI / (180 / (3.6*radian))
      }else{
        num = ((3.6*radian) / 180) * Math.PI
      }
      ctx.arc(circle.x, circle.y, circle.r, 0, num, false);    
      //按照指定的路径绘制弧线
      ctx.stroke();
    },
    //删除图片
    del(url, num) {
      if(url.indexOf("mp4") != -1){
        let arr = [url,num]
        this.$emit("showType",4,arr)
      }else{
        if (this.idsStr) {
          this.idsStr = this.idsStr + "," + url;
        } else {
          this.idsStr = url;
        }
        document.getElementById("file" + (parseInt(this.dialogType) + 1)).value = "";
        this.imgList.splice(num, 1)
      }
    },
    equipmentData() {
      for (let i of this.facilityList) {
        if (this.uploadForm.equipmentId == i.id) {
          this.uploadForm.equipmentType = i.instrumentModel;
          this.uploadForm.equipmentManufactor = i.manufacturer;
        }
      }
    },
    //视频上传
    playType(type,index){
      if(type == 3){
        this.imgList[index].videoType  = 2
        this.$refs["video"+index][0].play()
      }
    },
    //上传视频
    uploadVideo(videoInfo){
      var data = new FormData();
      let _this = this
      this.videoUploadType = false
      this.videoPercentage = 0
      data.append("file", videoInfo.uploadData);
      axios.post("/medical-imaging-collect/file", data, {"Content-Type": "multipart/form-data"}).then(function(res) {
        if(res.data.infoCode == '0'){
          _this.videoPercentage = 100
          _this.videoUploadType = true
          if(_this.videoUrl == ''){
            _this.videoUrl = res.data.data
          }else{
            _this.videoUrl += "&"+res.data.data
          }
          // if(_this.$router.history.current.name == "patient-newForm"){
          //   if(res.data.info == '文件上传成功'){
          //     _this.$message({
          //       message: "文件上传成功",
          //       type: "success"
          //     })
          //   }else{
          //     _this.$message({
          //       message: "该文件已上传",
          //       type: "success"
          //     })
          //   }
          // }
          videoInfo.videoType = 3
          videoInfo.value = ''
          let num = jquery(".urlInfo").find("canvas").length - 1
          _this.setCanvas(jquery(".urlInfo").find("canvas")[num],"#00ADFF")
          
        }
      }).catch(err => {
        // _this.$message({
        //   message: "网络错误，请点击继续上传",
        //   type: "warning"
        // })
        videoInfo.videoType = 2
        videoInfo.value = '网络错误'
        let num = jquery(".urlInfo").find("canvas").length - 1
        this.setCanvas(jquery(".urlInfo").find("canvas")[num],"#a8a8a8")
      });
      let num = jquery(".urlInfo").find("canvas").length - 1
      this.videoProgress(videoInfo,num)
    },
    //视频百分比
    videoProgress(videoInfo,num){
      let _this = this
      this.setCanvas(jquery(".urlInfo").find("canvas")[num],"#00ADFF")
      axios.get('/medical-imaging-collect/file?fileName='+encodeURIComponent(videoInfo.uploadData.name)).then(function(data){
        // if(data.data.infoCode == '0'){
        if(_this.videoUploadType == false){
          if(data.data.data != null){
            _this.videoPercentage = parseInt(data.data.data)
          }else{
            _this.videoPercentage = _this.videoPercentage
          }
          _this.videoPercentage == 0 ? videoInfo.value = '等待中' :  videoInfo.value = '上传中'
          let left = _this
            setTimeout(function(){
              left.videoProgress(videoInfo,num)
            },1000)
          }
          
        // }
      }).catch(function(){

      })
    },
    imgBlog(url){
      this.$emit("imgbolg",url)
    }
  },
  watch: {
    delType(){
      if(this.delType){
        if (this.idsStr) {
          this.idsStr = this.idsStr + "," + this.delType[0];
        } else {
          this.idsStr = this.delType[0];
        }
        document.getElementById("file" + (parseInt(this.dialogType) + 1)).value = "";
        this.imgList.splice(this.delType[1], 1)
      }
    },
    dialogType(newVal, oldVal) {},
    imgList(val) {
      let arr = [
        {
          url: ""
        }
      ];
      if (this.imgList == arr) {
        this.pageChange = true;
        this.isActived = true;
      } else {
        this.pageChange = false;
      }
    },
    top(newVal, oldVal) {
      if (newVal == this.cutType) {
        return;
      }
      if (
        newVal != "data1" &&
        newVal != "data2" &&
        oldVal != "data1" &&
        oldVal != "data2"
      ) {
        if (this.uploadForm.reportRemark == "" && this.imgList.length == 1) {
          return;
        } else {
          this.$confirm("此操作将清空上个操作的内容, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.cutType = "";
              this.top = newVal;
              this.imgList = [
                {
                  url: ""
                }
              ];
              document.getElementById(
                "file" + (parseInt(this.dialogType) + 1)
              ).value =
                "";
              this.formURL = {};
              this.uploadForm.reportRemark = "";
              this.$message({
                type: "success",
                message: "清除成功!"
              });
            })
            .catch(() => {
              this.top = oldVal;
              this.cutType = oldVal;
              for (let i in this.infoList) {
                if (this.infoList[i].name == this.top) {
                  this.dialogType = parseInt(i) - 1;
                }
              }
              this.$message({
                type: "info",
                message: "已取消清除"
              });
            });
        }
      }
    }
  }
};
</script>

<style lang="less">
.Patient-Information {
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-radius: 5px;
  padding: 0 20px;
  .wrap {
    height: 100%;
    .wrapAll {
      margin-bottom: 50px;
      .el-form-item {
        margin-bottom: 0;
        margin-right: 60px;
        position: relative;
      }
      .el-form-item__label {
        font-size: 16px;
      }
      input,
      .el-date-editor.el-input {
        width: 300px;
        border-radius: 2px;
      }
      .el-select {
        width: 300px;
        height: 40px;
        .el-input {
          width: 100%;
          height: 100%;
        }
      }
    }
    .wrap_0 {
      margin-bottom: 30px;
      height: 40px;
      position: relative;
      .el-input__suffix {
        display: none;
      }
      .el-form-item {
        margin-right: 20px;
        position: absolute;
        left: 0;
        top: 0;
        label {
          font-size: 16px;
          width: auto;
        }
        input {
          width: 300px;
        }
        .el-button {
          width: 80px;
          height: 40px;
          background: #0190d4;
          line-height: 40px;
          padding: 0;
          span {
            display: inline-block;
            width: 80px;
            height: 100%;
            label {
              display: inline-block;
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
        }
      }
      .el-form-item:first-child {
        z-index: 100;
      }
      .el-form-item:nth-child(2) {
        z-index: -1;
        left: 60px;
      }
      .el-form-item:nth-child(3) {
        left: 380px;
      }
    }
    .wrap_1 {
      padding-top: 50px;
      border-top: 1px solid #0190d4;
      .el-input {
        input {
          width: 300px;
        }
      }
    }
    .wrap-4,
    .wrap-8 {
      padding-top: 50px;
      border-top: 1px solid #0190d4;
    }
    .el-header {
      height: 68px !important;
      width: 100%;
      background: #fff;
      & > .box {
        width: 376px;
        height: 46px;
        margin-top: 11px;
        & > span {
          display: inline-block;
          width: 28px;
          height: 46px;
          margin-right: 20px;
          & > i {
            width: 28px;
            height: 28px;
            color: #838383;
            margin: auto;
            display: inline-block;
            font-size: 28px;
          }
          & > span {
            width: 28px;
            height: 14px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            color: #a6a6a6;
            margin-bottom: 0;
          }
          &:nth-of-type(3) {
            margin-left: 29px;
            margin-right: 50px;
          }
          &:last-child {
            margin-right: 0;
          }
          &:hover i,
          &:hover span {
            color: #20a0ff;
          }
        }
      }
    }
    .el-container {
      .el-main {
        padding: 0;
        .el-tabs {
          .el-tabs__header {
            border: none;
            background: #fff;
            .el-tabs__nav-scroll {
              background: #fff;
              border: none;
              .el-tabs__nav {
                padding-left: 30px;
                border: none;
                .el-tabs__item {
                  padding: 0 28px;
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  height: 50px;
                  line-height: 50px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #8a8a8a;
                  border: none;
                }
                .el-tabs__item:hover {
                  color: #278df6;
                }
                .is-active {
                  color: #278df6;
                }
              }
            }
          }
          .el-tabs__content {
            background: #fff;
            .el-tab-pane {
              padding: 40px 40px 0;
              .onloadImg {
                position: relative;
                margin-bottom: 56px;
                span {
                  position: absolute;
                  left: 0;
                  top: 10px;
                  color: #8a8a8a;
                  font-size: 16px;
                }
                .urlInfo {
                  margin-left: 100px;
                  ul {
                    // display: -webkit-flex; /* Safari */
                    // display: flex;
                    // justify-content: space-between;
                    // flex-direction: row;
                    // flex-wrap: wrap;
                    overflow: hidden;
                    li {
                      width: 260px;
                      height: 220px;
                      line-height: 220px;
                      position: relative;
                      float: left;
                      margin: 0 25px 20px;
                      // background: #eee;
                      .fileImg {
                        position: absolute;
                        z-index: -1;
                        height: 0;
                      }
                      label {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        position: relative;
                        border: 2px solid #e4e4ea;
                        i {
                          font-size: 108px;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          color: rgba(1, 144, 212, 0.2);
                        }
                      }
                      img {
                        width: 100%;
                        max-height: 100%;
                        vertical-align: middle;
                      }
                      .del {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        font-size: 20px;
                        color: #ccc;
                        cursor: pointer;
                        z-index: 20;
                      }
                    }
                  }
                }
              }
            }
            #pane-data1 {
              padding: 53px 62px 0 43px;
            }
          }
          .left {
            width: 50%;
            height: 615px;
            background-color: #ffffff;
            border: solid 1px #cccccc;
            float: left;
            overflow: auto;
          }
          .right {
            width: 50%;
            height: 615px;
            background-color: #ffffff;
            border: solid 1px #cccccc;
            overflow: auto;
            float: right;
          }
          .wrap {
            width: 100%;
            height: 615px;
            background-color: #ffffff;
            overflow: auto;
            float: right;
            .el-textarea__inner {
              border: none;
            }
          }
        }
        .el-breadcrumb {
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 40px;
          color: #8a8a8a;
          padding: 10px 0 10px 5px;
          .el-breadcrumb__inner a,
          .el-breadcrumb__inner.is-link {
            color: #8a8a8a;
          }
          button {
            width: 100px;
            float: right;
            margin-right: 20px;
            font-size: 18px;
            background: #0190d4;
          }
        }
      }
    }
  }
  // 上传图片
  .showImg {
    width: 260px;
    height: 220px;
    background-color: #f7f8fc;
    border-radius: 2px;
    border: solid 2px #e4e4ea;
  }
  .el-form-item__label {
    width: 110px;
    text-align: right;
    font-size: 16px;
    color: #8a8a8a;
  }
  .el-textarea {
    border-radius: 2px;
    border: solid 2px #e4e4ea;
    height: calc(100vh - 280px);
    .el-textarea__inner {
      height: 100%;
      border: none;
      background-color: #f7f8fc;
      resize: none;
    }
    .active {
      height: 240px;
    }
  }
}

.inputStyle {
  input {
    color: #000 !important;
    background: rgba(255, 252, 153, 0.5) !important;
  }
}
.wrapAll .must {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: url(../assets/img/must.png) no-repeat;
  background-size: 6px 6px;
  position: absolute;
  left: -100px;
  top: 15px;
}
.wrapAll .el-form-item .el-form-item__label {
  width: 110px;
}
.wrapAll .el-form-item:last-child .el-form-item__label {
  width: 140px;
}
.wrap_1 .must {
  left: -68px;
}
.wrap_2 .el-form-item:first-child .must {
  left: -68px;
}
.wrap-4 .el-form-item:first-child .must {
  left: -84px;
}
.video{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: transparent;
  .videoType{
		width: 60px;
		height: 60px;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .videoShowrao{
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background:rgba(0,173,255,0.2);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      cursor: pointer;
      img{
        width: 20px !important;
        height: 20px !important;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    p{
      line-height: 20px;
      font-size: 16px;
      color: #01a2ef;
      margin-top: 70px;
      text-align: center;
    }
  }
}
canvas{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%) rotateZ(-90deg);
  z-index: 10;
  cursor: pointer;
}

</style>
