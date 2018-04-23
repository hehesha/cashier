<template>
    <div id="home">
        <ls-header></ls-header>
        <div class="h_content">
            <ls-nav></ls-nav>
            <div class="ls-content"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
import './home.scss'
import nav from './nav/nav.vue'
import head from './head/head.vue'

export default {
  components: {
    'ls-nav': nav,
    'ls-header': head
  },
  data () {
    return {

    }
  }

}
</script>
