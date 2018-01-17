/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { get } from 'lodash'
import { create, remove, update } from 'services/client'
import * as usersService from 'services/client'
import { pageModel } from './common'

const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'client',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/client') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      try {
        const res = yield call(remove, [payload])
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } catch (err) {
        throw err
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      try {
        const res = yield call(usersService.remove, payload)
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } catch (err) {
        throw err
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data._hasData) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        console.error(data)
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const objectId = yield select(state => get(state, 'client.currentItem.id'))
      const data = yield call(update, payload, objectId)
      if (data.id) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
