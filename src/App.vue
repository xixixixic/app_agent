<template>
  <div id="app">
    <router-view></router-view>   
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    created () {
      this.SET_INIT()
    },
    methods: {
      ...mapMutations({
        SET_INIT: 'SET_INIT'
      })
    }
  }
</script>