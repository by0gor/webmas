<template>
  <div>
    <Header />
    <Header2 />
    <v-container id="post" fluid class="ncn-container">
      <v-content class="ncn-content">
        <v-container pa-0 pa-sm-3>
          <v-row justify="center">
            <v-col cols="12" sm="11" md="12" class="pa-0 pa-sm-3">
              <v-sheet tile>
                <v-card flat tile class="transparent px-1 py-2 pa-sm-4">
                  <breadcrumbs :add-items="addBreads" />
                  <template v-if="currentPost">
                    <v-card-text class="body-2 py-1">
                      最終更新:
                      {{
                        currentPost.fields.publishDate.slice(0, -12) | JPdate
                      }}
                    </v-card-text>
                    <v-card-title>{{ currentPost.fields.title }}</v-card-title>
                    <v-img
                      :src="setEyeCatch(currentPost).url"
                      :alt="setEyeCatch(currentPost).title"
                      :aspect-ratio="40 / 21"
                      class="mx-auto"
                    />
                    <v-card-text
                      class="black-text markdown"
                      v-html="$md.render(currentPost.fields.body)"
                    ></v-card-text>
                    <homeBtn />
                    <client-only>
                      <share-btns :page-title="currentPost.fields.title" />
                      <follow-btns />
                    </client-only>
                  </template>

                  <template v-else>
                    お探しの記事は見つかりませんでした。
                  </template>
                </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-container>
    <topBtn />
    <!-- <BottomNavi /> -->
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/contents/Header'
import Header2 from '~/components/contents/Header2'
// import BottomNavi from '~/components/contents/BottomNavi'
import Footer from '~/components/contents/Footer'
import topBtn from '~/components/ui/topBtn'
import shareBtns from '~/components/ui/shareBtns'
import followBtns from '~/components/ui/followBtns'
import homeBtn from '~/components/ui/homeBtn'
import Prism from '~/plugins/prism'

export default {
  components: {
    Header,
    Header2,
    // BottomNavi,
    Footer,
    topBtn,
    shareBtns,
    followBtns,
    homeBtn
  },
  filters: {
    JPdate: (value) => {
      return (
        value.slice(0, 4) +
        '年' +
        value.slice(5, 7) +
        '月' +
        value.slice(8, 10) +
        '日'
      )
    }
  },
  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.fields.slug === params.slug))

    if (currentPost) {
      return { currentPost, category: currentPost.fields.category }
    } else {
      return error({ statusCode: 400 })
    }
  },
  // data: () => {
  //   return {
  //     renderer: null,
  //     toc: [], // 目次
  //     anchor: [0, 0, 0] // アンカー
  //   }
  // },
  computed: {
    ...mapGetters(['setEyeCatch', 'linkTo']),
    addBreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category)
        }
      ]
    },
    compiledMarkdown: () => {
      return (
        this.currentPost.fields.body,
        {
          sanitize: true,
          renderer: this.renderer
        }
      )
    }
    // created: () => {
    //   this.renderer = new this.currentPost.fields.body.Renderer()
    //   console.log(this.renderer)
    //   const vm = this
    //   this.renderer.heading = function(text, level) {
    //     const escapedText = text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    //     if (level < 4) {
    //       // h4以降は無視
    //       const anchor = vm.getAnchor(level)
    //       vm.toc.push({ level, anchor, escapedText }) // 目次オブジェクトに追加
    //       return (
    //         '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>'
    //       )
    //     } else {
    //       return '<h' + level + '>' + text + '</h' + level + '>'
    //     }
    //   }
    // }
  },
  mounted() {
    Prism.highlightAll()
  },
  head() {
    return {
      title: 'webmas!｜' + this.currentPost.fields.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'webmas!｜' + this.currentPost.fields.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.setEyeCatch(this.currentPost).url
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.currentPost.url
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.currentPost.fields.description
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        { hid: 'twitter:site', name: 'twitter:site', content: '@NadjaHarold' },
        { name: 'twitter:creator', content: '@NadjaHarold' }
      ]
    }
  }
  // created: () => {
  //   this.renderer = new currentPost.fields.body.Renderer()
  //   const vm = this
  //   this.renderer.heading = function(text, level) {
  //     const escapedText = text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
  //     if (level < 4) {
  //       // h4以降は無視
  //       const anchor = vm.getAnchor(level)
  //       vm.toc.push({ level, anchor, escapedText }) // 目次オブジェクトに追加
  //       return (
  //         '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>'
  //       )
  //     } else {
  //       return '<h' + level + '>' + text + '</h' + level + '>'
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
#app {
  background: #fafafa;
  .ncn-container {
    max-width: 1280px;
    .ncn-content {
      max-width: 960px;
    }
  }
  code {
    box-shadow: none;
    font-size: 0.9em;
    @include breakpoint-min(md) {
      font-size: 0.8em;
    }
    @include breakpoint-min(sm) {
      font-size: 0.9em;
    }
  }
  .black-text {
    color: rgba(0, 0, 0, 0.87) !important;
  }
}
#post {
  .markdown {
    font-size: 18px;
    @include breakpoint-min(md) {
      font-size: 16px;
    }
    @include breakpoint-min(sm) {
      font-size: 14px;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.4;
      font-feature-settings: 'palt';
      margin-top: 2.7em;
      margin-bottom: 1.8rem;
      z-index: 10;
      position: relative;
    }
    h2 {
      font-size: 1.5em;
      padding-bottom: 0.15em;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    h3 {
      font-size: 1.25em;
    }
    p {
      margin: 1em 0;
      line-height: 2;
      z-index: 10;
      position: relative;
    }
    ol,
    ul {
      padding-left: 1.5em;
      margin: 1.5em 0;
      line-height: 2;
    }
    blockquote {
      color: rgba(0, 0, 0, 0.54);
      padding-left: 1em;
      margin: 1.5em 0;
      border-left: 5px solid #ddd;
      p {
        margin: 0;
      }
    }
    a {
      color: #1551ad;
      text-decoration: none;
      &:visited {
        color: #6200ac;
      }
      .link {
        text-decoration: none;
      }
    }
    ul {
      list-style-type: disc;
    }
    .file {
      color: #006400;
      font-weight: 600;
    }
    img {
      vertical-align: middle;
      margin: 1.5em auto;
      max-width: 100%;
      -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
    }
  }
  .v-image {
    z-index: 10;
    position: relative;
  }
  .table-of-contents {
    ul {
      font-size: 0.875rem;
      list-style: none;
      padding-left: 0 !important;
      li {
        a {
          display: block;
          padding: 7px 10px;
          line-height: 1.4;
          color: rgba(0, 0, 0, 0.54);
          text-decoration: none;
          &:hover {
            color: #1551ad !important;
            transition: 0.3s;
            background: rgba(0, 0, 0, 0.04);
          }
          &:visited {
            color: rgba(0, 0, 0, 0.54);
          }
        }
      }
    }
  }
}
</style>
