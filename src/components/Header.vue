<template>
<div style="display: flex;line-height: 60px;">
  <div style="flex: 1; ">
    <span :class="co11apseBtnclass" style="cursor: pointer;font-size: 18px;" @click="co11apse"></span>
    <el-breadcrumb separator="/" style="display: inline-block;padding: 12px 0 0 20px;font-size: 24px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{this.$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-dropdown style="width: 100px; cursor: pointer" >
<!-- 这个位置 el-dropdown只给第一个元素添加（鼠标经过出现子菜单）的样式-->
   <div style="display: inline-block">
     <img src="https://i1.hdslb.com/bfs/face/1393de60e5e045baedf700858fb51d873d305752.jpg@96w_96h_1c_1s.webp" styLe="width: 30px; border-radius: 50%;
      position: reLative; top: 10px; right: 5px;background-color: #272222">
     <span>{{user.nickname}}</span>
   </div>
    <i class="el-icon-arrow-down" style="margin-left: 5px;font-size: 14px"></i>
    <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
      <el-dropdown-item style="text-decoration: none;color:#272222">
        <router-link to="/userInfo">个人信息</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/login" style="text-decoration: none;color:#272222">退出</router-link>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props:{
    co11apseBtnclass:String,
    co11apse:Function
  },
  data(){
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
  }
}
</script>

<style scoped>

</style>