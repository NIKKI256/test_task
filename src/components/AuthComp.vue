<template>
    <div class="container">
        <h1 class="uiFont">{{reg_log ? 'Войти в систему' : 'Регистрация нового пользователя'}}</h1>
        <form class="auth-window">
            <div v-if="!reg_log">
                <div class="block-field">
                    <div class="input-data">
                        <div class="p-block">
                            <p class="uiFont">Введите свой логин:</p>
                            <p class="uiFont err-class"
                                v-if="$v.form.name.$dirty && !$v.form.name.required">
                                Это обязательное поле!
                            </p>
                        </div>
                        <div class="input-block">
                            <Input type="text" v-model.trim="$v.form.name.$model"/>
                        </div>
                    </div>
                </div>
                
                <div class="block-field">
                    <div class="input-data">
                        <div class="p-block">
                            <p class="uiFont">Введите свой email:</p>
                            <p class="uiFont err-class"
                                v-if="$v.form.email.$dirty && !$v.form.email.required">
                                Это обязательное поле!
                            </p>
                            <p class="uiFont err-class"
                                v-if="$v.form.email.$dirty && !$v.form.email.email">
                                Это поле для эл.почты!
                            </p>
                        </div>
                        <div class="input-block">
                            <Input type="text" v-model.trim="$v.form.email.$model"/>
                        </div>
                    </div>
                </div>
                
                <div class="block-field">
                    <div class="input-data">
                        <div class="p-block">
                            <p class="uiFont">Введите свой пароль:</p>
                            <p class="uiFont err-class" 
                                v-if="$v.form.password.$dirty && !$v.form.password.required">
                                Это обязательное поле!
                            </p>
                            <p class="uiFont err-class" 
                                v-if="$v.form.password.$dirty && !$v.form.password.minLength">
                                Не менее 5ти символов!
                            </p>
                        </div>
                        <div class="input-block">
                            <Input type="password" v-model.trim="$v.form.password.$model"/>
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="reg_log">
                <div class="block-field">
                    <div class="input-data">
                        <div class="p-block">
                            <p class="uiFont">Введите свой email:</p>
                            <p class="uiFont err-class"
                                v-if="$v.form.email.$dirty && !$v.form.email.required">
                                Это обязательное поле!
                            </p>
                            <p class="uiFont err-class"
                                v-if="$v.form.email.$dirty && !$v.form.email.email">
                                Это поле для эл.почты!
                            </p>
                        </div>
                        <div class="input-block">
                            <Input type="text" v-model.trim="$v.form.email.$model"/>
                        </div>
                    </div>
                </div>
                
                <div class="block-field">
                    <div class="input-data">
                        <div class="p-block">
                            <p class="uiFont">Введите свой пароль:</p>
                            <p class="uiFont err-class" 
                                v-if="$v.form.password.$dirty && !$v.form.password.required">
                                Это обязательное поле!
                            </p>
                            <p class="uiFont err-class" 
                                v-if="$v.form.password.$dirty && !$v.form.password.minLength">
                                Не менее 5ти символов!
                            </p>
                        </div>
                        <div class="input-block">
                            <Input type="password" v-model.trim="$v.form.password.$model"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttons">
                <Button type="success" long v-if="reg_log" @click="login">
                    Войти в систему
                </Button>
                <Button type="success" long v-if="!reg_log" @click="register">
                    Зарегистрироваться
                </Button>

                <Button type="info" long @click="changeChoose" class="btnMt">
                    {{reg_log ? 'Создать аккаунт' : 'Уже есть аккаунт'}}
                </Button>

                <Button type="warning" long class="btnMt" @click="guestEnter">
                    Войти как гость
                </Button>
            </div>
        </form>
    </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required , email , minLength} from 'vuelidate/lib/validators'

export default {
    mixins:[validationMixin],
    data(){
        return{
            form:{
                name:'',
                email:'',
                password:''
            },
            reg_log:true
        }
    },
    validations:{
        form:{
            name:{
                required
            },
            email:{
                required, 
                email
            },
            password:{
                required,
                minLength:minLength(5)
            }
        }
    },
    methods:{
        clearFields(){
            this.form.email = ''
            this.form.password = ''
            this.form.name = ''
        },
        changeChoose(){
            this.reg_log = !this.reg_log
        },
        async register(){
            this.$Loading.start();
            try {
                const data = (await this.$ApiUsers.users.register({...this.form}))

                this.$Loading.finish();

                this.$store.dispatch('set_user','user')
                this.$store.dispatch('set_user_data',data)
                
                localStorage.setItem('user', 'user')
    
                this.clearFields() 

                this.changeChoose()
                alert('Регистрация успешна! \nВведите ваши данные ещё раз!')

            } catch (error) {
                this.$Loading.finish();
                alert('Поля некорректны')
                console.log(error.response.data)
            }
        },
        async login(){
            this.$Loading.start();
            try {
                const data = (await this.$ApiUsers.users.login({
                    email:this.form.email,
                    password:this.form.password
                })).data
                this.$Loading.finish();

                this.$store.dispatch('set_user','user')
                this.$store.dispatch('set_user_data',data)
                
                localStorage.setItem('user', 'user')
                
                const user_data = this.$store.getters.GET_USER_DATA
                localStorage.setItem('token',user_data.token)
        
                this.$router.push({name:'PostsPage'})
                this.clearFields() 
            } catch (error) {
                this.$Loading.finish();
                alert('Email или пароль неправильны')
                console.error(error)
            }
        },
        guestEnter(){
            localStorage.setItem('user', 'guest')
            this.$router.push({name:'PostsPage'})
        }
    }
}
</script>

<style scoped>

    .input-data{
        display: flex;
        justify-content: space-between;
        align-items: top;
    }

    .auth-window{
        margin-top: 15px;
        width: 445px;
    }

    .container{
        margin: auto;
        padding: 20px;
        width: 30%;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: #f8f8f9 ;
        border-radius: 5px;

        transition: 1s;
    }

    .block-field{
        min-height: 50px;
        font-size: 16px;
    }

    .p-block{
        text-align: left;
    }

    .input-block{
        min-width: 200px;
        text-align: left;
    }

    .container:hover{
        background: #e8eaec ;
    }

    .uiFont{
        font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑";
    }

    .buttons, .btnMt{
        margin-top: 2%;
    }

    .err-class{
        color: red;
    }

</style>