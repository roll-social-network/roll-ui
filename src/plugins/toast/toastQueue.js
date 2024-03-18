import eventBus from './eventBus'
import DefaultActionButton from './actionsButtons/defaultActionButton'
import PopupLogin from './actionsButtons/popupLogin'

export default {
  components: {
    DefaultActionButton,
    PopupLogin
  },
  template:
  `
  <div class="toast-queue">
    <div
      v-for="(toast, i) in queue"
      :key="i"
      @click="close(i)"
      :class="['toast', toast.level]">
      <div class="message">{{ toast.message }}</div>
      <component
        v-if="toast.action"
        :is="actionComponent(toast.action)"
        :action="toast.action"></component>
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
    },
    actionComponent (action) {
      if (!action.component) {
        return 'default-action-button'
      }
      return action.component
    }
  }
}
