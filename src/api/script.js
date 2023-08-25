import fetch from "./axios";

export const analyse = (params) => {
  return fetch({
    url: `${script}/execPython/analyse`,
    method: 'get',
    params
  })
}