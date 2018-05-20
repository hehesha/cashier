<template>
    <div class="ls-nav">
       <el-row class="tac"> 
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"><router-link to="/home/addgoods">添加商品</router-link></template>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title"><router-link to="/home/goods">商品预览</router-link></template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>      
      </el-row>
      <el-row class="tac"> 
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"><router-link to="/home/employee">员工信息管理</router-link></template>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title"><router-link to="/home/adduser">添加新员工</router-link></template>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title"><router-link to="/home/updateuser">修改个人信息</router-link></template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>      
      </el-row>
            <el-row class="tac"> 
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>销售统计管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"><router-link to="/home/sellstatic">销售统计</router-link></template>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>      
          </el-row>

    </div>
</template>

<script type="text/javascript">
import './nav.scss'


export default {
  data () {
    return {
      navOpen: true
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
