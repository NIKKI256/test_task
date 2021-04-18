import api from '../api/users/index'

export default{
    install(Vue){
        Vue.prototype.$ApiUsers = api
    }
}
