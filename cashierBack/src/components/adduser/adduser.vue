<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="user" >
    <el-input v-model="ruleForm.user" autofocus=true></el-input>
  </el-form-item>
  <el-form-item label="初始密码" prop="psd">
    <el-input v-model="ruleForm.psd"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  <el-form-item label="性别" prop="gender">
    <el-select v-model="ruleForm.gender">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="员工等级" prop="rank">
    <el-select v-model="ruleForm.rank" placeholder="请选择员工权限等级">
      <el-option label="可查看" value="1"></el-option>
      <el-option label="可编辑" value="2"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="员工角色" prop="role">
    <el-select v-model="ruleForm.role">
      <el-option label="收银员" value="1"></el-option>
      <el-option label="管理员" value="2"></el-option>
      <el-option label="收银管理员" value="3"></el-option>
    </el-select>
  </el-form-item>  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  import http from '../../utils/httpService'
  export default {
    data() {
      return {
        ruleForm: {
          user:'',
          psd: '',
          name: '',
          phone: '',
          role:'1',
          rank: '1',
          size: '',
          gender:'男'
        },
        rules: {
          psd: [
            { required: true, message: '请输入初始密码', trigger: 'blur' }
          ],
          
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' ,autofocus:true}
          ]
       
        }
      };
    },
    mounted(){
      var pid=document.getElementById('pid');
      console.log(pid);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            http.post('addcashier',{user:this.ruleForm.user,psd:this.ruleForm.psd,name:this.ruleForm.name,gender:this.ruleForm.gender,phone:this.ruleForm.phone,rank:this.ruleForm.rank,role:this.ruleForm.role}).then((res)=>{
                console.log(res);
                if(res.text=='success'){
                  alert('添加成功！')
                  this.resetForm('ruleForm');
                }else if(res.text=='exist'){
                  alert('用户名已存在')
                }
                  
                
            })
                
            
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>