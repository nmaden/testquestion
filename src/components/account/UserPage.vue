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
                <div class="print_comment">
                   
                    <div class="message"  v-for="(i, index) in this.items"   :key="`item-${index}`" >
                        
                        <div class="message_head">
                            <div  class="message_head_left">
                                
                                <div v-if='i[0]["edit_show"]==false' class="item_title" >
                                    <p>{{i[0]["header"]}} </p>
                                    <p>{{i[0]["short_header"]}}</p>
                                </div>
                                <div class="item_title"  v-else >
                                    <input placeholder="Заголовок"   v-model="i[0]['header']" >
                                    <input placeholder="Краткое описание"   v-model="i[0]['short_header']">
                                    <textarea placeholder="Полное описание" v-model="i[0]['description']"></textarea>
                                    <button @click="submitEdit(editstorage[index],index)">Опубликовать</button>
                                </div>
                         

                            </div>
                            <div class="message_head_right">
                                <p>Количество комментарии {{alldata[index][0]["comment"].length}}</p>
                                <img :src="require('../../assets/images/' + i[0]['img'])"  @click="selectItem(hideshowstorage[index],index)"  alt=""/>
                                <img src="../../assets/images/edit.png"  @click="edit(editstorage[index],index)" alt="">
                                <img src="../../assets/images/remove.png"  @click="removeItem(index)" alt="">
                            </div>
                        </div>

                        <div v-if='i[0]["show"]==true' class="message_body" >
                            
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
                
         <div style="display: flex; justify-content: center" v-show="loading">
                        <img style="width: 150px; height: 100px" src="../../assets/images/loader.gif" alt="">
        </div>
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
                hideshowstorage: [],
                editstorage: [],
                comentator_name: [],
                comment: [],
                persons: [],
                loading: false,
                nextItem: 0,
                items: []
            }
        },
        mounted() {
            if(localStorage.getItem("messages")!=undefined) {
                this.alldata =  JSON.parse(localStorage.getItem("messages"));
                this.hideshowstorage = JSON.parse(localStorage.getItem("hideshowstorage"));
                this.editstorage = JSON.parse(localStorage.getItem("editstorage"));
            }
            else {
                this.alldata =  [];
            }

            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow  &&  this.items.length !=this.alldata.length) {
                        this.loadMore();
                }

            };
             loadMore ();   
        },
      
        methods: {
            loadMore () {
                this.loading = true;
                setTimeout(e => {
                    for (var i = 0; i < 1; i++) {
                        this.items.push(this.alldata[this.nextItem++]);
                    }
                    this.loading = false;
                }, 0);
            },
            edit(i,index) {
                var value = "";
                this.editstorage[index] = i +1;
                if(this.editstorage[index]%2!=0) {
                    value = false;
                  
                }
                else {
                    value = true;
                  
                   
                }
                this.alldata[index][0]["edit_show"] = value;
               

                localStorage.setItem("messages",JSON.stringify(this.alldata));
                localStorage.setItem("editstorage",JSON.stringify(this.editstorage));

            },
            submitEdit(i,index) {
                var value = "";
                this.editstorage[index] = i +1;
                if(this.editstorage[index]%2!=0) {
                    value = false;
                }
                else {
                    value = true;
                }
                this.alldata[index][0]["edit_show"] = value;
               

                localStorage.setItem("messages",JSON.stringify(this.alldata));
                localStorage.setItem("editstorage",JSON.stringify(this.editstorage));
            },
            removeComment(index,i) {
              this.alldata[index][0]["comment"].splice(i,1); 
              localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            removeItem(index) {
              this.alldata.splice(index,1);
              this.editstorage[index] = null;
              this.hideshowstorage[index] = null;
              localStorage.setItem("messages",JSON.stringify(this.alldata));
            },
            selectItem(i,index) {
                var value = "";
                var img = "";
                this.hideshowstorage[index] = i +1;
                if(this.hideshowstorage[index]%2!=0) {
                    value = false;
                    img = "arrow_down.png";
                }
                else {
                    value = true;
                    img = "arrow_up.png";
                }
                this.alldata[index][0]["show"] = value;
                this.alldata[index][0]["img"] = img;
                
                localStorage.setItem("hideshowstorage",JSON.stringify(this.hideshowstorage));

                localStorage.setItem("messages",JSON.stringify(this.alldata));
            },

            sendComment(index) {
                var id = 0;
                if(this.alldata[index][0]["comment"].length==0) {
                    id = 0;
                }
                else {
                    id = this.alldata[index][0]["comment"].length + 1;
                }
                // alert(index);
                var comment = {
                    "id": id,
                    "name" : this.comentator_name[index],
                    "comment": this.comment[index]
                };
                this.alldata[index][0]["comment"].push(comment);
                localStorage.setItem("messages",JSON.stringify(this.alldata));
                console.log(this.alldata[index][0]["comment"][0]);
            },
            formSubmit(e) {
                e.preventDefault();
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

                for (let index = 0; index < number; index++) {
                    this.hideshowstorage.push(1);
                    this.editstorage.push(1);
                }

               
                localStorage.setItem("editstorage",JSON.stringify(this.editstorage)); 
                localStorage.setItem("hideshowstorage",JSON.stringify(this.hideshowstorage));

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
                        height: 215px;
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
                            p:nth-child(2) {
                                color: black;
                            }
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