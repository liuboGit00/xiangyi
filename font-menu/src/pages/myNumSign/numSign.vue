<template>
    <div class='main numSign'>
        <div class='fromSelect'>
            <div class='selectlist' v-if='showtab' >
                <el-select v-model="value2" clearable placeholder="选择发布状态">
                    <el-option
                    v-for="item in options2"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                    </el-option>
                </el-select>
            </div>
            <div class='selectlist1' :style="magleft">
                <el-select v-model="value1" clearable placeholder="选择分类">
                    <el-option
                    v-for="item in options1"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                    </el-option>
                </el-select>
            </div>
            <div class='inputSearch'>
                <el-input
                    placeholder="请输入数签名"
                    v-model="input10"
                    clearable>
                </el-input>
            </div>
            <div class='searchBtn'>
                <button type="primary" @click='searchBtn'>搜&nbsp;&nbsp;&nbsp;索</button>
            </div>
        </div>
        <div class='container'>
            <div class='navmenu'>
                <el-tabs v-model="activeName" @tab-click="handleClick" style='width: 1046px;margin: 0 auto;'>
                    <el-tab-pane label="我的创建" name="first">
                        <div class='bookSigning'>
                            <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown="applyforId(item)">
                                <img :src="pag" alt="">
                                <h3 @click='details(item)' :title="item.tagName">{{ item.tagName }}</h3>
                                <div class='selectOp'>
                                <el-select v-model="item.typeId" @change="selectData(item,item.typeId)" :disabled='item.auditStatus ==2 || item.auditStatus ==3' placeholder="请选择">                                    
                                    <el-option
                                        v-for="item in options"
                                        :key="item.typeId"
                                        :label="item.typeName"
                                        :value="item.typeId">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span @click='applyfor(item)' style='background-color: #4c65a4;cursor: pointer' v-if='item.auditStatus == 0'>申请发布</span>
                                <span @click='applyfor(item)' style='background-color: #4c65a4;cursor: pointer' v-if='item.auditStatus == 1'>申请更新</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 2'>待发布</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 3'>待更新</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 4'>已发布</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 5'>已更新</span>
                                <span @click='applyfor(item)' style='background-color: #4c65a4;cursor: pointer' v-if='item.auditStatus == 6'>被退回</span>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的修改" name="second">
                        <div class='bookSigning2'>
                            <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown="modifythe(item)">
                                <img :src="pag" alt="">
                                <h3 @click='details2' :title="item.tagName">{{ item.tagName }}</h3>
                                <!-- <p @click='details2' :title="item.info" v-html='item.info'></p> -->
                                <el-tooltip class="item" effect="dark" content="取消收藏" placement="top-start">
                                    <img class='stare' @click='thestars(item)' v-if='item.isFavorite == 1' :src="xing" alt="">
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
                                    <img class='stare' @click='thestars(item)' v-if='item.isFavorite == 0' :src="xing1" alt="">
                                </el-tooltip>

                                <strong :title="item.typeName">{{item.typeName}}</strong>
                                <span @click='Modifydata(item)' style='background-color: #4c65a4;cursor: pointer' v-if='item.auditStatus == 1'>申请更新</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 3'>待更新</span>
                                <span style='background-color: #a0b1dd;cursor: default' v-if='item.auditStatus == 5'>已更新</span>
                                <span @click='Modifydata(item)' style='background-color: #4c65a4;cursor: pointer' v-if='item.auditStatus == 6'>被退回</span>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的收藏" name="third">
                      <div class='bookSigning1'>
                        <div class='bookName' v-for='(item,index) in createlist' :key='index' @mousedown='collectionlist(item)'>
                            <img :src="pag" alt="">
                            <h3 @click='details1' :title="item.tagName">{{ item.tagName }}</h3>
                            <!-- <p @click='details1' :title="item.info" v-html='item.info'></p> -->
                            <strong :title="item.typeName">{{ item.typeName }}</strong>      
                            <el-tooltip class="item" effect="dark" content="取消收藏" placement="top-start">
                                    <img @click='stars(item,index)' class='stare' v-if='item.isFavorite == 1' :src="xing" alt="">
                            </el-tooltip>                      
                             <!--<div class='selectOp'>
                            <el-select v-model="item.typeId" placeholder="请选择">                                    
                                <el-option
                                    v-for="item in options"
                                    :key="item.typeId"
                                    :label="item.typeName"
                                    :value="item.typeId">
                                    </el-option>
                                </el-select>
                            </div> -->
                            <!-- <span v-if='item.auditStatus == 0'>申请发布</span>
                            <span v-if='item.auditStatus == 1'>待发布</span>
                            <span v-if='item.auditStatus == 2'>待更新</span>
                            <span v-if='item.auditStatus == 3'>已发布</span>
                            <span v-if='item.auditStatus == 4'>已退回</span> -->
                        </div>
                      </div>
                    </el-tab-pane>
                </el-tabs>
                <!--我的创建 被退回提示框-->
                <el-dialog  
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
                <div class='diakug'>
                    <div class='diaimg'>
                        <span class='el-icon-warning'></span>
                    </div>
                    <div class='diatxt'>
                        <p>退回原因</p>
                        <p>{{ backInfo }}</p>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles">修 改</el-button>                    
                    <el-button @click="dialogVisibles1">取 消</el-button>
                </span>
                </el-dialog>
                <!--我的修改 被退回提示框-->
                <el-dialog  
                title="提示"
                :visible.sync="dialogVisible1"
                width="30%"
                >
                <div class='diakug'>
                    <div class='diaimg'>
                        <span class='el-icon-warning'></span>
                    </div>
                    <div class='diatxt'>
                        <p>退回原因</p>
                        <p>{{ backInfoxiu }}</p>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyVisibles">修 改</el-button>                    
                    <el-button @click="modifyVisibles1">取 消</el-button>
                </span>
                </el-dialog>
                <!--分页-->
                <div class="fenye" v-if='pageShow'>
                  <div class='numli'>
                    <el-pagination @prev-click='prev' @next-click='next' prev-text='上一页' next-text='下一页' background @current-change="currentHandler" :current-page="curPage" :page-size="pageSize" layout="prev, pager, next" :total="total">
                    </el-pagination>
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
            magleft:'margin-left: 10px',
            dialogVisible: false,
            dialogVisible1: false,
            createlist: null,
            personId: null,
            personIdSc: null,
            modifytheId: null,
            showtab: true,
            resData: null,
            auditStatus: null,
            pag:require('../../assets/img/pag.png'),
            xing:require('../../assets/img/xingTrue.png'),
            xing1:require('../../assets/img/xingFalse.png'),
            options: null,
            collection: null,
            collection1: null,
            options1:[],
            options2: [{
                typeId: '0',
                typeName: '未发布'
            },
            {
                typeId: '1',
                typeName: '未更新',
            },
            {
                typeId: '2',
                typeName: '待发布',
            },
            {
                typeId: '3',
                typeName: '待更新',
            },
            {
                typeId: '4',
                typeName: '已发布',
            },
             {
                typeId: '5',
                typeName: '已更新',
            },
            {
                typeId: '6',
                typeName: '已退回',
            }],
            value1: '',
            value2: '',
            value: '',
            input10: '', //搜素内容
            activeName: 'first',
            value4: '',
            curPage: 1, //当前页数
            pageSize: 12, //每页显示条目个数
            total: 0, //总条目数
            numandcread: 1, //我的创建 或者是 我的收藏
            tablab:'我的创建',
            storeId: '',
            thestoreId: '',
            pageShow: true,
            fodifyStatus:null,
            backInfo: '',
            backInfoxiu: '',
            seltypeId: '',
        }
    },
    mounted(){
        if(this.$route.query.idtyle == 1){
            this.activeName = 'second'
        }else if(this.$route.query.idtyle == 2){
            if(this.$route.query.createid == 2){
                this.activeName = 'second'
            }else {
                this.activeName = 'first'
            }
        }else {
            this.activeName = 'first'
        }
        this.classification()  //选择分类 select
        this.currentHandler() //数签列表
    },
    methods: { 
      dialogVisibles(){  //我的创建 --修改按钮
            this.dialogVisible = false
            // this.details();
            this.axios.get('/data-tag-persons/'+this.personId).then( res => {
                this.resData = res.data.data
                    this.$router.push({path:'/detailsPage',query:{
                        resData: JSON.stringify(this.resData),
                        tagName: this.resData.tagName,
                        one: 1,
                        create: 1
                    }})
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      dialogVisibles1(){ //我的创建 --取消按钮
            this.dialogVisible = false;
      },
      modifyVisibles(){   //我的修改 --修改按钮
            this.dialogVisible1 = false
            // this.Modifydata()
            this.axios.get('/data-tag-persons/'+this.modifytheId).then( res => {
                this.resData = res.data.data
                this.$router.push({path:'/detailsPage',query:{
                    resData: JSON.stringify(this.resData),
                    isFavorite: res.data.data.isFavorite,
                    tagName: this.resData.tagName,
                    create: 2
                }})
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      modifyVisibles1(){   //我的修改 --取消按钮
            this.dialogVisible1 = false
      },
      classification(){  //选择分类 select
            this.axios.get('/data-tag-types').then( res => {
                this.options = res.data.data
                res.data.data.map(val => {
                    this.options1.push(val)
                }) 
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      handleClick(tab, event) { //tab标签页切换
        this.value1 = ''
        this.value2 = ''
        this.input10 = ''
         this.pageShow = true
          this.tablab = tab.label
          if(this.tablab == '我的修改'){
             this.options2 = [{
                typeId: '1',
                typeName: '未更新',
            },
            {
                typeId: '3',
                typeName: '待更新',
            },
            {
                typeId: '5',
                typeName: '已更新',
            },
            {
                typeId: '6',
                typeName: '已退回',
            }]
          }else {
             this.options2 = [{
                typeId: '0',
                typeName: '未发布'
            },
            {
                typeId: '1',
                typeName: '未更新',
            },
            {
                typeId: '2',
                typeName: '待发布',
            },
            {
                typeId: '3',
                typeName: '待更新',
            },
            {
                typeId: '4',
                typeName: '已发布',
            },
            {
                typeId: '5',
                typeName: '已更新',
            },
            {
                typeId: '6',
                typeName: '已退回',
            }]
          } 
          this.curPage = 1;
          this.currentHandler()
      },
      prev(){
       this.pageShow = true          
        //   this.numberlist()
        //   this.currentHandler(1)
      },
      next(){
       this.pageShow = true          
        //   this.numberlist()
        //   this.currentHandler()
      },
      currentHandler(page){  //点击分页 改变时会触发
      this.createlist=''
               //点击分页 改变时会触发
            let numandcread = "";
            let url="";
            let formobj = {
                auditStatus:this.value2,
                typeId:this.value1,
                tagName:this.input10,
                pageNum:this.curPage=page?page:this.curPage,
                pageSize:this.pageSize,
            };
            for(let key in formobj){
                if(formobj[key] == ""){
                    delete formobj[key]
                }else{
                    //   if(key == "pageNum"){
                    //       let curpage = page?page:formobj[key];
                    //       url = url + "&"+key+"="+curpage;
                    //   }else{
                        url = url + "&"+key+"="+formobj[key];
                    //   }
                }
            }
            if (this.activeName == "first") {
                numandcread = "isOwner";
            } else if (this.activeName == "second") {
                numandcread = "isUpdate";
            } else {
                numandcread = "isFavorite";
            }

            this.axios
                    .get("/data-tag-persons?"+numandcread+"=1"+url)
                    .then(res => {
                    this.createlist = res.data.data.list;
                    if(this.createlist.length == 0){
                        this.pageShow = false
                    }
                    this.total = res.data.data.total;
                    this.tool.close(); //遮罩层消失
                    })
                    .catch(error => {
                    this.tool.close(); //遮罩层消失
                    console.log(error);
            });
      },
      details(item){ //我的创建  --点击编辑 可以编辑当前内容
            this.axios.get('/data-tag-persons/'+this.personId).then( res => {
                this.resData = res.data.data
                if(item.auditStatus == 2 || item.auditStatus ==3){
                     this.$router.push({path:'/detailsPage',query:{
                        resData: JSON.stringify(this.resData),
                        tagName: this.resData.tagName,
                        one: 1,
                        edit: 2,
                        create: 1
                    }})
                }else {
                    this.$router.push({path:'/detailsPage',query:{
                        resData: JSON.stringify(this.resData),
                        tagName: this.resData.tagName,
                        one: 1,
                        create: 1
                    }})
                }
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      details1(){ //我的收藏 ---点击编辑 可以编辑当前内容
            this.axios.get('/data-tag-persons/'+this.personIdSc).then( res => {
                this.resData = res.data.data
                this.$router.push({path:'/detailsPage',query:{
                    resData: JSON.stringify(this.resData),
                    isFavorite: res.data.data.isFavorite,
                    tagName: this.resData.tagName,
                    create: 2
                }})
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      details2(){ //我的修改 --点击编辑 可以编辑当前内容
            this.axios.get('/data-tag-persons/'+this.modifytheId).then( res => {
                this.resData = res.data.data
                this.$router.push({path:'/detailsPage',query:{
                    resData: JSON.stringify(this.resData),
                    isFavorite: res.data.data.isFavorite,
                    tagName: this.resData.tagName,
                    create: 2
                }})
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
      },
      searchBtn(){ //点击搜索按钮 获取-选择分类-搜索内容
          //选择分类 this.value1
          //搜索内容 this.input10
          this.curPage = 1;
          this.currentHandler();
      },
      collectionlist(item){ ////tab 点击我的收藏获取所有数据
          this.collection =item
          this.personIdSc = item.personId; // 获取personId 
          this.storeId = item.storeId  //// 获取storeId
          this.backInfoxiu = '';
          this.backInfoxiu = item.backInfo; // 获取backInfo 
      },
      thestars(info){ //我的修改
          if(info.isFavorite == 1){
                this.axios.delete('/data-tag-favorites/'+this.thestoreId).then( res => {
                    if(res.data.status == 'SUCCESS'){
                        info.isFavorite = 0
                        this.$message({
                            message: '取消收藏成功！',
                            type: "success"
                        });
                    }else if(res.data.status == 'ERROR'){
                        this.$message({
                            message: '取消收藏失败！',
                            type: "error"
                        });
                    }
                    this.tool.close();    //遮罩层消失
                }).catch((error) =>{
                    this.tool.close();    //遮罩层消失
                    console.log(error)
                })
                return
            }else if(info.isFavorite == 0){
                this.axios.post('/data-tag-favorites/'+this.thestoreId).then( res => {
                    if(res.data.status == 'SUCCESS'){
                        info.isFavorite = 1
                        this.$message({
                            message: '收藏成功！',
                            type: "success"
                        });
                    }else if(res.data.status == 'ERROR'){
                        this.$message({
                            message: '收藏失败！',
                            type: "error"
                        });
                    }
                    this.tool.close();    //遮罩层消失
                }).catch((error) =>{
                    this.tool.close();    //遮罩层消失
                    console.log(error)
                })
                return
            }
      },
      stars(info,index){ //点击五角星取消当前数签的收藏
        this.axios.delete('/data-tag-favorites/'+this.storeId).then( res => {
            // this.numberlist()
            if(res.data.status == 'SUCCESS'){
               this.createlist.splice(index,1) //删除数组下表为index的1个数组   
                this.$message({
                    message: '取消收藏成功！',
                    type: "success"
                });
            }else if(res.data.status == 'ERROR'){
                this.$message({
                    message: '取消收藏失败！',
                    type: "error"
                });
            }
            this.tool.close();    //遮罩层消失
        }).catch((error) =>{
            this.tool.close();    //遮罩层消失
            console.log(error)
        })
      },
      selectData(item,id){  //我的创建--select选择项
            this.options.map(val => {
                if(val.typeId == id){
                   this.axios.put('/data-tag-persons',{  
                        // auditStatus: item.auditStatus,
                        personId: item.personId,
                        typeId: id
                    }).then( res => {
                        this.tool.close();    //遮罩层消失
                    }).catch((error) =>{
                        this.tool.close();    //遮罩层消失
                        console.log(error)
                    })
                }
            })
            
          if(item.auditStatus == 4 || item.auditStatus == 5){
              this.axios.put('/data-tag-persons',{  
                auditStatus: 1,
                typeId: item.typeId,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 1
                // console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
          }
        //   this.seltypeId = item.typeId
      },
      applyforId(item){  //tab 点击我的创建获取所有数据
          this.auditStatus = item.auditStatus; // 获取auditStatus 
          this.personId = item.personId; // 获取personId 
          this.backInfo = '';
          this.backInfo = item.backInfo; // 获取backInfo 
      },
      applyfor(item){ //---我的创建 点击 改变申请状态
        if(item.auditStatus == 0){
            this.axios.put('/data-tag-persons',{  
                auditStatus: 2,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 2
                // console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
        } else if(item.auditStatus == 1){
            this.axios.put('/data-tag-persons',{  
                auditStatus: 3,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 3
                console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
        }else if(item.auditStatus == 6){
            this.axios.put('/data-tag-persons',{  
                auditStatus: 6,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 6
                console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
            this.dialogVisible = true            
        }
      },
      modifythe(item){ //tab 点击我的修改获取所有数据
          this.fodifyStatus = item.auditStatus; 
          this.modifytheId = item.personId;  // 获取personId 
          this.thestoreId = item.storeId;  // storeId 
      },
      Modifydata(item){// ---我的修改  点击 改变申请状态
        if(item.auditStatus == 1){
            this.axios.put('/data-tag-persons',{  
                auditStatus: 3,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 3
                // this.numberlist()
                console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
        }else if(item.auditStatus == 6){
            this.axios.put('/data-tag-persons',{  
                auditStatus: 6,
                personId: item.personId
            }).then( res => {
                item.auditStatus = 6
                // this.numberlist()
                console.log(res)
                this.tool.close();    //遮罩层消失
            }).catch((error) =>{
                this.tool.close();    //遮罩层消失
                console.log(error)
            })
            this.dialogVisible = true            
        }
      }
    }
}
</script>

<style lang="less" scoped>
    .diakug{
        display: flex;
    }
    .diaimg{
        margin-top: 30px;
        margin-left: 56px;
        span{
            width: 76px;
            height: 76px;
            font-size: 75px;
            color: #589cef;
        }
    }
    .diatxt{
        p{
            font-size: 20px;
            color: #6c6e70;
        }
        p:first-child{
            padding-top: 40px;
            padding-left: 23px;
        }
        p:last-child{
            padding-top: 15px;
            padding-left: 23px;
        }
    }
    .main{
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f4f6f9;
    }
    .fromSelect{
        height: 100px;
        display: flex;
        width: 100%;
        background: #4c65a4;
        padding-left: 11.54%;
        .selectlist{
            // margin-left: 10px;
            line-height: 100px;
            width: 180px;
            height: 42px;
        }
        .selectlist1{
            line-height: 100px;
            width: 180px;
            height: 42px;
        }
        .inputSearch{
            margin-left: 10px;
            line-height: 100px;
            width: 480px;
            height: 42px;
            display: flex;
        }
        .searchBtn{
            line-height: 100px;
            margin-left: 30px;
            button{
               cursor: pointer;
                width: 108px;
                height: 42px;
                background-color: #278df6;
                box-shadow: 0px 3px 5px 0px 
                    rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                border: none;
                font-size: 18px;
                color: #fefefe;
            }
        }
    }
    .container{
        width: 100%;
        .navmenu{
            width: 100%;
            height: 104px;
            background: #f9f9f9;
            padding: 20px 40px 0px 40px;
            .bookSigning{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .bookName{
                    width: 514px;
                    height: 50px;
                    margin-bottom: 11px;
                    background-color: #ffffff;     
                    border-left: 4px solid #f56986;
                    line-height: 50px;
                    display: flex;
                    position: relative;
                    img{
                        width: 18px;
                        height: 19px;        
                        // vertical-align: middle;
                        margin-left: 14px;
                        margin-top: 14px;
                    }      
                    h3{
                        font-size: 18px;
                        padding-left: 14px;
                        width: 240px;
                        color: #666666;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                    }    
                    p{
                        cursor: pointer;
                        padding-left: 19px;
                        width: 188px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #999999;
                    } 
                    span{
                        position: absolute;
                        right: 0px;
                        width: 72px;
                        height: 50px;
                        background-color: #4c65a4;
                        border-radius: 0px 6px 6px 0px;
                        text-align: center;
                        font-size: 12px;
                        color: #fff;
                    }
                    .selectOp{
                        width: 99px;
                        height: 25px;
                        margin-left: 60px;
                    }
                }
                div:nth-child(even){
                    margin-left: 18px;
                }
            }
            .bookSigning1{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .bookName{
                    width: 514px;
                    height: 50px;
                    margin-bottom: 11px;
                    background-color: #ffffff;     
                    border-left: 4px solid #f56986;
                    line-height: 50px;
                    display: flex;
                    position: relative;
                    img{
                        width: 18px;
                        height: 19px;        
                        // vertical-align: middle;
                        margin-left: 14px;
                        margin-top: 14px;
                    }   
                    img:last-child{
                        margin-left: 22px;
                    }   
                    h3{
                        cursor: pointer;
                        font-size: 18px;
                        padding-left: 14px;
                        width: 240px;
                        color: #666666;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }    
                    p{
                        cursor: pointer;
                        padding-left: 19px;
                        width: 188px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #999999;
                    } 
                    strong{
                        width: 80px;
                        color: #2f90f3;
                        margin-left: 80px;
                        font-size: 15px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: default
                    }
                    .stare{
                       cursor: pointer;
                    }
                }
                div:nth-child(even){
                    margin-left: 18px;
                }
            }
            .bookSigning2{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .bookName{
                    width: 514px;
                    height: 50px;
                    margin-bottom: 11px;
                    background-color: #ffffff;     
                    border-left: 4px solid #f56986;
                    line-height: 50px;
                    display: flex;
                    position: relative;
                    img{
                        width: 18px;
                        height: 19px;        
                        // vertical-align: middle;
                        margin-left: 14px;
                        margin-top: 14px;
                    }     
                    .stare{
                        margin-left: 40px;
                        cursor: pointer;
                        // background: red;
                    }    
                    h3{
                        cursor: pointer;
                        font-size: 18px;
                        padding-left: 13px;
                        width: 240px;
                        color: #666666;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }    
                    p{
                        cursor: pointer;
                        padding-left: 19px;
                        width: 188px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #999999;
                    } 
                    strong{
                        width: 80px;
                        color: #2f90f3;
                        margin-left: 20px;
                        font-size: 15px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: default
                    }
                    span{
                        position: absolute;
                        right: 0px;
                        width: 72px;
                        height: 50px;
                        background-color: #4c65a4;
                        border-radius: 0px 6px 6px 0px;
                        text-align: center;
                        font-size: 12px;
                        color: #fff;
                    }
                    .selectOp{
                        width: 99px;
                        height: 25px;
                        margin-left: 18px;
                    }
                }
                div:nth-child(even){
                    margin-left: 18px;
                }
            }
            .fenye{
                width: 1196px;
                height: 16px;
                position: fixed;
                bottom: 82px;
                .numli{
                    padding: 16px 40px 0px 40px;
                    float: right;
                }
            }
        }
    }
</style>
<style lang="less">
.numSign{
    .el-input__inner{
        padding: 0 8px;
    }
    .el-input--suffix .el-input__inner{
        background-color: #4c65a4;
        color: #ffffff;
        padding-left: 20px;
    }
    .selectOp .el-input--suffix .el-input__inner{
        background-color: #f4f5fb;
        border: none;
        width: 99px;
        height: 25px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .el-button{
        background-color: #278df6;
        border: none;
        font-size: 18px;
        color:#fff; 
        width: 108px;
        height: 42px;
    }
    .el-tabs__nav-wrap{
        line-height: 65px;
        margin-left: 20px;
        border-radius: 6px;
    }
    .el-tabs__nav-wrap::after{
        background-color: #fff;
    }
    .el-tabs__active-bar{
        width: 82px;
    }
    .el-tabs__item.is-active{
        font-size: 20px !important;
    }
    .el-tabs__item{
         font-size: 20px !important;
    }
    .selectOp .el-input--suffix .el-input__inner{
        font-size: 12px;
        color: #278df6;
    }
    .el-tabs__active-bar{
        width: 108px !important;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left: 14px !important;
    }
    .el-tabs__item{
        padding: 0 29px !important;
    }
    .el-tabs__nav-wrap:after{
        background-color: #fff !important;
    }
    .fenye{
        .el-pagination.is-background .el-pager li{
            border: 1px solid #409eff;
            color: #409eff;
        }
        .el-pagination.is-background .btn-next{
            border: 1px solid #409eff;
            color: #409eff;
        }
        .el-pagination.is-background .btn-prev{
            border: 1px solid #409eff;
            color: #409eff;
        }
        .el-pagination.is-background .btn-next:disabled{
            border: 1px solid #c0c4cc;
            color: #bbbbbb
        }
        .el-pagination.is-background .btn-prev:disabled{
            border: 1px solid #c0c4cc;
            color: #bbbbbb
        }
        .btn-next{
            color: #409eff
        }
        .btn-prev{
            color: #409eff
        }
        .el-button{
            background-color: #4c65a4 !important;
            /* background-color: #4c65a4; */
        }
        .el-button:hover {
            background-color: #c9d0e4 !important;
            color: #fff !important;
        }
        .el-pagination span:not([class*=suffix]){
            padding: 0px 10px;
        }
    }
    
    .el-tabs__header{
        background: #fff;
        width: 1046px;
        height: 65px;
        margin: 0 0 39px;
        border-radius: 6px;
    }
    .el-dialog{
        width: 614px !important;
        // height: 290px !important;
        margin-top: 16% !important;
        border-radius: 6px !important;
    }
    .el-dialog .el-dialog__header{
        border-radius: 6px 6px 0px 0px;
    }
    .el-icon-warning{
        width: 100%;
        height: 100%;
    }
}
.el-popper[x-placement^=bottom]{
    margin-top: -0.7% !important;
}
</style>




