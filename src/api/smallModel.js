import fetch from "./axios";

// 小模型删除
export const deleteByModelId = (params) => {
  return fetch({
    url: `${baseIp}/smallModel/deleteByModelId`,
    method: 'get',
    params
  })
}

// 小模型插入
export const insertSmallModel = (data) => {
  return fetch({
    url: `${baseIp}/smallModel/insertSmallModel`,
    method: 'post',
    data
  })
}

// 小模型列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: `${baseIp}/smallModel/selectByConditions`,
    method: 'post',
    data
  })
}

// 小模型详情查询
// export const selectSmallModelDetail = (params) => {
//   return fetch({
//     url: `${baseIp}/smallModel/selectSmallModelDetail`,
//     method: 'get',
//     params
//   })
// }

// 小模型更新
export const updateByModelId = (data) => {
  return fetch({
    url: `${baseIp}/smallModel/updateByModelId`,
    method: 'post',
    data
  })
}