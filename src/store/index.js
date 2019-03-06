import Vue from 'vue'
import Vuex from 'vuex'
import { _getUserInfo,_loginOut } from '@/fetch/api'
import { print } from 'util';
import Cookies from 'js-cookie';
Vue.use(Vuex)

const user = {
  state: {
    meau: '',
    userInfo: '',
    globalsetting:null,
    preList:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER:(state,user)=>{
      state.userInfo = user
    },
    OUT_USER:(state)=>{
      state.userInfo = '';
    }
  },

  actions: {
    getUserInfo({commit,state},data){
      return new Promise(function(resolve, reject){
        _getUserInfo().then( result => {
          if(result.code == 0){
            const userInfo = result.data;
            commit('SET_USER',userInfo);
            }
            resolve();
          })
          
      })
      
    },
    loginOut({commit,state},data){
      return new Promise(function(resolve, reject){
        _loginOut().then( result => {
          if(result.code == 0){
            commit('OUT_USER');
            }
            resolve();
          })
          
      })
      
    },
  }
}

const store = new Vuex.Store({
  modules: {
      user
  }
})
export default store