import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import homeCompont from '../components/home/home.vue'
import GoodsComponent from '../components/goods/goods.vue'
import AddGoods from '../components/addgoods/addgoods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path:'/home',
        name:'home',
        component:homeCompont,
        children:[{
            path:'goods',
            name:'goods',
            component:GoodsComponent
        },
        {
            path:'addgoods',
            name:'addgoods',
            component:AddGoods
        }]
    }
  ]
})
