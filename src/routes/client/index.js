import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import { get } from 'lodash'

import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Client = ({
  location, dispatch, client, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = client
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : { ...currentItem, ...get(currentItem, 'attributes', {}) },
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['client/update'],
    title: `${modalType === 'create' ? '创建客户' : '更新客户'}`,
    width: 900,
    okText: '确定',
    cancelText: '取消',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `client/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'client/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['client/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'client/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'client/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'client/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      dispatch({
        type: 'client/query',
        payload: value,
      })
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/client',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/client',
      }))
    },
    onAdd () {
      dispatch({
        type: 'client/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'client/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'client/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选择了 ${selectedRowKeys.length} 项 `}
            <Popconfirm title="你确认要删除选中客户的信息吗（无法恢复）?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Client.propTypes = {
  client: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ client, loading }) => ({ client, loading }))(Client)
