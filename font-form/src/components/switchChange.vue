<template>
  <div class="">
      <div class="switch" :style="switchstyle" @click="switchChange">
        <div class="switch-left" :class="{ active: isActive }">{{switchOpt.leftName}}</div>
        <div class="switch-right" :class="{ active: !isActive }">{{switchOpt.rightName}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["switchOpt"],
  data() {
    return {
      isActive: "true",
      switchstyle: {
        width: this.switchOpt.width
      }
    };
  },
  components: {},
  methods: {
    switchChange() {
      this.isActive = !this.isActive;
      let message = this.isActive
        ? this.switchOpt.leftName
        : this.switchOpt.rightName;
      this.$emit("switch-change", message);
    }
  }
};
</script>

<style scoped lang="less">
.switch {
  width: 100px;
  height: 30px;
  background-color: #ddd;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  .switch-left {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 30px;
    min-width: 50%;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .switch-right {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 30px;
    min-width: 50%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #999;
  }
  .active {
    background-color: #278df6;
    color: #fff;
  }
}
</style>
