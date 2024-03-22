import Watcher from './watcher'
import WatchedAttr from './components/watchedAttr'

export default {
  install: (app, options) => {
    app.component('watched-attr', WatchedAttr)

    const watcher = new Watcher(options || {})
    app.config.globalProperties.$watcher = watcher
    app.provide('$watcher', watcher)
  }
}
