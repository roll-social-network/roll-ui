import eventBus from './eventBus'

export default class Toast {
  open (level, { message, action_message: actionMessage, action_url: actionURL, action_component: actionComponent }) {
    eventBus.emit('toast', {
      level,
      message,
      action: {
        message: actionMessage,
        url: actionURL,
        component: actionComponent
      }
    })
  }

  error (data) {
    this.open('error', data)
  }
}
