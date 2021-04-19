<template>
    <div class="main-content">
        <h1>{{user.state == 'user' ? 'Посты для пользователей' : 'Посты для гостей'}}</h1>
        <div class="btns">
            <Button type="warning" class="btn"
                @click="exit">
                Вернуться в меню авторизации
            </Button>
            <Button class="btn" type="info" v-if="user.state == 'user'"
                @click="$router.push({name:'UserPage'})">
                Информация обо мне
            </Button>
            <Button type="primary" class="btn" @click="isModalVis=true" v-if="user.state == 'user'">
            <Icon type="md-add" />
                Добавить пост
            </Button>
        </div>
        <div class="switch" v-if="user.state == 'user'">
            <i-switch size="large" v-model="toggle" @on-change="switchToggle">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
            </i-switch>
            <h3 class="switch-text">Видеть только свои посты</h3> 
        </div>
        <AllPosts 
            :posts="posts"
            :checkUser="user.state"
            :user_id="user_id"
            @deletePost="deletePost"
        />
        <Modal 
            v-if="isModalVis"
            @close="close"
            @addPost="addPost"
        />
    </div>
</template>

<script>
import Modal from '../components/Modal'
import AllPosts from '../components/AllPosts'

export default {
    data(){
        return{
            isModalVis:false,
            user:{
                state:false
            },
            posts:[],
            user_id:null,
            toggle:false
        }
    },
    components:{
        AllPosts,Modal
    },
    methods:{
        exit(){
            this.$router.push({name:'MainPage'})
            localStorage.clear()
        },
        async deletePost(id){
            try {
                await this.$ApiPosts.posts.deletePost(id)
                this.$router.go(0)
            } catch (error) {
                console.error(error);
            }
        },
        close(){
            this.isModalVis = false
        },
        async addPost(post){
            try {
                await this.$ApiPosts.posts.addPost(post)
                this.$router.go(0)
            this.close()
            } catch (error) {
                alert('Что-то пошло не так')
                console.error(error)
            }
        },
        async switchToggle(){
            try {
                if (this.toggle) {
                    this.posts = (await this.$ApiPosts.posts.filterPosts(this.user_id)).data
                } else {
                    this.posts = (await this.$ApiPosts.posts.getAllPosts()).data
                }
            } catch (error) {
                alert('Что-то пошло не так')
                console.log(error)
            }
        }
    },
    async created(){
        this.$store.dispatch('set_user', localStorage.user)
        this.$set(this.user,'state', this.$store.getters.GET_USER)
        
        try {
            this.posts = (await this.$ApiPosts.posts.getAllPosts()).data
        } catch (error) {
            alert('Что-то пошло не так')
            console.log(error)
        }

        if(localStorage.user != 'guest'){
            try {
                const userData = (await this.$ApiUsers.users.getUserData()).data
                this.user_id = userData._id
            } catch (error) {
                alert('Что-то пошло не так')
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
    .switch-text{
        margin-left: 5px;
    }

    .main-content{
        width: 30%;
        margin: auto;
    }

    .switch{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn{
        margin-top: 10px;
    }

    .btns{
        display: flex;
        flex-direction: column;
        margin: 5px auto;
    }
</style>