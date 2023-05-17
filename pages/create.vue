<template>
    <div class="create" v-if="!loading">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="choix-emoji">
            <v-menu v-model="menuChoixEmoji" content-class="menu-emoji" :close-on-content-click="false">
                <v-tabs>
                    <v-tab class="tab-emoji" @click="ongletEmojiChoix = index" v-for="(tab, index) in emojis">
                        <code v-html="'<p>&\#x1F' + tab[0].code + ';</p>'" />
                    </v-tab>
                </v-tabs>
                <div class="choix-emoji-liste">
                    <div class="emoji" v-for="emoj in emojis[ongletEmojiChoix]" v-if="!emoj.code.includes('U+')">
                        <code
                            @click=";(form.emoji = emoj.code), (menuChoixEmoji = false)"
                            v-html="'<p>&\#x1F' + emoj.code + ';</p>'" />
                    </div>
                </div>
            </v-menu>
        </div>
        <div class="corp">
            <div class="titre-page">{{ editing ? 'MODIFIER' : 'CREER' }} UNE ACTIVITÉ</div>
            <div class="form">
                <!-- NOM -->
                <div class="emoji-input">
                    <code @click="menuChoixEmoji = true" v-html="'<p>&\#x1F' + form.emoji + ';</p>'" />
                    <v-text-field
                        solo
                        v-model="form.name"
                        label="Nom de l'activité"
                        class="input-text"
                        dense
                        hide-details="true">
                        <template v-slot:prepend-inner>
                            <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                        </template>
                    </v-text-field>
                </div>
                <!-- LIEU -->
                <div class="emoji-input">
                    <v-menu v-model="menuChoixPhysique" offset-y class="menuIsPhysic" content-class="menuIsPhysic">
                        <div class="leschoix">
                            <div class="bloc">
                                <div class="texte">En physique</div>
                                <code @click="isPhysics = true" class="emoji" v-html="'<p>&\#x1F30D;</p>'"> </code>
                            </div>
                            <div class="bloc">
                                <div class="texte">En ligne</div>
                                <code
                                    @click="
                                        isPhysics = false
                                        ;(form.coord.lat = null), (form.coord.lng = null)
                                    "
                                    class="emoji"
                                    v-html="'<p>&\#x1F30C;</p>'">
                                </code>
                            </div>
                        </div>
                    </v-menu>
                    <div @click="menuChoixPhysique = true" class="btn-physique" text>
                        <div v-if="isPhysics">
                            <code v-html="'<p>&\#x1F30D;</p>'"> </code>
                            <div class="texte">Physique</div>
                        </div>
                        <div v-if="!isPhysics">
                            <code v-html="'<p>&\#x1F30C;</p>'"> </code>
                            <div class="texte">En ligne</div>
                        </div>
                    </div>
                    <div class="place-input" v-if="isPhysics">
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                        <GmapAutocomplete :value="defaultValueLieux" placeholder="Lieu" @place_changed="chargeMap" />
                    </div>
                    <div v-else>
                        <v-text-field
                            solo
                            v-model="form.lieux"
                            label="Lien"
                            class="input-text input-link"
                            dense
                            hide-details="true">
                            <template v-slot:prepend-inner>
                                <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                            </template>
                        </v-text-field>
                    </div>
                </div>
                <MglMap
                    class="map-visu map-create"
                    v-if="form.coord.lat && form.coord.lng"
                    :zoom="12"
                    :center="form.coord"
                    :accessToken="$var.accessToken"
                    :mapStyle.sync="$var.mapStyle">
                    <MglMarker :coordinates="[form.coord.lng, form.coord.lat]">
                        <div slot="marker" class="marker-map">
                            <code class="emojiMap" v-html="'<p>&\#x1F' + form.emoji + ';</p>'"></code>
                        </div>
                    </MglMarker>
                </MglMap>
                <!-- DATE -->
                <v-text-field
                    @click="dateMenu = true"
                    solo
                    v-model="form.date"
                    label="Date"
                    lang="fr-FR"
                    class="input-text"
                    dense
                    type="date"
                    hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
                <v-menu
                    ref="menu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <v-date-picker
                        :min="dateToday"
                        @change="dateMenu = false"
                        locale="fr-FR"
                        v-model="form.date"
                        full-width />
                </v-menu> 
                <!-- HEURE  -->
                <v-text-field
                    @click="hourMenu = true"
                    solo
                    v-model="form.hour"
                    label="Heure"
                    class="input-text"
                    dense
                    type="time"
                    hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
                <v-menu
                    ref="menu"
                    v-model="hourMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <v-time-picker v-model="form.hour" full-width />
                </v-menu>
                <!-- DESC -->
                <v-text-field solo v-model="form.tags" label="Description" class="input-text" dense hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
                <div class="btn-valider">
                    <v-btn
                        class="btn-long plein"
                        elevation="0"
                        dark
                        color="#e92626"
                        rounded
                        @click="editing ? edit() : create()">
                        {{ editing ? 'MODIFIER' : 'CREER' }}
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
import fileEmoji from '../assets/emoji.json'
import { MglMap, MglMarker } from 'vue-mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
    name: 'create',
    props: {},
    components: {
        headerDegouline,
        barreRecherche,
        MglMap,
        MglMarker
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
        if (this.$route.query.id) this.setEditAct()

        this.dateToday = new Date().toISOString().split('T')[0]
    },
    data: function () {
        return {
            editing: false,
            emojis: fileEmoji,
            isPhysics: true,
            hourMenu: false,
            dateMenu: false,
            dateToday: null,
            loading: false,
            defaultValueLieux: null,
            form: {
                name: '',
                lieux: '',
                coord: { lat: null, lng: null },
                tags: '',
                date: '',
                hour: '',
                emoji: '3C0',
                nbMax: '6'
            },
            ongletEmojiChoix: 'activity',
            menuChoixEmoji: false,
            menuChoixPhysique: false,
            parent: null,
            idact: null
        }
    },
    methods: {
        async setEditAct() {
            this.loading = true
            this.editing = true
            await this.parent.loadActivity()
            console.log(this.parent.activity)
            this.form = {
                name: this.parent.activity.name,
                lieux: this.parent.activity.lieux,
                coord: this.parent.activity.coordlieux,
                tags: this.parent.activity.description,
                date: this.parent.activity.datejours,
                hour: this.parent.activity.date.split(',')[1],
                emoji: this.parent.activity.emoji,
                nbMax: '6'
            }
            if (this.form.coord) {
                this.defaultValueLieux = this.form.lieux
            }
            this.loading = false
        },
        edit() {
            if (
                this.form.name != '' &&
                this.form.tags != '' &&
                ((this.form.lieux && this.form.coord.lat != null && this.form.coord.lng != null) ||
                    (this.form.lieux && this.form.coord.lat == null && this.form.coord.lng == null)) &&
                this.form.date != '' &&
                this.form.hour != ''
            ) {
                try {
                    this.$axios
                        .patch(`${process.env.URL}/activities/${this.$route.query.id}`, {
                            creatorId: this.$auth.user.uuid,
                            name: this.form.name.toUpperCase(),
                            description: this.form.tags,
                            lieux: this.form.lieux,
                            date: this.form.date + ',' + this.form.hour,
                            coordlieux: JSON.stringify(this.form.coord),
                            lat: this.form.coord.lat,
                            lng: this.form.coord.lng,
                            emoji: this.form.emoji,
                            nbMax: this.form.nbMax
                        })
                        .then((response) => {
                            this.parent.goto(`/detailactivite?id=${this.$route.query.id}`)
                        })
                } catch (e) {
                    this.errors.push(e)
                }
            } else {
                this.parent.notify = {
                    timeout: 3000,
                    display: true,
                    bgcolor: 'white',
                    color: '#e92322',
                    texte: 'Renseignez tout les champs correctement'
                }
            }
        },
        create() {
            if (
                this.form.name != '' &&
                this.form.tags != '' &&
                ((this.form.lieux && this.form.coord.lat != null && this.form.coord.lng != null) ||
                    (this.form.lieux && this.form.coord.lat == null && this.form.coord.lng == null)) &&
                this.form.date != '' &&
                this.form.hour != ''
            ) {
                try {
                    this.$axios
                        .post(`${process.env.URL}/activities`, {
                            creatorId: this.$auth.user.uuid,
                            name: this.form.name.toUpperCase(),
                            description: this.form.tags,
                            lieux: this.form.lieux,
                            date: this.form.date + ',' + this.form.hour,
                            coordlieux: JSON.stringify(this.form.coord),
                            lat: this.form.coord.lat,
                            lng: this.form.coord.lng,
                            emoji: this.form.emoji,
                            nbMax: this.form.nbMax
                        })
                        .then((response) => {
                            console.log('inséré')
                            this.idact = response.data.uuid
                            this.inscritalevent()
                        })
                } catch (e) {
                    this.errors.push(e)
                }
            } else {
                this.parent.notify = {
                    timeout: 3000,
                    display: true,
                    bgcolor: 'white',
                    color: '#e92322',
                    texte: 'Renseignez tout les champs correctement'
                }
            }
        },
        async inscritalevent() {
            await this.$axios.put(`${process.env.URL}/activities/${this.idact}/user/${this.$auth.user.uuid}`).then()
            this.parent.goto(`/detailactivite?id=${this.idact}`)
        },

        chargeMap(val) {
            this.form.lieux = val.formatted_address
            this.defaultValueLieux = val.formatted_address
            this.form.coord = { lat: val.geometry.location.lat(), lng: val.geometry.location.lng() }
        }
    }
}
</script>

<style lang="scss" scoped>
.create {
    .emoji-input {
        display: inline-flex;
        width: 100%;
        code {
            text-align: center;
            width: 17%;
            font-size: 40px;
            background-color: white;
        }
    }
}
code {
    display: block;
}
.form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.menuIsPhysic {
    border-radius: 15px;
    height: 10%;
    width: 90vw;
    margin-top: 300px;
    background-color: white;
    max-width: 90% !important;

    .emoji {
        text-align: center;
    }
    .leschoix {
        display: inline-flex;
        width: 100%;
        .bloc {
            width: 50%;
        }
        .texte {
            font-weight: 600;
            font-size: 14px;
            opacity: 0.8;
            text-align: center;
        }
    }
}
.disable-events {
    pointer-events: none;
}
.map-create {
    height: 20vh !important;
    width: calc(100% - 40px) !important;
    margin: 20px;
}
.btn-valider {
    margin-top: 20px;
}
.input-link {
    width: calc(100% - 5px);
}
.btn-physique {
    display: block;
    min-width: 72px;
    width: 72px;
    code {
        height: 60px;
    }
    .texte {
        font-size: 12px;
        opacity: 0.8;
        font-weight: 600;
        margin-left: 15px;
    }
}
code {
    background-color: rgba(255, 255, 255, 0) !important;
    font-size: 30px;
}
.menu-emoji {
    background-color: white !important;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
}
.choix-emoji-liste {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 500px;
    .emoji {
        width: 50px !important;
        padding: 5px !important;
        code {
            padding: 0;
            height: 45px !important;
            width: 45px !important;
            display: block;
        }
    }
}
.v-tabs-bar {
    height: 80px;
}
.v-menu__content {
    overflow-y: hidden;
}
.tab-emoji {
    padding: 0 !important;
    width: 13vw !important;
    min-width: 20px !important;
    height: 70px;
    color: rgba(0, 0, 0, 1) !important;
    code {
        font-size: 30px;
    }
}
</style>
 