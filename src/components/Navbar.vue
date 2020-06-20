<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-n-purple">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active home-link" href="/">Stonk {{ symbol }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      symbolPicker: ['🌴', '🍺', '👾', '🎲', '🇹🇼', '🧬', '🔥', '🎭', '🍀'],
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