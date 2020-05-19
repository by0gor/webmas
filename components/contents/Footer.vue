<template>
  <footer>
    <section>
      <small>© 2020 webmas.</small>
    </section>
  </footer>
</template>

<!--
<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
export default class IndexPage extends Vue {}
</script>
-->

<style lang="scss">
// footer {
//   background: #1e1e1e;
//   // @include breakpoint-min(md) {
//   // }
//   small {
//     display: block;
//     width: 200px;
//     margin: 0 auto;
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 32px;
//     text-align: center;
//     color: #ffffff;
//   }
// }
footer {
  min-height: 20vh;
  width: 100%;
  background: url('/color-2174051.png');
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  @include breakpoint-min(lg) {
  }
  small {
    display: block;
    width: 200px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 32px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
