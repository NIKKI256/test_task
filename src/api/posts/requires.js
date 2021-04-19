export default function(instance){
    return{
        getAllPosts(){
            return instance.get('posts')
        },
        addPost(payload){
            return instance.post('posts',payload)
        },
        deletePost(id){
            return instance.delete(`posts/${id}`)
        },
        filterPosts(id){
            return instance.get(`posts?postedBy=${id}`)
        }
    }
}