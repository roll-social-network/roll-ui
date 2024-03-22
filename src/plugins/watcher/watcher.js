export default class Watcher {
  constructor (options) {
    this._wsPromise = null
    this._ws = null
    this.callbacks = {}
  }

  ws () {
    if (this._ws) {
      return Promise.resolve(this._ws)
    }
    if (this._wsPromise) {
      return this._wsPromise
    }
    this._wsPromise = new Promise((resolve, reject) => {
      const ws = new WebSocket(`ws://${window.location.host}/ws/watcher/`)
      ws.onopen = () => {
        this._wsPromise = null
        this._ws = ws
        resolve(ws)
      }
      ws.onerror = (err) => {
        this._wsPromise = null
        this._ws = null
        reject(err)
      }
      ws.onclose = () => {
        this._wsPromise = null
        this._ws = null
      }
      ws.onmessage = (data) => {
        this.onMessage(data)
      }
    })
    return this._wsPromise
  }

  onMessage (event) {
    const data = JSON.parse(event.data)
    const { group_name: groupName, type, ...attrs } = data
    const groupCallbacks = this.callbacks[groupName]
    if (groupCallbacks) {
      groupCallbacks.forEach((cb) => (cb(attrs)))
    }
  }

  buildGroupName ({ model, attr, pk }) {
    const params = pk ? [model, pk, attr] : [model, attr]
    return params.join('_')
  }

  registerCallback (groupName, cb) {
    if (!this.callbacks[groupName]) {
      this.callbacks[groupName] = []
    }
    this.callbacks[groupName].push(cb)
  }

  unregisterCallback (groupName, cb) {
    const groupCallbacks = this.callbacks[groupName]
    if (!groupCallbacks) { return null }
    const i = groupCallbacks.indexOf(cb)
    groupCallbacks.splice(i, 1)
    return i
  }

  async watch (ref, newValueCallback) {
    const ws = await this.ws()
    ws.send(JSON.stringify({ ref }))
    const groupName = this.buildGroupName(ref)
    this.registerCallback(groupName, newValueCallback)
    return this.unregisterCallback.bind(this, groupName, newValueCallback)
  }
}
