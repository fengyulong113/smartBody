import fetch from "./axios";

export const getSmartBody = (data) => {
  return fetch({
    url: 'api/smartAgent/selectByConditions',
    method: 'post',
    data
  })
}

export const getSmartBodyDetail = (params) => {
  return fetch({
    url: 'api/smartAgent/selectSmartAgentDetail',
    method: 'get',
    params
  })
}

export const addSmartBody = (data) => {
  return fetch({
    url: 'api/smartAgent/insertSmartAgent',
    method: 'post',
    data
  })
}

export const editSmartBody = (data) => {
  return fetch({
    url: 'api/smartAgent/updateByModelId',
    method: 'post',
    data
  })
}

export const deleteSmartBody = (params) => {
  return fetch({
    url: 'api/smartAgent/deleteByModelId',
    method: 'get',
    params
  })
}

export const selectFieldValues = (params) => {
  return fetch({
    url: 'api/smartAgent/selectFieldValues',
    method: 'get',
    params
  })
}