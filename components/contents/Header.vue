<template>
  <div class="header">
    <div class="title-box">
      <h1>webmas!</h1>
      <div class="author">
        <p>
          <img src="/twitter_icon.jpg" />
        </p>
        <div class="author-box">
          <h2>My tech blog powered by Nuxt.js</h2>
          <client-only>
            <follow-btns />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
export default class IndexPage extends Vue {}
</script>
-->
<script>
import followBtns from '~/components/ui/followBtns'
export default {
  components: {
    followBtns
  }
}
</script>
<style lang="scss">
// .header {
//   background: #1e1e1e;
//   nav {
//     max-width: 960px;
//     margin: 0 auto;
//     position: relative;
//     height: 56px;
//     h1 {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       margin: 0;
//       a {
//         background-image: linear-gradient(-125deg, #0af, #0080ff, #f0f);
//         -webkit-background-clip: text;
//         background-clip: text;
//         -webkit-text-fill-color: rgba(0, 0, 0, 0);
//         transform: translate3d(-50%, -50%, 0);
//         display: block;
//         color: #42a5f5;
//         font-size: 32px;
//         font-weight: 400;
//         font-style: italic;
//         line-height: 32px;
//         width: 125px;
//         text-decoration: none;
//       }
//     }
//   }
// }
.header {
  min-height: 70vh;
  width: 100%;
  background: url('/color-2174051.png');
  background-position: bottom center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-box {
    color: #fff;
    h1 {
      font-size: 4em;
      margin-bottom: 0.5em;
      margin-top: 0;
      font-family: Montserrat;
      line-height: 1.5;
      font-weight: bold;
      color: #fff;
      @include breakpoint-min(sm) {
        font-size: 3em;
      }
    }
    .author {
      display: flex;
      margin: 20px 0 0 0;
      p {
        margin: 0px 10px 0 0;
        img {
          width: 80px;
          border-radius: 40px;
        }
      }
      .author-box {
        display: block;
        h2 {
          font-size: 16px;
          color: #fff;
          margin: 0 0 10px;
        }
        button {
          background: #fff;
        }
      }
    }
  }
}
</style>
