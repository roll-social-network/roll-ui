import { createApp } from 'vue/dist/vue.esm-bundler'
import LikeDislikeAction from './components/likeDislikeAction'
import InfinitePagination from './components/infinitePagination'
import LoadingIcon from './components/loadingIcon'
import Toast from './plugins/toast'
import Watcher from './plugins/watcher'
import qrCodeRender from './utils/qrCodeRender'
import copy2clipboard from './utils/copy2clipboard'
import selectPrefixPhoneNumber from './utils/selectPrefixPhoneNumber'
import './sass/main.scss'
import './fontawesome/scss/fontawesome.scss'
import './fontawesome/scss/regular.scss'
import './fontawesome/scss/solid.scss'

const timelineApp = createApp()
timelineApp.component('LikeDislikeAction', LikeDislikeAction)
timelineApp.component('InfinitePagination', InfinitePagination)
timelineApp.component('LoadingIcon', LoadingIcon)
timelineApp.use(Toast)
timelineApp.use(Watcher)
timelineApp.mount('#timeline')

const toastApp = createApp()
toastApp.use(Toast)
toastApp.mount('#toast')

qrCodeRender()
copy2clipboard()
selectPrefixPhoneNumber()
