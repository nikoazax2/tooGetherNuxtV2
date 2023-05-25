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
                <div class="haut">
                    <div v-for="champ in champsFormulaire">
                        <v-text-field
                            solo
                            v-model="form[champ.key]"
                            :label="champ.libelle"
                            v-if="champ.libelle != 'E-mail'"
                            class="input-text"
                            dense
                            hide-details="true"
                            :type="champ.type">
                            <template v-slot:prepend-inner>
                                <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                            </template>
                        </v-text-field>
                        <!-- Email -->
                        <v-text-field
                            solo
                            v-model="form[champ.key]"
                            :label="champ.libelle"
                            @keyup="checkMail(form[champ.key])"
                            v-if="champ.libelle == 'E-mail'"
                            class="input-text"
                            dense
                            hide-details="true"
                            :type="champ.type">
                            <template v-slot:prepend-inner>
                                <img
                                    v-if="emailExist == null || validateEmail()"
                                    class="pastille"
                                    src="@/assets/pastille.svg"
                                    alt="pastille" />
                                <v-icon v-else-if="emailExist == true" color="red">mdi-close</v-icon>
                                <v-icon v-else-if="emailExist == false" color="green">mdi-check</v-icon>
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
                                    <img class="image-profile" :src="form.profilePhotoURL" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bas">
                    <div class="pas-tout-rempli" v-if="pasToutRemplis">
                        Vous n'avez pas rempli correctement les champs
                    </div>
                    <div class="btn-valider">
                        <v-btn class="btn-long plein" elevation="0" dark color="#e92626" rounded @click="submitPhoto()">
                            S'inscrire
                        </v-btn>
                        <v-btn class="btn-long vide" outlined color="#e92626" rounded @click="parent.goto('login')">
                            J'ai déjà un compte
                        </v-btn>
                    </div>
                </div>
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
            pasToutRemplis: false,
            emailInvalide: false,
            emailExist: null,
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
                avatar: null,
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
                this.form.profilePhoto = this.tempProfilePhoto
                this.form.profilePhotoURL = URL.createObjectURL(this.tempProfilePhoto)
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
        validateEmail() {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (this.form.email.match(mailformat)) {
                this.emailInvalide = false
                return false
            } else {
                this.emailInvalide = true
                return true
            }
        },
        async checkMail(mail) {
            if (!this.validateEmail()) {
                if (!mail) this.emailExist = null
                let res = await this.$axios.get(`${process.env.URL}/users/checkMail/${mail || 'null'}`).then((data) => {
                    this.emailExist = !data.data
                })
            }
        },
        async submit() {
            await this.$axios
                .post(`${process.env.URL}/auth/register`, {
                    interests: ['5'],
                    surname: this.form.surname,
                    email: this.form.email,
                    password: this.form.password,
                    avatar: this.form.avatar || null,
                    profileImage: this.imageProfilRenvoyee || null,
                    bio: this.form.bio
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.$auth
                            .loginWith('local', {
                                data: { email: this.form.email, password: this.form.password }
                            })
                            .then((resp) => {
                                this.parent.goto('/')
                            })
                    }
                })
        },
        async submitPhoto() {
            if (
                !this.form.surname ||
                !this.form.email ||
                this.form.password.length < 8 ||
                (this.emailExist && !this.emailInvalide)
            ) {
                this.pasToutRemplis = true
            } else {
                this.pasToutRemplis = false
            }
            if (!this.pasToutRemplis) {
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
}
</script>

<style lang="scss" scoped>
.register {
    .v-file-input {
        display: none !important;
    }
    .image {
        display: flex;
        justify-content: center;
    }
    .formulaire {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .btn-valider {
            bottom: 0;
        }
    }
    .photo-profile {
        display: flex;
        justify-content: center;
        border-radius: 100%;
        overflow: hidden;
    }
}
</style>
 