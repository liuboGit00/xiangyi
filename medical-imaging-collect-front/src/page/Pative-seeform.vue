<template>
    <div class="Patient-Information">
      <el-container class="wrap">
        <el-header v-if= 'showDemo'>
          <div class="box">
            <span v-for="(item,index) in IconFonts" :key="index" @click='hand(index)'>
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </span>
          </div>
        </el-header>
        <el-container>
          <el-aside >
            <el-form ref="form">
             <div class="wrap_0">
               <el-select
                 v-model="input1"
                 filterable
                 remote
                 reserve-keyword
                 @change='handValue1()'
                 placeholder="请输入姓名/身份证号"
                 :remote-method="remoteMethod"
                 :loading="loading">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
               <span>
                 <i class=" icon iconfont icon-sousuo"></i>
               </span>
             </div>
              <div class="wrap_1">
                <label for="username">
                  姓名:
                </label>
                <input type="text" id="username" class="username" v-model="username">
                <label for="number">
                  住院号:
                </label>
                <input type="text" id="number" class="number" v-model="number">
              </div>
              <div class="wrap_2">
                <label for="age">
                  年龄:
                </label>
                <input type="text" id="age" class="age" v-model="age">
                <label>
                  性别:
                </label >
                <el-select v-model="value2" placeholder="" >
                  <el-option
                    v-for="(item,index) in gender"
                    :key="index"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
                <i :class="radio === true? 'icon iconfont icon-xuanzekuang': 'icon iconfont icon-weixuanzhong'" @click="radio=!radio"></i>
                <label >感兴趣</label>
              </div>
              <div class="wrap-3">
                <label>
                  超声医师:
                </label >
                <el-select v-model="value3" placeholder="请选择" @change='handValue2()'>
                  <el-option
                    v-for="(item,index) in ultrasound_doctors"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-4">
                <label>
                  临床诊断:
                </label >
                <el-select v-model="value4" filterable allow-create default-first-option placeholder="请输入诊断" >
                  <el-option v-for="(item,index) in clinical_diagnosis" :key="index" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-5">
                <label>
                  检查部位:
                </label >
                <el-select v-model="value5" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in check_point"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-6">
                <label>
                  联系电话:
                </label >
                <el-input v-model="input6" placeholder="请输入联系电话"></el-input>
              </div>
              <div class="wrap-7">
                <label>
                  身份证号:
                </label >
                <el-input v-model="input7" placeholder="请输入身份证号"></el-input>
              </div>
              <div class="wrap-8">
                <label>
                  学科编码:
                </label >
                <el-select v-model="value8" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in discipline_code"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-9">
                <label>
                  国际疾病分类:
                </label >
                <el-select v-model="value9" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in classification_diseases"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-10">
                <label>
                  家庭地址:
                </label >
                <el-input v-model="input10" placeholder="请输入地区"></el-input>
              </div>
              <div class="wrap-11">
                <label>
                  录入日期:
                </label >
                <el-date-picker
                  v-model="value11"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
              </div>
              <div class="wrap-13">
                <label>
                  仪器设备:
                </label >
                <el-select v-model="value14" placeholder="请选择" @change='handValue3()'>
                  <el-option
                    v-for="(item,index) in equipment"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="wrap-12_1">
                <label for="manufacturers">
                  仪器厂家:
                </label>
                <input type="text" id="manufacturers" class="manufacturers" v-model="manufacturers">
              </div>
              <div class="wrap-12_2">
                <label for="type">
                  仪器类型:
                </label>
                <input type="text" id="type" class="type" v-model="type">
              </div>
              <div class="wrap-13">
                <label>
                  医院名称:
                </label >
                <el-select v-model="value13" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in hospital"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form>
          </el-aside>
          <el-main>
            <el-tabs v-model="activeName2" type="card">
              <el-tab-pane label="1病史" name="first">
                <!--<el-input class="left"-->
                  <!--type="textarea"-->
                  <!--:rows="200"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="textarea1_left">-->
                <!--</el-input>-->
                <!--<el-input class="right"-->
                  <!--type="textarea"-->
                  <!--:rows="200"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="textarea1_right">-->
                <!--</el-input>-->
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea1">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="2实验室检测报告" name="second">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea2">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="3超声报告" name="third">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea3">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="4病理报告" name="fourth">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea4">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="5CT报告" name="fifth">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea5">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="6MRI报告" name="sixth">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea6">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="7X线报告" name="seventh">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea7">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="8核医学报告" name="eighth">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea8">
                </el-input>
              </el-tab-pane>
              <el-tab-pane label="其他" name="ninth">
                <el-input class="wrap"
                          type="textarea"
                          :rows="200"
                          placeholder="请输入内容"
                          v-model="textarea9">
                </el-input>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </el-container>
      <template>
        <el-button type="text" @click="open2"></el-button>
        <el-button :plain="true" @click="open5" style="display: none"></el-button>
      </template>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from '../axios/axios'
    export default {
      data(){
        return{
          IconFonts:[
            {
              icon:'icon iconfont icon-baocun',
              title:'保存'
            },
            {
              icon:'icon iconfont icon-xinjian',
              title:'新建'
            },
            {
              icon:'icon iconfont icon-shanchu1',
              title:'删除'
            },
            {
              icon:'icon iconfont icon-qishi',
              title:'起始'
            },
            {
              icon:'icon iconfont icon-xiangqian',
              title:'向前'
            },
            {
              icon:'icon iconfont icon-xianghou',
              title:'向后'
            },
            {
              icon:'icon iconfont icon-zuihou',
              title:'结束'
            },
          ],

          input10:'',
          input6:'',
          age:'',
          radio:true,
          value2:'',
          username:'',
          input7:'',
          value11:'',
          value13:'',
          type:'',            //仪器类型
          manufacturers:'',  //仪器厂家
          value14:'',
          value3:'',
          value4:'',
          value5:'',
          value8:'',
          value9:'',
          textarea1:"",
          textarea2:"",
          textarea3:"",
          textarea4:"",
          textarea6:"",
          textarea7:"",
          textarea8:"",

          options: [],
          list: [],
          loading: false,
          form:'',
          input1:'',
          number:'',
          value1:'',
          value6:'',
          value7:'',
          value10:'',
          gender:[{id:'1',value:'男'},{id:'2',value:'女'}],
          activeName2: 'first',
          textarea1_left:"",       //文本域
          textarea1_right:"",
          textarea5:"",
          textarea9:"",
          restaurants: [],
          timeout:  null,
          identifying:false,   //标识
          equipment:'',     //设备
          data:{} ,           //存储所有input内容
          isShow:true,       //是否弹出保存框
          showDemo: true
        }
      },
      mounted(){
        if(this.$route.params.index == 1){
          this.showDemo = false
        }else {
          this.showDemo = true
        }
        this.$store.dispatch('getUltrasoundDoctors');
        this.$store.dispatch('getCheckPoint');
        this.$store.dispatch('getDisciplineCode');
        this.$store.dispatch('getClinicalDiagnosis');
        this.$store.dispatch('getClassificationDiseases');
        this.$store.dispatch('getHospital');
        this.$store.dispatch('getPatientInformation',()=>{
          this.list = this.patient_information.map(item => {
            return { value:item.name+'/'+item.idNumber , label:item.name+'/'+item.idNumber};
          });

        });
        if(this.apparatus){
          this.value5 = this.apparatus.id;
          axios.get('http://10.6.243.133:8083/medicalRecord/getLatestByOrgan?organId='+this.value5).then((res)=>{
            let data = res.data;
            if(data.status==='SUCCESS'){
              var newData = data.data;
              this.textarea8=newData.nuclearMedicineReport;
              this.textarea3=newData.ultrasonicReport;
              this.textarea4=newData.pathologicalReport;
              this.textarea1=newData.medicalHistory;
              this.textarea6=newData.mriReport;
              this.textarea7=newData.xray;
              this.textarea2=newData.labTestingReport;
             /* this.value5=newData.organId;      //器官*/
              this.value8=newData.subjectId;
              this.value9=newData.diseaseClsId;
              this.value3=newData.doctorId;
              this.value4=newData. clinicalDiagnosis;
              this.value14=newData.equipment.name;
              this.manufacturers=newData.equipment.manufacturer;
              this.type=newData.equipment.instrumentModel;
              this.value13=newData.hospitalId;
              this.value11=newData.checkingDate;
              this.input7=newData.patientId;
              this.username = newData.patient.name;
              this.value2 = newData.patient.sex === 1? '男': '女';
              this.radio = newData.patient.isInterested ===1? true: false;
              this.age = newData.patient.age;
              this.input6 = newData.patient.phone;
              this.input10 = newData.patient.address;
            }
          })
        }
        if(this.row.records){
          this.examine()
        };
        this.data = this.isSave();
        console.log(this.data);
      },
      computed:{
        ...mapState(['ultrasound_doctors','check_point','discipline_code','clinical_diagnosis','apparatus',
          'classification_diseases','hospital','patient_information','row']),
      },
      methods: {
        //模糊搜索
        handValue1(){
          var idNumber=this.input1.split('/')[1];
          var obj = this.patient_information.find(item=>item.idNumber===idNumber);
          if(obj){
            this.identifying=true;
            this.input7='',   //病患ID
              this.username='',     //姓名
              this.value2 ='',      //性别
              this.radio='',  //是否感兴趣
              this.age='',            //年龄
              this.input6='',          //联系方式
              this.input10='',       //家庭住址
              this.value4='',                 // 临床诊断
              this.textarea3='',                 //  超声报告  病理报告
              this.textarea4='',              //病理报告
              this.textarea1='',    // 病史
              this.textarea6='',                     // MRI报告
              this.textarea5='',                 // CT线报告
              this.textarea7='',                        //X线
              this.textarea8='',   // 核医学报告
              this.textarea2='',       // 实验室检测报告
              this.value5='',    //器官ID
              this.value8='',     // 学科ID
              this.value9='' ,             // 疾病分类ID
              this.input7='',    //病患ID
              this.value3='',    //医生ID
              this.value14='',   //医疗设备
              this.value13='',   // 医院ID
              this.value11=''   // 检查时间
          }

          this.username = obj.name;
          this.age = obj.age;
          this.input6 = obj.phone;
          this.value2 = obj.sex===0?'女':'男';
          this.input7 = obj.idNumber;
          this.radio = obj.isInterested ===0? false: true;
          this.input10 = obj.address
        },
        //根据医师的科室查找设备
        handValue2(){
          var value = this.value3;
          console.log(value);
          var obj = this.ultrasound_doctors.find(item=>item.id === value);
          console.log(obj.sectionId);
          axios.get('http://10.6.243.133:8083/dmiSection/getRelationById?id='+obj.sectionId).then((res)=>{
            let data = res.data;
            this.equipment = data.data.equipments;
          })
        },
        //根据设备查找厂家和型号
        handValue3(){
          console.log(this.equipment);
          var obj = this.equipment.find((item)=>item.id === this.value14);
          this.manufacturers = obj.manufacturer;
          this.type = obj.instrumentModel;
        },
        //点击头部七个按钮
        hand(index){
          //保存
          if(index===0){
            this.isShow1();
            console.log(this.isShow);
            //如果isShow是true，就是没有改动，不需要在保存
            if(!this.isShow){
              if(!this.identifying){
                axios.post('http://10.6.243.133:8083/tmiPatient/save',{
                  idNumber:this.input7,   //病患ID
                  name:this.username,     //姓名
                  sex:this.value2 === '男'? 1: 0,      //性别
                  isInterested:this.radio===true? 1: 0,  //是否感兴趣
                  age:this.age,            //年龄
                  phone:this.input6,          //联系方式
                  address:this.input10,       //家庭住址
                })
              }
              axios.post('http://10.6.243.133:8083/medicalRecord/save',{
                clinicalDiagnosis:this.value4,                 // 临床诊断
                ultrasonicReport:this.textarea3,                 //  超声报告  病理报告
                pathologicalReport:this.textarea4,              //病理报告
                medicalHistory:this.textarea1,    // 病史
                mriReport:this.textarea6,                     // MRI报告
                ctRayReport:this.textarea5,                 // CT线报告
                xRay:this.textarea7,                        //X线
                nuclearMedicineReport:this.textarea8,   // 核医学报告
                labTestingReport:this.textarea2,       // 实验室检测报告
                organId:this.value5,    //器官ID
                subjectId:this.value8,     // 学科ID
                diseaseClsId:this.value9 ,             // 疾病分类ID
                patientId:this.input7,    //病患ID
                doctorId:this.value3,    //医生ID
                equipmentId:this.value14,   //医疗设备
                hospitalId:this.value13,   // 医院ID
                checkingDate:this.value11,   // 检查时间
              }).then(()=>{
                this.open5();
                this.data = this.isSave()
              })
            }
          }
          //新建
          if(index===1){
            this.isShow1();
            if(!this.isShow){
              this.open2()
            }else {
              this.input7='',   //病患ID
                this.username='',     //姓名
                this.value2 ='',      //性别
                this.radio='',  //是否感兴趣
                this.age='',            //年龄
                this.input6='',          //联系方式
                this.input10='',       //家庭住址
                this.value4='',                 // 临床诊断
                this.textarea3='',                 //  超声报告  病理报告
                this.textarea4='',              //病理报告
                this.textarea1='',    // 病史
                this.textarea6='',                     // MRI报告
                this.textarea5='',                 // CT线报告
                this.textarea7='',                        //X线
                this.textarea8='',   // 核医学报告
                this.textarea2='',       // 实验室检测报告
                this.value5='',    //器官ID
                this.value8='',     // 学科ID
                this.value9='' ,             // 疾病分类ID
                this.input7='',    //病患ID
                this.value3='',    //医生ID
                this.value14='',   //医疗设备
                this.value13='',   // 医院ID
                this.value11=''   // 检查时间
              this.data = this.isSave()
            }
          }
        //删除
          if(index===2){
            this.input7='',   //病患ID
              this.username='',     //姓名
              this.value2 ='',      //性别
              this.radio='',  //是否感兴趣
              this.age='',            //年龄
              this.input6='',          //联系方式
              this.input10='',       //家庭住址
              this.value4='',                 // 临床诊断
              this.textarea3='',                 //  超声报告  病理报告
              this.textarea4='',              //病理报告
              this.textarea1='',    // 病史
              this.textarea6='',                     // MRI报告
              this.textarea5='',                 // CT线报告
              this.textarea7='',                        //X线
              this.textarea8='',   // 核医学报告
              this.textarea2='',       // 实验室检测报告
              this.value5='',    //器官ID
              this.value8='',     // 学科ID
              this.value9='' ,             // 疾病分类ID
              this.input7='',    //病患ID
              this.value3='',    //医生ID
              this.value14='',   //医疗设备
              this.value13='',   // 医院ID
              this.value11=''   // 检查时间
          }
          //起始
          if(index===3){
            axios.get('http://10.6.243.133:8083/medicalRecord/getHead').then((res)=>{
              var data = res.data;
              console.log(data);
              if(data.status==='SUCCESS'){
                var newData = data.data;
                if(newData.equipment){
                  this.textarea8=newData.nuclearMedicineReport;
                  this.textarea3=newData.ultrasonicReport;
                  this.textarea4=newData.pathologicalReport;
                  this.textarea1=newData.medicalHistory;
                  this.textarea5=newData.ctRayReport;
                  this.textarea6=newData.mriReport;
                  this.textarea7=newData.xray;
                  this.textarea9=newData.otherReport;
                  this.textarea2=newData.labTestingReport;
                  this.value5=newData.organId;      //器官
                  this.value8=newData.subjectId;
                  this.value9=newData.diseaseClsId;
                  this.value3=newData.doctorId;
                  this.value4=newData.clinicalDiagnosis;
                  this.value14=newData.equipment.name;
                  this.manufacturers=newData.equipment.manufacturer;
                  this.type=newData.equipment.instrumentModel;
                  this.value13=newData.hospitalId;
                  this.value11=newData.checkingDate;
                  this.input7=newData.patientId;
                  this.username = newData.patient.name;
                  this.value2 = newData.patient.sex === 1? '男': '女';
                  this.radio = newData.patient.isInterested ===1? true: false;
                  this.age = newData.patient.age;
                  this.input6 = newData.patient.phone;
                  this.input10 = newData.patient.address;
                }
              }
            })
          }
          //向前
          if(index===4){
            if(!this.patientId){
              this.patientId=''
            }
            axios.get('http://10.6.243.133:8083/medicalRecord/getForwardByPatient?patientId='+this.patientId).then((res)=>{
              var data = res.data;
              console.log(data);
              if(data.status==='SUCCESS'){
                var newData = data.data;
                if(newData.equipment){
                  this.textarea8=newData.nuclearMedicineReport;
                  this.textarea3=newData.ultrasonicReport;
                  this.textarea4=newData.pathologicalReport;
                  this.textarea1=newData.medicalHistory;
                  this.textarea5=newData.ctRayReport;
                  this.textarea6=newData.mriReport;
                  this.textarea7=newData.xray;
                  this.textarea9=newData.otherReport;
                  this.textarea2=newData.labTestingReport;
                  this.value5=newData.organId;      //器官
                  this.value8=newData.subjectId;
                  this.value9=newData.diseaseClsId;
                  this.value3=newData.doctorId;
                  this.value4=newData.clinicalDiagnosis;
                  this.value14=newData.equipment.name;
                  this.manufacturers=newData.equipment.manufacturer;
                  this.type=newData.equipment.instrumentModel;
                  this.value13=newData.hospitalId;
                  this.value11=newData.checkingDate;
                  this.input7=newData.patientId;
                  this.username = newData.patient.name;
                  this.value2 = newData.patient.sex === 1? '男': '女';
                  this.radio = newData.patient.isInterested ===1? true: false;
                  this.age = newData.patient.age;
                  this.input6 = newData.patient.phone;
                  this.input10 = newData.patient.address;
                }
              }
            })
          }
          //向后
          if(index===5){
            if(!this.patientId){
              this.patientId=''
            }
            axios.get('http://10.6.243.133:8083/medicalRecord/getBackwardByPatient?patientId='+this.patientId).then((res)=>{
              var data = res.data;
              console.log(data);
              if(data.status==='SUCCESS'){
                var newData = data.data;
                if(newData.equipment){
                  this.textarea8=newData.nuclearMedicineReport;
                  this.textarea3=newData.ultrasonicReport;
                  this.textarea4=newData.pathologicalReport;
                  this.textarea1=newData.medicalHistory;
                  this.textarea5=newData.ctRayReport;
                  this.textarea6=newData.mriReport;
                  this.textarea7=newData.xray;
                  this.textarea9=newData.otherReport;
                  this.textarea2=newData.labTestingReport;
                  this.value5=newData.organId;      //器官
                  this.value8=newData.subjectId;
                  this.value9=newData.diseaseClsId;
                  this.value3=newData.doctorId;
                  this.value4=newData.clinicalDiagnosis;
                  this.value14=newData.equipment.name;
                  this.manufacturers=newData.equipment.manufacturer;
                  this.type=newData.equipment.instrumentModel;
                  this.value13=newData.hospitalId;
                  this.value11=newData.checkingDate;
                  this.input7=newData.patientId;
                  this.username = newData.patient.name;
                  this.value2 = newData.patient.sex === 1? '男': '女';
                  this.radio = newData.patient.isInterested ===1? true: false;
                  this.age = newData.patient.age;
                  this.input6 = newData.patient.phone;
                  this.input10 = newData.patient.address;
                }
              }
            })
          }
          //起始
          if(index===6){
            axios.get('http://10.6.243.133:8083/medicalRecord/getTail').then((res)=>{
              var data = res.data;
              console.log(data);
              if(data.status==='SUCCESS'){
                var newData = data.data;
                if(newData.equipment){
                  this.textarea8=newData.nuclearMedicineReport;
                  this.textarea3=newData.ultrasonicReport;
                  this.textarea4=newData.pathologicalReport;
                  this.textarea1=newData.medicalHistory;
                  this.textarea5=newData.ctRayReport;
                  this.textarea6=newData.mriReport;
                  this.textarea7=newData.xray;
                  this.textarea9=newData.otherReport;
                  this.textarea2=newData.labTestingReport;
                  this.value5=newData.organId;      //器官
                  this.value8=newData.subjectId;
                  this.value9=newData.diseaseClsId;
                  this.value3=newData.doctorId;
                  this.value4=newData.clinicalDiagnosis;
                  this.value14=newData.equipment.name;
                  this.manufacturers=newData.equipment.manufacturer;
                  this.type=newData.equipment.instrumentModel;
                  this.value13=newData.hospitalId;
                  this.value11=newData.checkingDate;
                  this.input7=newData.patientId;
                  this.username = newData.patient.name;
                  this.value2 = newData.patient.sex === 1? '男': '女';
                  this.radio = newData.patient.isInterested ===1? true: false;
                  this.age = newData.patient.age;
                  this.input6 = newData.patient.phone;
                  this.input10 = newData.patient.address;
                }
              }
            })
          }
        },
        //判断页面内容是否有变动
        isSave(){
          var data = {
               textarea8 : this.textarea8,
               textarea3 : this.textarea3,
               textarea4 : this.textarea4,
               textarea1 : this.textarea1,
               textarea6 : this.textarea6,
               textarea7 : this.textarea7,
               textarea2 : this.textarea2,
               value5 : this.value5,      //器官
               value8 : this.value8,
               value9 : this.value9,
               value3 : this.value3,
               value4 :this.value4,
               value14 : this.value14,
               manufacturers : this.manufacturers,
               type : this.type,
               value13 : this.value13,
               value11 : this.value11,
               input7 : this.input7,
               username : this.username,
               value2 : this.value2,
               radio : this.radio,
               age : this.age,
               input6 : this.input6,
               input10 : this.input10,
          };
          return data
        },
        //保存弹窗
        open2() {
          this.$confirm('您的信息未保存，是否保存？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //保存病患信息
            if(!this.identifying){
              axios.post('http://10.6.243.133:8083/tmiPatient/save',{
                idNumber:this.input7,   //病患ID
                name:this.username,     //姓名
                sex:this.value2 === '男'? 1: 0,      //性别
                isInterested:this.radio===true? 1: 0,  //是否感兴趣
                age:this.age,            //年龄
                phone:this.input6,          //联系方式
                address:this.input10,       //家庭住址
              })
            }
            //保存病史信息
            axios.post('http://10.6.243.133:8083/medicalRecord/save',{
              clinicalDiagnosis:this.value4,                 // 临床诊断
              ultrasonicReport:this.textarea3,                 //  超声报告  病理报告
              pathologicalReport:this.textarea4,              //病理报告
              medicalHistory:this.textarea1,    // 病史
              mriReport:this.textarea6,                     // MRI报告
              ctRayReport:this.textarea5,                 // CT线报告
              xRay:this.textarea7,                        //X线
              nuclearMedicineReport:this.textarea8,   // 核医学报告
              labTestingReport:this.textarea2,       // 实验室检测报告
              organId:this.value5,    //器官ID
              subjectId:this.value8,     // 学科ID
              diseaseClsId:this.value9 ,             // 疾病分类ID
              patientId:this.input7,    //病患ID
              doctorId:this.value3,    //医生ID
              equipmentId:this.value14,   //医疗设备
              hospitalId:this.value13,   // 医院ID
              checkingDate:this.value11,   // 检查时间
            }).then(res=>{
              let data = res.data;
              if(data.status==="SUCCESS"){
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }
                this.input7='',   //病患ID
                this.username='',     //姓名
                this.value2 ='',      //性别
                this.radio='',  //是否感兴趣
                this.age='',            //年龄
                this.input6='',          //联系方式
                this.input10='',       //家庭住址
                this.value4='',                 // 临床诊断
                this.textarea3='',                 //  超声报告  病理报告
                this.textarea4='',              //病理报告
                this.textarea1='',    // 病史
                this.textarea6='',                     // MRI报告
                this.textarea5='',                 // CT线报告
                this.textarea7='',                        //X线
                this.textarea8='',   // 核医学报告
                this.textarea2='',       // 实验室检测报告
                this.value5='',    //器官ID
                this.value8='',     // 学科ID
                this.value9='' ,             // 疾病分类ID
                this.input7='',    //病患ID
                this.value3='',    //医生ID
                this.value14='',   //医疗设备
                this.value13='',   // 医院ID
                this.value11=''   // 检查时间
              this.data = this.isSave()
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            });
          });
        },
        //保存提示
        open5() {
          this.$message({
            showClose: true,
            message: '您好，您已成功保存'
          });
        },
        //element-ui组件事件
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label
                  .indexOf(query) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
        },
        //查看信息
        examine(){
            this.input7=this.row.patientId,   //病患ID
            this.username=this.row.name,     //姓名
            this.value2 =this.row.sex===1? '男': '女',      //性别
            this.radio=this.row.isInterested===1? true: false,  //是否感兴趣
            this.age=this.row.age,            //年龄
            this.input6=this.row.phone,          //联系方式
            this.input10=this.row.address,       //家庭住址
            this.value4=this.row.records[0].clinicalDiagnosis,                 // 临床诊断
            this.textarea3=this.row.records[0].ultrasonicReport,                 //  超声报告  病理报告
            this.textarea4=this.row.records[0].pathologicalReport,              //病理报告
            this.textarea1=this.row.records[0].medicalHistory,    // 病史
            this.textarea6=this.row.records[0].mriReport,                     // MRI报告
            this.textarea5=this.row.records[0].ctRayReport,                 // CT线报告
            this.textarea7=this.row.records[0].xray,                        //X线
            this.textarea8=this.row.records[0].nuclearMedicineReport,   // 核医学报告
            this.textarea9 = this.row.records[0].otherReport           //其他报告
            this.textarea2=this.row.records[0].labTestingReport,       // 实验室检测报告
            this.value5=this.row.records[0].organ.id,    //器官ID
            this.value8=this.row.records[0].subjectId,     // 学科ID
            this.value9=this.row.records[0].diseaseClsId ,             // 疾病分类ID
            this.input7=this.row.records[0].patientId,    //病患ID
            this.value3=this.row.records[0].doctorId,    //医生ID
            this.value14=this.row.records[0].equipment.name,   //医疗设备
            this.manufacturers=this.row.records[0].equipment.manufacturer   //医疗厂家
            this.type = this.row.records[0].equipment.instrumentModel    //医疗型号
            this.value13=this.row.records[0].hospitalId,   // 医院ID
            this.value11=this.row.records[0].checkingDate   // 检查时间
        },
        //是否弹窗保存狂
        isShow1(){
          if(this.data.textarea8 ===this.textarea8&&
            this.data.textarea3===this.textarea3&&
            this.data.textarea4===this.textarea4&&
            this.data.textarea1===this.textarea1&&
            this.data.textarea6===this.textarea6&&
            this.data.textarea7===this.textarea7&&
            this.data.textarea2===this.textarea2 &&
            this.data.value5 ===this.value5  &&
            this.data.value8  ===this.value8   &&
            this.data.value9   ===this.value9    &&
            this.data.value3    ===this.value3     &&
            this.data.value4     ===this.value4      &&
            this.data.value14      ===this.value14       &&
            this.data.manufacturers ===this.manufacturers &&
            this.data.type  ===this.type  &&
            this.data.value13===this.value13&&
            this.data.value11 ===this.value11 &&
            this.data.input7  ===this.input7  &&
            this.data.username===this.username&&
            this.data.value2 ===this.value2 &&
            this.data.radio  ===this.radio &&
            this.data.age ===this.age&&
            this.data.input6 ===this.input6 &&
            this.data.input10===this.input10
          ){
            this.isShow = true;
          }else {
            this.isShow = false
          }
        }
      },
      //离开组件是进行保存提示和更改vuex状态
      beforeRouteLeave (to, from, next) {
       this.isShow1();
        this.$store.dispatch('setPatientId',{data:this.input7});
        this.$store.dispatch('setApparatus',{data:'',id:''});
        console.log(this.data.username === this.username);
        console.log(this.isShow);
        if(!this.isShow){
          this.$confirm('您的信息未保存，是否保存？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //保存病患信息
            if(!this.identifying){
              axios.post('http://10.6.243.133:8083/tmiPatient/save',{
                idNumber:this.input7,   //病患ID
                name:this.username,     //姓名
                sex:this.value2 === '男'? 1: 0,      //性别
                isInterested:this.radio===true? 1: 0,  //是否感兴趣
                age:this.age,            //年龄
                phone:this.input6,          //联系方式
                address:this.input10,       //家庭住址
              })
            }
            //保存病史信息
            axios.post('http://10.6.243.133:8083/medicalRecord/save',{
              clinicalDiagnosis:this.value4,                 // 临床诊断
              ultrasonicReport:this.textarea3,                 //  超声报告  病理报告
              pathologicalReport:this.textarea4,              //病理报告
              medicalHistory:this.textarea1,    // 病史
              mriReport:this.textarea6,                     // MRI报告
              ctRayReport:this.textarea5,                 // CT线报告
              xRay:this.textarea7,                        //X线
              nuclearMedicineReport:this.textarea8,   // 核医学报告
              labTestingReport:this.textarea2,       // 实验室检测报告
              organId:this.value5,    //器官ID
              subjectId:this.value8,     // 学科ID
              diseaseClsId:this.value9 ,             // 疾病分类ID
              patientId:this.input7,    //病患ID
              doctorId:this.value3,    //医生ID
              equipmentId:this.value14,   //医疗设备
              hospitalId:this.value13,   // 医院ID
              checkingDate:this.value11,   // 检查时间
            }).then(res=>{
              let data = res.data;
              if(data.status==="SUCCESS"){
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }
            });
            next()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            });
            next()
          });
        }else {
          next()
        }
      }
    }
</script>

<style lang="less" scoped>
  @import "../assets/css/element";
  .Patient-Information{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border: solid 1px #b7b7b7;
    border-radius: 5px;
    .wrap{
      height: 100%;
      .el-header{
        height: 68px !important;
        width: 100%;
        border-bottom:solid 1px #b7b7b7;
        &>.box{
          width: 376px;
          height: 46px;
          margin-top: 11px;
          &>span{
            display: inline-block;
            width: 28px;
            height: 46px;
            margin-right: 20px;
            &>i{
              width: 28px;
              height: 28px;
              color: #838383;
              margin: auto;
              display: inline-block;
              font-size: 28px;
            }
            &>span{
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
            &:nth-of-type(3){
              margin-left: 29px;
              margin-right: 50px;
            }
            &:last-child{
              margin-right: 0;
            }
            &:hover i, &:hover span{
              color: #20a0ff;

            }
          }
        }
      }
      .el-container{

        .el-aside{
          width: 300px;
          box-sizing: border-box;
          padding: 20px 0 0 20px;
          background-color: #e9f3fe;
          overflow: auto;
          &>.el-form{
            height: 714px;
            &>.el-input{
              width: 260px;
              height: 36px !important;
              background-color: #ffffff;
            }
            &>.wrap_1{
              width: 100%;
              height: 24px;
              margin-top: 20px;
              label{
                width: 35px;
                height: 15px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0;
                color: #a6a6a6;

                &:nth-of-type(2){
                 margin-left: 14px;
                }
              }
              &>input{
                width: 70px;
                height: 24px;
                background-color: #ffffff;
                border: solid 1px #b7b7b7;
                box-sizing: border-box;
                margin-top: -2px;
                border-radius: 3px;
                box-sizing: border-box;
                padding: 0 10px;
              }
            }
            &>.wrap_2{
              width: 100%;
              height: 24px;
              margin-top: 20px;
              label{
                width: 35px;
                height: 15px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0;
                color: #a6a6a6;
                &:nth-of-type(2){
                  margin-left: 14px;
                }
                &:last-child{
                  width: 48px;
                  height: 16px;
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #a6a6a6;

                }
              }
              &>input{
                width: 34px;
                height: 24px;
                background-color: #ffffff;
                border: solid 1px #b7b7b7;
                box-sizing: border-box;
                margin-top: -2px;
                border-radius: 3px;
                box-sizing: border-box;
                padding: 0 5px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0;
                color: #a6a6a6;
              }
              .gender{
                width: 41px;
                height: 24px;
                background-color: #ffffff;
                border: solid 1px #b7b7b7;
                font-size: 14px;
                text-align: center;
                &>option{
                  font-size: 14px;
                }
              }
              .radio{
                width: 18px;
                height: 18px;
                background-color: #ffffff;
                border-radius: 4px;
                border: solid 1px #b7b7b7;
                margin-left: 10px;
                vertical-align: -3px;
              }
              &>i{
                display: inline-block;
                width: 18px;
                height: 18px;
                vertical-align: -1px;
                margin-left: 10px;
              }
            }
            &>.wrap-3 ,&>.wrap-4,&>.wrap-5,&>.wrap-6,&>.wrap-7,&>.wrap-8,&>.wrap-9,&>.wrap-10,&>.wrap-11,&>.wrap-13{
              width: 100%;
              height: 24px;
              margin-top: 20px;
              label{
                width: 67px;
                height: 16px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a6a6a6;
              }
            }
           /* .wrap-10{
              label{
                margin-left: 32px;
              }
            }*/
            .wrap-12_1,.wrap-12_2{
              width: 100%;
              height: 24px;
              margin-top: 20px;
              label{
                width: 67px;
                height: 17px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a6a6a6;
                &:nth-of-type(2){
                  margin-left: 10px;
                }
              }
              &>input{
                width: 183px;
                height: 24px;
                background-color: #ffffff;
                border: solid 1px #b7b7b7;
                border-radius: 3px;
                box-sizing: border-box;
                padding: 0 10px;
              }
            }
          }
        }
        .el-main{
          overflow: hidden;
          padding: 0;
          .el-tabs{
            .el-tabs__header{
              margin: 0 0 0 0;
              .el-tabs__nav-scroll{
                .el-tabs__nav {
                  .el-tabs__item{
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a6a6a6;
                  }
                  .is-active{
                    background-color: #278df6 !important;
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                  }
                }
              }
            }
            .left{
              width: 50%;
              height: 615px;
              background-color: #ffffff;
              border: solid 1px #cccccc;
              float: left;
              overflow: auto;
            }
            .right{
              width: 50%;
              height: 615px;
              background-color: #ffffff;
              border: solid 1px #cccccc;
              overflow: auto;
              float: right;
            }
            .wrap{
              width: 100%;
              height: 615px;
              background-color: #ffffff;
              border: solid 1px #cccccc;
              overflow: auto;
              float: right;
            }
          }

        }
      }
    }
  }
</style>
