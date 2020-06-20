<template>
  <div id="app">
    <Navbar/>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }  
}
</script>

<style lang="scss">
@import './assets/scss/all'
</style>
