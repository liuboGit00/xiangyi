<template>
    <div class="apparatus">
      <p></p>
      <ul>
        <li v-for="(item, index) in apparatus" :key="index" @click="handleStyle(item.id,item.title)" :class="{active:indexNum===item.index}">
          <div class="contant">
            <img :src="item.img" :alt="item.title">
            <span>{{ item.title }}</span>
            <em>入库样本数：{{item.num}}</em>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from '../axios/axios'
    export default {
      data(){
        return{
          apparatus:[],
          indexNum:null
        }
      },
      created(){
        let _this = this
        this.axios.get('/medical-imaging-collect/organ/with-sample').then(function(res){
          if(res.data.infoCode == '0'){
            for(let i of res.data.data){
              _this.apparatus.push({
                img:i.organPhoto,
                num:i.sampleCount,
                title:i.organName,
                id:i.organId
              })
              
            }
          }
        })
      },
      methods:{
        handleStyle(index,val){
          this.indexNum = index;
          sessionStorage.setItem("apparatus",index)
          sessionStorage.setItem("apparatusName",val)
          this.$router.push('/patient-newForm')
        }
      }
    }
</script>

<style lang="less" scoped>
  .apparatus{
    background: #eee;
    p{
      font-size: 18px;
      color: #8a8a8a;
      padding: 20px 0;
    }
    &>ul{
      width:965px;
      background-color: #eee;
      // border: solid 1px #b7b7b7;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 5px;
      margin: 0 auto;
      padding-bottom: 20px;
      li{
        margin: 0 0px 1px 1px;
        width: 240px;
        height: 190px;
        position: relative;
        background: #fff;
        float: left;
        text-align: center;
        cursor: pointer;
        .contant{
          position:absolute;
          left:50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 0;
          img{
            width: 50px;
            height: 50px;
          }
          span{
            display: block;
            font-size: 18px;
            color: #2d2d2d;
            font-weight: 700;
            margin-top: 26px;
          }
          em{
            display: block;
            font-size: 14px;
            color: #919191;
            margin-top: 10px;
          }
        }
      }
      li:hover{
        transition: all 0.8s;
        background: rgba(85, 82, 82, 0.4) !important;
      }
      .active{
        border: solid 3px #4c65a4
      }
    }
  }
</style>
