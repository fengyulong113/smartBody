import fetch from "./axios";


export const queryAllDictItems = (params) => {
  return fetch({
    url: `base/sys/dict/queryAllDictItems`,
    method: 'get',
    params
  })
}

export const loadAllData = (params) => {
  return fetch({
    url: `base/sys/category/loadAllData`,
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
    url: `base/sys/category/rootList`,
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
    url: `base/sys/category/childList`,
    method: 'get',
    params
  })
}


