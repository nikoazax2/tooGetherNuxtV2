<template>
    <div class="chat">
        <headerDegouline :planet="false" />
        <div class="header">nomAct</div>
        <div class="contenu">
            <div class="chats">
                <div
                    :class="`${message.userUuid == $auth.user.uuid ? 'user' : ''}`"
                    class="message"
                    v-for="(message, index) in messages">
                    <div class="mess">
                        {{ message.chat_message }}
                    </div>
                    <div
                        v-if="
                            !messages[index + 1] ||
                            (messages[index + 1].userUuid != message.userUuid &&
                                (message.avatar || message.profileImageBlob) &&
                                !loading)
                        ">
                        <img height="50px" width="50px" :src="message.avatar || message.profileImageBlob" />
                    </div>
                    <div v-else style="width: 50px"></div>
                </div>
            </div>
            <div class="input">
                <v-text-field rounded outlined dense v-model="input">
                    <template slot="append">
                        <v-icon @click="sending()">mdi-send</v-icon>
                    </template>
                </v-text-field>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'chat',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
        this.loadMessage()
    },
    data: function () {
        return {
            parent: null,
            input: '',
            messages: [],
            profilesImages: [],
            loading: true
        }
    },
    methods: {
        sending() {
            this.$axios
                .post(`chats`, {
                    userUuid: this.$auth.user.uuid,
                    activityUuid: this.$route.query.actId,
                    message: this.input,
                    date: new Date()
                })
                .then((response) => {
                    this.input = ''
                    this.loadMessage()
                })
        },
        loadMessage() {
            this.loading = true
            this.$axios.post('chats/chat', { uuid: this.$route.query.actId, page: 1 }).then(async (response) => {
                this.messages = response.data.chats
                this.messages.forEach((message) => {
                    if (this.profilesImages.filter((o) => o.userUuid == message.userUuid).length == 0) {
                        this.profilesImages.push(message)
                    }
                })
                await this.profilesImages.forEach(async (user) => {
                    if (user.user_profileImage) {
                        user.profileImageBlob = await this.parent.getProfileImage(user, 'user_profileImage')
                    }
                })
                setTimeout(() => {
                    this.messages.forEach((message) => {
                        message.profileImageBlob = this.profilesImages.filter(
                            (o) => o.userUuid == message.userUuid
                        )[0].profileImageBlob
                        console.log(message.profileImageBlob)
                    })

                    setTimeout(() => {
                        this.loading = false
                        this.$nextTick(() => {
                            var objDiv = document.getElementsByClassName('chats')[0]
                            objDiv.scrollTop = objDiv.scrollHeight
                        })
                    }, 2000)
                }, 2000)
            })
        }
    }
}
</script>

<style lang="scss">
html {
    overflow-y: hidden;
}
</style>
<style lang="scss" scoped>
html {
    overflow-y: hidden;
}
.chat {
    height: 100%;
    .header {
        position: absolute;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: 600;
        margin-top: 30px;
    }
    .contenu {
        height: 99vh;
        display: flex;
        flex-direction: column;
        justify-content: end;
        overflow-y: hidden;
        .chats {
            height: calc(100% - 170px);
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
        }
        .input {
            padding: 5px 20px 5px 20px;
        }
    }
    .mess {
        border: 1px solid rgb(221, 221, 221);
        width: fit-content;
        min-height: 0px;
        padding: 3px 10px 3px 10px;
        border-radius: 10px;
        margin: 5px 0 5px 10px;
        display: flex;
        align-items: center;
    }
    .message {
        display: inline-flex;
        flex-direction: row-reverse;
        justify-content: start;
    }
    .message.user {
        flex-direction: row;
        width: 100%;
        display: flex;
        justify-content: end;
        .mess {
            max-width: calc(100% - 80px);
            background-color: #e92322;
            border: none;
            color: white;
            margin: 5px 10px 5px 0;
        }
    }
}
</style>
 