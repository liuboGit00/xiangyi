<template>
  <!-- <el-container> -->
    <el-header v-if="propobj.blankflag" class="header-nav">
      <div class="headimg">
        <div class="headphoto">
            <img :src="photos" alt="头像">
            <div class="statuscolor" :style="showcolorstyle"></div>
        </div>
        <span class="name">{{propobj.userinfo.userName}}</span>
        <!-- <span :class="[statusflag?'el-icon-arrow-down':'el-icon-arrow-up']" @click="userstatuschange"></span>
        <div v-show="statusflag" class="userstatus" ref="userstatus">
          <ul>
            <li @click="statuschange" class="online"><span :style="online"></span>在线</li>
            <li @click="statuschange" class="onleave"><span :style="onleave"></span>离开</li>
            <li @click="statuschange" class="onbusy"><span :style="onbusy"></span>忙碌</li>
            <li @click="statuschange" class="onhidden"><span :style="onhidden"></span>隐身</li>
          </ul>
        </div> -->
      </div>
      <!-- <el-dropdown> -->
        <!-- <i class="el-icon-bell"></i> -->
        <!-- <el-dropdown-menu slot="dropdown"> -->
          <!-- <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item> -->
        <!-- </el-dropdown-menu> -->
      <!-- </el-dropdown> -->
      <!-- <i class="el-icon-setting"></i> -->
      <!-- <span class="el-icon-setting"></span> -->
    </el-header>
  <!-- </el-container> -->
</template>
<script>
export default {
  props: ["propobj"],
  data() {
    return {
      statusflag: false,
      baesimgurl:
        "http://uc.weilian.cn/file-service/file-api.download?useOld=false&domain=user&type=photo&fileName=",
      online: { backgroundColor: "#4dff4d" },
      onleave: { backgroundColor: "#fcb316" },
      onbusy: { backgroundColor: "#bc2031" },
      onhidden: { backgroundColor: "#686868" },
      showcolorstyle: ""
    };
  },
  computed: {
    photos: function() {
      return this.baesimgurl + sessionStorage.getItem("photo");
    }
  },
  methods: {
    // userstatuschange() {   //暂时不需要在线状态
    //   this.statusflag = !this.statusflag;
    //   if (this.statusflag) {
    //     this.$refs.userstatus.style.height = $(".leftaside").height() + "px";
    //   }
    // },
    statuschange(el) {
      this.showcolorstyle = {
        backgroundColor: el.target.children[0].style.backgroundColor
      };
      this.statusflag = !this.statusflag;
    }
  }
};
</script>
<style scoped lang='less'>
.header-nav {
  text-align: right;
  font-size: 12px;
  .headimg {
    float: left;
    height: 100%;
    width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #3a4051;
    position: relative;
    .headphoto {
      width: 59px;
      height: 59px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #fff;
        overflow: hidden;
        display: inline-block;
      }
      .statuscolor {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
      }
    }
    span {
      font-size: 18px;
      color: #fff;
    }
    .name {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-align: left;
    }
    span[class*="el-icon-arrow"] {
      font-size: 22px;
      cursor: pointer;
    }
    .userstatus {
      width: 100%;
      position: absolute;
      top: 80px;
      left: 0;
      z-index: 1;
      background-color: #3a3f50;
      display: flex;
      ul {
        width: 100%;
        height: 100%;
        li {
          color: #ffffff;
          display: flex;
          flex-direction: start;
          padding-left: 10%;
          line-height: 50px;
          cursor: pointer;
          align-items: center;
          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
          }
        }
        li:hover {
          background-color: #4c65a4;
        }
      }
    }
  }
  .el-dropdown {
    width: 22px;
  }
  .el-icon-bell,
  .el-icon-setting {
    font-size: 22px;
    color: #fff;
    margin-right: 40px;
    margin-left: 2%;
  }
}
</style>
