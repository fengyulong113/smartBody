import fetch from "./axios";

export const getSmartBody = (data) => {
  return fetch({
    url: 'base/smartAgent/selectByConditions',
    method: 'post',
    data
  })
}

export const getSmartBodyDetail = (params) => {
  return fetch({
    url: 'base/smartAgent/selectSmartAgentDetail',
    method: 'get',
    params
  })
}

export const addSmartBody = (data) => {
  return fetch({
    url: 'base/smartAgent/insertSmartAgent',
    method: 'post',
    data
  })
}

export const editSmartBody = (data) => {
  return fetch({
    url: 'base/smartAgent/updateByModelId',
    method: 'post',
    data
  })
}

export const deleteSmartBody = (params) => {
  return fetch({
    url: 'base/smartAgent/deleteByModelId',
    method: 'get',
    params
  })
}

export const selectFieldValues = (params) => {
  return fetch({
    url: 'base/smartAgent/selectFieldValues',
    method: 'get',
    params
  })
}