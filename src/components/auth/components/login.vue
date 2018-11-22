  <template>
      <form @submit.prevent="confirmation" novalidate="true">
            <div class="div-login">
                <div class="img-input">
                  <img src="../../../assets/images/name.png">
                  <input
                    class= "placeholder"
                      type="text"
                      v-model="login"
                      placeholder="Email"
                      autocomplete="new-password"
                      autocorrect= "off"
                      aucapitalize= "off"
                      >
                </div> 
                <div class="img-input">
                  <img src="../../../assets/images/password.png">
                  <input
                    class="placeholder"
                      type="password"
                      v-model="password"
                      :placeholder='$t("message.password")'
                      autocomplete="new-password">
                </div>   
                <p>{{ info }}</p> 
                  <button type="submit">{{$t("message.sign_in")}}</button>
                  <a ><router-link to="/forgotPassword" >{{$t("message.forgot_pass")}}</router-link></a>
                  <a ><router-link to="/register" >{{$t("message.registration")}}</router-link></a>
            </div>
      </form>
  </template>

  <script>


//   import PhoneInput from './PhoneInput.vue';
export default {

  name: 'Login',
    components: {
    // PhoneInput,
    },
  data() {
    return {
      phone: {
        code: '',
        number: '',
      },
      info: null,
      checkHome: true,
      login: '',
      password: '',
      phoneFixPreload: false,
      isValid: false,
      loginValidate: {
        login: false,
      },
      validate: {
        phone: false,
        phoneFull: false,
        codeSms: false,
        phoneGet: false,
      },
    };
  },

  computed: {
    loginValidateChange() {
      return {
        borderBottom: this.loginValidate.login ? '1px solid var(--color-primary-notific)' : '',
      };
    }
  },
  

  methods: {
    toLogin() {
      this.isLogin = 'login';
    },
    onInput(e) {
      if (isValid) {
        this.isValid = isValid;
      }
    },
    loginPhoneChange(){

      this.loginValidate.login = false;
      this.$modal.hide('dialog');

      if (this.login[0] !== '+') {
        this.login = '+' + this.login;
      }

      if (!Number(this.login.slice(1))) {
        const first = Number(this.login.slice(1));
        if (first === 0) {
          return;
        }

        this.loginValidate.login = true;

        this.$modal.show('dialog', {
          text: 'Введите номер телефона!',
          buttons: [{ title: 'Закрыть' }],
        });
      }
    },
    confirmation() {
      this.$http.post('/oauth/auth', {
        service_id: '49f4632cad344f14b1bf54fd96bd63e7',
        redirect_uri: 'http://192.168.56.1:8080/check',
        state: "1111111111111111",
        username_or_email: this.login,
        password: this.password
      }).then(response => (this.info = response.data.success))
        .catch(error => {
            console.log(error.response.data.error);
      });
    },
  },
};
</script>

