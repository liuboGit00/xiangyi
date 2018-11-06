<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["suspendobj"],
  data() {
    return {
      recordnumber: 0
    };
  },
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
          let html =
            '<div class="suspend">' +
            '<i type="编辑1" title="编辑：&#10;标题:       编辑3：" style="color:#fff;margin:2%;cursor:pointer;"  class="icon-logol el-icon-edit-outline"></i>' +
            '<i type="编辑2" title="编辑2" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit"></i>' +
            '<i type="编辑3" title="编辑3" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
            "</div>";
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
              });
            $(".suspend .icon-logol").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend .icon-logol").unbind("click");
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
            '<i type="编辑1" title="编辑1" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
            '<i type="编辑2" title="编辑2" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
            '<i type="编辑3" title="编辑3" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
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
              });
            $(".suspend .icon-logol").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend .icon-logol").unbind("click");
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
            case "报表查看":
              html =
                '<div class="suspend">' +
                '<i type="编辑" title="编辑" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
                '<i type="删除" title="删除" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-delete"></i>' +
                // '<i type="备注" title="备注" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-document"></i>'+
                "</div>";
              break;
            case "主题报表":
              html =
                '<div class="suspend">' +
                '<i type="编辑" title="编辑" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-edit-outline"></i>' +
                '<i type="删除" title="删除" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-delete"></i>' +
                // '<i type="备注" title="备注" style="color:#fff;margin:2%;cursor:pointer;" class="icon-logol el-icon-document"></i>'+
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
            dom.find("el-icon-document").attr("title", self.beizhu);
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
                background: "rgba(3,9,27,0.5)",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                bottom: offsetbottom
              });
            $(".suspend .icon-logol").bind("click", function(e) {
              self.$emit("select-dialog", $(this).attr("type")); //弹窗
              return false;
            });
          } else if (event.type == "mouseleave") {
            //鼠标离开
            $(".suspend .icon-logol").unbind("click");
            $(this)
              .find(".suspend")
              .remove();
          }
        });
      }
    }
    self.recordnumber = domparent.length; //记录上一次序号
  },
  components: {}
};
</script>

<style  lang="less">
</style>
