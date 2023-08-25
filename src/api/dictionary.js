import fetch from "./axios";

export const queryAllDictItems = (params) => {
  return fetch({
    url: `api/sys/dict/queryAllDictItems`,
    method: "get",
    params,
  });
};
