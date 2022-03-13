<template>
<div>
  <!--对话框-->
  <el-dialog title="用户新增" :visible.sync="dialogVisbile" >
    <el-form :model="form" ref="ruleForm" :rules="rules" size="mini">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  label="密码" v-show="showPassword" :label-width="formLabelWidth" prop="password">
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

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDiaLog">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>


  <div>
    <el-input style="width: 200px;"
              placeholder="请输入用户名"
              suffix-icon="el-icon-search"
              v-model="userinfo.username"/>
    <el-input style="width: 200px; margin-left: 5px"
              placeholder="请输入邮箱"
              suffix-icon="el-icon-message"
              v-model="userinfo.email"
    />
    <el-input style="width: 200px;  margin: 5px 5px 0 5px"
              placeholder="请输入地址"
              suffix-icon="el-icon-position"
              v-model="userinfo.address"
    />
    <el-button type="primary" @click="searchUser">搜索</el-button>
  </div>
  <div style="margin: 7px 0 7px 0 ;">
    <el-button type="primary" @click="addUser">添加 &nbsp;<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-button type="danger" @click="delUsers">批量删除 &nbsp;<i class="el-icon-remove-outline"></i></el-button>
    <el-upload
        action="http://localhost:8888/user/import"
        :show-file-list="false"
        accept="xlsx"
        :on-success="importSuccess"
        style="display: inline-block;margin: 0px 5px 0 5px">
    <el-button type="primary">导入&nbsp;<i class="el-icon-upload2"></i></el-button>
    </el-upload>
    <el-button type="primary" @click="exp">导出 &nbsp;<i class="el-icon-download"></i></el-button>
  </div>
  <el-table
      ref="multipleTable"
      :data="UserData"
      tooltip-effect="dark"
      style="width: 100%;text-align: center"
      @selection-change="handleSelectionChange"
      border
      stripe
  >
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column prop="id" label="编号" width="90">
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="140">
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120">
    </el-table-column>
    <el-table-column prop="email" label="邮箱">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column prop="phone" label="电话" >
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button type="success" @click="editUser(scope.row)">编辑 <i class="el-icon-edit"> </i></el-button>
        <el-button type="danger" @click="delUserOne(scope.row)">删除 <i class="el-icon-delete-solid"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
</div>
</template>

<script>
import {addUser, delUser, editUser, getUsers} from "@/api/user";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      UserData: [],
      total: 0,
      multipleSelectionId: [],
      page: {
        pageSize: 5,
        pageNo: 1
      },
      userinfo: {
        username: '',
        email: '',
        address: ''
      },
      form: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
      },
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
      dialogVisbile: false,
      showPassword: true
    }
  },
  methods:{
    handleSelectionChange(val) {
      if (val.length>0){
        for (var i = 0; i < val.length; i++) {
          this.multipleSelectionId[i]=val[i].id
        }
        //let ids = this.multipleSelection.map(v => v.id)
      }else{
        this.multipleSelectionId=val;
      }
    },
    /**
     *  @author: rich_man
     *  @Description:
     *  当改变pageSize触发的事件
     */
    handleSizeChange(pageSize){
      this.page.pageSize=parseInt(pageSize);
      this.getUsers();
    },
    /**
     *  @author: rich_man
     *  @Description:
     *  切换pageNo时触发该事件，自动获取参数pageNo
     */
    handleCurrentChange(pageNo){
      this.page.pageNo=parseInt(pageNo);
      this.getUsers();
    },
    getUsers(){
      getUsers(this.page,this.userinfo).then((respone)=>{
        if (respone.success){
          this.UserData=respone.data.userList;
          this.total=respone.data.total;
        }
      })
      this.userinfo={}
    },
    searchUser(){
      this.getUsers();
    },
    showDiaLog(){
      this.dialogVisbile=!this.dialogVisbile;
      if(!this.dialogVisbile){
        this.form={}
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(!valid&&!this.form.password){
          editUser(this.form).then(respone=>{
            if(respone.success){
              this.getUsers();
              this.$message.success("更新成功！")
              this.showDiaLog();
            }
          })
          this.form={}
        } else if (valid) {
          addUser(this.form).then(response=>{
            if (response.success){
              this.dialogVisbile=false;
              alert("用户添加成功！");
              this.getUsers();
              this.form={}
            }else{
              this.form={}
            }
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    editUser(user){
      this.form=user;
      this.showPassword=false;
      this.showDiaLog();
    },
    addUser(){
      this.showPassword=true;
      this.showDiaLog();
    },
    delUserOne(user){
      delUser([user.id]).then(response=>{
        if (response.success){
          this.getUsers();
        }
      })
    },
    delUsers(){
      delUser(this.multipleSelectionId).then(response=>{
        if (response.success){
          this.getUsers();
        }
      })
    },
    exp(){
     window.open("http://localhost:8888/user/export")
    },
    importSuccess(response,file){
      this.$message.success("文件[ "+file.name+" ]上传成功! 成功添加"+response.data+"用户！")
      this.getUsers();
    }



  },
  mounted(){
    this.getUsers();
  }
}
</script>

<style scoped>

</style>