<template>
    <div>
        <p class="catalog">
            <span class="left"></span>
            <span class="center"><span>{{userInfo.title}}</span><i class="solid"></i></span>
            <span class="right" v-show="userInfo.edit" @click="redact(userInfo.index,userInfo.storeId)"><i class="el-icon-edit"></i>编辑</span>
        </p>
        <div class="contantInfo" v-if="userInfo.type == 'text'" v-html="userInfo.contant"></div>
        <div class="contantInfo" v-else >
            <p class="tabelTitle">{{userInfo.contant}}</p>
            <div class="tabel">
                <p>使用报告</p>
                <ul>
                    <li v-for="(item,index) in 8" :key="index">报告名</li>
                </ul>
            </div>
            <div class="tabel">
                <p>使用报表</p>
                <ul>
                    <li v-for="(item,index) in 8" :key="index">报告名</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:["userInfo"],
  data() {
    return {

    }
  },
  computed:{
      
  },
  components: {
      
  },
  methods:{
    redact(index,id){
        this.$router.push({
            path:'/edit',
            query: { 
                storeId : id,
                index : index
            }
        })
    }
  }
}
</script>

<style scoped lang="less">
    .catalog{
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
            width: 980px;
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
    .contantInfo{
        padding: 0 78px 58px 50px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        color: #999999;
        .tabelTitle{
            margin-bottom: 22px;
        }
        .tabel{
            display:inline-block;
            width: 200px;
            height: 210px;
            box-shadow: 0px 8px 11px 1px rgba(218, 218, 218, 0.22);
            border-radius: 4px;
            border: solid 1px #278df6;
            margin-right: 50px;
            p{
                height: 36px;
                width: 100%;
                line-height: 36px;
                background: #278df6;
                text-align: center;
                color: #fff;
            }
            ul{
                padding: 0 14px;
                height: 156px;
                overflow: auto;
                li{
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #278df6;
                    list-style: none;
                    font-size: 16px;
                    letter-spacing: 0px;
                    color: #999999;
                    text-align: center;
                }
            }
        }
    }
    
</style>
