<template>
  <div class="page" style="height:100%;">
    <div class="dashboardtemplatecopy" v-html="blankdocument">123213</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$emit("blank-parent", false);
  },
  beforeMount() {
    this.blankdocument = localStorage.getItem("share");
  },
  mounted() {
    $(".footbtn").css("display", "none");
  },
  data() {
    return {
      blankdocument: ""
    };
  },
  components: {}
};
</script>

<style lang="less">
.dashboardtemplatecopy {
  position: relative;
  top: 0;
  left: 0;
  border: 1px solid;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .aside {
    display: flex;
    // flex:1;
    .template {
      flex: 1;
      display: flex;
      flex-direction: column;
      .templatelist {
        flex: 1;
        border: 1px dashed #ddd;
        margin: 5px;
        border-radius: 4px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 20px;
          color: blue;
        }
        .delete:hover {
          color: #ffffff;
          background-color: blue;
          cursor: pointer;
        }
        .addcen {
          color: green;
          font-size: 50px;
          cursor: pointer;
        }
        .addcen:hover {
          color: #278df6;
        }
      }
    }
  }
  .top {
    flex: 2;
  }
  .bot {
    display: flex;
    flex: 1;
    .template {
      flex-direction: row;
    }
  }
  .template.double {
    flex: 2;
  }
  .footbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
}
</style>

