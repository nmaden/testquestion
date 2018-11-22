<!-- template -->
<template>
        <div class="content">
           <div class="nameMenu">
                        <p>{{$t("message.ans_ques")}}</p>
            </div>
            <div class="descriptionFaq">
                <p>
                    OTAU is committed to making your experience online satisfying and safe. Your privacy on the Internet is of the utmost importance to us. Please read this Privacy Policy carefully before using our Site(s) (e.g., account.otau.org).
                </p>
            </div>
        </div>                   
</template>

<!-- scripts -->
<script>
    export default {
    };
</script>

<!-- style -->
<style scoped lang="scss"> 
    
    .content {
        width: 100%;
        background: var(--main-white-color);
        flex-wrap: wrap;

        .nameMenu {
                width: 100%;
                padding: 10px 20px;
                border-bottom: 2px solid var(--main-border-color);

                p {
                    font-weight: bold;
                }
        }

        .descriptionFaq {
            width: 100%;
            margin: 20px;

            p {
                color: var(--main-project-color);
                font-size: 17px;
                line-height: 27px;
            }
        }
    }

</style>