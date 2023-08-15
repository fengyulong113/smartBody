import fetch from "./axios";

export const analyse = (params) => {
  return fetch({
    url: `api/execPython/analyse`,
    method: 'get',
    params
  })
}