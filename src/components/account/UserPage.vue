<!-- template -->
<template >
    <div class="main">
          <header>
              <div class="header_inner">
                        <div class="logo">
                            <p>Hybrid.ai</p>
                        </div>

                
                        <div class="center_gmail">
                                <!-- <div class="radius_gmail"> -->
                                    <img src="../../assets/images/gmail.png" alt="" class="gmail">
                                <!-- </div> -->
                        </div>

                        <form @submit="formSubmit">
                            <div class="data_block">  
                                    <div class="data_block_first">
                                        <div>
                                            <label for="name"><p>Заголовок</p><p class="required">*</p></label>
                                            <input type="text" id="name" v-model="header" required>
                                        </div>
                                        <div>
                                            <label><p>Краткое описание</p><p class="required">*</p></label>
                                            <textarea name="" id="comment" cols="30" rows="5" v-model="short_header" required></textarea>
                                        </div>
                                    </div>
                                    <div class="data_block_second">
                                        <label for="comment"><p>Полное описание</p><p class="required">*</p></label>
                                        <textarea name="" id="comment" cols="30" rows="10" v-model="description" required></textarea>
                                    </div>
                            </div>
                            <button>Записать</button>
                        </form>
              </div>
        </header> 
        <div class="content">
                <div v-if="!this.empty">
                     <p>{{this.message}}</p>
                </div>
               
                <div class="print_comment">
                   
                    <div class="message"  v-for="(i, index) in this.items" :key="`item-${index}`" >
                        
                        <div class="message_head">
                            <div  class="message_head_left">
                                
                                <div v-if='!i[0].clickedEdit'  class="item_title" >
                                    <p>{{i[0]["header"]}} </p>
                                    <p>{{i[0]["short_header"]}}</p>
                                </div>
                                <div class="item_title"  v-else >
                                    <input placeholder="Заголовок"   v-model="i[0]['header']" >
                                    <input placeholder="Краткое описание"   v-model="i[0]['short_header']">
                                    <textarea placeholder="Полное описание" v-model="i[0]['description']"></textarea>
                                    <button @click="submitEdit(index)">Опубликовать</button>
                                </div>
                         

                            </div>
                            <div class="message_head_right">
                                <p>Количество комментарии {{alldata[index][0]["comment"].length}}</p>
                                <img :src="require('../../assets/images/' + i[0]['img'])"   @click="toggle(i[0])"    alt=""/>
                                <img src="../../assets/images/edit.png"  @click="toggleEdit(i[0])"  alt="">
                                <img src="../../assets/images/remove.png"  @click="removeItem(index)" alt="">
                            </div>
                        </div>

                        <div v-if='i[0].clicked' class="message_body" >
                            <p>Полное описание:</p>
                            <p>{{i[0]["description"]}}</p>
                            <div class="send_comment">
                                <input type="text" placeholder="Имя" v-model="comentator_name[index]">
                                <input type="text" placeholder="Текст" v-model="comment[index]">
                                <button @click="sendComment(index)">Опубликовать</button>
                            </div>
                            <div class="allcomments" v-for="(j,position) in i[0]['comment']"  :key="position" >
                                <p>{{ j["name"] }}</p>
                                <p>{{ j["comment"] }}</p>
                                <img  @click="removeComment(index,position)" src="../../assets/images/remove.png" alt="">
                            </div>

                        </div>
                    </div>
                
       
        </div>
          <div style="display: flex; justify-content: center" v-show="loading">
            <img style="width: 150px; height: 100px" src="../../assets/images/loader.gif" alt="">
        </div>
        </div>
        <footer>
            <div class="bottom">
                <div class="logo">
                    <p>Hybrid.ai</p>
                </div>

                <div class="social_links">
                    <img src="../../assets/images/vk.png" alt="">
                    <img src="../../assets/images/facebook-logo.png" alt="">
                </div>
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
                header: '',
                short_header: '',
                description: '',
                array: [],
                isHidden: false,
                activeItem: null,
                comentator_name: [],
                comment: [],
                persons: [],
                loading: false,
                empty: true,
                nextItem: 0,
                items: [],
                message: "Массив пустой"
            }
        },
        mounted() {
            if(localStorage.getItem("messages")!=undefined) {
                this.alldata =  JSON.parse(localStorage.getItem("messages"));
            }
            else {
                this.alldata =  [];
            }
            this.loadMore(); 
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow  &&  this.items.length !=this.alldata.length && this.alldata.length!=0) {
                        this.loadMore();
                }
            };
            
        },
      
        methods: {
            toggle: function (data) {
                if(data.hasOwnProperty('clicked')){
                    data.clicked = !data.clicked;
                    if(data.clicked) {
                       this.$set(data, 'img', "arrow_up.png");
                    }
                    else {
                       this.$set(data, 'img', "arrow_down.png");
                    }
                }else{
                    this.$set(data, 'clicked', true);
                    this.$set(data, 'img', "arrow_up.png");
                }
            },
            toggleEdit: function (data) {
                if(data.hasOwnProperty('clickedEdit')){
                    data.clickedEdit = !data.clickedEdit;
                }else{
                    this.$set(data, 'clickedEdit', true);
                }
            },
            loadMore () {
                if(this.alldata.length!=0) {
                    this.loading = true;
                    setTimeout(e => {
                        for (var i = 0; i < 1; i++) {
                            this.items.push(this.alldata[this.nextItem++]);
                        }
                        this.loading = false;
                    }, 0);
                     this.empty = true;
                }else {
                    this.loading = false;
                    this.empty = false;
                    
                }
            
            },
            removeComment(index,i) {
              /* Удаление комментарии */
              this.alldata[index][0]["comment"].splice(i,1); 
              localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            removeItem(index) {
              /* Удаление данных */ 
              this.alldata.splice(index,1);
              localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            sendComment(index) {
                /* Добавление комментарии */ 
                var id = 0;
                if(this.alldata[index][0]["comment"].length==0) {
                    id = 0;
                }
                else {
                    id = this.alldata[index][0]["comment"].length + 1;
                }
           
                var comment = {
                    "id": id,
                    "name" : this.comentator_name[index],
                    "comment": this.comment[index]
                };
                this.comentator_name[index] = "";
                this.comment[index] = "";
                this.alldata[index][0]["comment"].push(comment);
                localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            submitEdit(index) {
                /* Сохранить редактированный данный */ 
               
                this.alldata[index][0]["clickedEdit"] = true;
                localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            formSubmit(e) {
                e.preventDefault();

                /* Добавление данных в localStorage */
                var data = [{
                    "header": this.header,
                    "short_header": this.short_header,
                    "description": this.description,
                    "show": false,
                    "edit_show": false,
                    "comment": [],
                    "img": "arrow_down.png"
                }];

                var messages  = [];
                this.header = "";
                this.short_header = "";
                this.description = "";
                if(localStorage.getItem("messages")!=undefined) {
                    messages =  JSON.parse(localStorage.getItem("messages"));
                }
                else {
                    messages = [];
                }
            
                messages.push(data);

                if(messages.length==1) {
                    var number = 1;
                }else {
                    var number = messages.length - 1;
                }


                localStorage.setItem("messages",JSON.stringify(messages));
                var retrievedObject = localStorage.getItem("messages");
                this.alldata = JSON.parse(retrievedObject);
            }
        }
    };
</script>

<!-- style -->
<style scoped lang="scss"> 
        body {
            .main {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            button {
                background-color:  #a23132;
                outline: none;
                border: none;
                color: white;
                padding: 10px;
                padding-left: 30px;
                padding-right: 30px;
                margin-bottom: 10px;
            }
           
        }
        ::placeholder {
            color: white;
        }
        header {
                background-color: #37414e;
                display: flex;
                flex-direction: column;

                align-items: center;

                width: 100%;
                padding-top: 30px;
                padding-bottom: 30px;
                .header_inner {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 1050px;
                }
                form { 
                    width: 100%;
                }
                .logo {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 80px;
                  
                    p {
                   
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
           
                .data_block {
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
                    .data_block_first {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        input {
                            margin-bottom: 10px;
                        }
                    }
                    .data_block_second {
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
          
   
              
        }
        $bp-small: 1024px;
    
        @media only screen and (max-width: $bp-small) {
            header {
                width: 100%;
                .header_inner {
                    width: 100%;
                }
                .logo {
                    padding-left: 20px;
                }
                .data_block {
                    width: 100%;
                    display: flex;
                    flex-direction: column !important;
                    justify-content: unset;
                    height: unset;
                }
            
                .data_block_first {
                    padding-left: 20px;
                    padding-right: 20px;
                    height: unset !important;
                    input,textarea {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }
                .data_block_second {
                    padding-left: 20px;
                    padding-right: 20px;
                    width: 100%;
                    textarea {
                        width: 100%;
                        margin-bottom: 20px;
                    }
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
                padding-top: 30px;
                padding-bottom: 30px;
                width: 100%;
            
                .title{
                    font-size: 18px;
                    font-weight: bold;
                    color: #37414e;
                    padding-bottom: 40px;
                }
                .print_comment {
                    display: flex;
                    flex-wrap: wrap;
                    width: 1050px;
                    
                }
                .message {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    // background-color: #9dc9f5;
                    width: 100%;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    padding: 30px;
                    background-color: #37414e;
                    p {
                        margin-bottom: 10px;
                    }
                    .message_head {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                        width: 1000px;
                   }
                   input,textarea {
                        width: 200px;
                        padding: 10px;
                        border: 1px solid white;
                        color: white;
                        border-radius: 3px;
                        margin-bottom: 10px;
                        outline: none;
                    }
                    div p{
                        color: white;
                    }
                    div p:nth-child(2){
                        margin-bottom: 20px;
                    }  
                    div p:nth-child(3){
                        color: #778376;
                    }   
                    .message_head img {
                        width: 20px;
                        height: 20px;
                    } 
                    .message_head_left {
                    display: flex;
                    flex-direction: row;
                        .item_title {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            p:nth-child(1) {
                                color: black;
                            }
                        }
                        button {
                            width: 200px;
                        }
                    }  

                    .message_head_right {
                        width: 300px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: flex-start;
                        img {
                            cursor: pointer;
                        }
                    }  
                    .message_body {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        .send_comment {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            width: 600px;
                        }
                        .allcomments {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            width: 1000px;
                          
                            img {
                                width: 15px;
                                height: 15px;
                            }
                        }
                    }
                }
            }
            $bp-small: 1024px;
            @media only screen and (max-width: $bp-small) {
                .content {
                    padding-top: 20px;
                    padding-bottom: 0;
                    .print_comment {
                        width: 90%;
                        justify-content: center;
                    }
                    .message {
                        width: 100%;
                        
                        .message_head {
                            width: 100%;
                            flex-direction: column-reverse;
                            .message_head_left {
                                width: 100%;
                                .item_title {
                                    width: 100%;
                                    input,textarea,button {
                                        width: 100%;
                                    }
                                }
                            }
                            .message_head_right {
                                width: 100%;
                            }
                            .message_head_right p {
                                white-space: nowrap;
                            }
                            img {
                                width: 15px;
                                height: 15px;
                                margin-left: 5px;
                            }
                        }
                        p {
                            font-size: 12px;
                        }
                        .message_body {
                            width: 100%;
                            .send_comment {
                                width: 100%;
                                flex-direction: column;
                                input {
                                    width: 100%;
                                }
                            
                            }
                            .allcomments {
                                width: 100% ;
                            }
                        }
                    }
                   

                   
                }
                
            }


        footer {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-color:  #37414e;
            width: 100%;
            .bottom {
                width: 1060px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 80px;
                p {
                    color: white;
                }
            }
            .social_links {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 80px;
                    img {
                        width: 30px;
                        height: 30px;
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
            .bottom {
                width: 100%;
            }
            .logo {
                padding-left: 20px;
            }
            .social_links {
                padding-right: 20px;
            }
        }
    }
    
</style>