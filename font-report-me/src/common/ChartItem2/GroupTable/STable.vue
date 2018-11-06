<template>
  <div class="right" :style="{height:'100%'}"> 
    <div class="right-cont" v-for="(item,index) in tableData" :key="index" :style="{height:'100%'}">
      <div class="left" :class="{oddLine:index%2===0,evenLine:index%2===1}" v-if="item.name" :style="{width:rowWidth+'px'}" :title="item.name">
        <span>{{item.name}}</span>
      </div>
      <div class="right-item" :class="{oddLine:index%2===0,evenLine:index%2===1}" v-if="item.content" v-for="(value,indexI) in item.content" :key="indexI" :style="{minHeight:height + 'px',width:rowWidth+'px'}" :title='value'>
        {{value}}
      </div>
      <!-- if !item.content,调自己 -->
      <s-table :tableData='item.list' :rowWidth='rowWidth'></s-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "STable",
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rowWidth: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  // props: ['tableData', 'rowWidth'],
  data() {
    return {
      height: 30
    };
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.div {
  color: #838383;
}
.left {
  // width: 100px;
  // vertical-align: middle;
  // height: 30px;
  display: flex;
  border: 0.5px solid #fff;
  color: #838383;
  justify-content: center;
  align-items: center;
}
// .right {
//   height: 100%;
// }
.oddLine {
  background-color: #c2dffc;
}
.evenLine {
  background-color: #c2dffc;
}
.right-cont {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
  color: #838383;
}
.right-item {
  // width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #fff;
}
.right {
}
</style>



