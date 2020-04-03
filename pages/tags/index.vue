<template>
  <div>
    <Header />
    <Header2 />
    <breadcrumbs :add-items="addBreads" />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tableItems"
              :search="search"
              :sort-by="sortBy"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              sort-desc
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:item.fields.name="{ item }">
                <v-icon size="18">mdi-tag-outline</v-icon>

                <nuxt-link :to="linkTo('tags', item)">
                  {{ item.fields.name }}
                </nuxt-link>
              </template>
            </v-data-table>
            <div class="text-center py-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="totalVisible"
                circle
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <BottomNavi />
    <Footer />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  data: () => ({
    search: '',
    sortBy: 'fields.postcount',
    itemsPerPage: 5,
    page: 1,
    pageCount: 0,
    totalVisible: 7,
    headers: [
      {
        text: 'タグ',
        align: 'left',
        value: 'fields.name'
      },
      {
        text: '投稿数',
        align: 'center',
        width: 150,
        value: 'fields.postcount'
      }
    ]
  }),
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),
    // postCount() {
    //   return (currentTag) => {
    //     return this.$store.getters.associatePosts(currentTag).length
    //   }
    // },
    addBreads() {
      return [
        {
          icon: 'mdi-tag-outline',
          text: 'タグ一覧',
          to: '/tags',
          disabled: true,
          iconColor: 'grey'
        }
      ]
    },
    tableItems() {
      const tags = []
      for (let i = 0; i < this.tags.length; i++) {
        const tag = this.tags[i]
        tag.fields.postcount = this.$store.getters.associatePosts(tag).length
        tags.push(tag)
      }
      return tags
    }
  },
  head() {
    return {
      title: 'webmas!｜タグ一覧ページ',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'webmas!｜タグ一覧ページ'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://blissful-engelbart-6c05e9.netlify.com/tags/'
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
        }
      ]
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
