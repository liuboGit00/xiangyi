<template>
  <div class="container">
    <Header class="header" :propobj="propobj"/>
    <div class='container-home'>
      <Left class="aside" :blankflag="blankflag" />
      <div class = 'view'  v-loading ="loading2"
    element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.6)">
        <router-view v-on:blank-parent="blankParent" @typeShow='loadingType' />
      </div>
    </div>
  </div>
</template>
<script>
import Left from "../components/Left.vue";
import Header from "../components/Header.vue";
export default {
  created() {
    //用户信息获取
    let self = this;
    self.sessionId = sessionStorage.getItem("testUserSessions");
    if (self.sessionId) {
      // var sessionId = window.location.href.split("sessionId=")[1];
      this.axios
        .get("/users/" + self.sessionId)
        .then(response => {
          if (response.data.status == "SUCCESS") {
            // 用户信息
            var user = response.data.data;
            self.propobj.userinfo = user;
            // 设置用户sessionStorage
            // sessionStorage.setItem("testUserSession",JSON.stringify("user"));
          } else {
            this.$message({
              message: response.data.info,
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          this.$message({
            message: "请求接口出错：" + error,
            type: "warning"
          });
        });
    } else {
      // 没有sessionId从sessionStorage获取用户信息，请求数据接口
      // 从sessionStorage获取用户信息
      var userSession = sessionStorage.getItem("testUserSessions");
      if (userSession == null) {
        this.$message({
          message: "您目前处于未登录状态，请先登录",
          type: "warning"
        });
        this.$router.push({ path: "/login" });
      }
    }
  },
  data() {
    return {
      loading2: false,
      sessionId: "",
      propobj: {
        userinfo: "",
        blankflag: true
      },
      blankflag: true
    };
  },
  components: {
    Left,
    Header
  },
  methods: {
    loadingType(a) {
      this.loading2 = a;
    },
    blankParent(message) {
      this.blankflag = false;
      this.propobj.blankflag = false;
      this.propobj.userinfo = false;
    }
  },
  watch: {
    $route() {
      this.loading2 = true;
    }
  }
  //这里注意删除
  // mounted(){
  //   this.loading2=false;
  // }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100vh;
  .header {
    background-color: #4c65a4;
    color: #333;
    line-height: 80px;
    width: 100%;
    height: 80px !important;
    box-sizing: border-box;
    flex-shrink: 0;
    padding: 0;
    box-shadow: 0px 5px 5px rgba(41, 43, 47, 0.3);
    z-index: 1;
  }
  .container-home {
    display: flex;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    .aside {
      background-color: #3a3f50;
      color: #333;
      box-sizing: border-box;
      flex-shrink: 0;
      overflow: auto;
    }
    .view {
      background-color: #e9eef3;
      color: #333;
      box-sizing: border-box;
      flex: 1;
      flex-basis: auto;
      padding: 30px 40px; //页面内容区域是padding：30px 40px
      overflow: auto;
    }
  }
}
</style>
<style>
.leftpart ul.el-menu {
  background-color: #3a4051;
}
.el-submenu__title i {
  color: #fff;
}
</style>


