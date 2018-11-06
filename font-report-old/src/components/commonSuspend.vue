<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["suspendobj"],
  updated() {
    let self = this,
      show = this.suspendobj.show,
      offsetbottom = this.suspendobj.offsetbottom
        ? this.suspendobj.offsetbottom
        : 0, //遮罩层距离底部距离
      offsettop = this.suspendobj.offsettop ? this.suspendobj.offsettop : 0, //遮罩层距离底部距离
      domparent = $(self.$el)
        .find(".content-frame")
        .children(); //遮罩层要显示的元素的父元素
    // debugger
    domparent.css("overflow", "hidden");
    if (show == false) {
      return;
    }
    for (var i = domparent.length - 1; i >= self.recordnumber; i--) {
      //从最新的添加到上次记录的
      if (self.suspendobj.position == "top") {
        //遮罩层在上
        $(domparent[i]).on("mouseenter mouseleave", function(event) {
          //添加的遮罩上面的部件
          let html = "";
          switch (self.suspendobj.name) {
            case "报告接收":
              html =
                '<div class="suspend">' +
                '<i type="删除" title="删除"  class="iconfont icon-shanchu"></i>' +
                '<i type="修改" title="修改标题"  class="iconfont icon-bianji"></i>' +
                "</div>";
              break;
          }
          if (event.type == "mouseenter") {
            // 鼠标悬浮
            let dom = ""; //遮罩层判断class范围
            if ($(this).attr("class") == self.suspendobj.domClass) {
              dom = $(this);
            } else {
              dom = $(this).find("." + self.suspendobj.domClass);
            }
            dom.append(html);
            dom
              .css("position", "relative")
              .find(".suspend")
              .css({
                //遮层css
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "40px",
                background: "rgba(3,9,27,0.5)",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                top: offsettop
              })
              .find("i")
              .css({
                // "background":"rgba(66,63,63,0.8)",
                padding: "10px",
                "border-radius": "50%",
                cursor: "pointer",
                margin: "0 5px",
                "font-size": "20px",
                color: "#ffffff"
              });
            $(".suspend i").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend i").unbind("click");
            $(this)
              .find(".suspend")
              .remove();
          }
        });
      }
      if (self.suspendobj.position == "middle") {
        //遮罩层在中
        $(domparent[i]).on("mouseenter mouseleave", function(event) {
          let html =
            '<div class="suspend">' +
            '<i type="编辑1" title="编辑1" class="icon-logol el-icon-edit-outline"></i>' +
            '<i type="编辑2" title="编辑2" class="icon-logol el-icon-edit-outline"></i>' +
            '<i type="编辑3" title="编辑3" class="icon-logol el-icon-edit-outline"></i>' +
            "</div>";
          if (event.type == "mouseenter") {
            // debugger
            // 鼠标悬浮
            let dom = ""; //遮罩层判断class范围
            if ($(this).attr("class") == self.suspendobj.domClass) {
              dom = $(this);
            } else {
              dom = $(this).find("." + self.suspendobj.domClass);
            }
            dom.append(html);
            dom
              .css("position", "relative")
              .find(".suspend")
              .css({
                //遮层css
                position: "absolute",
                top: "50%",
                left: "0",
                width: "100%",
                height: "40px",
                background: "rgba(3,9,27,0.2)",
                transform: "translate(0,-50%)",
                display: "flex",
                "justify-content": "center",
                "align-items": "center"
              })
              .find("i")
              .css({
                background: "rgba(66,63,63,0.8)",
                padding: "10px",
                "border-radius": "50%",
                cursor: "pointer",
                margin: "0 5px",
                "font-size": "20px"
              });
            $(".suspend i").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend i").unbind("click");
            $(this)
              .find(".suspend")
              .remove();
          }
        });
      }
      if (self.suspendobj.position == "bottom") {
        //遮罩层在下
        $(domparent[i]).on("mouseenter mouseleave", function(event) {
          let html = "";
          switch (self.suspendobj.name) {
            case "报告查看":
              html =
                '<div class="suspend">' +
                '<i type="编辑" title="编辑模块"  class="iconfont icon-icon-edit"></i>' +
                '<i type="删除" title="删除"  class="iconfont icon-shanchu"></i>' +
                '<i type="修改" title="修改标题备注"  class="iconfont icon-bianji"></i>' +
                "</div>";
              break;
            case "报告发布":
              html =
                '<div class="suspend">' +
                // '<i type="编辑" title="编辑模块"  class="iconfont icon-icon-edit"></i>'+
                '<i type="删除" title="删除"  class="iconfont icon-shanchu"></i>' +
                "</div>";
              break;
          }

          if (event.type == "mouseenter") {
            // 鼠标悬浮
            let dom = ""; //遮罩层判断class范围
            if ($(this).attr("class") == self.suspendobj.domClass) {
              dom = $(this);
            } else {
              dom = $(this).find("." + self.suspendobj.domClass);
            }

            dom.append(html);
            dom
              .css("position", "relative")
              .find(".suspend")
              .css({
                //遮层css
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "40px",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                bottom: offsetbottom
              })
              .find("i")
              .css({
                background: "rgba(66,63,63,0.8)",
                padding: "10px",
                "border-radius": "50%",
                cursor: "pointer",
                margin: "0 5px",
                "font-size": "20px",
                color: "#ffffff"
              });
            if (self.suspendobj.editshowflag) {
              //报告查看页面合并后的报告不能显示编辑按钮
              dom
                .find(".suspend")
                .find("i[type='编辑']")
                .css("display", "none");
            }
            $(".suspend i").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend i").unbind("click");
            $(this)
              .find(".suspend")
              .remove();
          }
        });
      }
    }
    self.recordnumber = domparent.length; //记录上一次序号
  },
  data() {
    return {
      recordnumber: 0
    };
  },
  components: {}
};
</script>

