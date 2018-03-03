<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
//   data () {
//     return {
//       areas:[]
//     }
//   },
//   mounted(){
//     fetch('/api/areas')
//     .then(res=>res.json())
//     .then(data=>this.areas=data)
//   }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }
  
  .fade-enter-active {
    transition-delay: .25s;
  }
  
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
