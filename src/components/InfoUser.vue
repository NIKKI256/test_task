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

                <label class="field__file-wrapper" for="field__file-2">
                    <div class="field__file-button">Выбрать аватар</div>
                </label>
            </div>
        </div>
        <div class="content">
            <img class="user-avatar" :src="userInfo.avatar">
            <h2>Логин: {{userInfo.name}}</h2>
            <h2>Email: {{userInfo.email}}</h2>
            <h2>Дата создания: {{userInfo.dateCreated}}</h2>

            <Button class="btn" type="error" @click="deleteUser(userInfo._id)">
                Delete my page
            </Button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            avatar:null
        }
    },
    props:{
        userInfo:{
            type:Object,
            default:() => {}
        }
    },
    methods:{
        async putAvatar(id){
            this.infoAvatar = this.$refs.file.files[0]
            const fd = new FormData()
            fd.append("avatar",this.infoAvatar)

            try {
                await this.$ApiUsers.users.uploadAvatar({payload:fd,id})
                this.$router.go(0)
            } catch (error) {
                alert('Что-то пошло не так')
                console.error(error);
            }
        },
        async deleteUser(id){
            await this.$ApiUsers.users.deleteUser(id)
            this.$router.push('/')
        }
    },
    created(){
        const address = this.userInfo.avatar
        const base_url = 'https://nodejs-test-api-blog.herokuapp.com'
        this.userInfo.avatar = base_url + address
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
        font-size: 1.125rem;
        font-weight: 700;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
    }

    .user-avatar{
        min-width: 150px;
        min-height: 150px;

        max-width: 150px;
        max-height: 150px;
    }
</style>