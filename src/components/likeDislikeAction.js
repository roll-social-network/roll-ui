import axios from 'axios'

export default {
  props: {
    postPk: Number,
    initialHasLike: Boolean
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
      const response = await axios.get(
        href,
        { headers: { 'Action-Component': 'like-dislike' } }
      )
      this.hasLike = response.status === 201
    }
  },
  template: '<a @click.prevent.stop="likeDislike()"><i :class="iconClass"></i></a>'
}
