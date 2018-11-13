<template>
  <div class="page"  ref="page">
      <div class="formSelectGroup">
           <el-button type="primary" @click="save"><i class="iconfont icon-baocunwendang"></i>保存</el-button>
           <el-button type="primary" @click="undo"><i class="iconfont icon-ziyuanbaosongshenqingshujuchexiao"></i>撤销</el-button>
           <el-button type="primary" @click="remark"><i class="iconfont icon-shuaxin1"></i>重置</el-button>
           <el-button type="primary" @click="bold"><i class="iconfont icon-jiacu"></i>加粗</el-button>
           <el-button type="primary" @click="italic"><i class="iconfont icon-xieti"></i>斜体</el-button>
           <el-button class="titleclas" type="primary" @click="handleFontsize"><i class="iconfont icon-mulu"></i>一级标题</el-button>
           <el-button class="titleclas" type="primary" @click="secondary('20px')"><i class="iconfont icon-mulu"></i>二级标题</el-button>
           <el-button type="primary" @click="handleform" id="tabel"><i class="iconfont icon-biaoge"></i>表格<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
           <el-button type="primary" @click="topImg"><i class="iconfont icon-tupian1"></i>图片</el-button>
      </div>
      <div class="container" ref="container">
           <div class="sideleft">
             <li></li>
             <ul>
               <li :class="{active:scrollactive == index}" v-for="(item,index) in items" :key="index" @click="backDom(index)"><span>{{index + 1}}</span><em v-html="item.title"></em></li>
             </ul>
             <li class="end"></li>
           </div>                   
           <div class="sideright" @scroll="handlescroll">
             <div class="userInfo">
                <p class="title">{{tagName}}<span class='typeName'>{{typeName}}</span></p>
                <div class="contant">
                   <div v-for="(item,index) in items" :key="index" class="come edit">
                      <p class="catalog">
                          <span class="left"></span>
                          <span class="center">
                            <input type="text"  @keyup="getBlur(item,index)" :value="item.title" maxlength="10" v-if='item.edit' @blur="leave(item)">
                            <span @click="index > 3 && item.ueType ? downBlur(item) : '' " class="firstTitle" v-if='!item.edit'>{{item.title}}</span>
                            <i class="solid"></i>
                          </span>
                          <!-- <span class="right" v-show="item.edit"><i class="el-icon-edit"></i>编辑</span> -->
                      </p>
                      <div class="contantInfo" v-if="item.type == 'text'">
                        <template v-show="item.ueType">
                          <script :id="item.id" name="content" type="text/plain" >
                            
                          </script>
                        </template>
                        <div v-html="item.contant" v-show="!item.ueType" class="saveContant" @click="changeEditor(item,item.contant)" style="min-height:335px">{{item.contant}}</div>
                      </div>
                      <div class="contantInfo" v-else>
                          <p class="tabelTitle">{{item.contant}}</p>
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
                </div>
                <!-- 回到顶部 -->
                <div class="baclTop" @click="backTop" v-show="backTopType">
                  <i class="el-icon-arrow-up"></i>
                </div>
            </div>
           </div>                   
      </div>
      <!-- dalog上传图片弹窗 -->
      <el-dialog
        title="添加或修改图片"
        :visible.sync="dialogVisible"
        width="640px"
        :before-close="handleClose" class="LH">
        <div class="topImg">
          <el-form ref="form"  label-width="90px">
            <el-form-item label="图片说明：">
              <el-input v-model="iamgeInfo" placeholder="图片说明"></el-input>
              <p class="hint">长度限制：30个汉字/60个字节</p>
            </el-form-item>
          </el-form>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 本地上传 -->
            <el-tab-pane label="本地上传" name="first">
              <div class="upData">
                <form action="" style="" id="formFile">
                  <input type="file" id='file' @change="upImage">
                </form>
                <label for="file">
                  <i class="el-icon-picture"></i>
                  <span>选择本地图片</span>
                </label>
                <p>
                  仅支持jpg,gif,png格式文件<br/>
                  请上传尺寸大于3KB小于10MB的图片
                </p>
              </div>
            </el-tab-pane>
            <!-- 添加URL -->
            <el-tab-pane label="添加URL" name="second">
              <div class="upURL">
                <el-input v-model="inputUrl" placeholder="请输入图片链接" style="width:490px;height:44px"></el-input>
                <p>
                  示例：http://www.baidu.com/img/bdlogo.png<br/>
                  请上传尺寸大于3KB小于10MB的图片<br/>
                  仅支持jpg,gif,png格式文件
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="preview">
            <p>已选择图片</p>
            <p class="previewImg">
              <img :src="imgUrl.url" alt="" v-for="imgUrl in imgList" :key="imgUrl.url" :id="imgUrl.url">
            </p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirm" type="primary">确定</el-button>
          <el-button  @click="close" type="info" style="background-color: #4c65a4;;opacity:0.3">取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>


<script>
import server from './server.js'
import { imageUrl, cancleHTTP } from "../../axios/env.js";
export default {
  data() {
    return {
      create: null,
      ue:null,
      containerleft: 280,
      scrollactive: 0,
      scrollClick:false,
      formframeflag: false,
      dialogVisible:false,
      activeName:'first',  //图片选择上传方式
      iamgeInfo:"",  //图片标题表述
      inputUrl:"",  //上传图片的链接
      imgList: [],
      backTopType:false,  //是否显示回到顶部按钮
      typeName:'',  //类型
      tagName:'',
      currentEditor:null,  //当前编辑器所在DOM
      domArr:[],  //dom对应高度
      items:[{
            title:"字段定义",
            edit:false,
            type:'text',
            id:'contant1',
            index:0,
            ueType:false,
            contant:""
        },{
            title:"数据来源",
            edit:false,
            type:'text',
            id:'contant2',
            index:1,
            ueType:false,
            contant:""
        },{
            title:"相关业务",
            edit:false,
            type:'text',
            id:'contant3',
            index:2,
            ueType:false,
            contant:""
        },{
            title:"使用数据",
            edit:false,
            type:'tabel',
            id:'contant4',
            index:3,
            ueType:false,
            contant:""
        }],
        innerHTML:'',
        initialData : null,  //用户数据
        initialItems : null
    };
  },
  created(){
    this.create = this.$route.query.create
    if(this.$route.query.storeId){
      let _self = this
      let sendData = this.$route.query.storeId
      server.signInfoId(sendData,function(res){  //从仓库详细进行编辑
          _self.getDataInfo(res)
      })
      sessionStorage.setItem('idtyle',1)
    }else if(this.$route.query.personId){
      let _self = this
      let sendData = this.$route.query.personId
      server.AnumSign(sendData,function(res){  //从仓库详细进行编辑
          _self.getDataInfo(res)
      })
      sessionStorage.setItem('idtyle',2)
    }
    // edui-for-inserttable
  },
  mounted() {
    let _self = this
    // this.ue = UE.getEditor('container',{toolbars:[['inserttable','insertimage']]});
    $(".sideleft").css({
      left: this.$refs.container.offsetLeft + 42,
      top: this.$refs.container.offsetTop + 30
    });

    //当前dom对应的数据结构
    for(let i of this.items){
      if(i.ueType == true){
        this.currentEditor = i
      }
    }

  },
  methods: {
    //页面渲染数据结构处理
    getDataInfo(res){
      let _self = this
      _self.tool.close();
      let _data = res.data
        _self.initialData = _data.data
        if(_data.infoCode == '0'){
          _self.items[0].title = _data.data.tagName
          _self.items[0].contant = _data.data.info
          _self.items[1].contant = _data.data.source
          _self.items[2].contant = _data.data.business
          _self.items[3].contant = _data.data.tagTable
        }
        if(_data.data.other && _data.data.other.indexOf("累死我了") != -1){
          let otherData = _data.data.other.split("累死我了")
          for(let i in otherData){
            if(i != parseInt(otherData.length) -1 ){
              var d = document.createElement("div")
              d.innerHTML = otherData[i]
              _self.items.push({  //可需改数据保存到全局
                title:$(d).find(".firstTitle").html(),
                edit:false,
                type:'text',
                id:'contant' + (parseInt(i) + 5),
                index: parseInt(i) + 4,
                ueType:false,
                contant:$(d).find(".saveContant").html()
              })
            }
          }
        }
        _self.initialItems = JSON.parse(JSON.stringify(_self.items))
        _self.typeName = _data.data.typeName
        _self.tagName = _data.data.tagName
        let index = parseInt(_self.$route.query.index)
        _self.items[index - 1].ueType = true
        
        _self.currentEditor =  _self.items[index - 1]
        setTimeout(function(){
          _self.ue = UE.getEditor(_self.currentEditor.id, {
            toolbars: [
              ['inserttable']
            ],
            autoHeightEnabled: true,
            autoFloatEnabled: true,
            lang:"zh-cn",
            focus:true
          });
          _self.ue.ready(function() {
              _self.ue.setContent(_self.currentEditor.contant); //编辑器家在完成后，让编辑器拿到焦点
               _self.ue.addListener( 'keyup contentChange ', function( editor ) {
                  _self.contentChange()  //编辑器内容发生变化
              })
          });
          //编辑器绑定监听事件
           _self.domArrHeight()
           _self.innerHTML = $(".container").html()
        },10)
    },
    upImage(event){  //本地预览图片
      let files = event.target.files;
      console.log(files)
      if(files[0].type.split("/")[1] != 'jpeg' && files[0].type.split("/")[1] != 'gif' && files[0].type.split("/")[1] != 'png' && files[0].type.split("/")[1] != 'jpg'){
        console.log('图片格式为' + files[0].type.split("/")[1])
        return
      }
      if(files[0].size < 3072 || files[0].size > 10485760){
        console.log('图片大小为' + files[0].size)
        return
      }
      if(this.imgList){
        this.imgList = []
        this.imgList.push({
          url: (window.URL || window.webkitURL).createObjectURL(files[0]),
          type: "image",
          uploadData: files[0]
        });
      }else{
        this.imgList.push({
          url: (window.URL || window.webkitURL).createObjectURL(files[0]),
          type: "image",
          uploadData: files[0]
        });
      }
    },
    topImg(){  //点击上传图片dalog页面关闭
      if($(".contant img").length == 5){
        this.$message({
          message: '图片不可超过5张！',
          type: "warning"
        })
        return
      }
      this.dialogVisible = true
    },
    confirm(){  //dalog点击确认按钮
      if(this.imgList.length == 0 && this.inputUrl == ''){
        this.dialogVisible = false
        return
      }
      let imgList = this.imgList
      console.log(imgList)
      var _self = this
      if(this.activeName == 'first'){
        var data = new FormData();
        data.append("file",imgList[0].uploadData)
        //上传图片接口获取图片路径
        server.uploadImg(data,function(res){
          _self.tool.close();
          let _data = res.data
          if(_data.infoCode == 0){
            let w = document.getElementById(imgList[0].url).naturalWidth
            let h = document.getElementById(imgList[0].url).naturalHeight
            console.log(w)
            if(w > 650){
              w = 650
            }
            let imgData = {
              src: imageUrl + _data.data.fileName,
              width: w,
              height: "auto"
            }
            _self.ue.execCommand( 'insertimage', imgData);
            _self.imgList = []
            _self.dialogVisible = false
            $("#file").val("")
            _self.iamgeInfo = ''
            _self.contentChange()
          }
        })
      }else{
        var img = document.createElement("img")
        img.src = this.inputUrl
        let _self = this
        img.onload = function(){
            let w = img.naturalWidth
            console.log(w)
            if(w > 650){
              w = 650
            }
            let imgData = {
              src:  _self.inputUrl,
              width: w,
              height:"auto"
            }
            _self.ue.execCommand( 'insertimage', imgData);
            _self.inputUrl = ''
            _self.dialogVisible = false
            $("#file").val("")
            _self.iamgeInfo = ''
        }
      }
    },
    //编辑器内部文本发生改变
    contentChange(){
      for(let i of this.items){
        if(i.ueType == true){
          // $(window.frames["iframe"].document).find("input[@type='radio']").attr("checked","true");
          console.log(this.ue.getContent())
          // $("#"+i.id).fing(".view")[0].innerHTML()
          i.contant = this.ue.getContent()
          
        }
      }
    },
    save(){  //保存
      if(this.$route.query.storeId){ //仓库
        // this.ue.setHide()  //清除编辑器实例
        // $("#"+this.currentEditor.id).remove()
        // this.currentEditor.ueType = false
        let otherData = '' //新加的i一级标题字段
        $(".come").each(function(n,m){
          if(n > 3){
            console.log(m.innerHTML)
            otherData += m.innerHTML + "累死我了"
          }
        })

        let _self = this
        let param = {
          storeId: this.initialData.storeId,
          tagName: this.initialData.tagName,
          typeId: this.initialData.typeId,
          info : _self.items[0].contant,
          source :  _self.items[1].contant,
          business : _self.items[2].contant,
          tagTable : _self.items[3].contant,
          other: otherData
        }
        server.saveData(param,function(res){
          if(res.data.status == 'SUCCESS'){
                _self.$message({
                    message: '保存成功！',
                    type: "success"
                });
            }
          _self.tool.close()
          if(_self.initialData.isOwner == 1){
            _self.$router.push({ path:'/numSign',query:{
                idtyle:2
            }})
          }else{
            _self.$router.push({ path:'/numSign',query:{
                idtyle:1
            }})
          }
        })
      }else {
          // this.ue.setHide()  //清除编辑器实例
          // $("#"+this.currentEditor.id).remove()
          // this.currentEditor.ueType = false
          let otherData = '' //新加的i一级标题字段
          $(".come").each(function(n,m){
            if(n > 3){
              otherData += m.innerHTML + "累死我了"
            }
          })

          let _self = this
          let param = {
            personId: this.initialData.personId,
            tagName: this.initialData.tagName,
            typeId: this.initialData.typeId,
            info : _self.items[0].contant,
            source :  _self.items[1].contant,
            business : _self.items[2].contant,
            tagTable : _self.items[3].contant,
            other: otherData
          }
          server.saveAnumSign(param,function(res){
            if(res.data.status == 'SUCCESS'){
                _self.$message({
                    message: '保存成功！',
                    type: "success"
                });
            }
            _self.tool.close()
            _self.$router.push({ path:'/numSign',query:{
                idtyle:2,
                createid: _self.create
            }})
          })
      }
      
    },
    undo(){  //撤销/回到上一步
      this.ue.execCommand( 'undo' );
    },
    bold(){  //加粗
      this.ue.execCommand( 'bold' );
    },
    italic(){  //斜体
      this.ue.execCommand( 'italic' );
    },
    handleFontsize(){   //一级标题
      //  this.ue.execCommand( 'fontsize', size );
      for(let i of this.items){
        i.ueType = false
      }
      // this.ue.setHide()
      //清楚编辑器实例对象
      this.ue.destroy();
      // this.ue = null  //定义为空
      $("#"+this.currentEditor.id).hide()

      this.items.push({
        title:"自定义标题",
        edit:false,
        type:'text',
        ueType:true,
        id:'contant' + (this.items.length + 1),
        index:this.items.length,
        contant:""
      })
      this.currentEditor = this.items[this.items.length - 1]
      let _self = this
      setTimeout(function(){
        _self.ue = UE.getEditor(_self.currentEditor.id, {
          toolbars: [
            ['inserttable']
          ],
          autoHeightEnabled: true,
          autoFloatEnabled: true,
          lang:"zh-cn",
          focus:true
        });

        _self.ue.ready(function() {
          //设置编辑器的内容
          _self.ue.setContent(_self.currentEditor.contant);

        });

        _self.ue.addListener( 'keyup contentChange', function( editor ) {
            _self.contentChange()  //编辑器内容发生变化
        })
        _self.domArr.push($('.come').eq(_self.currentEditor.index).position().top + parseInt(document.getElementsByClassName("sideright")[0].scrollTop))
      },0)
    },
    secondary(index){  //二级标题
      this.ue.execCommand( 'Paragraph','h1',{
          class:'test'
      } );
    },
    backDom(index){  //跳到制定的模块
      let domArr = Array.prototype.slice.call($(".contant .come"))
      this.domArr = []
      for(let i in domArr){
         this.domArr.push($(domArr[i]).position().top)
      }
      if(index == 0){
        $(".sideright").animate({ scrollTop: 0 }, 300);
      }else{
        let num = this.domArr[index] - 400 + $(".sideright").scrollTop()
        $(".sideright").animate({ scrollTop: num }, 300);
      }
    },
    remark(){  //重置
      let _self = this
      let index = parseInt(this.$route.query.index)
      if(this.currentEditor.index == (index -1) ){
        this.items = JSON.parse(JSON.stringify(this.initialItems))
        this.currentEditor = this.items[index - 1]
        this.items[index - 1].ueType = true
        this.currentEditor.ueType = true
        console.log(_self.ue)
        _self.ue.setContent(_self.initialItems[index - 1].contant);
      }else{
        // window.location.reload()
        this.ue.destroy();
        $("#"+this.currentEditor.id).hide()
        // $("#"+this.currentEditor.id).hide()
        // this.ue = null  //定义为空
        
        this.items = JSON.parse(JSON.stringify(this.initialItems))
        this.currentEditor = this.items[index - 1]
        this.items[index - 1].ueType = true
        this.currentEditor = this.items[index - 1]
        console.log(this.currentEditor)
        setTimeout(function(){
          console.log(_self.currentEditor.id)
          _self.ue = UE.getEditor(_self.currentEditor.id, {
            toolbars: [
              ['inserttable']
            ],
            autoHeightEnabled: true,
            autoFloatEnabled: true,
            lang:"zh-cn",
            focus:true
          });

          _self.ue.ready(function() {
            //设置编辑器的内容
            _self.ue.setContent(_self.initialItems[index - 1].contant);
          });

          _self.ue.addListener( 'keyup contentChange', function( editor ) {
              _self.contentChange()  //编辑器内容发生变化
          })

          $("#"+_self.currentEditor.id).show()
        },0)
      }
    },
    //修改标题字数限制
    revisionTitle(e){
      const el = e.target;
      let value = el.innerText
      if (window.event.keyCode === 13) {
        e.preventDefault()
      }
      console.log(value.length)
      if(value.length > 10){
        el.innerText = value.slice(0,10);
        this.setFocus(el)
        // e.preventDefault()
        // e.preventDefault()
      }
    },
    //光标位置
    setFocus(el) {
        // el = el[0]; // jquery 对象转dom对象  
        el.focus();
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        //判断光标位置，如不需要可删除
        if(sel.anchorOffset!=0){
            return;
        };
        sel.removeAllRanges();
        sel.addRange(range);
    },
    leave(data){
      data.edit = false
    },
    //修改标题
    getBlur(data,index){
      // $(".come").eq(index).find(".firstTitle").html($(".come").eq(index).find(".firstTitle").html().split("&nbsp;").join(""))
      this.items[index].title = $(".come").eq(index).find("input").val()
      console.log($(".come").eq(index).find("input").val(),this.items)
      // data.title = $(".come").eq(index).find("input").val()
    },
    downBlur(data){
      data.edit = true
    },
    handleform() {    //表格显示
      $("#"+this.currentEditor.id + " .edui-button-body").click()

      //表格位置
      $(".edui-for-inserttable").css({
        "top": ($("#tabel").offset().top + 50) +'px',
        "left": ($("#tabel").offset().left - 50) + 'px'
      })
    },
    backTop() {   //回到顶部
      $(".sideright").animate({ scrollTop: 0 }, 300);
      this.backTopType = false
    },
    //获取当前模块高度
    domArrHeight(){
      let _self = this
      setTimeout(function(){
        let domArr = Array.prototype.slice.call($(".contant .come"))
        for(let i in domArr){
          _self.domArr.push($(domArr[i]).position().top)
        }
        _self.backDom(_self.currentEditor.index)
      },5)
    },
    handlescroll() {    //滚动导航到锚点位置显示
      let scrlltop = parseInt(document.getElementsByClassName("sideright")[0].scrollTop)
      if(scrlltop > 0) {
          this.backTopType = true
      }else{
          this.backTopType = false
      }
      let domArr = Array.prototype.slice.call($(".contant .come"))
      for(let i in domArr){
        if($(domArr[i]).position().top <= 400){
          this.scrollactive = parseInt(i);
        }
      }
      // let self = this;
      // let scrlltop = parseInt(document.getElementsByClassName("sideright")[0].scrollTop)
      // let scrllTop = scrlltop + 400
      
      // for(let i in this.domArr){
      //   if(parseInt(scrllTop) >= this.domArr[i] ){
      //     self.scrollactive = parseInt(i);
      //   }
      // }
      // event.stopPropagation()
      // event.preventDefault()
      // return false
    },
    handleClick(){  //监听切换图片上传方式
      if(this.activeName == 'second'){
        $(".preview p").eq(0).hide()
        this.imgList = []
        $("#file").val("")
      }else{
        $(".preview p").eq(0).show()
        this.inputUrl = ''
      }
    },
    close(){ 
      this.imgList = []
      this.inputUrl = ''
      this.iamgeInfo = ''
      $("#file").val("")
      this.dialogVisible = false
    }, 
    handleClose(done){  //daLog弹窗点击关闭
      this.imgList = []
      this.inputUrl = ''
      this.iamgeInfo = ''
      $("#file").val("")
      done()
    },
    alterTitle(data){  //修改标题
      data.alterTitle = true
    },
    changeEditor(data,info){  //是否全部可编辑
      console.log(this.ue.getContent())
      if(!this.$route.query.editAll){
        return
      }
      
      for(let i of this.items){
        i.ueType = false
      }
      // this.ue.setHide()
      //清楚编辑器实例对象
      let _self = this
      this.ue.destroy();
      // this.ue = null  //定义为空
      $("#"+this.currentEditor.id).hide()
      console.log(this.items)
      this.items[data.index].ueType = true
      this.currentEditor = data

      setTimeout(function(){
        _self.ue = UE.getEditor(_self.currentEditor.id, {
          toolbars: [
            ['inserttable']
          ],
          autoHeightEnabled: true,
          autoFloatEnabled: true,
          lang:"zh-cn",
          focus:true
        });

        _self.ue.ready(function() {
          //设置编辑器的内容
          _self.ue.setContent(info);
        });

        _self.ue.addListener( 'keyup contentChange', function( editor ) {
            _self.contentChange()  //编辑器内容发生变化
        })
        $("#"+_self.currentEditor.id).show()
        
      },0)
        // _self.domArr.push($('.come').eq(_self.currentEditor.index).position().top + parseInt(document.getElementsByClassName("sideright")[0].scrollTop))
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // overflow-y: auto;
  background-color: #f4f6f9;
}
.container {
  width: @width-container;
  margin: 0 auto;
  overflow-y: auto;
  padding-top: 30px;
  padding-bottom: 40px;
}
ul,
li {
  list-style: none;
}
.sideleft {
  position: absolute;
  left: 0;
  top: 210px;
  margin-right: 30px;
  display: inline-block;
  vertical-align: top;
  width: 215px;
  min-height: 423px;
  background-color: #ffffff;
  box-shadow: 0px 2px 13px 1px rgba(58, 63, 80, 0.11);
  border-radius: 10px;
  padding-top: 10px;
  .end {
    height: 203px;
  }
  .end::before {
    bottom: 0;
  }
  li {
    display: block;
    height: 20px;
    margin-left: 19px;
    border-left: 1px solid #dddddd;
    position: relative;
    cursor: pointer;
  }
  li::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    border: 2px solid #dddddd;
    left: -7px;
    background-color: #ffffff;
  }
  ul {
    list-style: none;
    li {
      padding-left: 25px;
      display: block;
      text-align: left;
      margin-left: 19px;
      border-left: 1px solid #dddddd;
      position: relative;
      height: 42px;
      // line-height: 42px;
      font-family: PingFangSC-Medium;
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #606060;
      span {
        width: 30px;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #929292;
        margin-right: 5px;
        float: left;
      }
      em{
        float: left;
        width:130px;
        overflow: hidden;
        letter-spacing: 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 10px;
        font-style: normal;
      }
    }
    li.active::before {
      background-color: #278df6;
      border: 1px solid #278df6;
    }
    li::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      position: absolute;
      left: -5px;
      top: 10px;
      border: 1px solid #dddddd;
    }
  }
}
.sideright {
  margin-left: 289px;
  vertical-align: top;
  display: inline-block;
  width: 799px;
  height: 600px;
  overflow-y: auto;
  // min-height: 1370px;
  background-color: #ffffff;
  box-shadow: 0px 2px 13px 1px rgba(58, 63, 80, 0.11);
  border-radius: 10px;
  .userInfo{
    width:100%;
    min-height: 1000px;
    margin: 0 auto;
    padding: 48px 0 30px 0;
    // height: 1236px;
    background-color: #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(58, 63, 80, 0.11);
    border-radius: 10px;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #606060;
        line-height: 30px;
        padding-left: 50px;
        padding-bottom: 26px;
        border-bottom: dashed 1px #d1d1d1;
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
    .contant{
      padding-top: 40px;
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
            width: 90%;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            padding-left: 40px;
            position: relative;
            display: flex;
            span{
              display: inline-block;
              min-width: 20px;
              height: 24px;
              position: absolute;
              left: 40px;
              z-index: 100;
              padding-right: 20px;
              background: #fff;
              .firstTitle{
                font-style: normal;
              }
            }
            .solid{
                display: inline-block;
                width: 100%;
                height: 1px;
                border-top: 1px solid #d1d1d1;
                // margin: 0 22px;
                margin-top: 11px;
                vertical-align: middle;
            }
            input{
              max-width: 240px;
              // height: 26px;
              font-size: 22px;
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
        padding: 0 50px 58px 50px;
        font-size: 20px;
        min-height: 335px;
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
    }
    .baclTop{
        width: 58px;
        height: 58px;
        text-align: center;
        background-color: #d5d5d5;
	    border-radius: 2px;
        position: fixed;
        bottom: 88px;
        right: 132px;
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
.formSelectGroup {
  height: @height-formselectgroup;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4c65a4;
  flex-direction: row;
  .titleclas.el-button {
    width: 127px;
  }
  .el-button {
    width: 103px;
    height: 45px;
    background-color: #278df6;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: solid 1px #b7b7b7;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    padding: 0;
    margin: 0;
    position: relative;
    margin-right: 4px;
    i {
      font-size: 20px;
      margin-right: 6px;
    }
  }
  .formframe {
    width: 212px;
    height: 213px;
    background-color: #efefef;
    box-shadow: 0px 0px 8px 1px rgba(20, 20, 20, 0.13);
    position: absolute;
    top: 55px;
    left: -50%;
    z-index: 1;
    padding-top: 28px;
    padding-left: 25px;
    padding-right: 25px;
    text-align: left;
    table {
      width: 100%;
      height: 80%;
      border: 1px solid #fff;
      td {
        border: 1px solid #fff;
      }
    }
    .formtext {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
    }
  }
  .formframe::before {
    content: "";
    display: black;
    width: 0px;
    height: 0px;
    border-bottom: 10px solid #efefef;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    // border:10px solid black;
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.upData{
  width: 100%;
  height: 230px;
  position: relative;
  text-align: center;
  background: #fff;
  padding: 45px 0 35px;
  border-bottom: dashed 1px #cccccc;
  #formFile{
    position: absolute;
    top: 100px;
    left: 0;
    z-index: -1;
  }
  label{
    display: inline-block;
    width: 260px;
    height: 64px;
    border-radius: 2px;
    border: solid 1px #b7b7b7;
    color: #278df6;
    line-height: 30px;
    cursor: pointer;
    i{
      margin: 17px 20px 0;
      font-size: 30px;
      float: left;
    }
    span{
      margin-top: 17px;
      float: left;
      font-size: 24px;
    }
  }
  p{
    font-size: 18px;
    line-height: 24px;
    color: #a6a6a6;
    margin-top: 24px;
  }
}
.upURL{
  height: 230px;
  padding-top: 40px;
  border-bottom: dashed 1px #cccccc;
  text-align: center;
  p{
    font-size: 18px;
    color: #a6a6a6;
    text-align: center;
    margin-top: 30px;
  }
  
}
.preview{
  height: 140px;
  padding: 24px 24px 0 0;
  color: #333333;
  font-size: 20px;
  .previewImg{
    margin-top: 10px;
    min-height: 80px;
    img{
      width: 80px;
      margin-right: 12px;
    }
    img:nth-child(6n){
      margin: 0;
    }
  }
}
</style>
<style lang="less">
  .edui-editor-toolbarbox{
    display: none;
  }
  .edui-editor-bottomContainer{
    display: none;
  }
  .edui-editor-iframeholder{
    min-height: 335px;
  }
  .hint{
    line-height: 40px;
    color:#a6a6a6;
  }
  .LH .is-top{
    color:#999999;
    font-size: 22px;
  }
  .LH .upURL .el-input__inner{
    height: 44px;
  }
  .LH .el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    z-index: 1000;
  }
  .edit  td { border:1px solid #ccc; }
  .edit  table { 
    border-collapse: collapse;
  }
</style>


