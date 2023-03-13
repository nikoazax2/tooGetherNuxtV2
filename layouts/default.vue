<template>
    <v-app>
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
        <footersite v-if="mobile"></footersite>
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
            mobile: false,
            component: 'acceuil'
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
        async getProfileImage() {
            if (this.$auth.user.profileImage) {
                await this.$axios
                    .get(`users/profileImage/ ${this.$auth.user.profileImage}`, {
                        responseType: 'arraybuffer'
                    })
                    .then((response) => {
                        this.$auth.user.profileImageBlob = Buffer.from(response.data, 'binary').toString('base64')
                    })
            }
        },
        profilePhoto(user) {
            if (user.avatar) {
                return user.avatar
            } else if (user.profileImage) {
            } else return 'nophoto'
        },
        async signOut() {
            try {
                await this.$auth.logout()
            } catch (error) {
            } finally {
                this.$router.push('/')
                document.location.reload()
            }
        },
        async leadActivities() {
            let queryParamName = `${this.$var.recherche.activite ? `/${this.$var.recherche.activite}` : '/null'}${
                this.$var.recherche.lieux ? `/${this.$var.recherche.lieux}` : '/null'
            }${this.$var.recherche.date ? `/${this.$var.recherche.date}` : '/null'}`

            let res = await this.$axios.get('/activities' + queryParamName + '/recherche').then()

            this.$var.activites = res.data
            /*  res.data.length == 0 ? this.chargement = false : ''
            for await (let activity of this.listeEvents) {
                this.nbImagesAcharger = this.nbImagesAcharger + activity.users.length;
                activity.users.forEach(user => {
                    this.getProfileImage(user)
                })
                var coord = activity.coordlieux ? JSON.parse(activity.coordlieux) : null
                activity.coordlieux = coord ? [coord.lng, coord.lat] : null
            }  */
        },
        goto(route) {
            this.$router.push(route)
        },
        async loadUserCo() {
            this.$var = await this.$auth
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');
* {
    font-family: 'Noto Sans', sans-serif;
}
.btn-arrow-rounded {
    padding: 0 5px 0 10px !important;
    .v-btn__content {
        font-size: 11px;
        font-weight: 700;
        opacity: 0.9;
    }
}
.titre-page {
    width: 100%;
    text-align: center;
    color: #e92322;
    font-weight: 800;
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
.photo-profile {
    display: flex;
    justify-content: center;
    border-radius: 100%;
    overflow: hidden; 
}
</style>

<style lang="scss" scoped>
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
