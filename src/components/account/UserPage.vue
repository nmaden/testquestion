<!-- template -->
<template>
    <div>
          <header>
                <div class="logo">
                    <img src="../../assets/images/honey.png" alt="">
                    <p>HoneyHunters</p>
                </div>

          
                <div class="center_gmail">
                        <!-- <div class="radius_gmail"> -->
                            <img src="../../assets/images/gmail.png" alt="" class="gmail">
                        <!-- </div> -->
                </div>

                <form @submit="formSubmit">
            
                <div class="comment_block">  
                        <div class="comment_block_first">
                            <div>
                                <label for="name"><p>Имя</p><p class="required">*</p></label>
                                <input type="text" id="name" v-model="name" required>
                            </div>
                            <div>
                                <label><p>E-Mail</p><p class="required">*</p></label>
                                <input type="email" id="email" v-model="email" required>
                            </div>
                        </div>
                        <div class="comment_block_second">
                            <label for="comment"><p>Комментарий</p><p class="required">*</p></label>
                            <textarea name="" id="comment" cols="30" rows="10" v-model="comments" required></textarea>
                        </div>
                </div>
                <button>Записать</button>
                </form>
        </header> 
        <div class="content">
              <p class="title">Выводим комментарии</p>
                <div class="print_comment">
                <div class="message"  v-for="i in this.alldata"  :key="i.id">
                    <div v-if="i.id%2==0" style="background-color: #deebde;  height: 200px;">
                            <div class="message_head" style="background-color: #4b596c">
                                <p >{{i.name}} </p>
                            </div>
                            <p style="color:#4b596c">{{i.email}}</p>
                            <p>{{i.comments}}</p>
                    </div>
                    <div v-else style="background-color: #e9eef3;  height: 200px;">
                            <div class="message_head" style="background-color: #58ad52">
                                <p>{{i.name}}</p>
                            </div>
                            <p style="color: #58ad52">{{i.email}}</p>
                            <p>{{i.comments}}</p>
                    </div>
                </div>
        
        </div>
        </div>
        <footer>
            <div class="logo">
                <img src="../../assets/images/honey.png" alt="">
                <p>HoneyHunters</p>
            </div>

            <div class="social_links">
                <img src="../../assets/images/vk.png" alt="">
                <img src="../../assets/images/facebook-logo.png" alt="">
            </div>
        </footer>
    </div>                 
</template>

<!-- scripts -->
<script>
    import axios from "axios";
    export default {
        components: {        
        },
        data() {
            return {
                alldata: [],
                name: '',
                email: '',
                comments: '',

            
            }
        },
        mounted() {
            axios.get("https://latinapi.herokuapp.com/v2/api/get"
             )
            .then(response => {
                this.alldata = response.data;
               
            })
            .catch(err => {
                // Manage the state of the application if the request 
                // has failed      
            })
        },
        methods: {
            
            formSubmit(e) {
                let self = this;
                e.preventDefault();
                axios.post('https://latinapi.herokuapp.com/v2/api/insert', {
                    name: this.name,
                    email: this.email,
                    comment: this.comments
                })
                .then(function (response) {
                    self.alldata = null;
                    self.alldata = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                  
                });
            }
        }
    };
</script>

<!-- style -->
<style scoped lang="scss"> 
         header {
                background-color: #37414e;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 150px;
                padding-right: 150px;
                padding-top: 30px;
                padding-bottom: 30px;
                form { 
                    width: 100%;
                }
                 .logo {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 80px;
                    padding-left: 20px;
                    img {
                        width: 20px;
                        height: 20px;
                    }
                    p {
                        padding-left: 10px;
                        color: white;
                    }
                }
                .center_gmail {
                    margin-top: 50px;
                    align-self: center;
                }
            
                .center_gmail img {
                    width: 80px;
                    height: 80px;
                }
           
                .comment_block {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-top: 30px;
                   
                    p {
                        color: white;
                    }
                    .required {
                        color: #a23132 !important;
                        padding-left: 5px;
                    }
                    input {
                        padding: 10px;
                        background-color: transparent;
                        border: 0.5px solid #4c4f53;
                        border-radius: 3px;
                        width: 200px;
                        outline: none;
                        color: white
                    }
                    input:focus {
                        border: 1px solid #a23132;
                    }
                    textarea {
                        padding: 20px;
                        border: 1px solid #4c4f53;
                        border-radius: 3px;
                        background-color: inherit;
                        margin-bottom: 40px;
                        outline: none;
                        color: white;
                    }
                    textarea:focus {
                        border: 1px solid #a23132;
                    }
                    .comment_block_first {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 215px;
                    }
                    .comment_block_second {
                        display: flex;
                        flex-direction: column;
                    }
                    label {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        padding-bottom: 10px;
                    }
                }
          
                button {
                    background-color:  #a23132;
                    align-self: flex-end;
                    outline: none;
                    border: none;
                    color: white;
                    padding: 10px;
                    padding-left: 30px;
                    padding-right: 30px;
                }
              

        }

         $bp-small: 1024px;
    
        @media only screen and (max-width: $bp-small) {

            header {
                width: 100%;
                padding-left: 0;
                padding-right: 0;
                .comment_block {
                width: 100%;
                display: flex;
                flex-direction: column !important;
                justify-content: unset;
                height: unset;
                    
                }
            
                .comment_block_first {
                    padding-left: 20px;
                    padding-right: 40px;
                    height: unset !important;
                    input {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }
                .comment_block_second {
                    padding-left: 20px;
                    padding-right: 20px;
                }
                label {
                    flex-direction: column;
                }
                button {
                    margin-left: 20px;
                }
            }
                
        }


        .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-top: 80px;
                padding-bottom: 80px;
                .title{
                    font-size: 18px;
                    font-weight: bold;
                    color: #37414e;
                    padding-bottom: 40px;
                }
                .print_comment {
                    display: flex;
                    flex-wrap: wrap;   
                    width: 85%;
                }
                .message {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    // background-color: #9dc9f5;
                    width: 260px;
                    height: 200px;
                    margin-left: 50px;
                    margin-right: 50px;
                    margin-bottom: 20px;
                }
                .message .message_head {
                    padding-top: 20px;
                    padding-bottom: 20px;
                    width: 260px; 
                    margin-bottom: 20px;
                }
                .message div p{
                    text-align: center;
                    color: white;
                }
                .message div p:nth-child(2){
                    margin-bottom: 20px;
                }
                .message div p:nth-child(3){
                    color: #778376;
                }
            }
    

            $bp-small: 1024px;

            @media only screen and (max-width: $bp-small) {
                .content {
                    padding-top: 20px;
                    padding-bottom: 0;
                        .message {
                        margin-left: 10px !important;
                        margin-right: 10px !important;
                    }
                    .print_comment {
                        justify-content: center;
                    }
                    .title {
                        padding-bottom: 20px;
                    }
                }
                

            }


       footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        padding-left: 150px;
        padding-right: 150px;
        background-color:  #37414e;

            .logo {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 80px;
                img {
                    width: 20px;
                    height: 20px;
                }
                p {
                    padding-left: 10px;
                    color: white;
                }
            }
            .social_links {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 80px;
                    img {
                        width: 20px;
                        height: 20px;
                        padding: 7px;
                        border-radius: 30px;
                        border: 1px solid #4c4f53;
                    }
            }    
        }

    // media request
    $bp-small: 1024px;
    
    @media only screen and (max-width: $bp-small) {
        footer{ 
            width: 100%;
            padding-left: 0;
            padding-right: 0;
            .logo {
                padding-left: 20px;
            }
            .social_links {
                padding-right: 20px;
            }
        }
       
    
    }
    
</style>