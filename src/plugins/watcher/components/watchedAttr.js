export default {
  props: [
    'component',
    'model',
    'attr',
    'pk',
    'initial'
  ],
  data () {
    return {
      value: this.initial
    }
  },
  async mounted () {
    this.unregister = await this.$watcher.watch({
      model: this.model,
      attr: this.attr,
      pk: this.pk
    }, (attrs) => {
      this.value = attrs[this.attr]
    })
  },
  unmounted () {
    this.unregister()
  },
  template: `
    <component :is="component">{{value}}</component>
  `
}
