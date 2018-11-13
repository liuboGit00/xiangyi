import {
  SEND_APPARATUS,
} from './mutation-types.js'

export default {
  [SEND_APPARATUS](state, {
    data
  }) {
    state.apparatus = data
  }
}
