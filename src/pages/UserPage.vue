<template>
    <div>
        <h1>Ваши данные</h1>
        <Loader v-if="isLoaderVisible"/>
        <InfoUser
            v-else
            :userInfo="userInfo"
        />
    </div>
</template>

<script>
import InfoUser from '../components/InfoUser'
import Loader from '../components/Loader'

export default {
    data(){
        return{
            userInfo:{},
            isLoaderVisible:true
        }
    },
    components:{
        InfoUser,Loader
    },
    async created(){
        try {
            this.$Loading.start();
            
            const userData = await this.$ApiUsers.users.getUserData()

            this.userInfo = userData.data

            this.$Loading.finish();
            this.isLoaderVisible = false
        } catch (error) {
            this.$Loading.error();
            alert('Что-то пошло не так')
            console.error(error);
        }
    }
}
</script>