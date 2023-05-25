<template>
    <v-app id="app">
        <v-snackbar :color="notify.bgcolor" :timeout="notify.timeout" top v-model="notify.display"> 
            <v-icon class="close-mess-notify" color="grey" @click="notify.display=false">mdi-close</v-icon>
            <div :style="'color:' + notify.color + ';'" v-html="notify.texte"/>
        </v-snackbar>
        <Nuxt v-if="mobile" ref="page"></Nuxt>
        <div class="ordi" v-else>
            <div class="texte">
                Désolé,
                <div class="color-red">TooGether</div>
                n'est pour l'instant disponible que sur téléphone.
            </div>
            <div class="planettournecontainer">
                <img src="@/assets/TooGetherPlanet.gif" />
            </div>
        </div>
        <v-navigation-drawer style="z-index: 1000" floating v-model="menuBurger" absolute left temporary>
            <v-list nav dense>
                <v-list-item-group active-class="deep-purple--text text--accent-4">
                    <v-list-item v-if="$auth.user">
                        <v-list-item-title @click="goto(`/profile?id=${$auth.user.uuid}`)">Profil</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="$auth.user">
                        <v-list-item-title @click.prevent="signOut">Déconnexion</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <footersite v-if="mobile && !$route.path.includes(pasDeFooter)"></footersite>
    </v-app>
</template>

<script>
import acceuil from '@/pages/acceuil.vue'
import footersite from '@/components/footer.vue'

export default {
    name: 'Default',
    components: {
        acceuil: acceuil,
        footersite: footersite
    },
    data() {
        return {
            firstTime:true,
            mobile: false,
            component: 'acceuil',
            menuBurger: false,
            pasDeFooter: ['register'],
            activites: [],
            activity: null,
            chargement: false,
            imgLoad: true,
            pdpLoad: true,
            friends: [],
            detailUser: null,
            recherche: {
                activite: '',
                lieux: '',
                date: ''
            },
            notify: {
                timeout: 5000,
                display: false,
                bgcolor: 'red',
                color: 'black'
            }
        }
    },
    created() {
        this.component = this.$route.params.pathMatch
        if (window.matchMedia('(max-width: 767px)').matches) {
            this.mobile = true
        }
        this.loadUserCo()
        this.$var.loading = false
    },
    methods: {
        async addFriend(id1, id2) {
            this.$axios
                .post(`users/addFriend`, {
                    idUser: id1,
                    idFriend: id2
                })
                .then((response) => {
                    document.location.reload()
                })
        },
        async getProfileImage(user, nameVar = 'profileImage') {
            this.pdpLoad = true
            let image = null
            if (user[nameVar] != null) {
                image = await this.$axios
                    .get('users/profileImage/' + user[nameVar], {
                        responseType: 'arraybuffer'
                    })
                    .then((response) => {
                        user.profileImageBlob =
                            'data:image/jpeg;base64,' +
                            Buffer.from(response.data, 'binary').toString('base64').replaceAll(' ', '')
                        this.pdpLoad = false
                        return user.profileImageBlob
                    })
            }
            return image
        },
        dateFormatee(date) {
            date = new Date(date)
            let dateToday = new Date()
            let retour = ''
            retour = `le ${date.getDate()}/${date.getMonth() + 1 < 10 ? '0' : ''}${
                date.getMonth() + 1
            }/${date.getFullYear()} à ${date.getHours() < 10 ? '0' : ''}${date.getHours()}h${date.getMinutes()}`
            return retour
        },
        profilePhoto(user) {
            if (user.avatar) {
                return user.avatar
            } else if (user.profileImageBlob) {
                return user.profileImageBlob
            } else return 'nophoto'
        },
        async signOut() {
            try {
                await this.$auth.logout()
            } catch (error) {
            } finally {
                this.menuBurger = false
            }
        },
        async loadDetailUser(uuid) {
            this.loading = true
            let res = await this.$axios.get(`${process.env.URL}/users/getprofile/${uuid}`).then((user) => {
                this.detailUser = user.data[0]
                this.getProfileImage(this.detailUser).then((data) => {
                    this.loading = false
                    this.detailUser.profileImageBlob = data
                })
            })
        },
        async loadActivity() {
            let res = await this.$axios.get('/activities/' + this.$route.query.id + '/detail')
            this.activity = res.data
            this.activity.heure = this.activity.date.split(',')[1]
            this.activity.datejours = this.activity.date.split(',')[0]
            this.activity.coordlieux = JSON.parse(this.activity.coordlieux)
            if (this.activity.users.length > 0) {
                this.activity.users.forEach((participant) => {
                    this.getProfileImage(participant)
                    if (this.$auth.user) {
                        if (participant.uuid == this.$auth.user.uuid) {
                            this.inscrit = true
                        }
                    }
                })
            }

            this.chargement = false
            return
        },
        async loadActivitiesByUser(id) {
            this.chargement = true
            this.imgLoad = true
            let res = await this.$axios.get(`/activities/${id}/participant`)
            this.activites = res.data
            this.activites.forEach((activite) => {
                activite.coordlieux = JSON.parse(activite.coordlieux)
                activite.users.forEach((user, index) => {
                    this.getProfileImage(user)
                    if (index == activite.users.length - 1) {
                        this.imgLoad = false
                    }
                })
            })
            this.chargement = false
        },
        async loadFriends(uuid) {
            this.chargement = true
            let res = await this.$axios.get(`/users/getFriends/${uuid}`)
            this.friends = res.data
            this.friends.forEach((user, index) => {
                this.getProfileImage(user)
                if (index == this.friends.length - 1) {
                    this.imgLoad = false
                }
            })
            this.chargement = false
        },
        async loadActivities() {
            this.chargement = true
            this.imgLoad = true
            let queryParamName = `${this.recherche.activite ? `/${this.recherche.activite}` : '/null'}${
                this.recherche.lieux ? `/${this.recherche.lieux}` : '/null'
            }${this.recherche.date ? `/${this.recherche.date}` : '/null'}`

            let res = await this.$axios.get('/activities' + queryParamName + '/recherche')
            this.activites = res.data
            this.activites.forEach((activite) => {
                activite.coordlieux = JSON.parse(activite.coordlieux)

                activite.users.forEach((user, index) => {
                    this.getProfileImage(user)
                    if (index == activite.users.length - 1) {
                        this.imgLoad = false
                    }
                })
            })
            this.chargement = false
        },
        goto(route) {
            this.$router.push(route)
        },
        async loadUserCo() {
            this.$var.user = await this.$auth
            this.getProfileImage(this.$auth.user)
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');
* {
    font-family: 'Noto Sans', sans-serif;
}
body {
    overflow: hidden;
    height: 100vh;
}
.corp {
    margin-top: 15vh;
    height: 80vh;
}
.close-mess-notify{
    position: absolute!important;
    right: 20px;
}
.btn-arrow-rounded {
    padding: 0 5px 0 10px !important;
    .v-btn__content {
        font-size: 11px;
        font-weight: 700;
        opacity: 0.9;
    }
}

.no-data-container {
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    .no-data {
        .aucun-event {
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            margin: 10px;
            opacity: 0.8;
        }
        .btn-long {
            margin-bottom: 0;
        }
    }
}
.titre-page {
    width: 100%;
    text-align: center;
    color: #e92322;
    font-weight: 800;
}
.body {
    height: calc(100vh - 17vh);
    margin-top: 17vh;
    display: flex;
    flex-direction: column;
}
.map-visu {
    height: 100% !important;
    width: 100% !important;
    border-radius: 10px;
    overflow: hidden;
}
.small-bold {
    font-weight: 600;
    font-size: 12px;
}
.place-input {
    border-radius: 20px !important;
    width: calc(100% - 40px);
    margin: 20px 20px 20px 20px;
    display: inline-flex;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25) !important;
    .pastille {
        width: 22px;
        margin: 0 8px 0 8px;
    }
    input::placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
    }
}
.photo-small-view {
    border-radius: 100%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    img {
        width: 30px;
        height: 30px;
    }
}
.btn-long {
    width: calc(100% - 40px);
    margin: 0px 0px 20px 20px;
    .v-btn__content {
        font-weight: 800;
    }
}
.btn-medium {
    width: calc(50% - 32px);
    margin: 0px 0px 20px 20px;
    .v-btn__content {
        font-weight: 800;
    }
}
.photo-profile-libre {
    display: flex;
    justify-content: center;
    border-radius: 100%;
    overflow: hidden;
}
input::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>

<style lang="scss" scoped>
::v-deep .marker-map {
    background-color: #ffffff00;
    width: 40px;
    p {
        font-size: 35px;
    }
    code {
        background-color: #ffffff00 !important;
        width: 20px;
    }
    .emojiMap {
        transform: translateX(-37px);
    }
}
.ordi {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    width: 100vw;
    z-index: 1000;
    font-size: 1vw;
    .color-red {
        margin: 0 5px 0 5px;
        color: #e92322;
    }
    .texte {
        display: inline-flex;
        opacity: 0.8;
        font-weight: 600;
    }
}
.planettournecontainer {
    z-index: -1000;
    width: 100vw;
    position: absolute;
    display: flex;
    justify-content: center;
    img {
        position: absolute;
        width: 40vw;
    }
}

::v-deep .input-text {
    border-radius: 20px !important;
    width: calc(100% - 40px);
    margin: 20px 20px 20px 20px;
    .v-input__slot {
        box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%) !important;
        background-color: rgba(255, 255, 255, 0.8) !important;
    }
}
::v-deep .btn-long.v-btn--outlined {
    border: none !important;
    box-shadow: 0px 0px 10px -3px rgb(233 38 38 / 50%);
}
</style>
