import axios from 'axios'
const mainURL = process.env.VUE_APP_URL

const instance = axios.create({
    baseURL:`${mainURL}/api/v1/`,
    headers:{
        'accept': 'application/json'
    }
})

instance.interceptors.request.use(config => {
    if(localStorage.token){
        config.headers.Authorization = `Bearer ${localStorage.token}`,
        config.headers['Content-Type'] = 'application/json'
    }else{
        delete config.headers.Authorization
    }
    return config
}, err => {
    alert('Something is wrong')
    return Promise.reject(err)
})

export default instance