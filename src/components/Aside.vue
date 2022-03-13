<template>
  <el-menu :default-openeds="['0', '1']" style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="yellow"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;color: aliceblue;text-align: center">
      <img src="../assets/logo.png" style="width: 20px;position: relative;top: 3px">
      <i>Rich_Man</i>
    </div>
<!--    <el-submenu index="2">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">导航二</span>-->
<!--      </template>-->
<!--      <el-menu-item-group>-->
<!--        <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--        <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-submenu index="2-4">-->
<!--        <template slot="title">选项4</template>-->
<!--        <el-menu-item index="2-4-1">选项4-1</el-menu-item>-->
<!--      </el-submenu>-->
<!--    </el-submenu>-->
    <el-submenu :index="index+''" v-for="(item,index) in $router.options.routes" :key="item.path" >
            <template slot="title"><i class="el-icon-menu"></i><span slot="title">{{item.name}}</span></template>
            <el-menu-item v-for="it in item.children"
                          :index="it.path"
                          :key="it.path"
                          :class="$route.path==it.path?'is-active':''"
            >{{it.name}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  props:{
    isCollapse:Boolean
  }
}
</script>
