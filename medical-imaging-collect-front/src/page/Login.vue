<template>
    <div class="contarion">
      <p class="title">国家医学影像数据库  数据采集平台</p>
      <div class="content">
          <div class="login">
            <div class="input">
                <img src="../assets/img/login-user.png" alt="">
                <input v-model="user" placeholder="账号" type="text" :class=" {inputStyle: user != '' }">
            </div>
            <div class="input">
                <img src="../assets/img/login-pwd.png" alt="">
                <input v-model="pwd" placeholder="密码" type="password" :class=" {inputStyle: pwd != '' }">
            </div>
            <el-checkbox-group v-model="checkbox">
                <el-checkbox label="记住用户名和密码" name="1"></el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" class="btn" @click="login">登录</el-button>
          </div>
      </div>
      <p class="footer">桂ICP备17002994号©Copyright 2010-2017 象翌微链科技发展有限公司版权所有</p>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          checkbox: [],
          user: '',//用户名
          pwd: ''//密码,
        }
      },
      created(){
          if(localStorage.getItem("user")){
            this.user = localStorage.getItem("user")
            this.pwd = localStorage.getItem("pwd")
            this.checkbox[0] = '记住用户名和密码'
          }
      },
      methods:{
        //登录
        login(){
            let _this = this
            this.axios({
                method: 'post',
                url:'/medical-imaging-collect/user/login',
                params: {
                    userName:_this.user,
                    passWord:_this.pwd
                }
            }).then((res)=>{
                if(res.data.infoCode == '0') {
                    sessionStorage.setItem('leftList','')
                    if(_this.checkbox.length > 0){
                        localStorage.setItem("user",this.user)
                        localStorage.setItem("pwd",this.pwd)
                    }else{
                        localStorage.removeItem("user")
                        localStorage.removeItem("pwd")
                    }
                    sessionStorage.setItem('user',res.data.data.aliasName)
                    sessionStorage.setItem('img',res.data.data.photo)
                    _this.axios.get('/medical-imaging-collect/menu').then(function(res){
                        if(res.data.infoCode == '0'){
                            sessionStorage.setItem('leftList',JSON.stringify(res.data.data))
                            if(res.data.data[0].name == '样本创建'){
                                _this.$router.push({path:"/apparatus"})
                            }else if(res.data.data[0].name == '样本查询'){
                                _this.$router.push({path:"/patient-search"})
                            }else{
                                _this.$router.push({path:"/patient-upload"})
                            }
                        }
                    })
                }else{
                    _this.$message({
                        message: res.data.info,
                        type: 'warning'
                    });
                }
            })
        }
      }
    }
</script>

<style lang="less" scoped>
.contarion{
    width:100%;
    height: 100%;
    position: relative;
}
.title{
    position: absolute;
    top: 90px;
    left: 50px;
    z-index: 999;
    font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #1c94d1;
}
.content{
    width: 100%;
    height: 460px;
    background: url('../assets/img/login.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .login{
        width:370px;
        height:320px;
        background-color: #ffffff;
        box-shadow: 0px 8px 21px 2px #f0f0f0;
        border-radius: 1px;
        opacity: 0.9;
        position: absolute;
        right: 240px;
        top: 50%;
        transform: translateY(-50%);
        padding: 40px 40px 0 40px;
        .input{
            position: relative;
            height: 42px;
            line-height: 42px;
            margin-bottom: 30px;
            // border: solid 1px #e2e3e3;
            // border-radius: 2px;
            img{
                position: absolute;
                top: 50%;
                left: 15px;
                transform: translateY(-50%)
            }
            input{
                float: left;
                width: 100%;
                height: 40px;
                background-color: #f6fafb;
                border-radius: 2px;
                border: solid 1px #e2e3e3;
                padding-left: 46px;
            }
            .inputStyle{
                color: #000;
                background: rgba(255,252,153,0.5);
            }
        }
        div:last-child{
            margin-bottom: 0;
        }
        .btn{
            width: 100%;
            margin-top: 40px;
        }
    }
}
.footer{
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
}
</style>
