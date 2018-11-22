<!-- template -->
<template>
    <div>
        <Header />
        <div class="content">
             <div class="sidebar">
                    <div class="nameMenu">
                        <p class="menuCloseMobile">{{$t("message.title_menu")}}</p>
                        <img src="../../assets/images/close.png" class="closeMenu" @click="closeMenu" />
                    </div>
                    <ul>
                        <!--  v-for="item in items" -->
                        <li>
                            <img src="../../assets/images/1.png" alt="images">                 
                            <div @click="closeMenu"><router-link to="/user" class="routerLink">{{$t("message.personal_page")}}</router-link></div>
                        </li>
                        <li>
                            <img src="../../assets/images/2.png" alt="images">
                            <div @click="closeMenu"><router-link to="/user/profile" class="routerLink">{{$t("message.personal_info")}}</router-link></div>
                        </li>          
                        <li>
                            <img src="../../assets/images/3.png" alt="images">
                            <div @click="closeMenu"><router-link to="/user/settings" class="routerLink">{{$t("message.settings")}}</router-link></div>
                        </li>          
                        <li>
                            <img src="../../assets/images/4.png" alt="images">
                            <div @click="closeMenu"><router-link to="/user/faq" class="routerLink">{{$t("message.ans_ques")}}</router-link></div>
                        </li>          
                        <li>
                            <img src="../../assets/images/5.png" alt="images">
                            <a class="routerLink">{{$t("message.logout")}}</a>                                                
                        </li>          
                    </ul>
                   
             </div>
             <div class="mainViewRouter">
                    <router-view></router-view>
             </div>
        </div>  
        <div class="language-div">
            <div class="selector">
                <img :src="link" alt="">
                <p style="color:red">{{ selected }}</p>
                <select v-model="$i18n.locale"  @change="onChange" >
                    <option v-for="(key, value) in object"  :key="`Lang${value}`" class="op" :value="value"><p>{{ key }} </p></option>
                </select>
            </div>
        </div>

        
    </div>                 
</template>

<!-- scripts -->
<script>
    import Header from './Header.vue';

    export default {
        components: {
            Header,
        },
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
        methods: {
            closeMenu() {
                var menu = document.querySelector('.sidebar');
                var opM = document.querySelector('.menuBlock'); 
                menu.style.transition = ".5s";
                menu.style.left = "-320px";
                opM.style.display = "none";
            },
            onChange:function(event){
                this.link = this.languages[event.target.value];
            }
        }
    };
</script>

<!-- style -->
<style scoped lang="scss"> 

    .content {
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;

        .nameMenu {
                width: 100%;
                padding: 10px 20px;
                border-bottom: 2px solid var(--main-border-color);

                p {
                    font-weight: bold;
                }

                .closeMenu {
                    display: none;
                }
        }

        .sidebar {
            width: 300px;
            height: 265px;
            background: var(--main-white-color);
            margin-left: 20px;
            
            ul {
                margin-top: 10px;
                margin-bottom: 10px;
            }
            li {
                list-style: none;
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;

                img {
                    width: 24px;
                    height: 24px;
                    margin-left: 20px;
                    margin-right: 12px;
                    position: relative;
                    top: -1px;
                }
            }
            .routerLink {
                text-decoration: none;  
                cursor: pointer;
                color: var(--main-project-color);
                font-weight: bold;
                font-size: 14px;
            }
           
        }

        .mainViewRouter {
            width: 100%;
            margin-left: 20px;
            margin-right: 20px;
        }
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
        color: var(--main-project-color);
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
    select p:before {
        content: "sdflk";
        display: inline-block;
    }
          

    // media request
    $bp-small: 930px;
    
    @media only screen and (max-width: $bp-small) {
            .content{
                .sidebar {
                    height: 100%;
                    position: fixed;
                    left: -320px;
                    z-index: 9999;
                    top: 0;
                    width: 220px;
                }
                .nameMenu{
                    padding: 0;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    p {
                        margin-top: 10px;
                        margin-left: 10px;
                        margin-bottom: 10px;
                    }

                    .menuCloseMobile{
                        display: none;
                    }

                    .closeMenu {
                        display: block;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        margin: 10px;
                    }
                }
            }        
    }
    
</style>