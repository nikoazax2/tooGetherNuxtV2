<template>
    <div class="chat">
        <headerDegouline :planet="false" />
        <div class="header" v-if="parent && (parent.activity || parent.detailUser)">
            <div v-if="parent.detailUser">
                <div>{{ parent.detailUser.surname }}</div>
                <div class="photo-profile-libre" @click="parent.goto(`/profile?id=${parent.detailUser.userUuid}`)">
                    <img
                        height="50px"
                        width="50px"
                        :src="parent.detailUser.avatar || parent.detailUser.profileImageBlob" />
                </div>
            </div>
            <div v-else>
                <div>{{ parent.activity }}</div>
                <code class="emojiChat" v-html="'<p>&\#x1F' + parent.activity.emoji + ';</p>'" />
            </div>
        </div>
        <div class="contenu">
            <div class="chats" @scroll="scrollLoad()">
                <div
                    v-if="!loading"
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
                        <div class="photo-profile photo-profile-chat" @click="parent.goto(`/profile?id=${message.userUuid}`)">
                            <img height="50px" width="50px" :src="message.avatar || message.profileImageBlob" />
                        </div>
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
    created() {
        setTimeout(() => {
            this.$forceUpdate()
        }, 2000)
    },
    async mounted() {
        this.parent = this.$parent.$parent.$parent
        if (this.$route.query.id) await this.parent.loadActivity()
        if (this.$route.query.iduser) await this.parent.loadDetailUser(this.$route.query.iduser)
        this.loadMessage()
    },
    data: function () {
        return {
            parent: null,
            input: '',
            messages: [],
            profilesImages: [],
            loading: true,
            page: 1,
            init: true
        }
    },
    methods: {
        async loadMessage() {
            this.messages = []
            this.profilesImages = []
            this.loading = true
            await this.parent.loadMessages(this.page)
            this.loading = false
        },
        async scrollLoad() {
            this.messages = []
            this.profilesImages = []
            this.loading = true
            await this.parent.loadMessages(this.page)
            this.loading = false
        },
        goto(path) {
            this.$router.push(path)
        },
        sending() {
            if (this.input && this.$route.query.id) {
                this.$axios
                    .post(`chats`, {
                        userUuid: this.$auth.user.uuid,
                        activityUuid: this.$route.query.id,
                        message: this.input,
                        date: new Date()
                    })
                    .then((response) => {
                        this.input = ''
                        this.init = true
                        this.loadMessage()
                    })
            } else if (this.input && this.$route.query.iduser) {
                this.$axios
                    .post(`chats`, {
                        userUuid: this.$auth.user.uuid,
                        userUuid2: this.$route.query.iduser,
                        message: this.input,
                        date: new Date()
                    })
                    .then((response) => {
                        this.input = ''
                        this.init = true
                        this.loadMessage()
                    })
            }
        },
        scrollLoad() {
            if (document.getElementsByClassName('chats')[0].scrollTop == 0 && !this.init) {
                this.init = false
                this.page++
                this.loadMessage(true)
            }
            this.init = false
        },
        loadMessage(forScroll = false) {
            this.loading = true
            this.$axios
                .post('chats/chat', {
                    uuid: this.$route.query.id,
                    page: this.page,
                    uuiduser: this.$route.query.iduser,
                    uuiduser2: this.$auth.user.uuid
                })
                .then(async (response) => {
                    if (forScroll) {
                        this.messages = response.data.chats.concat(this.messages)
                    } else {
                        this.page = 1
                        this.messages = response.data.chats
                    }
                    this.messages.forEach((message) => {
                        if (this.profilesImages.filter((o) => o.userUuid == message.userUuid).length == 0) {
                            this.profilesImages.push(message)
                        }
                    })
                    await this.profilesImages.forEach(async (user) => {
                        if (user.user_profileImage && !user.profileImageBlob) {
                            user.profileImageBlob = await this.parent.getProfileImage(user, 'user_profileImage')
                        }
                    })
                    setTimeout(() => {
                        this.messages.forEach((message) => {
                            message.profileImageBlob = this.profilesImages.filter(
                                (o) => o.userUuid == message.userUuid
                            )[0].profileImageBlob
                        })

                        this.loading = false
                        var objDiv = document.getElementsByClassName('chats')[0]
                        this.$nextTick(() => {
                            if (this.init) {
                                objDiv.scrollTop = objDiv.scrollHeight
                            } else {
                                objDiv.scrollTop = objDiv.scrollHeight / this.page - 200
                            }
                        })
                    }, 500)
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
    .emojiChat {
        :deep(code) {
            font-size: 50px !important;
        }
    }
    .photo-profile-chat {
        position: inherit;
        margin: 5px;
        display: flex;
        justify-content: center;
        border-radius: 100%;
        overflow: hidden;
    }
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
            height: calc(100% - 210px);
            overflow-y: scroll;
            flex-direction: column;
            justify-content: end;
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
    .photo-profile {
        position: inherit;
        margin: 0px;
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
 