import fetch from "./axios";

export const queryAllDictItems = (params) => {
  return fetch({
    url: `dict/sys/dict/queryAllDictItems`,
    method: 'get',
    params
  })
}