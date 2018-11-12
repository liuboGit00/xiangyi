import axios from '../../axios/axios'

export default {
  // 用户权限
  getUserInfo(){
    axios.get('/medical-imaging-collect/permission-package').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 菜单信息
  getUserList(){
    axios.get('/medical-imaging-collect/menu').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 医生列表
  getDoctor(){
    let data;
    axios.get('/medical-imaging-collect/doctor').then((res)=>{
      if(res.data.infoCode == '0'){
        data = res.data.data
      }else{
        data = res.data.info
      }
      return data
    })
  },
  // 设备列表
  getFacility(){
    axios.get('/medical-imaging-collect/equipment').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 科室信息
  getOffice(){
    axios.get('/medical-imaging-collect/section').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 医院信息
  getHospital(){
    axios.get('/medical-imaging-collect/hospital').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 器官列表
  getApparatus(){
    axios.get('/medical-imaging-collect/organ').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 检查分类列表
  getExamine(){
    axios.get('/medical-imaging-collect/checking-type').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 诊断分类列表
  getDiagnose(){
    axios.get('/medical-imaging-collect/diagnostic-classification').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 病理列表
  getIllness(){
    axios.get('/medical-imaging-collect/pathology').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
  // 学科分类列表
  getDiscipline(){
    axios.get('/medical-imaging-collect/subject-classification').then((res)=>{
      if(res.data.infoCode == '0'){
        return res.data.data
      }else{
        return res.data.info
      }
    })
  },
}