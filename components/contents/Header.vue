<template>
  <div class="header">
    <section>
      <nav>
        <h1>
          <a href="/">webmas</a>
        </h1>
      </nav>
    </section>
  </div>
</template>

<!--
<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
export default class IndexPage extends Vue {}
</script>
-->

<style lang="scss">
.header {
  background: #1e1e1e;
  nav {
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    height: 56px;
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      a {
        background-image: linear-gradient(-125deg, #0af, #0080ff, #f0f);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: rgba(0, 0, 0, 0);
        transform: translate3d(-50%, -50%, 0);
        display: block;
        color: #42a5f5;
        font-size: 32px;
        font-weight: 400;
        font-style: italic;
        line-height: 32px;
        width: 125px;
        text-decoration: none;
      }
    }
  }
}
</style>
