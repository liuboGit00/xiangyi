<template>
    <div class="clearfix">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:[
        "isLastPage","pagepation"        //是否最后一页
    ],
    created(){
          this.$emit("ajax-query", this.pagepation);
        //ajax请求
    },
  updated() {
        let self=this;
        // self.limit=false;
        // console.log(self.limit)
        // listnumber = this.pageNumber,    //一页条数
        // rownumber = 3,  //行显示数
        // offsetTop = 200, //第一条数据距离上部的距离
        let offsetTop = self.$el.children.length>0?self.$el.children[0].offsetTop:"250"; //第一条数据距离上部的距离
        let listHeight = self.$el.children.length>0?self.$el.children[0].offsetHeight:0 ;  //单个元素高度
        let listTop = self.$el.children.length>0?self.$el.children[0].offsetTop:offsetTop; //距离顶部高度
        // listTotalHeight = listnumber/rownumber*listHeight+listTop;  //总高度
        self.listTotalHeight =  self.$el.offsetHeight;  //总高度
        //  if(!self.isLastPage){
            $(".view").on("scroll",function(){
                let scrollTop = $(this).scrollTop();
                let windowHeight = $(document).height();
                    if(parseInt(scrollTop + windowHeight + 10) >= self.listTotalHeight){
                        // debugger
                        // ajax请求
                         if(!self.isLastPage){
                            //  debugger
                                // $(".view").off("scroll")
                                if(self.limit){
                                    return;
                                }
                                 self.pagepation.pageNum ++;
                                 self.limit = true;     
                                 self.$emit("ajax-query", self.pagepation);
                        }
                    }
            })
        // }
  },
  data() {
    return {
        listTotalHeight:0,
        limit:false,
        // pagepation: {
        //     //翻页配置
        //     pageNum: 1,
        //     pageSize: 15
        // },
    };
  },
  watch:{
      listTotalHeight(val,oldval){
        if(val !== oldval){
            this.limit = false;
        }
      }
  },
  methods: {

  }
};
</script>
