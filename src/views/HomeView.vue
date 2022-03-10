<template>
<transition>
    <el-container style="min-height: 100vh;">
      <el-aside :width="asideSize+'px'" style="background-color: rgb(238, 241, 246);overflow-x: hidden;">


        <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden"
                  background-color="rgb(48,65,86)"
                  text-color="#fff"
                  active-text-color="yellow"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >
          <div style="height: 60px;line-height: 60px;color: aliceblue;text-align: center">
            <img src="../assets/logo.png" style="width: 20px;position: relative;top: 3px">
            <i>Rich_Man</i>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px;line-height: 60px;border-bottom: 1px solid #ccc;display: flex">
          <div style="flex: 1; font-size: 18px">
            <span :class="co11apseBtnclass" style="cursor: pointer" @click="co11apse"></span>
          </div>
          <el-dropdown style="width: 80px; cursor: pointer" >
            <span>王小虎</span>
            <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <el-main>
          <el-input style="width: 200px; margin-left: 5px" placeholder="请输入内容" suffix-icon="el-icon-search"/>
          <el-input style="width: 200px; margin-left: 5px" placeholder="请输入内容" suffix-icon="el-icon-message"/>
          <el-input style="width: 200px;  margin: 5px 5px 0 0" placeholder="请输入内容" suffix-icon="el-icon-position"/>
          <el-button type="primary">搜索</el-button>
          <el-table :data="tableData" border stripe>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
<!--            @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"    -->
          <el-pagination
              :page-sizes="[5, 10, 15, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>
</transition>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      tableData: Array(10).fill(item),
      co11apseBtnclass:"el-icon-s-fold",
      isCollapse:false,
      asideSize:200
    }
  },
  methods:{
    co11apse(){
      this.isCollapse=!this.isCollapse;
      if (this.isCollapse){
        this.asideSize=64;
        this.co11apseBtnclass="el-icon-s-unfold"
      }else{
        this.asideSize=200;
        this.co11apseBtnclass="el-icon-s-fold"
      }
    },
  }
}
</script>
