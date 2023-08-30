import fetch from "./axios";

// 文件版本创建
export const createCodeVersion = (params) => {
  return fetch({
    url: `base/model/base/createCodeVersion`,
    method: 'get',
    params
  })
}

// 模型源文件查看
export const getCodeFileContent = (params) => {
  return fetch({
    url: `base/model/base/getCodeFileContent`,
    method: 'get',
    params
  })
}

// 模型源文件查看
export const getModelCodeFile = (params) => {
  return fetch({
    url: `base/model/base/getModelCodeFile`,
    method: 'get',
    params
  })
}

// 模型创建
export const insertModel = (data) => {
  return fetch({
    url: `base/model/base/insertModel`,
    method: 'post',
    data
  })
}

// 模型列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: `base/model/base/selectByConditions`,
    method: 'post',
    data
  })
}

// 模型详情查询
export const selectModelDetail = (params) => {
  return fetch({
    url: `base/model/base/selectModelDetail`,
    method: 'get',
    params
  })
}

// 源码文件上传
export const uploadCodeFile = (data) => {
  return fetch({
    url: `base/model/base/uploadCodeFile`,
    method: 'post',
    data
  })
}

// 下载
export const downloadFile = (params) => {
  return fetch({
    url: `base/model/base/downloadFile`,
    method: 'get',
    params
  })
}

export const getReadMe = (params) => {
  return fetch({
    url: `base/model/base/getReadMe`,
    method: 'get',
    params
  })
}

