<template>
    <div>
        <form v-if="stepForms === 3" @submit.prevent="restorePass">
          <div v-if="!preloader.isStepForm1" class="div-login">
            <div class="img-input">
              <img class="icon_main" src="../../../assets/images/password.png">
              <input
                class="placeholder"
                type="password"
                v-model="password"
                placeholder="Email"
                autocomplete="off">
            </div> 
            <span class="wr br">{{ phoneValidate }}</span>
            <button type="submit">Далее</button>
            <a @click="toLogin">Отмена</a>
          </div>
          <div v-else>
            <div class="loader"></div>
          </div>
        </form>
        <form v-if="stepForms === 1" @submit.prevent="restorePassSms">
          <div v-if="!preloader.isStepFor2" class="div-login">
            <div class="img-input">
              <label for="sms">
                <img class="icon_main" src="../../../assets/images/sms_code.png">
              </label>
              <input 
                type="number"
                v-model="smsCode"
                @input="onInputSms"
                autocomplete="off"
                placeholder="Подтверждение"
                maxlength="5"
              >
            </div>
            <span class="wr br">{{ smsValidate }}</span>
            <button type="submit">Далее</button>
            <a @click="toLogin">Отмена</a>
          </div>
          <div v-else>
            <div class="loader"></div>
          </div>
        </form>
        <form v-if="stepForms === 3" @submit.prevent="restorePassNewPass">
          <div v-if="!preloader.isStepForm3" class="div-login">
            <div class="img-input">
              <label for="password">
                <img class="icon_main" src="../../../assets/images/password.png" >
              </label>
              <input
                type="password"
                v-model="newPass"
                @input="onInputPass1"
                autocomplete="off"
                placeholder="Новый пароль"
                maxlength="27"
              >
            </div>
            <div class="img-input">
              <label for="conf-password">
                <img class="icon_main" src="../../../assets/images/password.png">
              </label>
              <input
                type="password"
                v-model="confNewPass"
                @input="onInputPass2"
                autocomplete="off"
                placeholder="Повторите пароль"
                maxlength="27"
              >
            </div>
            <span class="wr br">{{ passValidate }}</span>
            <button type="submit">Сохранить</button>
          </div>
          <div v-else>
            <div class="loader"></div>
          </div>
        </form>
      </div>
</template>

<script>

export default {
  name: 'RestorePassPage',
  components: {

  },
  data() {
    return {
      phone: {
        code: '',
        number: '',
      },
      smsCode: '',
      newPass: '',
      confNewPass: '',
      stepForms: 1,
      phoneValidate: '',
      smsValidate: '',
      passValidate: '',
      token: '',
      preloader: {
        isStepForm1: false,
        isStepForm2: false,
        isStepForm3: false,
      }
    };
  },
  methods: {
    restorePass() {

        this.$http.post('/password/forgot', { phone: this.phone.number }).then((data) => {
          // this.preloader.isStepForm1 = false;
          this.stepForms = 2;
        }).catch((err) => {
          // this.preloader.isStepForm1 = false;
          if (err.response.data.error === 'Send full phone number with +7') {
            this.phoneValidate = 'Введите полный номер телефона!';
          } else if (err.response.data.error === 'Phone not exist') {
            this.phoneValidate = 'Номер не зарегистрирован!';
          }
        });
      // }

    },
    onInput(e) {
      this.phoneValidate = '';
      if (this.phone[0] !== '+') {
        this.phone = '+' + this.phone;
      }
      if (this.phone.length < 2 && e.inputType === 'deleteContentBackward') {
        this.phone = '';
      }
    },
    toLogin() {
      this.$router.push('/');
    },
    /*============== SMS ==================*/
    restorePassSms() {
      if(isNaN(Number(this.smsCode))){
        this.smsValidate = 'Введите валидный смс-код';
        this.smsCode = '';
      } else {
        if (this.smsCode.length === 5) {
          this.preloader.isStepForm2 = true;
          this.$http.post('/password/forgot/verify-phone', { phone: this.phone.number, code: this.smsCode }).then((res) => {
            this.preloader.isStepForm2 = false;
            this.stepForms = 3;
            this.token = res.data.access_token;
          }).catch((err) => {
            this.preloader.isStepForm2 = false;
            if (err.response.data.error === 'Code error') {
              this.smsValidate = 'Неверный код-СМС';
            }
          });
        }
      }
    },
    onInputSms(e) {
      this.smsValidate = '';
    },
    /*============== Passwords ==================*/
    restorePassNewPass() {
      if (this.newPass === this.confNewPass) {
        if (this.newPass.length < 6) {
          // error 2
          this.passValidate = 'Введите минимум 8-символов!';
        } else {

          this.preloader.isStepForm3 = true;

          const config = {
            headers: { 'Authorization': `Bearer ${this.token}` }
          };

          const obj = {
            new_password: this.newPass,
            type: 'forgot',
          };


          this.$http.put('/password', obj, config)
          .then(res => {

            this.preloader.isStepForm3 = false;
            this.$modal.show('dialog', {
            text: 'Пароль изменен!',
            buttons: [
              {
                title: 'Ок'
              }
            ]});


            this.$router.push('/');


            this.phone = '';
            this.smsCode = '';
            this.newPass = '';
            this.confNewPass = '';

          })
          .catch(error => {
            if (error.response.data.error === 'The new_password must consist of Latin letters, numbers and symbols') {
              this.passValidate = 'Введите пароль на латинице';
            }
          });

        }
      } else {
        // error 1
        this.passValidate = 'Пароли не совпадают!';
      }
    },
    onInputPass1() {
      this.passValidate = '';
    },
    onInputPass2() {
      this.passValidate = '';
    }
  },
}
</script>


