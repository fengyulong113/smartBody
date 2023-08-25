import { queryAllDictItems } from "@/api/dictionary";
import { queryDictItems } from "@/api/evalute/evalute";
const common = {
  state: {
    dictionary: {},
    dictionarys: {},
  },
  mutations: {
    SET_DICTIONARY: (state, data) => {
      state.dictionary = data;
    },
    SET_DICTS: (state, data) => {
      state.dictionarys = data;
    },
  },
  actions: {
    setDictionary({ commit }) {
      queryAllDictItems().then((res) => {
        commit("SET_DICTIONARY", res.data.result);
      });
    },
    setDicts({ commit }) {
      queryDictItems().then((res) => {
        commit("SET_DICTS", res.data.data);
      });
    },
  },
};

export default common;