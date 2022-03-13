<template>

  <div class="wrapper">
    <div
        style="margin: 120px auto; background-color: #fff; width: 350px; height: 440px; padding: 20px; border-radius: 10px">
      <div style="margin: 10px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"  size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请输入确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" size="medium" style="margin: 5px 0" prefix-icon="el-icon-s-custom"
                    v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" size="medium" style="margin: 5px 0" prefix-icon="el-icon-message"
                    v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small" autocomplete="off" @click="login">注册</el-button>
          <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register} from "@/api/login";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if (this.user.password!=this.user.confirmPassword){
            this.user.password=''
            this.user.confirmPassword=''
            this.$message.error("两次密码输入不一致！")
            return false;
          }
          register(this.user).then(response=>{
           if(response.success){
             this.$message.success("注册成功!")
           }
         })
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
  overflow: hidden;
}
</style>