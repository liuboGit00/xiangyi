<template>
    <div class='main'  v-cloak @scroll="scroll">
        <div style="margin: 0 auto;width: 1126px;">
           <div class='container'>
            <!-- <div class='alibb'> 
               <div class='titlename'>
                   <h3>阿里巴巴</h3>
                   <span>(多义词,请在下列义项上选择浏览（共13个义项）)</span>
               </div>
               <div class='namelist' :style="widthChange">
                   <ul>
                       <li>
                           <img :src="lan" alt="">
                           <span>{{ tagName }}</span>
                       </li>
                   </ul>
                   <p @click='onAll'>{{ showAll }}<span class='el-icon-arrow-right'></span></p>
               </div>
            </div> -->
            <div class='business'>
                <div class='titlename'>
                   <p class="title">{{ tagNameTab }}  <span class='typeName'>{{typeName}}</span></p>
               </div>
               <div class='income'>
                   <div class='operating' v-for="(item,index) in items" :key="index" :userInfo="item" v-if='index != 3'>
                        <p class='in-title'>
                            <span class="left"></span>
                            <span class="center"><span>{{item.title}}</span><i class="solid"></i></span>
                        </p>
                        <div class='textarea'>
                            <div v-html="item.contant" style="word-wrap: break-word;"></div>
                        </div>
                   </div>
                   <div class='operating1' v-else>
                         <p class='in-title'>
                            <span class="left"></span>
                            <span class="center"><span>{{item.title}}</span><i class="solid"></i></span>
                        </p>
                        <div class='textarea'>
                            <p>营业收入，被88个报告和88张报表所使用</p>
                            <div class='use'>
                                <div class='uselist'> 
                                    <div class='use-text'>
                                        <span>
                                            使用报告
                                        </span>
                                    </div>
                                    <div class='use-report'>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                    </div>
                                </div>
                                <div class='uselist'> 
                                    <div class='use-text'>
                                        <span>
                                            使用报表
                                        </span>
                                    </div>
                                    <div class='use-report'>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                        <span>XXX报告名</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
               <div class="baclTop" @click="backTop" v-show="backTopType">
                 <i class="el-icon-arrow-up"></i>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from '../../axios/axios.js';
export default {
    data(){
        return{
            items:[{
                title:"字段定义",
                edit:true,
                type:'text',
                contant:""
            },{
                title:"数据来源",
                edit:true,
                type:'text',
                contant:""
            },{
                title:"相关业务",
                edit:true,
                type:'text',
                contant:""
            },{
                title:"使用数据",
                edit:false,
                type:'tabel',
                contant:"",

            }
            ],
             redcoll:'color: #999999',
             redcollec: false,
             resData: null,
             tagName: '',
             typeName: '',
             storeId: '',
             lan:require('../../assets/img/lan.png'),
             bian:require('../../assets/img/bian.png'),
             shou:require('../../assets/img/shou.png'),
             widthChange:'height:128px',
             showAll: '展开全部',
             zicolor1: 'color: #666666',
             zicolor2: 'color: #666666',
             zicolor3: 'color: #666666',
             disableds1: true,   
             disableds2: true,   
             disableds3: true,   
             personId: '',
             backTopType: false,
             tagNameTab: '',
        }
    },
    mounted(){
        // <p data-v-46090f24="" class="catalog"><span data-v-46090f24="" class="left"></span> <span data-v-46090f24="" class="center"><span data-v-46090f24=""><em data-v-46090f24="" contenteditable="true" class="firstTitle">888888题</em></span> <i data-v-46090f24="" class="solid"></i></span> <span data-v-46090f24="" class="right" style="display: none;"><i data-v-46090f24="" class="el-icon-edit"></i>编辑</span></p> <div data-v-46090f24="" class="contantInfo"><script data-v-46090f24="" id="contant5" name="content" type="text/plain">/script> <div data-v-46090f24="" class="saveContant"></div></div>累死我了<p data-v-46090f24="" class="catalog"><span data-v-46090f24="" class="left"></span> <span data-v-46090f24="" class="center"><span data-v-46090f24=""><em data-v-46090f24="" contenteditable="true" class="firstTitle">自定义标题</em></span> <i data-v-46090f24="" class="solid"></i></span> <span data-v-46090f24="" class="right" style="display: none;"><i data-v-46090f24="" class="el-icon-edit"></i>编辑</span></p> <div data-v-46090f24="" class="contantInfo"> <div data-v-46090f24="" class="saveContant" style="display: none;"></div></div>累死我了"
        this.resData = this.$route.query;
        this.tagNameTab = this.$route.query.tagName
        if(this.resData.one == 1){   //通过路由传过来的参数 来显示收藏按钮
            this.redcollec = false
        }else {
            this.redcollec =true
        }
        this.items[0].contant = this.resData.resData.info
        this.items[0].title = this.$route.query.tagName
        this.items[1].contant = this.resData.resData.source
        this.items[2].contant = this.resData.resData.business
        // console.log(this.resData.resData.other)
        let newData = this.resData.resData.other
                let otherData = newData.split("累死我了")
                for(let i in otherData){
                    if(i != (parseInt(otherData.length) -1)  ){
                        var d = document.createElement("div")
                        d.innerHTML = otherData[i]
                        this.items.push({
                            title:$(d).find(".firstTitle").html(),
                            edit:true,
                            type:'text',
                            contant:$(d).find(".saveContant").html()
                        })
                    }
                }

        this.tagName = this.resData.resData.tagName //阿里巴巴
        this.storeId = this.resData.resData.storeId //阿里巴巴
        this.typeName = this.resData.resData.typeName //类型名称
        this.personId  = this.resData.resData.personId   //相关业务
    },
    methods:{
         //检测页面滚动
        scroll(){
            if(document.getElementsByClassName("main")[0].scrollTop > 0) {
                this.backTopType = true
            }else{
                this.backTopType = false
            }
        },
       //回到顶部
        backTop(){
            document.getElementsByClassName("main")[0].scrollTop = 0
            this.backTopType = false
        },
        onAll(){
            if(this.showAll == '展开全部'){
                 this.widthChange='height:100%'    
                 this.showAll = '收起'                             
            } else if(this.showAll == '收起'){
                 this.widthChange='height:128px'   
                 this.showAll = '展开全部'                       
            }
        },
        editor1(index){
            console.log(index+1)
            this.zicolor1 = 'color: #278df6';
            // this.disableds1 = false
            this.$router.push({
                path:'/edit',
                query: { 
                    personId : this.personId,
                    index : index+1
                }
            })
        },
        editor2(){
            this.zicolor2 = 'color: #278df6';
            // this.disableds2 = false
            this.$router.push({
                path:'/edit',
                query: { 
                    personId : this.personId,
                    index : 2
                }
            })
        },
        editor3(){
            this.zicolor3 = 'color: #278df6';
            // this.disableds3 = false
            this.$router.push({
                path:'/edit',
                query: { 
                    personId : this.personId,
                    index : 3
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .main{
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f4f6f9;
    }
    .container{
        width: 1126px;
        margin: 33px 40px 20px 40px;
        .alibb{
            width: 1046px;
            background-color: #ffffff;
            box-shadow: 0px 2px 12px 0px 
                rgba(58, 63, 80, 0.11);
            border-radius: 10px;
            .titlename{
                height: 66px;
                display: flex;
                line-height: 66px;
                color: #606060;
                border-bottom: 1px solid #d1d1d1;
                h3{
                    padding-left: 34px;
                    font-size: 24px;
                }
                span{
                    padding-left: 17px;
                    font-size: 16px;
                    color: #999999;
                }
            }
            .namelist{
                position: relative;
                overflow: hidden;
                width: 100%;
                ul {
                    padding: 30px 45px 25px 0px;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                    //    width: 125px;
                       list-style: none;
                       padding-left: 45px;
                       padding-bottom: 15px;
                       color: #999999;
                       font-size: 16px;
                       span{
                           padding-left: 7px;
                       }
                    }
                }
                p{
                    position: absolute;
                    right: 20px;
                    bottom: 10px;
                    color: #278df6;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
        }
        .business{
            margin-top: 30px;
            width: 1046px;
            background-color: #ffffff;
            box-shadow: 0px 2px 12px 0px 
                rgba(58, 63, 80, 0.11);
            border-radius: 10px;
            .titlename{
                height: 100px;
                display: flex;
                line-height: 100px;
                color: #606060;
                border-bottom: 1px dashed #d1d1d1;
                .title{
                    font-family: PingFangSC-Medium;
                    font-size: 30px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #606060;
                    padding-left: 50px;
                    padding-bottom: 26px;
                    span:nth-child(2),span:nth-child(3){
                        display: inline-block;
                        width: 56px;
                        height: 26px;
                        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
                        border-radius: 4px;
                        border: solid 1px #278df6;
                        font-size: 14px;
                        color: #999;
                        line-height: 24px;
                        text-align: center;
                        cursor: pointer;
                        vertical-align: middle;
                    }
                    span:nth-child(2):hover,span:nth-child(3):hover{
                        color: #ffffff;
                        background: #278df6;
                    }
                    span:nth-child(3){
                        margin-left: 10px;
                    }
                    .typeName{
                        font-size: 22px;
                        color:#278df6;
                        margin: 0 20px 0 10px;
                    }
                }
            }
            .income{
                width: 1046px;
                .operating{
                    .in-title{
                        width: 100%;
                        margin-top: 40px;
                        height: 24px;
                        line-height: 24px;
                        margin-bottom: 35px;
                        span{
                            float: left;
                        }
                        .left{
                            width: 10px;
                            height: 24px;
                            background-color: #278df6;
                        }
                        .center{
                            width: 900px;
                            font-size: 24px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #666666;
                            margin-left: 40px;
                            position: relative;
                            span{
                            position: absolute;
                            left: 0;
                            z-index: 100;
                            padding-right: 20px;
                            background: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-width: 424px;
                            white-space: nowrap;
                            }
                            .solid{
                                display: inline-block;
                                width: 98%;
                                height: 1px;
                                border-top: 1px solid #d1d1d1;
                                vertical-align: middle;
                            }
                        }
                        .right{
                            font-size: 18px;
                            margin-right: 20px;
                            color: #999999;
                            cursor: pointer;
                            i{
                                margin-right: 10px; 
                            }
                        }
                        .right:hover{
                            color: #278df6;
                        }
                    }
                    .textarea{
                        width: 100%;
                        // height: 161px;
                        padding: 35px 77px 58px 49px;
                        color: #999999;
                        font-size: 20px;
                        textarea{
                            background: none !important;
                            border: none;
                        }
                    }
                }
                .operating1{
                    .in-title{
                        width: 100%;
                        margin-top: 40px;
                        height: 24px;
                        line-height: 24px;
                        margin-bottom: 35px;
                        span{
                            float: left;
                        }
                        .left{
                            width: 10px;
                            height: 24px;
                            background-color: #278df6;
                        }
                        .center{
                            width: 900px;
                            font-size: 24px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #666666;
                            margin-left: 40px;
                            position: relative;
                            span{
                            position: absolute;
                            left: 0;
                            z-index: 100;
                            padding-right: 20px;
                            background: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-width: 424px;
                            white-space: nowrap;
                            }
                            .solid{
                                display: inline-block;
                                width: 98%;
                                height: 1px;
                                border-top: 1px solid #d1d1d1;
                                vertical-align: middle;
                            }
                        }
                    }
                    .textarea{
                        width: 100%;
                        // height: 161px;
                        padding: 35px 77px 58px 49px;
                        color: #999999;
                        font-size: 20px;
                        textarea{
                            background: none !important;
                            border: none;
                        }
                        .use{
                            width: 100%;
                            display: flex;
                            .uselist{
                                width: 200px;
                                height: 213px;
                                margin-top: 22px;
                                .use-text{
                                    background: #278df6;
                                    height: 36px;
                                    text-align: center;
                                    span{
                                        line-height: 36px;
                                        color: #ffffff;
                                        font-size: 18px;
                                    }
                                }
                                .use-report{
                                    height: 175px;
                                    width: 100%;
                                    overflow: hidden;
                                    overflow-y: auto;
                                    span{
                                        line-height: 34px;
                                        border-bottom: 1px solid #278df6;
                                        margin: 0px 10px 0px 10px;
                                        display: block;
                                        text-align: center;
                                        font-size: 16px;
                                    }
                                }
                            }
                            .uselist:last-child{
                                margin-left: 50px;
                            }
                        }
                    }
                }
            }
            .baclTop{
                width: 58px;
                height: 58px;
                text-align: center;
                background-color: #d5d5d5;
                border-radius: 2px;
                position: fixed;
                bottom: 88px;
                right: 173px;
                i{
                    margin-top: 9px;
                    font-size: 40px;
                    color: #fff;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
</style>


