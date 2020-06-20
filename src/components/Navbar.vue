<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-n-purple text-center">
      <div class="container-fluid">
      <!-- <div class="text-center"> -->
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active home-link" href="/"></a>
            </li>
          </ul>
        </div> -->
      <!-- </div> -->
        <div class="mx-auto">
          <a class="navbar-brand mx-auto" href="/">Stonks {{ symbol }}</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      symbolPicker: ['𝐈', '❤️𝐊', '🍎', '🖤', '🌴', '🍺', '👾', '🎲', '🇹🇼', '🧬', '🔥', '🎭', '🍀'],
      symbol: '',
    }
  },
  created() {
    this.symbol = this.symbolPicker[Math.floor(Math.random() * this.symbolPicker.length)];
  }
}
</script>

<style lang="scss">
  .home-link {
    font-size: 1.5rem;
  }
</style>