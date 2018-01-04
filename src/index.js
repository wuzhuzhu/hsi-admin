import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import 'babel-polyfill'
import AV from 'leancloud-storage'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

// 7. leanCloud
const appId = 'ryBVDeMNRKzgGigb09UT7OnC-gzGzoHsz'
const appKey = 'oSWB9ovSDQREP2QaqB637WnS'
AV.init({ appId, appKey })
