<!-- template -->
<template>
        <div class="content">
            <div class="nameMenu">
                        <p>{{$t("message.personal_info")}}</p>
            </div>
            <div class="flexInputs">
                <div class="flexInputsLeft">
                
                            <!-- name -->
                            <div class="formGroup">
                                <label for="name">{{$t("message.name")}}*</label>
                                <input 
                                id="name"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- lastname -->
                            <div class="formGroup">
                                <label for="lastname">{{$t("message.surname")}}*</label>
                                <input 
                                id="lastname"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- nickname -->
                            <div class="formGroup">
                                <label for="nickname">{{$t("message.nickname")}}*</label>
                                <input 
                                id="nickname"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- date -->
                            <div class="formGroup">
                                    <label for="date">{{$t("message.birthday")}}*</label>
                                     <datepicker 
                                        id="date"
                                        v-model="date.value"
                                        :disabledDates="date.disabledDates"
                                        :language="date.ru" 
                                        input-class="inputDate2"></datepicker>
                            </div>
                            <!-- gender -->
                            <div class="formGroup">
                                <label for="gender">{{$t("message.gender")}}*</label>
                                <select id="gender">
                                <option value="male">{{$t("message.male")}}</option>
                                <option value="female">{{$t("message.female")}}</option>
                                </select>
                            </div>
                            <!-- phone -->
                            <div class="formGroup">
                                <label for="phone">{{$t("message.phone")}}</label>
                                <input id="phone" >
                            </div>   
                       
                </div>
                <div class="flexInputsRight">
                            <!-- E-mail -->
                            <div class="formGroup">
                                <label for="email">E-mail*</label>
                                <input 
                                id="email"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- address -->
                            <div class="formGroup">
                                <label for="address">{{$t("message.address")}}*</label>
                                <input 
                                id="address"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- index -->
                            <div class="formGroup">
                                <label for="index">{{$t("message.index")}}*</label>
                                <input 
                                id="index"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- city -->
                            <div class="formGroup">
                                <label for="city">{{$t("message.city")}}*</label>
                                <input 
                                id="city"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- region -->
                            <div class="formGroup">
                                <label for="region">{{$t("message.region")}}*</label>
                                <input 
                                id="region"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                            <!-- country -->
                            <div class="formGroup">
                                <label for="country">{{$t("message.country")}}</label>
                                <input 
                                id="country"
                                type="text"
                                autocomplete="off"
                                maxlength="20"
                                >
                            </div>
                </div> 
            </div>

            <div class="changeData">
                <button>Изменить данные</button>
            </div>
        </div>                   
</template>

<!-- scripts -->
<script>
    // imports libraries
    import Datepicker from 'vuejs-datepicker';
    import { ru } from 'vuejs-datepicker/dist/locale';

    export default {
        components: {
            Datepicker
        },
        
        data() {
            return {
                date: {
                    value: '',
                    ru: ru,
                    disabledDates: {
                    to: new Date(1902, 1, 1),  
                    from: new Date(2003, 0, 0),
                    },
                },
            }
        }
    };
</script>

<!-- style -->
<style>
.inputDate2 {
    padding: 6px 7px;
    border-radius: 5px;
    width: 100%;
    outline: none;
    border: 1px solid var(--main-input-border-color);
}

.vdp-datepicker__calendar {
    width: 100%;
}
 
</style>
<style scoped lang="scss"> 
    
    .content {
        width: 100%;
        background: var(--main-white-color);
        flex-wrap: wrap;

        .changeData {
            margin-left: 20px;
            margin-bottom: 20px;

            button {
                width: 620px;
                color: var(--main-white-color);
                height: 35px;
                border-radius: 5px;
                border: none;
                outline: none;
                background: var(--main-project-color);
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;

                &:hover {
                    background: var(--main-hover-btn-color);
                    transition: 0.3s;
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

       .flexInputs {
           width: 100%;
           padding-top: 20px;
           padding-bottom: 20px;
           display: flex;
           justify-content: flex-start;

           .flexInputsLeft {
               width: 320px;
               margin-left: 20px;
               
               .formGroup {
                    display: flex;
                    flex-direction: column;
                    margin-bottom:10px;
                    width: 300px;   
 
                    input {
                        padding: 6px 7px;
                        border-radius: 5px;
                        outline: none;
                        border: 1px solid var(--main-input-border-color);
                    }
                   
                    select {
                        background: #fff;
                        border: 1px solid var(--main-input-border-color);
                        padding: 7px 7px;
                        border-radius: 5px;
                        outline: none;
                    }
                    label {
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: bold;
                    }
               }
           }

           .flexInputsRight {
               width: 320px;
               margin-right: 20px;
               
               .formGroup {
                    display: flex;
                    flex-direction: column;
                    margin-bottom:10px;
                    width: 300px;   
                    
                    input {
                        padding: 6px 7px;
                        border-radius: 5px;
                        outline: none;
                        border: 1px solid var(--main-input-border-color);
                    }
                    
                    label {
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: bold;
                    }
               }
           }
       }
    }

    // media request
    $bp-normal: 730px;
    $bp-small: 400px;
    
    @media only screen and (max-width: $bp-normal) {
            .content {
                 .flexInputs {
                    justify-content: center;
                    flex-wrap: wrap;

                    .flexInputsLeft {
                        width: 100%;
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .flexInputsRight {
                        width: 100%;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                 }
                .changeData {
                    button {
                        width: 300px;
                    }
                }
            }
    }

    @media only screen and (max-width: $bp-small) {
            .content {
                 .flexInputs {
                    
                    .flexInputsLeft {
                        width: 100%;
                        margin-left: 20px;
                        margin-right: 20px;

                        .formGroup {
                            width: 100%;
                        }
                    }

                    .flexInputsRight {
                        width: 100%;
                        margin-left: 20px;
                        margin-right: 20px;
                        .formGroup {
                            width: 100%;
                        }
                    }
                 }
                .changeData {
                    margin-right: 20px;
                    width: 100%;
                    
                    button {
                        width: 100%;
                    }
                }
            }
    }

</style>