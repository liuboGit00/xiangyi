import axios from '../axios/axios'
import {
  SEND_APPARATUS,
  SEND_ULTRASOUND_DOCTORS,
  SEND_CHECK_POINT,
  SEND_DISCIPLINE_CODE,
  SEND_CLINICAL_DIAGNOSIS,
  SEND_CLASSIFICATION_DISEASES,
  SEND_HOSPITAL,
  SEND_PATIENT_INFORMATION,
  SEND_ROW,
  SEND_PATIENTID
} from './mutation-types.js'

const api1 = '';
const api2 = '';
const api3 = '';
export default {
  setApparatus({commit}, data) {
    commit(SEND_APPARATUS, {data})
  },
  //获取超声医师信息
  getUltrasoundDoctors({
    commit
  }) {
    axios.get(api1 + '/tmiDoctor/list').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_ULTRASOUND_DOCTORS, {
          newdata
        })
      }
    })
  },
  //获取检查部位信息
  getCheckPoint({
    commit
  }) {
    axios.get(api1 + '/organ/list ').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_CHECK_POINT, {
          newdata
        })
      }
    })
  },
  //获取学科编码信息
  getDisciplineCode({
    commit
  }) {
    axios.get(api1 + '/subject/list').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_DISCIPLINE_CODE, {
          newdata
        })
      }
    })
  },
  //获取临床诊断列表信息
  getClinicalDiagnosis({
    commit
  }) {
    axios.get(api2 + '/dmiClinicalDiagnosis/listClinicalDiagnosis').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_CLINICAL_DIAGNOSIS, {
          newdata
        })
      }
    })
  },
  //获取国际疾病分类信息
  getClassificationDiseases({
    commit
  }) {
    axios.get(api1 + '/diseaseClassification/list').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_CLASSIFICATION_DISEASES, {
          newdata
        })
      }
    })
  },
  //获取医院信息
  getHospital({
    commit
  }) {
    axios.get(api1 + '/dmiHospital/listHospital').then(res => {
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_HOSPITAL, {
          newdata
        })
      }
    })
  },
  //获取病患信息
  getPatientInformation ({commit},cb){
    axios.get(api3+'/tmiPatient/listOnlyViewPatient').then(res=>{
      let data = res.data;
      if (data.status === "SUCCESS") {
        let newdata = data.data;
        commit(SEND_PATIENT_INFORMATION, {
          newdata
        })
      }
      cb && cb();
    })
  },
  //获取查看病人信息
  getRow({
    commit
  }, data) {
    console.log(1);
    var newdata = data.row;
    commit(SEND_ROW, {
      newdata
    })
  },
  //发送病患ID
  setPatientId ({commit},data){
    var newdata = data.data;
  commit(SEND_PATIENTID,{newdata})
  }
}
