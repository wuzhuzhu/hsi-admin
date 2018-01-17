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
const appId = 'stncnWHr9xXbmo0EblewFqbv-gzGzoHsz'
const appKey = 'm6Dd3V7eMGLGuGRaFkOCwKUF'
AV.init({ appId, appKey })

/*
// 新建 AVUser 对象实例
var user = new AV.User();
// 设置用户名
user.setUsername('hci');
// 设置密码
user.setPassword('hcibeauty');
// 设置邮箱
user.setEmail('764591090@qq.com');
user.signUp().then(function (loginedUser) {
  console.log(loginedUser);
}, function (error) {
  console.log(error)
});
*/

