<template>
    <div class="Profile">
        <headerDegouline :planet="false" :bas="0" />
        <div class="body-profile" v-if="profile && !loading">
            <div class="edit" v-if="$auth.user.uuid == profile.uuid">
                <v-icon dark>mdi-pencil</v-icon>
            </div>
            <div class="photo-profile">
                <img height="150px" width="150px" :src="profile.avatar || profile.profileImageBlob" />
            </div>
            <div class="infos" v-if="!loading">
                <div class="nom">{{ profile.surname }}</div>
                <div class="ajout" v-if="$auth.user.uuid != profile.uuid">
                    <v-btn
                        v-if="friends && !friends.map((a) => a.uuid).includes($auth.user.uuid)"
                        @click="parent.addFriend($route.query.id, $auth.user.uuid)"
                        outlined
                        color="white"
                        rounded
                        small
                        style="width: 200px">
                        + Ajouter en ami
                    </v-btn>
                    <v-btn
                        v-else-if="friends"
                        @click="parent.addFriend($route.query.id, $auth.user.uuid)"
                        outlined
                        color="white"
                        rounded
                        small
                        style="width: 200px">
                        Ami
                    </v-btn>
                </div>
                <div class="bio">{{ profile.bio }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'Profile',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {
        this.loadProfile()
        this.getFriends()
    },
    mounted() {
        this.parent = this.$parent.$parent.$parent
    },
    data: function () {
        return {
            parent: null,
            profile: null,
            friends: null,
            loading: false
        }
    },
    methods: {
        async getFriends() {
            this.loading = true
            let res = await this.$axios
                .get(`${process.env.URL}/users/getFriends/${this.$route.query.id}`)
                .then((friends) => {
                    this.friends = friends.data
                    this.loading = false
                })
        },
        async loadProfile() {
            this.loading = true
            let res = await this.$axios
                .get(`${process.env.URL}/users/getprofile/${this.$route.query.id}`)
                .then((user) => {
                    this.profile = user.data[0]
                    this.parent.getProfileImage(this.profile).then((data) => {
                        this.loading = false
                        this.profile.profileImageBlob = data
                    })
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.Profile {
    .body-profile {
        z-index: 1000;
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100vw;
        .photo-profile {
            justify-content: center;
            position: absolute;
            left: calc(50% - 75px);
            top: 50px;
        }
        .edit {
            display: flex;
            justify-content: end;
            padding: 20px;
            i {
                font-size: 30px;
            }
        }
        .ajout {
            display: flex;
            justify-content: center;
            padding: 10px;
        }
        .infos {
            color: white;
            font-weight: 600;
            position: absolute;
            top: 210px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            text-align: center;
        }
    }
}
</style>
 