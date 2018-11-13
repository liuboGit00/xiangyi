import axios from '../axios/axios'
import {
  SEND_APPARATUS,
} from './mutation-types.js'

export default {
  setApparatus({commit}, data) {    //遮罩
    commit(SEND_APPARATUS, {data})
  },
  //获取超声医师信息
  // getUltrasoundDoctors({
  //   commit
  // }) {
  //   axios.get(api1 + '/tmiDoctor/list').then(res => {
  //     let data = res.data;
  //     if (data.status === "SUCCESS") {
  //       let newdata = data.data;
  //       commit(SEND_ULTRASOUND_DOCTORS, {
  //         newdata
  //       })
  //     }
  //   })
  // },

}
