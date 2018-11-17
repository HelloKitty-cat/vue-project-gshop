<template>
  <div>
    <router-view />
    <FooterGuide />
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html
    height 100%
    width 100%
    background pink
</style>
