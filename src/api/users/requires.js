export default function(instance){
    return{
        register(payload){
            return instance.post('users',payload)
        },
        login(payload){
            return instance.post('auth',payload)
        },
        getUserData(){
            return instance.get('auth/user')
        },
        uploadAvatar({payload,id}){
            return instance.put(`users/upload/${id}`,payload)
        },
        deleteUser(id){
            return instance.delete(`users/${id}`)
        }
    }
}