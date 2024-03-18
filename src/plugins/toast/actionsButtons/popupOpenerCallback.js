export default {
  template: `
  <a
    :href="action.url"
    @click.prevent="openPopup()"
    target="_blank"
    class="action">
    <span>{{ action.message }}</span>
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
  `,
  props: ['action'],
  methods: {
    openPopup () {
      const popupId = (Math.random() + 1).toString(36).substring(2)
      const callbackMessage = `popup-opener-callback-action-button-${popupId}`
      const actionUrl = new URL(this.action.url)
      actionUrl.searchParams.append('ocm', callbackMessage)
      actionUrl.searchParams.append('oco', window.origin)
      const popup = window.open(
        actionUrl,
        popupId,
        'resizable=no, status=no, location=no, toolbar=no, menubar=no, width=400, height=400'
      )
      window.addEventListener('message', ({ data }) => {
        if (data === callbackMessage) {
          popup.close()
        }
      })
    }
  }
}
