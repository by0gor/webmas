<template>
  <div>
    <Header />
    <Header2 />
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="10" xl="8">
          <breadcrumbs :add-items="addBreads" />
          <h1>Category: {{ category.fields.name }}に関する記事一覧</h1>
          <v-row v-if="relatedPosts.length">
            <v-col
              v-for="(post, i) in relatedPosts"
              :key="i"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <v-card max-width="400" class="mx-auto">
                <v-img
                  :src="setEyeCatch(post).url"
                  :alt="setEyeCatch(post).title"
                  :aspect-ratio="40 / 21"
                  max-height="200"
                  class="white--text"
                >
                </v-img>
                <v-card-title>
                  <nuxt-link :to="linkTo('posts', post)" class="top-title">{{
                    post.fields.title
                  }}</nuxt-link>
                </v-card-title>
                <v-card-text>
                  最終更新:
                  {{ post.fields.publishDate.slice(0, -12) | JPdate }}
                  <span :is="draftChip(post)" />
                </v-card-text>
                <v-card-text>
                  <template v-if="post.fields.tags">
                    <v-chip
                      v-for="tag in post.fields.tags"
                      :key="tag.sys.id"
                      :to="linkTo('tags', tag)"
                      small
                      label
                      outlined
                      class="ma-1"
                    >
                      <v-icon left size="18" color="grey">mdi-label</v-icon>
                      {{ tag.fields.name }}
                    </v-chip>
                  </template>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn text color="primary" :to="linkTo('posts', post)"
                    >この記事をみる</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <div v-else class="text-center">投稿された記事はありません。</div>
        </v-col>
      </v-row>
    </v-container>
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

export default {
  components: {
    Header,
    Header2,
    // BottomNavi,
    Footer
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
    const category =
      payload ||
      (await store.state.categories.find(
        (cat) => cat.fields.slug === params.slug
      ))
    if (category) {
      return { category }
    } else {
      return error({ statusCode: 400 })
    }
  },
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    },
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    addBreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category)
        }
      ]
    }
  },
  head() {
    return {
      title: 'webmas!｜' + this.category.fields.name + 'に関する記事',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'webmas!｜' + this.category.fields.name + 'に関する記事'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://blissful-engelbart-6c05e9.netlify.com/categories/' +
            this.category
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://images.ctfassets.net/t8ofz341rbrw/72Ohpc9TEkf1rSq28syIXj/4439e846f28deaf06375574824729a58/ogp.jpg'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'xR関連情報を中心に、夢と希望に溢れる多様な「ミライ」を技術系解説記事と併せてお届けします！主なテーマはxR, Unity, C#, 競プロ(AtCoder), web制作/運用/SEO/コンサルなど。日々の気になるトピックも随時PickUp★ twitterはこちら→@NadjaHarold'
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
}
</script>
