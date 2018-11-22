    <!-- template -->
    <template>
            <div class="content">
                <div class="nameMenu">
                            <p>{{$t("message.settings")}}</p>
                </div>
                <div class="flexInputs">
                    <div class="flexInputsLeft">
                    
                                <!-- name -->
                                <div class="formGroup">
                                    <label for="password">{{$t("message.current_password")}}*</label>
                                    <input 
                                    id="password"
                                    type="text"
                                    autocomplete="off"
                                    maxlength="20"
                                    >
                                </div>
                                <!-- lastname -->
                                <div class="formGroup">
                                    <label for="newpassword">{{$t("message.new_password")}}*</label>
                                    <input 
                                    id="newpassword"
                                    type="text"
                                    autocomplete="off"
                                    maxlength="20"
                                    >
                                </div>
                                <!-- nickname -->
                                <div class="formGroup">
                                    <label for="confirmationpassword">{{$t("message.confirmation")}}*</label>
                                    <input 
                                    id="confirmationpassword"
                                    type="text"
                                    autocomplete="off"
                                    maxlength="20"
                                    >
                                </div>
                                
                    </div>
                    
                </div>

                <div class="changeData">
                    <button>Сохранить</button>
                </div>
            </div>                   
    </template>

    <!-- scripts -->
    <script>
        // imports libraries
        

        export default {        
            data() {
                return {
                    
                }
            }
        };
    </script>

    
    <style scoped lang="scss"> 
        
        .content {
            width: 100%;
            background: var(--main-white-color);
            flex-wrap: wrap;

            .changeData {
                margin-left: 20px;
                margin-bottom: 20px;

                button {
                    width: 300px;
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
        $bp-small: 400px;
    

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