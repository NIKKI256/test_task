<template>
    <div>
        <Button class="btn" type="info" 
            @click="$router.push({name:'PostsPage'})">
            Вернуться к постам
        </Button>
        <div class="avatar">
            <div class="field__wrapper">
                <input name="file" type="file" ref="file" id="field__file-2" class="field field__file" 
                    @change="putAvatar(userInfo._id)">

                <DragDrop @upload_avatar="upload_avatar"/>
            </div>
        </div>
        <div class="content">
            <img v-if="noAvatar" class="user-avatar" :src="userInfo.avatar">
            <img v-else class="user-avatar" :src="userInfo.avatar">
            <h2>Логин: {{userInfo.name}}</h2>
            <h2>Email: {{userInfo.email}}</h2>
            <h2>Дата создания: {{userInfo.dateCreated}}</h2>

            <Button class="btn" type="error" @click="deleteUser(userInfo._id)">
                Удалить мой аккаунт
            </Button>
        </div>
    </div>
</template>

<script>
import DragDrop from './DragDrop'

export default {
    data(){
        return{
            avatar:null,
            noAvatar:true,
            mouseClass:false
        }
    },
    props:{
        userInfo:{
            type:Object,
            default:() => {}
        }
    },
    components:{
        DragDrop
    },
    methods:{
        async deleteUser(id){
            await this.$ApiUsers.users.deleteUser(id)
            this.$router.push('/')
        },
        async upload_avatar(avatar){
            const id = this.userInfo._id
            this.infoAvatar = avatar

            const fd = new FormData()
            fd.append("avatar",avatar)
            
            try {
                await this.$ApiUsers.users.uploadAvatar({payload:fd,id})
                this.$router.go(0)
            } catch (error) {
                alert('Что-то пошло не так')
                console.error(error);
            }
        }
    },
    created(){
        const address = this.userInfo.avatar
        const base_url = process.env.VUE_APP_URL
        const img_no_user = "https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-"
        try {
            if(address != undefined){
                this.userInfo.avatar = base_url + address
                this.noAvatar = false
            }else{
                this.userInfo.avatar = img_no_user
            }
        } catch (error) {
            this.userInfo.avatar = img_no_user
            alert('Что-то пошло не так')
            console.log(error);
        }
    }
}
</script>

<style scoped>

    .content{
        background-color: #f8f8f9;
        width: 30%;
        margin: 2% auto;
        border: solid 1px #515a6e;
        border-radius: 15px;
        padding: 5px;
    }
    
    .btn, .avatar{
        margin-top: 10px;
    }

    .avatar img{
        max-width: 250px;
        max-height: 250px;
    }
    
    .field__wrapper {
        width: 10%;
        position: relative;
        margin: auto;
        text-align: center;
    }
 
    .field__file {
        opacity: 0;
        visibility: hidden;
        position: absolute;
    }
 
    .field__file-button {
        width: 100%;
        height: 60px;
        background: #1bbc9b;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.5s;
    }
    
    .field__file-button:hover{
        background: #159078;
    }

    .user-avatar{
        min-width: 150px;
        min-height: 150px;
        max-width: 150px;
        max-height: 150px;
    }
</style>