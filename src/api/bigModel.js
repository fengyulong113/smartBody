import fetch from "./axios";

// 大模型删除
export const deleteByModelId = (params) => {
  return fetch({
    url: `${baseIp}/bigModel/deleteByModelId`,
    method: 'get',
    params
  })
}

// 大模型插入
export const insertBigModel = (data) => {
  return fetch({
    url: `${baseIp}/bigModel/insertBigModel`,
    method: 'post',
    data
  })
}

// 大模型详情查询
export const selectBigModelDetail = (params) => {
  return fetch({
    url: `${baseIp}/bigModel/selectBigModelDetail`,
    method: 'get',
    params
  })
}

// 大模型列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: `${baseIp}/bigModel/selectByConditions`,
    method: 'post',
    data
  })
}

// 大模型更新
export const updateByModelId = (data) => {
  return fetch({
    url: `${baseIp}/bigModel/updateByModelId`,
    method: 'post',
    data
  })
}