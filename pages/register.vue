<template>
    <div class="register">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="corp">
            <div class="titre-page">INSCRIPTION</div>

            <v-file-input
                id="file-input"
                @click="chooseAvatarOrProfile = 'photo'"
                @change="Preview_image()"
                :rules="[(value) => !value || value.size < 2000000 || 'La photo doit être de moins de 2MB !']"
                accept="image/png, image/jpeg, image/bmp"
                v-model="tempProfilePhoto" />

            <div class="formulaire"> 
                <div v-for="champ in champsFormulaire">
                    <v-text-field
                        solo
                        v-model="form[champ.key]"
                        :label="champ.libelle"
                        class="input-text"
                        dense
                        hide-details="true"
                        :type="champ.type">
                        <template v-slot:prepend-inner>
                            <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                        </template>
                    </v-text-field>
                    <!-- PHOTO PROFIL -->
                    <div v-if="champ.libelle == 'E-mail'">
                        <v-btn
                            class="btn-medium plein"
                            elevation="0"
                            dark
                            color="#65C9FF"
                            rounded
                            @click="changeavatar()">
                            AVATAR
                        </v-btn>
                        <v-btn
                            class="btn-medium plein"
                            elevation="0"
                            dark
                            color="#65C9FF"
                            rounded
                            @click="clickFileInput()">
                            PHOTO
                        </v-btn>
                        <div class="image">
                            <img v-if="form.avatar" :src="form.avatar" style="height: 200px; width: 200px" />
                            <div v-if="form.profilePhoto" class="photo-profile" style="height: 200px; width: 200px">
                                <img class="image-profile" :src="form.profilePhoto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                    <v-btn class="btn-long plein" elevation="0" dark color="#e92626" rounded @click="register()"
                    >S'inscrire</v-btn
                >
                <v-btn class="btn-long vide" outlined color="#e92626" rounded @click="parent.goto('login')"
                    >J'ai déjà un compte</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'register',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
        this.changeavatar()
    },
    data: function () {
        return {
            parent: null,
            tempProfilePhoto: null,
            champsFormulaire: [
                { key: 'surname', libelle: 'Surnom', type: null },
                { key: 'email', libelle: 'E-mail', type: null },
                { key: 'bio', libelle: 'Biographie', type: null },
                { key: 'password', libelle: 'Mot de passe', type: 'password' }
            ],
            form: {
                surname: '',
                email: '',
                password: '',
                avatar: '',
                bio: '',
                profilePhoto: null
            }
        }
    },
    methods: {
        clickFileInput() {
            document.getElementById('file-input').click()
        },
        Preview_image() {
            if (
                this.tempProfilePhoto &&
                this.tempProfilePhoto.type &&
                'image/png image/jpeg image/bmp'.includes(this.tempProfilePhoto.type)
            ) {
                this.form.profilePhoto = URL.createObjectURL(this.tempProfilePhoto)
                this.form.avatar = null
            }
        },
        changeavatar() {
            let srcavatar = `https://avataaars.io/?`
            let i = 0
            for (const [key, value] of Object.entries(this.$var.possibiliteavatar)) {
                srcavatar = `${srcavatar}${i == 0 ? '' : '&'}${key}=${
                    value[Math.floor(Math.random() * (value.length - 1 - 0 + 1) + 0)]
                }`
                i++
            }
            this.form.avatar = srcavatar
            this.form.profilePhoto = null
            this.url = null
        },
        async submitPhoto() {
            if (this.chooseAvatarOrProfile == 'photo') {
                let formData = new FormData()
                formData.append('file', this.form.profilePhoto)
                await this.$axios.post(`${process.env.URL}/users/profileImage`, formData).then((response) => {
                    this.imageProfilRenvoyee = response.data.filename
                    if (response.status === 201) {
                        this.submit()
                    }
                })
            } else {
                this.submit()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    .corp {
        margin-top: 15vh;
    }

    .v-file-input {
        display: none !important;
    }
    .image{
        display: flex;
        justify-content: center;
    }
}
</style>
 