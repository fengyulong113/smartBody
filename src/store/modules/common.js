import { queryAllDictItems } from '@/api/dictionary';

const common = {
  state: {
    dictionary: {},
  },
  mutations: {
    SET_DICTIONARY: (state, data) => {
      state.dictionary = data;
    }
  },
  actions: {
    setDictionary({ commit }) {
      queryAllDictItems().then(res => {
        commit("SET_DICTIONARY", res.data.result);
      })
    }
  }
}

export default common;