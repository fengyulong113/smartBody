import fetch from "./axios";


// prompt模板列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: `api/prompt/selectByConditions`,
    method: 'post',
    data
  })
}

// prompt模板详情查询
export const selectDetailById = (params) => {
  return fetch({
    url: `api/prompt/selectDetailById`,
    method: 'get',
    params
  })
}

// 模板执行接口
export const execute = (params) => {
  return fetch({
    url: `api/prompt/execute/{templateId}`,
    method: 'get',
    params
  })
}

// 编辑Prompt模板
export const editPromptTemplate = (data) => {
  return fetch({
    url: `api/prompt/editPromptTemplate`,
    method: 'post',
    data
  })
}

// 删除Prompt模板,多个templateId用，分割
export const deletePromptTemplate = (params) => {
  return fetch({
    url: `api/prompt/deletePromptTemplate`,
    method: 'get',
    params
  })
}

// 模板收藏接口
export const collect = (params) => {
  return fetch({
    url: `api/prompt/collect`,
    method: 'get',
    params
  })
}

// 取消收藏模板接口
export const cacelCollect = (params) => {
  return fetch({
    url: `api/prompt/cacelCollect`,
    method: 'get',
    params
  })
}

// 添加Prompt模板
export const addPromptTemplate = (data) => {
  return fetch({
    url: `api/prompt/addPromptTemplate`,
    method: 'post',
    data
  })
}