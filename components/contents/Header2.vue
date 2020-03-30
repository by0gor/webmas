<template>
  <div class="hide-header">
    <header :class="{ open: isActive01 }">
      <div class="h-inner">
        <div class="h-logo">
          <nuxt-link to="/">
            <div class="logo-img"></div>
          </nuxt-link>
        </div>

        <nav class="h-nav">
          <ul class="h-navlist">
            <li>
              <nuxt-link to="/profile">
                <span class="nav-en">Profile</span>
                <span class="nav-jp">プロフィール</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">
                <span class="nav-en">About</span>
                <span class="nav-jp">webmas!について</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/codings">
                <span class="nav-en">Coding</span>
                <span class="nav-jp">技術系の記事</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/notes">
                <span class="nav-en">Note</span>
                <span class="nav-jp">気になるあれこれ</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="sp-header-menu">
      <a
        class="menu-trigger"
        :class="{ active: isActive01 }"
        @click="isActive01 = !isActive01"
      >
        <span></span>
        <span></span>
        <span></span>
      </a>
      <div class="menu-color1" :class="{ menuClose: isActive01 }"></div>
      <div class="menu-color2" :class="{ menuClose: isActive01 }"></div>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
export default {
  data() {
    return {
      isActive01: false
    }
  }
}
</script>

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

.hide-header {
  .open {
    opacity: 1;
    z-index: 100;
    transition: all 0.3s;
    transform: translateX(0);
    height: 100vh;
    &:before {
      opacity: 0.6;
      transform: translateX(0);
      z-index: 0;
      transition: all 0.3s;
    }
  }
}
header {
  width: 230px;
  background: $black;
  display: table-cell;
  @media only screen and (max-width: 1680px) {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 0.3s;
    transform: translateX(-100%);
    &:before {
      content: '';
      background-color: #000000;
      display: block;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.3s;
      width: 100vw;
      opacity: 0;
      transform: translateX(-100%);
    }
  }
  .h-inner {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    max-height: 740px;
    width: 230px;
    .h-logo {
      a {
        display: block;
        position: relative;
        height: 56px;
        width: 100%;
        .logo-img {
          background: url('/images/logo_white.png');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
          position: absolute;
          width: 140px;
          height: 50px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .h-nav {
      .h-navlist {
        padding: 0;
        li {
          a {
            display: block;
            padding: 15px 0;
            position: relative;
            text-decoration: none;
            &:before {
              background-color: $white;
              content: '';
              display: block;
              height: 100%;
              pointer-events: none;
              position: absolute;
              right: 17%;
              top: 0;
              transform: skewX(-20deg) translateX(-100%);
              transition: 0.5s;
              width: 100%;
              z-index: 0;
            }
            &:hover {
              &:before {
                transform: skewX(-20deg) translateX(0);
              }
            }
            .nav-en {
              font-size: 18px;
              font-weight: bold;
              color: $white;
              padding: 0 0 0 10px;
              display: block;
              transition: 0.3s;
            }
            .nav-jp {
              font-size: 12px;
              font-weight: bold;
              color: $white;
              padding: 5px 0 0 10px;
              display: block;
              transition: 0.3s;
            }
          }
          &:nth-of-type(1) {
            a {
              background: $red;
              &:hover {
                span {
                  color: $red;
                  position: relative;
                  transition: 0.3s;
                }
              }
            }
          }
          // &:nth-of-type(2){
          //   a{
          //     background: $l-orange;
          //     &:hover{
          //       span{
          //         color: $l-orange;
          //         position: relative;
          //         transition: .3s;
          //       }
          //     }
          //   }
          // }
          &:nth-of-type(2) {
            a {
              background: $yellow;
              &:hover {
                span {
                  color: $yellow;
                  position: relative;
                  transition: 0.3s;
                }
              }
            }
          }
          &:nth-of-type(3) {
            a {
              background: $blue;
              &:hover {
                span {
                  color: $blue;
                  position: relative;
                  transition: 0.3s;
                }
              }
            }
          }
          &:nth-of-type(4) {
            a {
              background: $green;
              &:hover {
                span {
                  color: $green;
                  position: relative;
                  transition: 0.3s;
                }
              }
            }
          }
        }
      }
    }
  }
}
.sp-header-menu {
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  overflow: hidden;
  display: none;
  @media only screen and (max-width: 1680px) {
    display: block;
  }
  .menu-trigger {
    display: inline-block;
    transition: all 0.4s;
    box-sizing: border-box;
    position: relative;
    width: 35px;
    height: 25px;
    margin: 16px 10px;
    z-index: 101;
    span {
      display: inline-block;
      transition: top 0.8s, transform 0.8s, bottom 0.8s, opacity 0.8s,
        left 0.5s 0.8s;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: $white;
      border-radius: 2px;

      &:nth-of-type(1) {
        top: 0;
      }
      &:nth-of-type(2) {
        top: 11px;
      }
      &:nth-of-type(3) {
        bottom: 0;
      }
    }
  }

  .menu-color1 {
    width: 28px;
    height: 56px;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    &:before,
    &:after {
      content: '';
      display: block;
      width: 28px;
      height: 28px;
      pointer-events: none;
      position: absolute;
      transition: 0.3s;
      z-index: 1;
    }
    &:before {
      background-color: $red;
      left: 0;
      top: 0;
    }
    &:after {
      background-color: $yellow;
      left: 0;
      bottom: 0;
    }
  }
  .menu-color2 {
    width: 28px;
    height: 56px;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    &:before,
    &:after {
      content: '';
      display: block;
      width: 28px;
      height: 28px;
      pointer-events: none;
      position: absolute;
      transition: 0.3s;
      z-index: 1;
    }
    &:before {
      background-color: $blue;
      right: 0;
      top: 0;
    }
    &:after {
      background-color: $green;
      right: 0;
      bottom: 0;
    }
  }
  .menuClose {
    &:nth-of-type(1) {
      &:before {
        transform: translateY(100%);
      }
      &:after {
        transform: translateX(100%);
      }
    }
    &:nth-of-type(2) {
      &:before {
        transform: translateX(-100%);
      }
      &:after {
        transform: translateY(-100%);
      }
    }
  }
  .menu-trigger.active span:nth-of-type(1) {
    -webkit-transform: translateY(20px) rotate(-720deg);
    transform: translateY(20px) rotate(-720deg);
    top: -3px;
    left: -5px;
  }
  .menu-trigger.active span:nth-of-type(2) {
    opacity: 0;
  }
  .menu-trigger.active span:nth-of-type(3) {
    -webkit-transform: translateY(-20px) rotate(720deg);
    transform: translateY(-20px) rotate(720deg);
    bottom: -3px;
    left: 5px;
  }

  /*波紋*/
  .menu-trigger::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    content: '';
    width: 15px;
    height: 15px;
    margin: -8px 0 0 -8px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.1s;
    opacity: 0;
  }
  .menu-trigger.active::after {
    -webkit-animation: circle 0.6s;
    animation: circle 0.6s;
  }
  @-webkit-keyframes circle {
    0% {
      -webkit-transform: scale(0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(3.5);
      opacity: 0;
    }
  }
  @keyframes circle {
    0% {
      transform: scale(0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(3.5);
      opacity: 0;
    }
  }
}
</style>
