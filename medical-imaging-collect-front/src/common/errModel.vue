<template>
  <div class="model del" ref="model">
    <!-- 错误 -->
    <div class="sendBack" ref="sendBack1">
        <i class="el-icon-close" @click="close"></i>
        <img src="../assets/img/感叹号.png" alt="" class="img">
        <div class="sendBackContant">
            <p class="sendBackTitle">退回原因</p>
            <p>{{type.label}}</p>
        </div>
        <button @click="ok">确认</button>
    </div>
    <!-- 退回 -->
    <div class="sendBack" ref="sendBack2">
        <i class="el-icon-close" @click="close"></i>
        <div class="sendBackCause">
            <p>退回原因</p>
            <textarea name="sendVal" id="" v-model="sendVal" maxlength="100" autofocus></textarea>
            <span>不能超过100字</span>
        </div>
        <button @click="ok">确认</button>
    </div>
    <!-- 查看 -->
    <div class="sendBack one" ref="sendBack3">
        <i class="el-icon-close" @click="close"></i>
        <div class="sendBackView">
           <ul>
               <li v-for="(item,index) in items" :key="index">
                  <template v-if="item.status != 3 && item.status != 7 && item.status != 5">
                    <span class="leftImg"><img src="../assets/img/空心圆.png" alt=""></span>
                    <div>
                        <p>{{item.examineTime}}</p>
                        <p>{{item.label}}：{{item.oprUserName}} <span>已上传</span></p>
                    </div>
                  </template>
                  <template v-else>
                      <span class="leftImg"><img src="../assets/img/空心圆.png" alt=""></span>
                      <div class="err">
                        <p>{{item.examineTime}}</p>
                        <p>{{item.label}}：{{item.oprUserName}}<span>退回</span></p>
                        <p>退回原因：{{item.examineData}}</p>
                      </div>
                  </template>
               </li>
               <p class="storing"></p>
           </ul>
        </div>
    </div>
    <!-- 删除视频 -->
    <div class="sendBack four" ref="sendBack4">
        <i class="el-icon-close" @click="close"></i>
        <img src="../assets/img/感叹号.png" alt="" class="img">
        <div class="sendBackContant">
            <p class="sendBackTitle">是否删除该视频?</p>
            
        </div>
        <button @click="ok">确认</button>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/axios'
export default {
    props:["type"],
    data() {
        return {
            nowrap:true,
            sendVal:'',
            showType: '',
            items:[]
        };
  },
  methods:{
      close(){
          this.clear()
      },
      ok(){
          let _this = this
          if(this.showType.type == '1'){
              _this.clear()
          }else if(this.showType.type == '2'){
                if(this.sendVal.length == 0){
                    _this.$message({
                        message: '退回内容为空',
                        type: 'warning'
                    });
                    return
                }
               let data = [{
                "medicalId":this.showType.label,
                "status":this.showType.id,
                "examineData":this.sendVal,
                "commitFlag":2
                }]
                this.axios.post("/medical-imaging-collect/medical-info-examine-approve",data).then(function(res){
                    if(res.data.infoCode == '0'){
                        _this.$message({
                            message: res.data.info,
                            type: 'success'
                        });
                        _this.clear()
                        _this.$emit('load','ok')
                    }else{
                        if(res.data.infoCode == '0'){
                            _this.$message({
                                message: res.data.info,
                                type: 'warning'
                            });
                        }
                    }
                })    
          }else if(this.showType.type == '3'){
              _this.clear()
          }else if(this.showType.type == '4'){
              console.log(this.showType.label)
              this.$emit('delvideo',this.showType.label)
              _this.clear()
              
          }
      },
      sendBack(){
          this.$refs.model.style.display = "block"
          if(this.showType.type == '1'){
              this.$refs.sendBack1.style.display = "block"
          }else if(this.showType.type == '2'){
              this.$refs.sendBack2.style.display = "block"
          }else if(this.showType.type == '3'){
              this.items = this.showType.label
              for(let i of this.items){
                  let name = ''
                  if(i.status == '2'){
                      name = '医生'
                  }else if(i.status == '4' || i.status == '3'){
                      name = '编辑员'
                  }else if(i.status == '6' || i.status == '5'){
                      name = '课题组长'
                  }else if(i.status == '8' || i.status == '7'){
                      name = '复审员'
                  }else if(i.status == '10'){
                      name = '管理员'
                  }
                 i['label'] = name
              }
              console.log(this.items)
              this.$refs.sendBack3.style.display = "block"
          }else if(this.showType.type == '4'){
              this.$refs.sendBack4.style.display = "block"
          }
      },
      clear(){
        this.$refs.model.style.display = "none"
        this.$refs.sendBack1.style.display = "none"
        this.$refs.sendBack2.style.display = "none"
        this.$refs.sendBack3.style.display = "none"
        this.showType = ''
        this.sendVal = ''
      }
  },
  watch:{
      type(){
          this.showType = this.type
          if(this.showType != ''){
              this.sendBack()
          }
      }
  },
  computed:{
      
  }
};
</script>
<style lang="less" scoped>
    .model{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.4);
        display: none;
        .sendBack{
            width:320px;
            min-height: 320px;
            background: #fff;
            border-radius: 4px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            display: none;
            i{
                font-size: 24px;
                color: #8a8a8a;
                position: absolute;
                right: 15px;
                top: 15px;
                cursor: pointer;
            }
            .img{
                width: 75px;
                position: absolute;
                left: 50%;
                top: 40px;
                transform: translateX(-50%);
            }
            .sendBackContant{
                width: 240px;
                margin: 150px auto 0;
                font-size: 14px;
                text-align: left;
                line-height: 20px;
                color: #8a8a8a;
                p:first-child{
                    font-size: 16px;
                    color: #fb805a;
                    margin-bottom: 15px;
                    text-align: center;
                }
            }
            .sendBackCause{
                width: 270px;
                margin: 45px auto 0;
                position: relative;
                p{
                    margin-left: 5px;
                    text-align: left;
                    font-size: 14px;
                    color: #999999;
                    margin-bottom: 10px;
                }
                textarea{
                    width: 100%;
                    height: 150px;
                    border-radius: 4px;
                    border: solid 1px #97a2be;
                    padding: 10px;
                    font-size: 14px;
                }
                span{
                    position:absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 12px;
                    color: #d8d8d8;
                }
            }
            .sendBackView{
                ul{
                    margin-top: 60px;
                    margin-left: 60px;
                    padding-bottom: 15px;
                    position: relative;
                    .storing{
                        width: 2px;
                        height: 100%;
                        background-color: #e4e4e4;
                        position: absolute;
                        top: -20px;
                        left: -30px;
                        padding: 40px 0 20px;
                    }
                    li{
                        position: relative;
                        margin-bottom: 20px;
                        .leftImg{
                            width: 18px;
                            height: 18px;
                            position: absolute;
                            left: -38px;
                            top: 10px;
                            background: #fff;
                            z-index: 666;
                            img{
                                width: 100%;
                                float: left;
                            }
                        }
                        div{
                            width: 370px;
                            min-height: 60px;
                            padding: 10px 14px;
                            background-color: #eceef4;
                            border-radius: 4px;
                            p{
                              	font-size: 14px;
                                color: #999999;  
                                text-align: left;
                                line-height: 20px;
                                span{
                                    margin-left: 50px;
                                }
                            }
                        }
                        .err{
                            span{
                                margin-left: 10px;
                                color: #249fda;
                                font-size: 12px;
                            }
                            
                        }
                    }
                }
            }
            button{
                width: 90px;
                height: 30px;
                background-color: #0190d4;
                border-radius: 15px;
                border: none;
                color: #fff;
                margin-top: 35px;
                cursor: pointer;
            }
        
        
        }
        .one{
            width: 450px;
            max-height: 530px;
            min-height: 320px;
            overflow-y: auto;
        }
        .four{
            width: 310px;
            min-height: 260px;
            .sendBackTitle{
                margin-bottom: 0 !important;
            }
        }
    }
</style>
