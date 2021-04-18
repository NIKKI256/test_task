<template>
    <div class="main">
        <div class="modal">
            <div class="modal_container">    
                <Input class="inputs" v-model="post.title" placeholder="Введите название..." style="width: 300px" />
                <Input class="inputs" v-model="post.fullText" placeholder="Введите текст..." style="width: 300px" />
                <Input class="inputs" v-model="post.description" placeholder="Введите описание..." style="width: 300px" />
                <div class="btns">
                    <Button type="error" @click="close">Закрыть</Button>
                    <Button type="success" @click="addPost(post)">Добавить</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            post:{
                title:'',
                fullText:'',
                description:''
            }
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        addPost(post){
            if(post.title == '' || post.title.length < 3
                || post.fullText == '' || post.fullText.length < 20
                || post.description == '' || post.description.length < 3){
                alert('Поля некорректны')
            }else{
                this.$emit('addPost',post)
            }
        }
    }
}
</script>

<style scoped>
    .main{
        position: fixed;
        overflow: auto;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }

    .modal{
        position: absolute;
        left: 45%;
        top: 40%;
        margin-left: -100px;
        margin-top: -75px;
    }

    .modal_container{
        border-radius: 5px;
        border: solid 2px #515a6e;
        padding: 5%;
        background-color: #fff;
        width: 400px;
        height: 250px;
    }

    .inputs{
        margin-top: 2%;
    }

    .btns{
        margin-top: 15%;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>