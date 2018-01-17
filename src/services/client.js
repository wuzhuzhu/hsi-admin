import AV from 'leancloud-storage'
import { request, config } from 'utils'
import Client from './models/client'
import { forEach } from 'lodash'

const { api } = config
const { user } = api

export async function query (params) {
  let clientQuery
  if (params && params.startDate && params.endDate) {
    const { startDate, endDate } = params
    const startDateQuery = new AV.Query('Client')
    startDateQuery.greaterThanOrEqualTo('createdAt', new Date(startDate))

    const endDateQuery = new AV.Query('Client')
    endDateQuery.lessThan('createdAt', new Date(endDate))

    clientQuery = AV.Query.and(startDateQuery, endDateQuery)
  } else { clientQuery = new AV.Query('Client') }
  clientQuery
    .descending('createdAt')
    // .greaterThanOrEqualTo('createdAt', new Date('2016-11-13 00:00:00'));
    .limit(1000)
  return clientQuery.find()
}

export async function create (params) {
  const newClient = new Client(params)
  return newClient.save()
}

export async function remove (objectIds) {
  const clients = []
  forEach(objectIds, id => clients.push(AV.Object.createWithoutData('Client', id)))
  return AV.Object.destroyAll(clients)
}

export async function update (params, objectId) {
  const client = AV.Object.createWithoutData('Client', objectId)
  client.set(params)
  return client.save()
}
