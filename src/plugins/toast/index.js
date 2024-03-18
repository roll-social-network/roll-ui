import Toast from './toast'
import ToastQueue from './toastQueue'

export default {
  install: (app, options) => {
    app.component('toast-queue', ToastQueue)

    const toast = new Toast(options || {})

    app.config.globalProperties.$toast = toast
    app.provide('$toast', toast)
  }
}
