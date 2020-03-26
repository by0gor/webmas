<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" />
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <v-img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).title"
        :aspect-ratio="40 / 21"
        width="700"
        height="400"
        class="mx-auto"
      />
      <!-- {{ dateFormat(currentPost.fields.publishDate, 'YYYY/MM/DD hh:mm:ss') }} -->
      {{ currentPost.fields.publishDate }}
      <br />
      <div v-html="$md.render(currentPost.fields.body)">
        {{ currentPost.fields.body }}
      </div>
      <client-only>
        <share-btns :page-title="currentPost.fields.title" />
        <follow-btns />
      </client-only>
    </template>

    <template v-else>お探しの記事は見つかりませんでした。</template>

    <div>
      <v-btn outlined color="primary" to="/">
        <v-icon size="16">fas fa-angle-double-left</v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import parse from 'date-fns/parse'
import shareBtns from '~/components/ui/shareBtns'
import followBtns from '~/components/ui/followBtns'
import Prism from '~/plugins/prism'

// import client from '~/plugins/contentful'

export default {
  components: {
    shareBtns,
    followBtns
  },
  // async asyncData({ env, params }) {
  //   let currentPost = null
  //   await client
  //     .getEntries({
  //       content_type: env.CTF_BLOG_POST_TYPE_ID,
  //       'fields.slug': params.slug
  //     })
  //     .then((res) => (currentPost = res.items[0]))
  //     .catch(console.error)

  //   return { currentPost }
  // },
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
  computed: {
    ...mapGetters(['setEyeCatch', 'linkTo']),
    // breadcrumbs() {
    //   const category = this.currentPost.fields.category
    //   return [
    //     { text: 'ホーム', to: '/' },
    //     { text: category.fields.name, to: '#' }
    //   ]
    // }
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
  mounted() {
    Prism.highlightAll()
  },
  methods: {
    dateFormat: (date = new Date(), formatStr) => {
      return format(parse(date), formatStr, { locale: ja })
    }
  }
}
</script>
<style>
code {
  box-shadow: none !important;
}
</style>
