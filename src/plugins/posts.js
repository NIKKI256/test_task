import api from '../api/posts/index'

export default{
    install(Vue){
        Vue.prototype.$ApiPosts = api
    }
}
