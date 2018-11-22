<template>
        <form v-if="isLogin === 'step-1'" @submit.prevent="confirmation"  novalidate="true">
          <div v-if="!preloaderEndRegister" class="div-login">
                <div class="img-input">
                  <img class="icon_main"  src="../../../assets/images/name.png">
                  <input 
                    class="login-input"
                    type="text"
                    v-model.trim="register.name"
                    autocomplete="new-password"
                    :placeholder='$t("message.name")'
                    @input="changeName"
                    maxlength="36"
                    >
                </div>
                <span class="wr br" v-if="msgValid.name">{{$t("message.empty_line")}}</span>
                <div class="img-input">
                  <img class="icon_main"  src="../../../assets/images/sname.png" >
                  <input
                    class="login-input"
                    type="text"
                    v-model.trim="register.lastname"
                    autocomplete="new-password"
                    :placeholder='$t("message.surname")'
                    @input="changeLastName"
                    maxlength="36">
                </div>
                <span class="wr br" v-if="msgValid.lastname">{{$t("message.empty_line")}}</span>
                <div class="img-input">
                  <img class="icon_main" src="../../../assets/images/password.png">
                  <input
                    class="login-input"
                    v-model="register.email"
                    autocomplete="new-password"
                    @input="changeEmail"
                    placeholder="Email"
                    maxlength="36">
                </div>
                <input type="hidden"  v-model="register.locale">
                <span class="wr br" v-if="msgValid.MinSymbolEmail">{{$t("message.email_empty")}}</span>
                <span class="wr br" v-if="msgValid.CorrectEmail">{{$t("message.email_error")}}</span>
                <div class="img-input">
                    <img class="icon_main" src="../../../assets/images/calendar.png">
                    <datepicker
                      class="login-input"
                      :disabledDates="date.disabledDates"
                      v-model="date.value"
                      :language="date.ru"
                      :placeholder='$t("message.date")'
                      @opened="defaultDatePicker"
                      calendar-class="inputCalen"
                      @input="changeDate"
                      > 
                    </datepicker>
                </div>
                <span class="wr br" v-if="msgValid.birthday">{{$t("message.empty_line")}}</span>
                <div class="img-input">
                  <img class="icon_main" src="../../../assets/images/gender.png" >
                  <select  class="login-input" v-model="register.selectedGender">
                    <option disabled value="">{{ $t("message.gender") }}</option>
                    <option >{{$t("message.male")}}</option>
                    <option >{{$t("message.female")}}</option>
                  </select>
                </div>
                <span class="wr br" v-if="msgValid.gender">{{$t("message.empty_line")}}</span>
                <div class="agreement-text">
                    <p>{{$t("message.agreement")}}</p>
                   
                    <a href='https://otau.org/agreement'  target='_blank'>{{$t("message.agreement_link")}}</a>
                </div>
                <button type="submit" >{{ $t("message.registration") }}</button>
          </div>
          <div v-else>
            <div class="loader"></div>
          </div>
        </form>
        <form v-else-if="isLogin === 'step-2'">
          <center>
              <p class="success">Проверьте почту, чтобы завершить регистрацию</p>
          </center>
        </form>
   
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ru } from 'vuejs-datepicker/dist/locale';
// import PhoneInput from './PhoneInput.vue';
export default {
  name: 'HomePage',
  components: {
    // PhoneInput,
    Datepicker,
  },
  data() {
    return {
      isLogin: 'step-1',
      phone: {
        code: '',
        number: '',
      },
      phoneFixPreload: false,
      preloaderSmsSend: false,
      preloaderEndRegister: false,
      msgValid: {
        name: false,
        lastname: false,
        password: false,
        birthday: false,
        gender: false,
        confirmPassword: false,
        minSimbol: false,
        passAndpassConf: false,
        MinSymbolEmail: false,
        CorrectEmail:false
      },
      register: {
        name: '',
        lastname: '',
        email: '',
        selectedGender: '',
        token: '',
        locale: 'ru',
      },
      date: {
        value: '',
        ru: ru,
        disabledDates: {
          to: new Date(1902, 1, 1), // Disable all dates up to specific date
          from: new Date(2005, 0, 0),
        },
      },
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
        // boxShadow: this.loginValidate.login ? '0 0 10px rgba(0,0,0,0.5)' : '',
      };
    }
  },

  methods: {
    defaultDatePicker() {
      this.date.value = '01.01.2004';
    },
    changeName(e) {
      this.msgValid.name = false;
    },
    changeLastName(e) {
      this.msgValid.lastname = false;
    },
    changeEmail(e) {
      this.msgValid.MinSymbolEmail = false;
      this.msgValid.CorrectEmail = false;
    },
    changeDate(e) {
      this.msgValid.birthday = false;
    },
 
    toLogin(data) {
      if(data){
        this.$router.push('/');
      } 
      else{
        this.isLogin = 'step-1';
      }
    },
    registration() {
      this.isLogin = 'step-1';
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    changelength(value,text) {
        if(value == 1) {
            return '0'+text;
        }
        else {
            return text;
        }
    },
    confirmation() {
        this.$modal.show('dialog', {
            text: 'Проверьте почту!',
            buttons: [
                {
                title: 'Ок'
                }
        ]});
 
      this.msgValid.birthday = false;
      this.msgValid.gender = false;
      this.msgValid.CorrectEmail = false;

  
    
      if (this.register.name.length < 1) {
        this.msgValid.name = true;
        return;
      }
      
      if (this.register.lastname.length < 1) {
        this.msgValid.lastname = true;
        return;
      }
        
      if (this.register.email=='') {
        this.msgValid.MinSymbolEmail = true;
        return;
      } 
      if (!this.validEmail(this.register.email)) {
        this.msgValid.CorrectEmail = true;
        return;
      }
  
      let birth_date = this.date.value;
      
      if ( birth_date === '') {
        this.msgValid.birthday = true;
        return;
      } else {
        let curr_date = this.changelength(birth_date.getDate().toString().length, birth_date.getDate().toString());
        let curr_month = this.changelength((birth_date.getMonth()+1).toString().length, (birth_date.getMonth()+1).toString());
        let curr_year =this.changelength(birth_date.getFullYear().toString().length,birth_date.getFullYear().toString());

        birth_date = curr_year + "-" + curr_month + "-" + curr_date;
        
      }
      
    
      //----------- Date End ----------

      if (!this.register.selectedGender) {
          this.msgValid.gender = true;
          return;
      }
 
        let obj = {
          email: this.register.email,
          first_name: this.register.name,
          last_name: this.register.lastname,
          birth_date: birth_date,
          gender: (this.register.selectedGender === 'Мужской') ? 'male' : 'female',
          locale: 'ru',
        };
      
      // alert(obj.email+' '+obj.first_name+' '+obj.last_name+' '+obj.birth_date+' '+obj.gender+' '+obj.locale);
        // this.preloaderEndRegister = true;
        
        this.$http.post('/oauth/register', obj)
          .then(res => {
            this.register.email = '';
            this.register.name = '';
            this.register.lastname = '';
            this.date.value = '1993-2-1';
            this.register.selectedGender = "";
            this.register.locale = "";
            // this.$router.push('/reg_confirm');
            // this.isLogin = "step-2";
        })
          .catch(errors => {
             consol.log('Ошибка ' + error.response.data.errors);
      
          });
    },

  },
};
</script>

<style>
        .success {
            font-size: 16px;
            color: var(--main-project-color);
            font-weight: bold;
        }
        form {
            width: 100%;
            display: flex;
            justify-content:center;
            align-items: center;
        }
        .div-login {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .br {
            font-size: 14px;
            font-weight: bold;
            color: var(--color-red-error);
        }
        .img-input {
            display: flex;
            flex-wrap:nowrap;
            justify-content: center;
            align-items: center; 
            width:100%;
        }
        .img-input img {
                width: 18px;
                height: 18px;
        }
        ::placeholder {
          margin-top: 20px;
        }
        .img-input input, .img-input select {
            border: none;
            outline: none;
            background-color: inherit;
            font-size: 14px;
            width: 100%;
            padding-left: 10px;
            height: 32px;
            color: #757575;
        }
        .right-div a {
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            color: var(--auth-color);
            font-size: 14px;
            line-height: 1;
            margin-bottom: 10px;
          
        }
        .right-div a:hover, a:active {
            text-decoration: none;
            color: var(--a-hover);
        }
        .right-div button {
                    height: 32px;
                    width: 100%;
                    color: var(--main-white-color);
                    background-color: var(--auth-color);
                    border-radius: 20px;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-size: 14px;
                    margin-bottom: 10px;
                    margin-top: 10px;
        }
        .right-div button:hover {
            background-color: var(--button-hover);
        }
        .icon_main{
            width: 18px;
            height: 18px;
        }
        .div-login p {
            font-size: 14px;
        }
        .agreement-text {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 100%;
        }
        .agreement-text p {
           line-height: 1;
           margin-top: 10px;
           margin-bottom: 10px;
        }
        .agreement-text a {
          margin: 0;
        }
        .vdp-datepicker {
            font-size: 14px;
            width: 100%;
        }
       
        .vdp-datepicker__calendar .cell {
            height: 30px;
            line-height: 30px;
        }
            
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        input[type="number"]:hover,
        input[type="number"]:focus {
            -moz-appearance: number-input;
        }

        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
            margin: 0;
        }

        @media only screen and (max-width: 600px) {
            .inputCalen {
                width: 240px;
                font-size: 11px;
                left: 28px;
            }
            .vdp-datepicker__calendar .cell {
                height: 25px;
                line-height: 25px;
            }
        }
</style>

