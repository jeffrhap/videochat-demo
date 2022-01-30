import Vue from 'vue';
import Vuex from 'vuex';
import translations from './modules/translations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    translations
  }
});
