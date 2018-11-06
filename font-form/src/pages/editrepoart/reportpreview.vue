<template>
  <div class="page" style="height:100%;">
    <div class="dashboardtemplatecopy" v-html="blankdocument">123213</div>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("blank-parent", false);
  },
  beforeMount() {
    this.blankdocument = localStorage.getItem("reportshare");
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem("items"));
    this.items.forEach((obj, index) => {
      $("#" + obj.headerid).val(obj.header);
      $("#" + obj.Infoid).val(obj.info);
      $("#" + obj.descriptionid).val(obj.description);
      if (obj.dataType !== 3) {
        $("#" + obj.Graphid).html(obj.reportFormsTitle);
      } else {
        let img = "<img src=" + obj.src + " width='100%' height='100%' />";
        $("#" + obj.Graphid).html(img);
      }
    });
    $(".footbtn").css("display", "none");
  },
  data() {
    return {
      blankdocument: "",
      items: ""
    };
  },
  components: {}
};
</script>

<style lang="less">
.dashboardtemplatecopy {
  border: 1px solid #ddd;
  width: 100%;
  min-height: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  .underlinehead {
    height: 40px;
    font-size: 20px;
    margin-left: -9px;
    margin-right: -9px;
    color: #4b63a7;
    text-align: center;
    border-bottom: 1px dashed #ddd;
  }
  .contents {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .lists {
      border: 1px solid #eee;
      min-width: 320px;
      min-height: 215px;
      width: 3.05rem;
      height: calc(3.05rem - 100px);
      margin: 17px 0px;
      float: left;
      box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
      padding-top: 10px;
      // width: 26%;
      // border: 1px solid #ddd;
      // margin-top:20px;
      // min-height: 300px;
      display: flex;
      flex-direction: column;
      // .childlists{
      .header {
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        span {
          display: block;
          font-size: 25px;
        }
        span:first-child {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 3px;
        }
        input {
          display: inline-block;
          width: 100%;
          font-size: 12px;
          color: #999999;
          border: 1px solid #eee;
        }
        input:nth-child(2) {
          font-size: 25px;
          color: #1f1f1f;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
      }
      .graphe {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: green;
        font-size: 50px;
        position: relative;
        .formcontent {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: rgba(21, 15, 15, 0.28);
        }
        .delete {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          color: #ffffff;
        }
        .delete:hover {
          color: #ffffff;
          background-color: #2182e7;
          cursor: pointer;
        }
      }
      .footer {
        // padding:15px 25px;
        position: relative;
        // flex:0.3;
        height: 30%;
        border-top: 1px dashed #ddd;
        padding: 15px 35px 15px 25px;
        textarea {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          resize: none;
          border: 1px solid #eee;
          font-size: 12px;
          color: #999999;
          line-height: 18px;
          letter-spacing: 1px;
        }
        .scrollby {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 15px 10px 15px 0;
          span {
            cursor: pointer;
          }
        }
      }
      // }
    }
  }
}
.emptyformgroup {
  background: #4b63a7;
  margin-left: -40px;
  margin-right: -40px;
  margin-top: -30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .topsuspend {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(250, 250, 250, 0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .childsuspend {
      display: inline-block;
      // width:100px;
      // height:50px;
      // background-color: #278df6;
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      button {
        color: #fff;
      }
      .tooltip {
        position: absolute;
        top: 140%;
        width: 600px;
        min-height: 200px;
        background-color: #fff;
        display: none;
        padding: 20px;
        .echartstype {
          display: inline-block;
          width: 10%;
          float: left;
          img {
            width: 100%;
          }
        }
        .filter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .filter-btn {
          display: flex;
          justify-content: space-between;
        }
        .filter-btn::after {
          content: " ";
          width: 25%;
        }
        .filter-btn button {
          width: 25%;
          margin-bottom: 10px;
          margin-left: 0;
          float: left;
        }
        .filter-btn button.middle {
          margin-right: 12.5%;
          margin-left: 12.5%;
        }
        .filter-img {
          .part {
            display: flex;
            flex-direction: column;
            width: 25%;
            height: auto;
            min-height: 1px;
            float: left;
            img {
              width: 100%;
            }
          }
          .middle {
            margin-right: 12.5%;
            margin-left: 12.5%;
          }
        }
        .filter-foot {
          text-align: right;
          margin-top: 20px;
        }
      }
      .tooltip::after {
        content: " ";
        display: block;
        width: 1px;
        height: 1px;
        position: absolute;
        top: -10px;
        left: 50%;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
      }
    }
  }
}
.addelement {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
}
</style>


