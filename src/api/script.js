import fetch from "./axios";

export const analyse = (params) => {
  return fetch({
    url: `base/execPython/analyse`,
    method: 'get',
    params
  })
}