<template>
        <div class="container">
          <!-- <div class="content"> -->
              <h3 class="contentTitle">象翌微链科技发展有限公司</h3>
              <div class="contentBox">
                   <div class="img">
                      <img src="../../assets/img/login-page.png" alt="">
                   </div>
                   <div class="loginRight">
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-form-item>
                        <h3>用户登录</h3>
                      </el-form-item>
                      <el-form-item :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
                        <img src="../../assets/img/account-number.png" alt="">
                        <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item> 
                        <img src="../../assets/img/unlock.png" alt="">
                        <el-input type="password" v-model="form.password"  placeholder="请输入密码" @keyup.enter.native="onSubmit('form')"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                        <el-button @click="returnBtn">取消</el-button>
                      </el-form-item>
                    </el-form>
                   </div>
              </div>
              <div class="copyright">桂ICP备17002994号©Copyright 2010-2017 象翌微链科技发展有限公司版权所有</div>
          <!-- </div> -->
    </div>
</template>
<script>
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      var self = this;
      var names = /^[\u4e00-\u9fa5A-Za-z]{3,20}$/;
      var passwords = /^[a-zA-Z0-9]{6,18}$/;

      if (self.form.account == "" || self.form.account == undefined) {
        self.$message({
          message: "用户名输入不能为空",
          type: "warning"
        });
        return false;
      } else if (
        self.form.account != "" &&
        names.test(self.form.account) == false
      ) {
        self.$message({
          message: "用户名支持输入3-20个中文、字母",
          type: "warning"
        });
        return false;
      } else if (self.form.password == "" || self.form.password == undefined) {
        self.$message({
          message: "密码输入不能为空",
          type: "warning"
        });
        return false;
      } else if (
        self.form.password != "" &&
        passwords.test(self.form.password) == false
      ) {
        self.$message({
          message: "密码支持输入6-20个字母、数字、下划线",
          type: "warning"
        });
        return false;
      } else {
        server.login(self.form, function success(res) {
          if (res.data.infoCode == 0) {
            sessionStorage.setItem("photos", res.data.data.photo);
            sessionStorage.setItem("testUserSession", res.data.data.sessionId);
            self.$router.push({ path: "/reportwatch" });
          } else {
            self.$message({
              message: res.data.info,
              type: "warning"
            });
            return false;
          }
        });
      }
    },
    returnBtn() {
      this.form.account = "";
      this.form.password = "";
      return false;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  background: #229ed4 url(../../assets/img/login-bj.jpg) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .contentTitle {
    text-align: center;
    height: 33px;
    margin-bottom: 59px;
    font-size: 34px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .contentBox {
    margin-bottom: 82px;
    width: 68%;
    min-height: 442px;
    height: 442px;
    padding-left: 51px;
    background-color: #ffffff;
    box-shadow: 0px 8px 9px 0px rgba(145, 182, 255, 0.28);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      flex: 1;
    }
    .loginRight {
      width: 80%;
      padding-right: 84px;
      .el-form {
        float: right;
        width: 453px;
        min-width: 412px;
        margin-left: -100px;
        margin-top: 30px;
      }
      .el-form .el-form-item h3 {
        height: 30px;
        font-size: 32px;
        margin-bottom: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #278df6;
      }
      .el-form .el-form-item img {
        position: relative;
        top: 30px;
        z-index: 10;
        display: block;
        width: 19px;
        height: 21px;
        color: #4c65a4;
      }
      .el-form .el-form-item:nth-child(3) {
        margin-bottom: 40px;
      }
      .el-form .el-form-item .el-input__label {
        background-color: #4c65a4;
      }
      .el-form .el-form-item .el-input {
        font-size: 18px;
        color: black;
        ::placeholder {
          font-size: 18px;
        }
      }
      .el-form .el-form-item .el-button {
        width: 140px;
        height: 47px;
        background-color: #278df6;
        border-radius: 6px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        white-space: nowrap;
        & + .el-button {
          background-color: #c9d0e4;
        }
      }
    }
  }
  .copyright {
    text-align: center;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
</style>

<style>
.loginRight .el-form .el-form-item .el-input__inner {
  border: 0;
  border-radius: 0;
  text-indent: 16px;
  border-bottom: 1px solid #dcdfe6;
}
</style>
