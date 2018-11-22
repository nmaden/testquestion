    <template>
    <div class="mainer">
        <div class="mainer-second">
            <div class="center home">
                <div class="left-div">
                    <h1>{{$t("message.title1")}}</h1>
                    <h1>{{$t("message.title2")}}</h1>
                    <a  href="https://otau.org" target='_blank'>otau</a>
                </div>
                <div class="right-div">
                    <img src="../../assets/images/otau_logo.png" class="logo">
                    <router-view></router-view>
                </div>
            </div>
            <div class="language-div">
                <div class="selector">
                    <img :src="link" alt="">
                    <select v-model="$i18n.locale"  @change="onChange" >
                        <option v-for="(key, value) in object"  :key="`Lang${value}`" class="op" :value="value"><p>{{ key }} </p></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    </template>


    <script>
    export default {
    name: 'AccountPage' ,
        data() {
            return {
                  object: {
                    ru: 'Россия',
                    kaz: 'Қазақстан',
                    en: 'United States',
                  },
                  languages: {
                    ru: require('../../assets/images/ru.png'),
                    kaz: require('../../assets/images/kaz.png'),
                    en: require('../../assets/images/en.png'),
                  },
                  link: require('../../assets/images/kaz.png')
            }
        },
        components: {
        },
        methods: {
             onChange:function(event){
                this.link = this.languages[event.target.value];
            }
        },
    }
    </script>
    <style scoped lang="scss">
                .mainer-second {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }   
                .language-div {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;

                }
                .selector {
                    display: flex;
                    flex-direction: row;
                }
                .selector img {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    margin-right: 134px;
                    margin-bottom: 27px;
                }
                .language-div select {
                    margin: 20px;
                    padding: 5px;
                    color: white;
                    outline: none;
                    border:none;
                    font-size: 14px;
                    font-weight:bold;
                    align-self: flex-end;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    background-color: inherit;
                }
                .op {
                     background-color: white;
                     border:none !important;
                     font-size: 14px;
                     font-weight: bold;
                }
                .op:hover {
                    background-color: var(--auth-color);
                }
            
          
                form {
                    width: 100%;
                }
                .mainer {
                    max-width: 192rem;
                    margin: 0 auto;
                    line-height: 1.6;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    background-size: cover;
                    background-image: url(../../assets/images/bg.jpg);
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    width: 100%;         
                }
                .home {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 760px;
                        @media only screen and (max-width: 765px) {
                            width: 100%;
                            flex-wrap: nowrap;
                            justify-content: space-around;
                        }
                }
                .left-div {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: flex-end;
                        letter-spacing: .2rem;
                        margin-right: 30px;
                         width: 100%;
                    @media only screen and (max-width: 765px) {
                        margin-right: 0;
                        width: 400px;
                        
                    }
                    @media only screen and (max-width: 655px) {
                        display: none;
                    }
                    h1 {
                            text-transform: uppercase;
                            font-size: 32px;
                            font-weight: lighter;
                            letter-spacing: .2rem;
                            text-shadow: var(--shadow-white);
                            @media only screen and (max-width: 764px) {
                                font-size: 27px;
                            }
                    }
                    a {
                            text-transform: uppercase;
                            font-size: 32px;
                            font-weight: lighter;
                            letter-spacing: .2rem;
                            text-shadow: var(--shadow-white);
                            color: var(--main-project-color);
                            position: relative;
                            overflow: hidden;
                            text-decoration: none;
                            border:none;
                            text-decoration: none;
                            @media only screen and (max-width: 764px) {
                                font-size: 27px;
                            }
                    }
                    a:after {
                            content: "";
                            position: absolute;
                            z-index: -0.5;

                            left: 0;
                            right: 100%;
                            margin-top: 39px;
                            background: #123368;
                            height: 2px;
                            text-decoration: none;
                            border:none;
                            transition-property: left right;
                            transition-duration: 0.3s;
                            transition-timing-function: ease-out;
                    }
                    a:hover:after,
                    a:focus:after,
                    a:active:after {
                            border:none;
                            right: 0;
                    }
                    
                }

                .right-div {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 1.5rem;
                    width: 300px;
                    background: rgba(255, 255, 255, 0.4);
                    padding: 20px 40px 20px 40px;
                    border-radius: 15px;
                    margin: 25px;
                    @media only screen and (max-width: 655px) {
                         width: 200px;
                        
                    }
                    @media only screen and (max-width: 765px) {
                        width: 200px;
                  
                    }

                }
                
                .right-div img {
                        width: 210px;
                        padding-bottom: 20px;
                    @media only screen and (max-width: 765px) {
                        width: 180px;
                    }
                    @media only screen and (max-width: 330px) {
                        width: 160px;
                    }
                }
    
    </style>
