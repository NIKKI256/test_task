<template>
    <div>
        <h1>Your info</h1>
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
            const userData = await this.$ApiUsers.users.getUserData()

            this.userInfo = userData.data

            this.isLoaderVisible = false
        } catch (error) {
            alert('Something is wrong')
            console.error(error);
        }
    }
}
</script>