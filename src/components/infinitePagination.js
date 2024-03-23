import { h } from 'vue/dist/vue.esm-bundler'
import axios from 'axios'

export default {
  inheritAttrs: false,
  props: {
    sliceKwarg: String,
    slice: Number,
    page: Number
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.onScroll)
      this.onScroll()
    }, 1000)
  },
  unmounted () {
    this.removeListener()
  },
  data () {
    return {
      htmlContent: null,
      loading: false,
      done: false
    }
  },
  methods: {
    removeListener () {
      window.removeEventListener('scroll', this.onScroll)
    },
    onScroll () {
      const rect = this.$el.getBoundingClientRect()
      const distance = rect.top - window.innerHeight
      if (distance < 200) {
        this.next()
      }
    },
    async next () {
      this.loading = true
      const qs = new URLSearchParams()
      qs.set(this.sliceKwarg, this.slice)
      qs.set('page', this.page)
      try {
        const response = await axios.get(
          `/t/?${qs.toString()}`,
          {
            withCredentials: true,
            headers: { 'AJAX-Request': 'true' }
          }
        )
        this.loading = false
        this.htmlContent = response.data
        this.removeListener()
      } catch (e) {
        this.loading = false
      }
    }
  },
  render () {
    if (this.loading) {
      return h({
        template: `
          <div class="text-center"><loading-icon /></div>
        `
      })
    }
    if (!this.htmlContent) {
      return h('div', this.$attrs, [this.$slots.default()])
    }
    return h({
      template: this.htmlContent
    })
  }
}
