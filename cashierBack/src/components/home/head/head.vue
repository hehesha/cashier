<template>
    <div class="ls-header">
        <h2>超市收银后台管理系统</h2>
        <span>欢迎您：<b>{{user}}</b></span>
    </div>
</template>

<script type="text/javascript">
import './head.scss'
// import $ from 'jquery'

export default {
	beforeMount(){
		 var username = sessionStorage.getItem("user");
              var nickname = sessionStorage.getItem("Nickname");
              console.log(username,nickname);
              this.user=nickname? nickname : username;
          },
          data(){
          	return {
          		user:''
          	}
          }
}
</script>
