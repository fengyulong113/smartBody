import fetch from "./axios";

const dict = 'http://localhost:8089/ai'

export const queryAllDictItems = (params) => {
  return fetch({
    url: `${dict}/sys/dict/queryAllDictItems`,
    method: 'get',
    params
  })
}

export const loadAllData = (params) => {
  return fetch({
    url: `${dict}/sys/category/loadAllData`,
    method: 'get',
    params
  })
}

// {
//   column: "createTime",
//   order: "desc",
//   filed: "id, name",
//   pageNo: 1,
//   pageSize: 20
// }
export const getRootList = (params) => {
  return fetch({
    url: `${dict}/sys/category/rootList`,
    method: 'get',
    params
  })
}
// {
//   column: "createTime",
//   order: "desc",
//   filed: "id, name",
//   pageNo: 1,
//   pageSize: 20,
    // pid: 
// }
export const getChildList = (params) => {
  return fetch({
    url: `${dict}/sys/category/childList`,
    method: 'get',
    params
  })
}


