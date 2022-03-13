<template>
<transition>
    <el-container style="min-height: 100vh;">
      <el-aside :width="asideSize+'px'" style="background-color: rgb(238, 241, 246);overflow-x: hidden;">
      <Aside :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :co11apseBtnclass="co11apseBtnclass" :co11apse="co11apse"></Header>
        </el-header>
        <el-main>
    <!--显示页面-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</transition>
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";
export default {
  name: 'HomeView',
  data() {
    return {
      co11apseBtnclass: "el-icon-s-fold",
      isCollapse: false,
      asideSize: 200,
    }
  },
  methods:{
      /**
       *  @author: rich_man
       *  @Description:
       *  菜单栏进行折叠
       */
      co11apse(){
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.asideSize = 64;
          this.co11apseBtnclass = "el-icon-s-unfold"
        } else {
          this.asideSize = 200;
          this.co11apseBtnclass = "el-icon-s-fold"
        }
      }
    },
  components: {
    Aside,
    Header
  },
}
</script>
