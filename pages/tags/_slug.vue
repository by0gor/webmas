<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.name }}</h1>
    <div v-for="(post, i) in relatedPosts" :key="i">
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
// import client from '~/plugins/contentful'

export default {
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
    }
  }
}
</script>
