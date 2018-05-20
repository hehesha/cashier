<template>
    <div>
        
        <datagrid api="getgoods" config="goods.txt"></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagrid.vue'
    import router from '../../router'

    export default {
        components: {
            datagrid
        }
        
      
    }
</script>