import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import AV from 'leancloud-storage'
import { isEmpty, get } from 'lodash'
import { EnumRoleType } from 'enums'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload: {
        password,
        username,
      },
    }, { put, call, select }) {
      try {
        const loginedUser = yield AV.User.logIn(username, password)
        const { locationQuery } = yield select(_ => _.app)
        if (!isEmpty(loginedUser) &&
          get(loginedUser, 'attributes.role') === EnumRoleType.ADMIN) {
          const { from } = locationQuery
          yield put({ type: 'app/query', payload: { user: loginedUser } })
          if (from && from !== '/login' && from !== '/') {
            yield put(routerRedux.push(from))
          } else {
            yield put(routerRedux.push('/dashboard'))
          }
        } else {
          throw loginedUser
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },

}
