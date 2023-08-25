import fetch from "./axios";

export const evaluate = (params) => {
  return fetch({
    url: "base/evaluateTool/evaluate",
    method: 'get',
    params
  })
}