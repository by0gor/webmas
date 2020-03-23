import defaultEyeCatch from '~/assets/images/defaultEyeCatch.jpg'

export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields)
      return {
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  draftChip: () => (post) => {
    if (!post.fields.publishDate) return 'draftChip'
  }
}
