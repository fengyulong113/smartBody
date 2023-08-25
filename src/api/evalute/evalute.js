/*
 * @Description:
 * @Author: sunyue
 * @Date: 2023-08-21 15:26:30
 * @LastEditTime: 2023-08-21 16:48:17
 * @LastEditors: sunyue
 */
import fetch from "../axios";

// 模型选择
export const selectBriefInfoList = (params) => {
  return fetch({
    url: "base/modelGeneral/selectBriefInfoList",
    method: "get",
    params,
  });
};

// 新增评测
export const insertEvaluateJob = (data) => {
  return fetch({
    url: "base/evaluateJob/insert",
    method: "post",
    data,
  });
};
// 更新评测
export const updateByIdEvaluateJob = (data) => {
  return fetch({
    url: "base/evaluateJob/updateById",
    method: "post",
    data,
  });
};
// 评测任务列表查询
export const selectByConditions = (data) => {
  return fetch({
    url: "base/evaluateJob/selectByConditions",
    method: "post",
    data,
  });
};

// 测评任务执行
export const operationEvalute = (params) => {
  return fetch({
    url: "base/evaluateJob/executeById",
    method: "get",
    params,
  });
};
//测评结果radar
export const selectResultsByJobId = (params) => {
  return fetch({
    url: "base/evaluateResult/selectResultsByJobId",
    method: "get",
    params,
  });
};
//测评结果对比
export const selectCompareResultsByIds = (params) => {
  return fetch({
    url: "base/evaluateResult/selectCompareResultsByIds",
    method: "get",
    params,
  });
};
//删除
export const deleteById = (params) => {
  return fetch({
    url: "base/evaluateJob/deleteById",
    method: "get",
    params,
  });
};
//查询所有评测集名称
export const selectDatasetList = (params) => {
  return fetch({
    url: "base/evaluateJob/selectDatasetList",
    method: "get",
    params,
  });
};
// 查询使用了某数据集的任务列表
export const selectExecutedJobByDataset = (params) => {
  return fetch({
    url: "base/evaluateJob/selectExecutedJobByDataset",
    method: "get",
    params,
  });
};
//评测自带字典
export const queryDictItems = (params) => {
  return fetch({
    url: `base/sys/dict/queryAllDictItems`,
    method: "get",
    params,
  });
};

// 大模型更新
export const updateByModelId = (data) => {
  return fetch({
    url: "base/bigModel/updateByModelId",
    method: "post",
    data,
  });
};
