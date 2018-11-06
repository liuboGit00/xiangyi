<template>
  <div class="container">
    <Header class="header" :propobj="propobj"/>
    <div class='container-home'>
      <Left class="aside" :blankflag="blankflag" />
        <router-view v-on:blank-parent="blankParent" />
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
    if(window.location.href.indexOf("sessionId") != -1){
      sessionStorage.setItem("testUserSessions", window.location.href.split("sessionId=")[1]);
    }
    self.sessionId = sessionStorage.getItem("testUserSessions");
    if (self.sessionId) {
      this.axios
        .get("/users/"+self.sessionId)
        .then(response => {
           this.tool.close();   //遮罩层消失
          if (response.data.status == "SUCCESS") {
            // 用户信息
            var user = response.data.data;
            self.propobj.userinfo = user;
            sessionStorage.setItem("photo", response.data.data.photo);
          } else {
            this.$message({
              message: response.data.info,
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          this.tool.close();    //遮罩层消失
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
    blankParent(message) {
      this.blankflag = false;
      this.propobj.blankflag = false;
      this.propobj.userinfo = false;
    }
  }
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
    height: 100%;
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
.loading {
  // background-color: #e9eef3;
  // color: #333;
  // box-sizing: border-box;
  // flex: 1;
  // flex-basis: auto;
  // padding: 30px 40px; //页面内容区域是padding：30px 40px
  // overflow: auto;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
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


