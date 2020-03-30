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
    <BottomNavi />
    <Footer />
  </div>
</template>

<script>
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
  }
}
</script>
