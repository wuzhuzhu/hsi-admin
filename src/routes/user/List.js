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
        title: 'Are you sure delete this record?',
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
      title: '生日',
      dataIndex: 'attributes.birthDate',
      key: 'birthDate',
      render: (text, record) => `${text.getFullYear()}/${text.getMonth() + 1}/${text.getDate()}`,
    }, {
      title: '性别',
      dataIndex: 'attributes.gender',
      key: 'gender',
      render: text => (<span>{text === 'female'
        ? '女'
        : '男'}</span>),
    }, {
      title: '手机号',
      dataIndex: 'attributes.phone',
      key: 'phone',
    }, {
      title: '面部',
      dataIndex: 'attributes.facial',
      key: 'facial',
      render: text => (
        <span>{text && text.map((t) => {
          return get(PARSED_FACIALMAP, `${t}.label`)
        }).join(',')}</span>
      ),
    }, {
      title: '皮肤',
      dataIndex: 'attributes.skin',
      key: 'skin',
      render: text => (
        <span>{text && text.map((t) => {
          return get(PARSED_SKINMAP, `${t}.label`)
        }).join(',')}</span>
      ),
    }, {
      title: '身体',
      dataIndex: 'attributes.body',
      key: 'body',
      render: text => (
        <span>{text && text.map((t) => {
          return get(PARSED_BODYMAP, `${t}.label`)
        }).join(',')}</span>
      ),
    }, {
      title: '办卡意向',
      dataIndex: 'attributes.card',
      key: 'card',
      render: text => (
        <span>{text && text.map((t) => {
          return get(PARSED_CARDMAP, `${t}.name`)
        }).join(',')}</span>
      ),
    }, {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
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
