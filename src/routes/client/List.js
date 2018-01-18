import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { keyBy, get } from 'lodash'

import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import QUESTIONSMAP from '../../constants/questions'
import CARDMAP from '../../constants/cards'

const PARSED_SKINMAP = keyBy(QUESTIONSMAP.skin, 'value')
const PARSED_BODYMAP = keyBy(QUESTIONSMAP.body, 'value')
const PARSED_FACIALMAP = keyBy(QUESTIONSMAP.facial, 'value')
const PARSED_CARDMAP = keyBy(CARDMAP, 'value')

const confirm = Modal.confirm

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这个客户吗(不可恢复)？',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'attributes.name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, {
      title: '性别',
      dataIndex: 'attributes.isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? '男'
        : '女'}</span>),
    }, {
      title: '手机号',
      dataIndex: 'attributes.phone',
      key: 'phone',
    }, {
      title: '申报店',
      dataIndex: 'attributes.shop',
      key: 'shop',
    }, {
      title: '类型',
      dataIndex: 'attributes.isNewCustomer',
      key: 'isNewCustomer',
      render: text => (<span>{text
        ? '新'
        : '老'}</span>),
    }, {
      title: '电子邮件',
      dataIndex: 'attributes.email',
      key: 'email',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新/展开' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        pagination={false}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
