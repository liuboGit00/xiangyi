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

export default {
  [SEND_APPARATUS](state, {
    data
  }) {
    state.apparatus = data
  },
  [SEND_ULTRASOUND_DOCTORS](state, {
    newdata
  }) {
    state.ultrasound_doctors = newdata
  },
  [SEND_CHECK_POINT](state, {
    newdata
  }) {
    state.check_point = newdata
  },
  [SEND_DISCIPLINE_CODE](state, {
    newdata
  }) {
    state.discipline_code = newdata
  },
  [SEND_CLINICAL_DIAGNOSIS](state, {
    newdata
  }) {
    state.clinical_diagnosis = newdata
  },
  [SEND_CLASSIFICATION_DISEASES](state, {
    newdata
  }) {
    state.classification_diseases = newdata
  },
  [SEND_HOSPITAL](state, {
    newdata
  }) {
    state.hospital = newdata
  },
  [SEND_PATIENT_INFORMATION](state, {
    newdata
  }) {
    state.patient_information = newdata
  },
  [SEND_ROW](state, {newdata}) {
    state.row = newdata
  },
  [SEND_PATIENTID](state, {newdata}) {
    state.patientId = newdata
  },
}
