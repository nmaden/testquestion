<!-- template -->
<template>
        <div class="content">
             <div class="flexContent">
                    <div class="mFlex">
                        <div class="mainAvatar">
                            <div class="nameProfile">
                                <p>{{$t("message.title_profile")}}</p>
                            </div>
                            <div class="avatarImg">
                                <img src="../../assets/images/Alli.jpg" alt="images">
                            </div>
                            <div class="btnChange">
                                <span>{{$t("message.change")}}</span>
                            </div>
                        </div>
                        <div class="infoUser">
                            <!-- profile -->                    
                            <div class="nameProfile">
                                <p>{{$t("message.title_profile")}}</p>
                            </div>
                            <div class="profileFacts">
                                <!-- name -->
                                <div class="name">
                                    <p>Имя Фамилия</p>
                                </div>
                                <!-- birstday -->
                                <div class="flexFacts">
                                    <div class="flexFactsLeft">
                                        <p>{{$t("message.birthday")}}</p>
                                    </div>
                                    <div class="flexFactsRight">
                                        <p>1999-07-10</p>
                                    </div>
                                </div>
                                <!-- gender -->
                                <div class="flexFacts">
                                    <div class="flexFactsLeft">
                                        <p>{{$t("message.gender")}}</p>
                                    </div>
                                    <div class="flexFactsRight">
                                        <p>Мужской</p>
                                    </div>
                                </div>
                                <!-- phone -->
                                <div class="flexFacts">
                                    <div class="flexFactsLeft">
                                        <p>{{$t("message.phone")}}</p>
                                    </div>
                                    <div class="flexFactsRight">
                                        <p>+771727727272</p>
                                    </div>
                                </div>
                                <!-- country -->
                                <div class="flexFacts">
                                    <div class="flexFactsLeft">
                                        <p>{{$t("message.country")}}</p>
                                    </div>
                                    <div class="flexFactsRight">
                                        <p>Кз</p>
                                    </div>
                                </div>
                                <!-- show and hide button -->
                                
                                <button class="btnShow">{{$t("message.information")}}</button>

                                <!-- show and hide block -->
                                <div v-show="true" class="flexFactsShowAndHide">
                                    <!-- email -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>E-mail:</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>Test@mail.ru</p>
                                        </div>
                                    </div>
                                    <!-- nikname -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>{{$t("message.nickname")}}</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>test</p>
                                        </div>
                                    </div>
                                    <!-- adress -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>{{$t("message.address")}}</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>Test adress</p>
                                        </div>
                                    </div>
                                    <!-- index -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>{{$t("message.index")}}</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>test</p>
                                        </div>
                                    </div>
                                    <!-- Region -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>{{$t("message.region")}}</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>test</p>
                                        </div>
                                    </div>
                                    <!-- City -->
                                    <div class="flexFacts">
                                        <div class="flexFactsLeft">
                                            <p>{{$t("message.city")}}</p>
                                        </div>
                                        <div class="flexFactsRight">
                                            <p>test</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                      
                    <!-- photos -->
                    <div class="photosMainBlock">
                        <div class="nameMenu">
                            <p>{{$t("message.photo")}}</p>
                        </div>
                        <!-- photo scroll -->
                        <div class="photoScrollBlock">
                            <div class="photoImg">
                                <img src="../../assets/images/Alli.jpg" alt="images">
                            </div>
                        </div> 
                        
                            <!-- <gallery :images="images" :index="index" @close="index = null"></gallery>
                            <div
                                class="image"
                                v-for="(image, imageIndex) in images"
                                :key="imageIndex"
                                @click="index = imageIndex"
                                :style="{ backgroundImage: 'url(' + image + ')', width: '300px', height: '200px' }"
                            ></div> -->
                           
                    </div> 

                    <!-- news -->
                    <div class="photosMainBlock">
                        <div class="nameMenu">
                            <p>{{$t("message.news")}}</p>
                        </div>
                        <!-- news scroll -->
                        <div class="newsScrollBlock">
                            
                        </div>   
                    </div> 
                    <!-- load news -->
                    <div class="nextNews">{{$t("message.add_news")}}</div>
             </div> 
                     
        </div>                   
</template>

<!-- scripts -->
<script>
    // imports scripts
    import VueGallery from 'vue-gallery';
    
    export default {
        data() {
            return {
                images: [
                    'https://dummyimage.com/800/ffffff/000000',
                    'https://dummyimage.com/1600/ffffff/000000',
                    'https://dummyimage.com/1280/000000/ffffff',
                    'https://dummyimage.com/400/000000/ffffff',
                ],
                index: null
            }
        },
        components: {
            'gallery': VueGallery
        },
    };
</script>

<!-- style -->

<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style>

<style scoped lang="scss"> 
    
    .content {
        width: 100%;
        
        
        .flexContent {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 20px;

            .mFlex {
                width: 100%;
                display: flex;
                justify-content: space-around;
            }

            .nextNews {
                    width: 200px;
                    text-align: center;
                    margin: 0 auto;
                    height: 35px;
                    margin-top: 20px;
                    border-radius: 5px;
                    line-height: 35px;
                    outline: none;
                    color: var(--main-white-color);
                    background: var(--main-project-color);
                    cursor: pointer;

                    &:hover {
                        background: var(--main-hover-btn-color);
                        transition: .3s;
                    }
            }

            .photosMainBlock {
                width: 100%;
                background: var(--main-white-color);
                margin-top: 20px;
                
                .newsScrollBlock {
                    width: 100%;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .photoScrollBlock {
                    width: 100%;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-left: 20px;
                    padding-right: 20px;

                    .photoImg {
                        width: 100px;
                        height: 100px;
                        overflow: hidden;
                        border-radius: 5px;
                        background: var(--main-white-color);

                        img {
                             max-height: 100%;
                             border-radius: 5px;
                        }
                    }
                }
                .nameMenu {
                        width: 100%;
                        padding: 10px 20px;
                        border-bottom: 2px solid var(--main-border-color);

                        p {
                            font-weight: bold;
                        }
                }
            }
            .mainAvatar {
                height: 203px;
                background: var(--main-white-color);

                .nameProfile {
                        width: 100%;
                        padding: 10px 20px;
                        border-bottom: 2px solid var(--main-border-color);
                        display: none;

                        p {
                            font-weight: bold;
                        }
                }

                .avatarImg {
                    width: 126px;
                    height: 126px;
                    border-radius: 50%;
                    margin: 20px;
                    overflow: hidden;
                    background: var(--main-user-page-color);
                    
                    img {
                        width: 100%;
                        height: 100%;
                        clip-path: circle(74px at center);
                    }
                }

                .btnChange {
                    width: 100%;
                    text-align: center;
                    margin-bottom: 20px;

                    span {
                        cursor: pointer;
                        font-size: 14px;
                    }
                }
            }

            .infoUser {
                    width: 82%;
                    background: var(--main-white-color);
                    margin-left: 20px;

                    .flexFactsShowAndHide {
                        margin-top: 17px;
                    }

                    .nameProfile {
                        width: 100%;
                        padding: 10px 20px;
                        border-bottom: 2px solid var(--main-border-color);

                        p {
                            font-weight: bold;
                        }
                    }

                    .profileFacts {
                        margin: 20px;

                        .name {
                            margin-bottom: 10px;

                            p {
                                font-weight: bold;
                                font-size: 1.2rem;
                            }
                        }

                        .flexFacts {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;

                            .flexFactsLeft {
                                width: 155px;

                                p {
                                    font-weight: bold;
                                    font-size: 14px;
                                    margin-bottom: 5px;
                                }
                            }

                            .flexFactsRight {
                                width: 200px;

                                p {
                                    font-size: 14px;
                                    margin-bottom: 5px;
                                }
                            }
                        }
                        .btnShow {
                                width: 100%;
                                height: 30px;
                                border: none;
                                outline: none;
                                background: transparent;
                                cursor: pointer;
                                color: var(--main-project-color);
                                margin-top: 11px;
                                font-size: 14px;
                                &:hover {
                                    transition: .3;
                                    border: 1px solid var(--main-project-color);
                                }
                        }
                        
                    }
            }
        }
       
    }

    // media request
    $bp-small: 730px;
    
    @media only screen and (max-width: $bp-small) {
            .content {
                .flexContent {
                    .mFlex {
                        justify-content: center;
                        flex-wrap: wrap;
                    }  
                    .infoUser {
                        width: 100%;
                        margin-left: 0px;

                        .nameProfile {
                            display: none;
                        }
                    }
                    .mainAvatar {
                        width: 100%;
                        display: flex;
                        height: 244px;
                        justify-content: center;
                        flex-wrap: wrap;
                        border-bottom: 2px solid var(--main-border-color);
 
                        .nameProfile {
                            display: block;
                        }
                    }

                    .infoUser {
                        .profileFacts {
                            .flexFacts {
                                .flexFactsLeft {
                                    width: 50%;
                                    p {
                                        font-size: 12px;
                                    }
                                }
                                .flexFactsRight {
                                    width: 50%;
                                    p {
                                        font-size: 12px;
                                    }
                                }
                            }
                            .name {
                                p {
                                    font-size: 1rem;
                                }
                            }
                           
                        }
                    }   
                }
            }  
    }
</style>