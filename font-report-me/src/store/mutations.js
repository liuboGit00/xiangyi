import {
  SEND_DIALOG_MODALOPTIONS,
  SEND_PAGINATOR_OPTIONS,
  SEND_SUSPEND_OPTIONS,
  SEND_GRAPHE_CHART
} from './mutation-types.js'

export default {
  [SEND_DIALOG_MODALOPTIONS](state, {
    data
  }) {
    state.dialog_modalOptions = data
  },
  [SEND_PAGINATOR_OPTIONS](state, { paginatorOptions }) {
    state.paginatorOptions = paginatorOptions
  },
  [SEND_SUSPEND_OPTIONS](state, { suspendOptions }) {
    state.suspendOptions = suspendOptions
  },
  [SEND_GRAPHE_CHART](state, { grapheChart }) {
    state.grapheChart = grapheChart
  },
}
