<template>
  <div>
    <Header />
    <Header2 />
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="10" xl="8">
          <breadcrumbs :add-items="addBreads" />
          <h1>Tag: {{ tag.fields.name }}に関する記事一覧</h1>
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
                  <v-card-text>
                    <v-chip
                      small
                      dark
                      :color="categoryColor(post.fields.category)"
                      :to="linkTo('categories', post.fields.category)"
                      class="font-weight-bold"
                      >{{ post.fields.category.fields.name }}</v-chip
                    >
                  </v-card-text>
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
    <BottomNavi />
    <Footer />
  </div>
</template>

<script>
// import client from '~/plugins/contentful'
import { mapGetters } from 'vuex'
import Header from '~/components/contents/Header'
import Header2 from '~/components/contents/Header2'
import BottomNavi from '~/components/contents/BottomNavi'
import Footer from '~/components/contents/Footer'

export default {
  components: {
    Header,
    Header2,
    BottomNavi,
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
  asyncData({ payload, params, error, store, env }) {
    const tag =
      payload || store.state.tags.find((tag) => tag.fields.slug === params.slug)
    // let tag = payload
    // if (!tag) {
    //   for (let i = 0; i < store.state.posts.length; i++) {
    //     const tags = store.state.posts[i].fields.tags
    //     if (tags) tag = tags.find((tag) => tag.fields.slug === params.slug)
    //     if (tag) break
    //   }
    // }
    if (tag) {
      const relatedPosts = store.getters.associatePosts(tag)
      // const relatedPosts = await client
      //   .getEntries({
      //     content_type: env.CTF_BLOG_POST_TYPE_ID,
      //     'fields.tags.sys.id': tag.sys.id
      //   })
      //   .then((res) => res.items)
      //   // eslint-disable-next-line
      //   .catch(console.error)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  },
  computed: {
    addBreads() {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags' }]
    },
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    categoryColor() {
      return (category) => {
        switch (category.fields.name) {
          case 'Nuxt.js':
            return '#236244'
          case 'Untitled':
            return 'primary'
          default:
            return 'grey darken-3'
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  background: #fafafa;
  .top-title {
    text-decoration: none;
  }
}
</style>
