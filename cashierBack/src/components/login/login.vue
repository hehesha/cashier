<template>
    <div id="ls-login">
        <img src="./timg.gif" class="l-img"/>
        <div class="l_content">
        	<div class="l-form">       		
	        	<h1>Login</h1>
	        	<el-form :model="ruleForm2" status-icon  :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm">
					  <el-form-item label="用户名" prop="user">
					    <el-input v-model.number="ruleForm2.user"></el-input>
					  </el-form-item>
					  <el-form-item label="密码" prop="pass">
					    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="角色">
					    <el-select v-model="ruleForm2.region">
					      <el-option label="收银员" value="cashier"></el-option>
					      <el-option label="管理员" value="admin"></el-option>
					    </el-select>
					  </el-form-item>			 
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
					    <el-button @click="resetForm('ruleForm2')">重置</el-button>
					  </el-form-item>
				</el-form>
        	</div>
        </div>
    </div>
</template>

<script type="text/javascript">
import './login.scss'
import http from '../../utils/HttpService'
import router from 'vue-router'

export default {
 
  data() {
  	var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          
          callback();
        }
      };
       var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
          
          callback();
        }
        
      };
   
      return {
	        ruleForm2: {
	          pass: '',
	          user: '',
	          region:'cashier'
	        },
	         rules2: {
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          user: [
	            { validator: checkUser, trigger: 'blur' }
	          ]
	        }
       }

    },
     methods: {
      submitForm(formName) {
      	this.$refs[formName].validate((valid) => {
          if (valid) {

            alert('submit!');
            // 发起请求
            console.log(JSON.parse(JSON.stringify(this.ruleForm2)));
            http.get('login',JSON.parse(JSON.stringify(this.ruleForm2))).then((res)=>{
            	// console.log(res);
              console.log(res.body,8888);
              if(res.body.length>0){
                  // 通过验证，将登陆信息存入session，跳转到对应的界面
                  sessionStorage.setItem("user", this.ruleForm2.user);
                   sessionStorage.setItem("Nickname", res.body[0].nickname);
                   sessionStorage.setItem("rank", res.body[0].rank);
                   if(this.ruleForm2.region=='cashier'){
                        this.$router.push('sell')

                   }else{
                      this.$router.push('home')

                   }

              }else{
                alert('用户名或密码错误！')
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