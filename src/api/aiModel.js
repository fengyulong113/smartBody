import fetch from "./axios";

// 文件版本创建
export const createCodeVersion = (params) => {
  return fetch({
    url: `${baseIp}/model/base/createCodeVersion`,
    method: 'get',
    params
  })
}

// 模型源文件查看
export const getCodeFileContent = (params) => {
  return fetch({
    url: `${baseIp}/model/base/getCodeFileContent`,
    method: 'get',
    params
  })
}

// 模型源文件查看
export const getModelCodeFile = (params) => {
  return fetch({
    url: `${baseIp}/model/base/getModelCodeFile`,
    method: 'get',
    params
  })
}

// 模型创建
export const insertModel = (data) => {
  return fetch({
    url: `${baseIp}/model/base/insertModel`,
    method: 'post',
    data
  })
}

// 模型列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: `${baseIp}/model/base/selectByConditions`,
    method: 'post',
    data
  })
}

// 模型详情查询
export const selectModelDetail = (params) => {
  return fetch({
    url: `${baseIp}/model/base/selectModelDetail`,
    method: 'get',
    params
  })
}

// 源码文件上传
export const uploadCodeFile = (data) => {
  return fetch({
    url: `${baseIp}/model/base/uploadCodeFile`,
    method: 'post',
    data
  })
}

// 下载
export const downloadFile = (params) => {
  return fetch({
    url: `${baseIp}/model/base/downloadFile`,
    method: 'get',
    params
  })
}

export const getReadMe = (params) => {
  return fetch({
    url: `${baseIp}/model/base/getReadMe`,
    method: 'get',
    params
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

// 小模型详情查询
export const selectSmallModelDetail = (params) => {
  return fetch({
    url: `${baseIp}/smallModel/selectSmallModelDetail`,
    method: 'get',
    params
  })
}

// 智能体详情
export const getSmartBodyDetail = (params) => {
  return fetch({
    url: `${baseIp}/smartAgent/selectSmartAgentDetail`,
    method: 'get',
    params
  })
}

