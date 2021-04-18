<template>
    <div>
        <Loader v-if="posts.length == 0"/>
        <div class="posts" v-else>
            <div 
                v-for="(post) in posts"
                :key="post._id"
                class="post"
            >
                
                <h2>{{post.title}}</h2>
                <h3>{{post.description}}</h3>

                <div class="btns" 
                    v-if="checkUser == 'user' && post.postedBy == user_id">
                    <Button type="error" class="btn" @click="deletePost(post._id)">
                        <Icon type="md-close-circle"/> Скрыть пост
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from './Loader'

export default {
    data(){
        return{
        }
    },
    components:{
        Loader
    },
    props:{
        posts:{
            type:Array,
            default:() => []
        },
        checkUser:{
            type:String,
            default:'guest'
        },
        user_id:{
            type:String,
            default:''
        }
    },
    methods:{
        deletePost(id){
            this.$emit('deletePost', id)
        } 
    }
}
</script>

<style scoped>
    .posts{
        font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑";
    }

    .post{
        margin-top: 3%;
        border-radius: 5px;
        border: solid 1px #dcdee2;
        background: #f8f8f9;
        padding: 1%;
    }

    .btns{
        margin-top: 2%;
    }
</style>