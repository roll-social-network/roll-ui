import axios from 'axios'

export default {
  props: {
    postPk: Number,
    initialHasLike: Boolean,
    initialLikesCount: Number
  },
  data () {
    return {
      hasLike: this.initialHasLike
    }
  },
  computed: {
    iconClass () {
      return `fa-${this.hasLike ? 'solid' : 'regular'} fa-heart`
    }
  },
  methods: {
    async likeDislike () {
      const href = this.$el.getAttribute('href')
      try {
        const response = await axios.get(
          href,
          {
            withCredentials: true,
            headers: { 'Action-Component': 'like-dislike' }
          }
        )
        this.hasLike = response.status === 201
      } catch (axiosError) {
        const { response } = axiosError
        this.$toast.error(response.data)
      }
    }
  },
  template: `
    <a @click.prevent.stop="likeDislike()">
      <i :class="iconClass"></i>
      <watched-attr
        component="span"
        model="posts"
        attr="likes_count"
        :pk="postPk"
        :initial="initialLikesCount" />
    </a>
  `
}
