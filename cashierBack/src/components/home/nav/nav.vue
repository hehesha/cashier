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
                <template slot="title">添加商品</template>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">分组二</template>
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
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">分组二</template>
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
