export default {
  template: `
  <a
    :href="action.url"
    target="_blank"
    class="action">
    <span>{{ action.message }}</span>
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
  `,
  props: ['action']
}
