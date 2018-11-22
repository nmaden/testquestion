<template>
    <div>
        <form action=""  @submit.prevent="confirmation">
            <div  class="div-login">
                <div class="img-input">
                    <img class="icon_main" src="../../../assets/images/password.png">
                    <input
                        type="password"
                        autocomplete="new-password"
                        :placeholder='$t("message.password")'
                        v-model="password"
                        maxlength="36">
                        <span class="wr br" v-if="emptyPassword">Введите пароль</span>
                        <span class="wr br" v-if="lengthPassword">Минимум 6-символов.</span>
                </div>
                <div class="img-input">
                    <img class="icon_main" src="../../../assets/images/password.png">
                    <input
                        type="password"
                        autocomplete="off"
                        :placeholder='$t("message.confirmation")'
                        v-model="confirm_password"
                        maxlength="36"> 
                        <span class="wr br" v-if="typeAgain" >Повторите пароль.</span>
                        <span class="wr br" v-if="notSame">Пароли не совпадают</span>
                </div>
                <p>{{ info }}</p>
                <button type="submit">{{ $t("message.next") }}</button>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    name: '',
    data() {
        return {
            password: '',
            confirm_password: '',
            emptyPassword: false,
            lengthPassword: false,
            typeAgain: false,
            notSame: false,
            info: null
        }
    },
    computed: {
        givetoken() {    
         
        }
    },
    methods: {
        confirmation(){
            let obj = {
                token: this.$route.query.token,
                password: this.password,
                confirm_password: this.confirm_password
            }
            this.$http.put('/oauth/register', obj)
            .then(response => (this.info = response.data.success))
            .catch(error => {
                this.info = error.response.data.errors.password
            });
        }
    }

}
</script>

