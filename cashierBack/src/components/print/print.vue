<template>
    <div class="print">
        <h2>打印小票预览</h2>
        <div class="p_content">
            <div class="p_head">
                <h3>XX超市销售单</h3>
                <span>收款员:{{cashier}} NO:{{oid}}  </span>
            </div>
            <div class="p_title">
                <span>商品名称</span>
                <span>数量</span>
                <span>金额</span>
            </div>
            <div class="o_list"  v-html="orderhtml">
                
            </div>
            <ul class="o_sum">
                <li>小计金额:<span>{{sum}}</span></li>
                <li>实收金额:<span>{{pay}}</span></li>
                <li>找回:<span>{{pay-sum}}</span></li>   
            </ul>
            <div class="o_date">
                <span>日期:{{datetime}}</span>
                <span>时间:{{time}}</span>
            </div>
            <ul class="o_footer">
                <li>为保障权益，请保留小票，多谢惠顾</li>
                <li>钱钞物品请当面点清，当月开具发票</li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
import './print.scss'
import router from 'vue-router'
import http from '../../utils/HttpService'

export default {
    beforeMount(){
        console.log(this.$route.params.id);
        http.get('printorder',{oid:this.$route.params.id}).then(res=>{
            console.log(res.body);
            var date = new Date(res.body[0].add_time);
            this.datetime=date.toLocaleDateString();
            this.time=date.toLocaleTimeString();
            console.log(date.toLocaleString( ));
            this.sum = res.body[0].total;
            this.cashier = res.body[0].operator;
            this.orderhtml=res.body.map(item=>{
            console.log(item);
            return `<ul><h3>${item['name']}</h3><li>${item['odid']}</li><li>${item['num']}</li><li>${item['num']*item['sellprice']}</li></ul>`
            }).join('');

        })
        console.log(this.orderhtml);
          },
    data(){
        return {
            oid:this.$route.params.id,
            cashier:'lala',
            orderhtml:'',
            sum:'',
            datetime:'',
            time:'',
            pay:this.$route.params.pay

        }
    },
    mounted(){

    }
}
</script>
