<template>
  <v-btn outlined color="primary" to="#" class="topBtn">
    <v-icon size="16">mdi-chevron-double-up</v-icon>
    <span class="ml-1">TOP</span>
  </v-btn>
</template>

<script>
export default {}
</script>

<style lang="scss">
#app {
  .topBtn {
    position: fixed;
    bottom: 40px;
    right: 60px;
    @include breakpoint-min(xl) {
      position: fixed;
      bottom: 40px;
      left: 800px;
      right: initial;
      z-index: 0;
    }
    @include breakpoint-min(lg) {
      // position: fixed;
      left: initial;
      right: 100px;
      bottom: 60px;
    }
    @include breakpoint-min(sm) {
      // position: fixed;
      left: initial;
      right: 20px;
      bottom: 50px;
    }
  }
}
</style>
