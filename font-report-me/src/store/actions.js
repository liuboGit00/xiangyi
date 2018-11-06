import axios from '../axios/axios'
import {
  SEND_DIALOG_MODALOPTIONS,
  SEND_PAGINATOR_OPTIONS,
  SEND_SUSPEND_OPTIONS,
  SEND_GRAPHE_CHART
} from './mutation-types.js'

export default {
  setDialogModalOptions({ commit }, data) {    //存储对话框显示状态
    commit(SEND_DIALOG_MODALOPTIONS, { data })
  },
  setPaginatorOptions({ commit }, paginatorOptions){
    commit(SEND_PAGINATOR_OPTIONS, { paginatorOptions })
  },
  setSuspendOptions({ commit }, suspendOptions){
    commit(SEND_SUSPEND_OPTIONS, { suspendOptions })
  },
  setGrapheChart({ commit }, grapheChart){
    commit(SEND_GRAPHE_CHART, { grapheChart })
  }
}
