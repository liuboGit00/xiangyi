<template>
    <div class = 'toView'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div class = 'main'>
            <div class = 'left'>
                <div class= 'left-Img'>
                    <img :src="logoUrl" alt="">
                </div>
                <div class = 'left-text'>
                    <div class = 'text-1'>
                        <p>检查医院 : <span>{{items.hospitalName}}</span></p>
                        <p>检查医师 : <span>{{items.doctorName}}</span></p>
                        <p>临床诊断 : <span>{{items.diagnosticClassificationName}}</span></p>
                    </div>
                    <div class = 'text-2'>
                        <p>住院号 : <span>{{items.hospitalNo}}</span></p>
                        <p>患者姓名 : <span>{{items.patientName}}</span></p>
                        <p>性别 : <span>{{items.patientSex == '0' ? '女' : '男'}}</span></p>
                        <p>年龄 : <span>{{items.patientBirthDate}}</span></p>
                        <p>联系方式 : <span>{{items.patientPhone}}</span></p>
                    </div>
                    <div class = 'text-3'>
                        <p>检查部位 : <span>{{items.organName}}</span></p>
                        <p>学科编码 : <span>{{items.subjectClassificationCode}}</span></p>
                        <p>国际疾病分类 : <span>{{items.pathologyName}}</span></p>
                        <p>仪器设备 : <span>{{items.equipmentName}}</span></p>
                        <p>仪器类型 : <span>{{items.equipmentType}}</span></p>
                        <p>仪器厂家 : <span>{{items.equipmentManufacturer}}</span></p>
                        <p>录入日期 : <span>{{items.entryTime}}</span></p>
                    </div>
                </div>
            </div>
            <div class="right">
               <div class = 'right-top'>
                   <p>报告医生 : <span>{{items.doctorName}}</span></p>
                   <p>报告日期 : <span>{{items.entryTime}}</span></p>
               </div>
               <div class="right-msg">
                   <div class = 'msg-1'>
                        <p>
                            <span>姓名 : <em>{{items.patientName}}</em></span>
                            <span class= 'ms'>性别 : <em>{{items.patientSex == '0' ? '女' : '男'}}</em></span>
                            <span class= 'ms'>年龄 : <em>{{items.patientBirthDate}}</em></span>
                            <span class= 'ms'>住院号 : <em>{{items.hospitalNo}}</em></span>
                        </p>
                        <p>
                            <span>学科编码 : <em>{{items.subjectClassificationCode}}</em></span>
                            <span class= 'ms'>检查医师 : <em>{{items.doctorName}}</em></span>
                        </p>
                   </div>
                   <div class = 'msg-2'>
                       <p>
                            <span>检查部位 : <em>{{items.organName}}</em></span>
                            <span class= 'ml'>仪器设备 : <em>{{items.equipmentName}}</em></span>
                        </p>
                        <h3>描述 : </h3>
                        <div class = 'msg-img'>
                            <ul>
                                <li v-for="(item,index) in imgUrl" :key="index">
                                    <img :src="item.url" alt="" :key="index" v-if="item.type == 'image'" @dblclick="imgBox(item.url)">
                                    <video :src="item.url" controls="controls" height="130px" width="200px" preload="metadata" v-else>
                                        Your browser does not support the video tag.
                                    </video>
                                </li>
                                <li v-if="items.isInterested == 1">
                                     
                                </li>
                            </ul>
                        </div>
                        <p class = 'msg-top'>
                           {{items.reportRemark}}
                        </p>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from '../axios/axios'
  import logo_1 from '../assets/img/logo_1.jpg'
  import logo_2 from '../assets/img/logo_2.jpg'
  import logo_3 from '../assets/img/logo_3.jpg'
  import logo_4 from '../assets/img/logo_4.jpg'
  import logo_5 from '../assets/img/logo_5.jpg'
  import logo_6 from '../assets/img/logo_6.jpg'
  import logo_7 from '../assets/img/logo_7.jpg'
  import logo_8 from '../assets/img/logo_8.jpg'
export default {
    data(){
        return{
            imgUrl : [],
            items:{},
            // videoUrl:encodeURI("../"),
            logoList:[{
                url:logo_1
            },{
                url:logo_2
            },{
                url:logo_3
            },{
                url:logo_4
            },{
                url:logo_5
            },{
                url:logo_6
            },{
                url:logo_7
            },{
                url:logo_8
            }],
            logoUrl:''
        }
    },
    created(){
        let _this = this
        axios.get('/medical-imaging-collect/MedicalInfo?medicalId='+this.$route.query.medicalId).then(function(res){
            _this.items = res.data.data
            if(res.data.data.imageUrls.indexOf("&") == -1){
                if(res.data.data.imageUrls.indexOf("mp4") != -1){
                    _this.imgUrl.push({
                        url:res.data.data.imageUrls,
                        type:"video"
                    })
                }else{
                    _this.imgUrl.push({
                        url:res.data.data.imageUrls,
                        type:"image"
                    })
                }
                 
            }else{
                for(let i of res.data.data.imageUrls.split("&")){
                    if(i.indexOf("mp4") != -1){
                         _this.imgUrl.push({
                            url:i,
                            type:"video"
                        })
                    }else{
                         _this.imgUrl.push({
                            url:i,
                            type:"image"
                        })
                    }
                   
                }
            }
            
            _this.logoUrl = _this.logoList[_this.items.reportType - 1].url
            console.log(_this.imgUrl)
        })
    },
    components:{

    },
    methods:{
        playOn(){
            let vdo = document.getElementById('video')
            console.log(vdo)
            vdo.play();
        },
        // 删除图片
        del(num){
            console.log(num)
            this.imgUrl.splice(num,1)
        },
        imgBox(url){
            this.$emit("imgbolg",url)
        }
    }
}
</script>

<style lang='less' scoped>
    .toView{
        width: 100%;
        height: 100%;
        padding: 19px 20px 40px 26px;
        color: #777777;
        background: #f2f3f8;
        .el-breadcrumb{
            font-size: 18px;
            height: 40px;
            line-height: 20px;
            padding-bottom: 20px;
            color: #8a8a8a;
            span{
                color: #8a8a8a;
            }
        }
        // padding: 31px 0px 31px 0px;
        .main{
            width: 100%;
            height: 100%;
            display: flex;
            padding: 0px 0 31px 0px;
            .left{
                width: 24%;
                height: 100%;
                background: #ffffff;
                box-shadow: 0px 2px 6px 0px #888888;
                overflow: hidden;
                .left-Img{
                    width: 100%;
                    height: 140px;
                    img{
                        width: 100%;
                         height: 100%;
                    }
                }
                .left-text{
                    width: 100%;
                    height: 100%;
                    padding: 0px 25px 0px 25px;
                    p{
                        line-height: 22px;
                    }
                    .text-1{
                        border-bottom: 1px solid #8a8a8a;
                        padding-top: 16px;
                        padding-bottom: 16px;
                        font-size: 14px;
                        
                    }
                    .text-2{
                        border-bottom: 1px solid #8a8a8a;
                        padding-top: 16px;
                        padding-bottom: 16px;
                        font-size: 14px;
                    }
                    .text-3{
                        // border-bottom: 1px solid #000;
                        padding-top: 16px;
                        font-size: 14px;
                        // padding-bottom: 16px;
                    }
                }
            }
            .right{
                width: 72%;
                height: 100%;
                margin-left: 33px;
                background: #f2f3f8;
                box-shadow: 0px 2px 6px 0px #888888;
                background: #ffffff;
                overflow: hidden;
                .right-top{
                    width: 100%;
                    height: 48px;
                    background: #eee;
                    display: flex;
                    font-size: 14px;
                    p{
                        flex: 1;
                        line-height: 48px;
                        text-align: right;
                        padding-right: 30px;
                    }
                    p:first-child{
                        text-align: left;
                        padding: 0 0 0 20px;;
                    }
                }
                .right-msg{
                    width: 100%;
                    height: 100%;
                    overflow-y:auto; 
                    .msg-1{
                        padding: 0px 22px 0px 22px;
                        width: 100%;
                        height: 80px;
                        p{                                          
                            line-height: 35px;
                            font-size: 14px;
                            .ms{
                                padding-left: 60px;
                            }
                        }
                        p:last-child{
                            padding-bottom: 18px;
                             border-bottom: 1px solid #8a8a8a;  
                        }
                    }
                    .msg-2{
                        padding: 25px 22px 0px 22px;
                        width: 100%;
                        p{                                          
                            font-size: 14px;
                            .ml{
                                padding-left: 30px;
                            }
                        }
                        p:first-child{
                            line-height: 30px;
                        }
                        .msg-top{
                            min-height:200px;
                            margin-top: 15px;
                            line-height: 23px;
                        }
                        h3{
                            line-height: 40px;
                            font-size: 14px;
                        }
                        .msg-img{
                            width: 100%;
                            display: flex;
                            ul{
                                width: 100%;
                                overflow: hidden;
                                li{
                                    float: left;
                                    margin: 0 10px;
                                    position: relative;
                                    .el-icon-close{
                                        position: absolute;
                                        right: 0;
                                        top: 0;
                                        cursor: pointer;
                                        background:#ccc;
                                    }
                                }
                            }
                            img{
                                width: 200px;
                                height: 130px;
                            }
                            img:nth-child(2){
                                    margin-left: 20px;
                            }
                            img:nth-child(3){
                                    margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>