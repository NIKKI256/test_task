import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:null,
        user_data:null
    },
    getters:{
        GET_USER(state){
            return state.user
        },
        GET_USER_DATA(state){
            return state.user_data
        }
    },
    mutations:{
        SET_USER(state,payload){
            state.user = payload
        },
        SET_USER_DATA(state,payload){
            state.user_data = payload
        }
    },
    actions:{
        set_user({commit},payload){
            commit('SET_USER',payload)
        },
        set_user_data({commit},payload){
            commit('SET_USER_DATA',payload)
        },
    }
})