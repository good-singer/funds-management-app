<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: "app",
  components: {},
  created(){
    if(localStorage.fmToken) {
      const decoded = jwt_decode(localStorage.fmToken);
      // token存储到vuex
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style>
body,
#app {
  width: 100%;
  height: 100%;
}
/* 解决表头与内容列不对齐问题 */
/* .el-table th.gutter{
  display: table-cell !important;
} */
/* ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
} */
/* 滚动条的滑块 */
/* ::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
} */

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #fff;
}
::-webkit-scrollbar-thumb {
    border-radius:5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1)
}
</style>
