<template>
  <el-card style="height: 50vh;padding-left: 300px">
    <el-form :model="form" ref="ruleForm"  :rules="rules" style="width: 500px">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  label="密码"  :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item> <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item> <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item style="float: right">
      <el-button @click="$router.push('/user')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </el-form-item>
    </el-form>

  </el-card>
</template>

<script>
import {getUserInfo,editUser} from "@/api/user";
export default {
  name: "PersonInfo",
  data(){
    return{
      form: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      },
      formLabelWidth: '120px',
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        editUser(this.form).then(respone=>{
          if(respone.success){
            this.$message.success("更新成功！")
            this.$router.push('/user')
          }
        })
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {
    getUserInfo(this.user.id).then(response=>{
      if (response.success){
        this.form=response.data;
      }
    })
  }
}
</script>

<style scoped>

</style>