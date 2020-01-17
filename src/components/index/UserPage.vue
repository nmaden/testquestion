<!-- template -->
<template >
    <article>
          <header>
              <div class="header_inner">
                        <div class="logo">
                            <p>TEST</p>
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
        <main>
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
        </main>
        <footer>
            <div class="bottom">
                <div class="logo">
                    <p>TEST</p>
                </div>

                <div class="social_links">
                    <img src="../../assets/images/vk.png" alt="">
                    <img src="../../assets/images/facebook-logo.png" alt="">
                </div>
            </div>
        </footer>
    </article>                 
</template>

<!-- scripts -->
<script>
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
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                let bottomOfWindow = top + window.innerHeight === document.documentElement.offsetHeight;
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
              this.items.splice(index,1);
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
              

                localStorage.setItem("messages",JSON.stringify(messages));
                var retrievedObject = localStorage.getItem("messages");
                this.alldata = JSON.parse(retrievedObject);
                this.loadMore();
            }
        }
    };
</script>