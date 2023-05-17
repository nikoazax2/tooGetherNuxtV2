<template>
    <div class="Friends-vue">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="body">
            <div class="titre-page">MES AMIS</div>
            <div class="friends" v-if="!load && parent && parent.imgLoad == false">
                <div v-if="parent && parent.friends" class="friend" v-for="friend of parent.friends">
                    <div class="img-nom">
                        <div class="photo-profile-libre">
                            <img
                                v-if="friend.avatar || friend.profileImageBlob"
                                height="50px"
                                width="50px"
                                :src="friend.avatar || friend.profileImageBlob" />
                        </div>
                        <div class="nom">{{ friend.surname }}</div>
                    </div>
                    <v-icon @click.stop="parent.goto(`chat?iduser=${friend.uuid}`)"> mdi-forum-outline</v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'Friends',
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
    mounted() {
        this.load = true
        this.parent = this.$parent.$parent.$parent
        if (this.$auth.user) {
            this.parent.loadFriends(this.$auth.user.uuid)
        } else this.parent.goto('login')
        this.load = false
    },
    data: function () {
        return {
            parent: null,
            load: true
        }
    }
}
</script>

<style lang="scss" scoped>
.Friends-vue {
    .friends {
        height: calc(100vh - 210px);
        overflow: auto;
    }
    .friend {
        width: calc(100% - 40px);
        border: 2px solid #e9222279;
        box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.1) !important;
        display: inline-flex;
        height: 70px;
        padding: 10px;
        justify-content: space-between;
        margin: 10px 20px 10px 20px;
        border-radius: 10px;
        .img-nom {
            display: inline-flex;
        }
        .nom {
            font-weight: 600;
            font-size: 18px;
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .v-icon {
            margin-right: 10px;
        }
    }
}
</style>
 