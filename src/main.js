import $ from 'jquery'
import Vue from 'vue'
//import store from './vuex/store'
import router from './router/router.js'
import App from './App.vue'

Vue.directive('datepicker', {
    inserted: (element, binding, vnode) => {
        var _datepicker = $(element).datepicker({
            language: 'zh-CN',
            pickTime: false,
            todayBtn: true,
            autoclose: true
        }).on('changeDate', (ev) => {
            var model = vnode.data.attrs['data-model'];
            if(model){
                var models = model.split('.')
                var context = vnode.context
                models.map((ele, idx) => {
                    if(idx == models.length - 1){
                        context[ele] = vnode.elm.value
                    } else {
                        context = context[ele]
                    }
                })
            }
        });
    }
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

