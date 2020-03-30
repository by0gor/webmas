<template>
  <div class="bottomnavi">
    <ul>
      <li>
        <a href="/">
          <span>TOP</span>
        </a>
      </li>
      <li>
        <a href="/profile/">
          <span>Profile</span>
        </a>
      </li>
      <li>
        <a href="/codings/">
          <span>Coding</span>
        </a>
      </li>
      <li>
        <a href="/notes/">
          <span>Note</span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/NadjaHarold" target="_blank">
          <span>Twitter</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<!--
<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
export default class IndexPage extends Vue {}
</script>
-->

<style lang="scss">
// 色設定
// ============================================================
$yellow: #ffaf12;
$red: #d13b40;
$blue: #34558b;
$green: #4ec5a5;
$black: #111111;
$white: #ffffff;
$l-orange: #eaac9d;

.bottomnavi {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 91;
  transition: opacity 0.3s;
  @media only screen and (min-width: 970px) {
    display: none !important;
  }

  ul {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;

    li {
      flex-basis: 20%;
      &:nth-of-type(1) a {
        background: $red;
        &:before {
          background: url('/images/top-icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          top: 4px;
          width: 17px;
          height: 17px;
        }
      }
      &:nth-of-type(3) a {
        background: $yellow;
        &:before {
          background: url('/images/coding-icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          top: 3px;
          width: 20px;
          height: 20px;
        }
      }
      &:nth-of-type(4) a {
        background: $blue;
        &:before {
          background: url('/images/note-icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          top: 3px;
          width: 20px;
          height: 20px;
        }
      }
      &:nth-of-type(2) a {
        background: $green;
        &:before {
          background: url('/images/others-icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          top: 3px;
          width: 20px;
          height: 20px;
        }
      }
      &:nth-of-type(5) a {
        background: #1da1f2;
        &:before {
          background: url('/images/twitter-icon.svg');
          background-repeat: no-repeat;
          background-size: contain;
          top: 0px;
          width: 25px;
          height: 25px;
        }
      }
      a {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
        }
        span {
          font-size: 11px;
          font-weight: bold;
          color: $white;
          text-align: center;
          display: inline-block;
          padding-top: 25px;
        }
      }
    }
  }
}
</style>
