import fetch from "./axios";

export const evaluate = (params) => {
  return fetch({
    url: "api/evaluateTool/evaluate",
    method: 'get',
    params
  })
}