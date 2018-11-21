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
    },
    mounted () {
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
