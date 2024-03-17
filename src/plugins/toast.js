import mitt from 'mitt'

const eventBus = mitt()

class Toast {
  open (level, { message, action_message: actionMessage, action_url: actionURL }) {
    eventBus.emit('toast', {
      level,
      message,
      action: {
        message: actionMessage,
        url: actionURL
      }
    })
  }

  error (data) {
    this.open('error', data)
  }
}

const ToastQueue = {
  template:
  `
  <div class="toast-queue">
    <div
      v-for="(toast, i) in queue"
      :key="i"
      @click="close(i)"
      :class="['toast', toast.level]">
      <div class="message">{{ toast.message }}</div>
      <a
        v-if="toast.action"
        v-bind:href="toast.action.url"
        class="action">
        <span>{{ toast.action.message }}</span>
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  </div>
  `,
  data () {
    return {
      queue: []
    }
  },
  mounted () {
    eventBus.on('toast', (data) => {
      this.queue.push(data)
    })
  },
  beforeDestroy () {
    eventBus.off('toast')
  },
  methods: {
    close (i) {
      this.queue.splice(i, 1)
    }
  }
}

export default {
  install: (app, options) => {
    app.component('toast-queue', ToastQueue)

    const toast = new Toast()

    app.config.globalProperties.$toast = toast
    app.provide('$toast', toast)
  }
}
