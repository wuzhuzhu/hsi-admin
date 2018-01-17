import { request, config } from 'utils'
import AV from 'leancloud-storage'

const { api } = config
const { users } = api

export async function query (params) {
  let asqQuery
  if (params && params.startDate && params.endDate) {
    const { startDate, endDate } = params
    const startDateQuery = new AV.Query('Asq')
    startDateQuery.greaterThanOrEqualTo('createdAt', new Date(startDate))

    const endDateQuery = new AV.Query('Asq')
    endDateQuery.lessThan('createdAt', new Date(endDate))

    asqQuery = AV.Query.and(startDateQuery, endDateQuery)
  } else { asqQuery = new AV.Query('Asq') }
  asqQuery
    .descending('createdAt')
    // .greaterThanOrEqualTo('createdAt', new Date('2016-11-13 00:00:00'));
    .limit(1000)
  return asqQuery.find()
}

export async function queryCount () {
  const asqQuery = new AV.Query('Asq')
  return asqQuery.count()
}

export async function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}

/*
export async function query (params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}
*/
