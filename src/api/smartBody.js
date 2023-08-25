import fetch from "./axios";

export const getSmartBody = (data) => {
  return fetch({
    url: `${baseIp}/smartAgent/selectByConditions`,
    method: 'post',
    data
  })
}

export const getSmartBodyDetail = (params) => {
  return fetch({
    url: `${baseIp}/smartAgent/selectSmartAgentDetail`,
    method: 'get',
    params
  })
}

export const addSmartBody = (data) => {
  return fetch({
    url: `${baseIp}/smartAgent/insertSmartAgent`,
    method: 'post',
    data
  })
}

export const editSmartBody = (data) => {
  return fetch({
    url: `${baseIp}/smartAgent/updateByModelId`,
    method: 'post',
    data
  })
}

export const deleteSmartBody = (params) => {
  return fetch({
    url: `${baseIp}/smartAgent/deleteByModelId`,
    method: 'get',
    params
  })
}

export const selectFieldValues = (params) => {
  return fetch({
    url: `${baseIp}/smartAgent/selectFieldValues`,
    method: 'get',
    params
  })
}