<template>
    <div class="login">
        <headerDegouline :planetLeft="true" :bas="true" :texte="true" :planet="false"></headerDegouline>
        <div class="formulaire">
            <div class="champs">
                <v-text-field solo v-model="form.email" label="E-mail" class="input-text" dense hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
                <v-text-field
                    type="password"
                    solo
                    v-model="form.password"
                    label="Mot de passe"
                    class="input-text"
                    dense
                    hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
            </div>
            <div class="error-message" v-if="error">
                <div class="text message">Erreur d'authentification</div>
                <!-- TODO implémenter le mdp oublié -->
                <div class="text mdp-oublie">Mot de passe oublié</div>
            </div>
            <div class="boutons">
                <v-btn class="btn-long plein" elevation="0" dark color="#e92626" rounded @click="connexion()"
                    >Se connecter</v-btn
                >
                <v-btn class="btn-long vide" outlined color="#e92626" rounded @click="parent.goto('register')"
                    >Créer un compte</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'login',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
    },
    methods: {
        async connexion() {
            try {
                let response = await this.$auth.loginWith('local', {
                    data: this.form
                })
                this.$router.push('/')
            } catch (err) {
                if (err) {
                    this.error = true
                }
            }
        }
    },
    data: function () {
        return {
            parent: null,
            form: { email: null, password: null },
            error: false
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    .formulaire {
        padding-top: 34vh;
        .champs {
            .input-text {
                margin-bottom: 20px;
            }
        }
        .error-message {
            text-align: center;
            font-size: 12px;
            padding-top: 20px;
            padding-bottom: 10px;
            .message {
                color: #e92626;
            }
            .mdp-oublie {
                color: grey;
            }
        }
    }
}
</style>
 