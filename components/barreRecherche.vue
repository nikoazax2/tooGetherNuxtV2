<template>
    <div class="barre">
        <div class="container-all">
            <div class="container-champ" v-for="(champ, index) in 3">
                <v-text-field
                    v-if="parent && champsForm[index] != 'lieux'"
                    solo
                    @keyup="recherche()"
                    v-model="parent.recherche[champsForm[index]]"
                    :label="placeholder(index)"
                    class="champ"
                    dense
                    hide-details="true">
                    <template v-slot:prepend-inner>
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                    </template>
                </v-text-field>
                <div v-if="parent && champsForm[index] == 'lieux'">
                    <div class="place-input">
                        <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
                        <GmapAutocomplete :placeholder="placeholder(index)" @place_changed="changeLieu" />
                    </div>
                </div>
            </div>
            <v-btn @click="goto('/liste-events')" color="#e92322" width="25" height="25" elevation="0" x-small fab>
                <v-icon color="white" size="25"> mdi-chevron-right </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import dateFormat, { masks } from 'dateformat'
export default {
    name: 'App',
    data() {
        return {
            placeHoldersListe: {
                lieux: ['à Grenoble', 'à Lyon'],
                activites: ['Un foot', 'Un basket', 'Une bière'],
                date: ['demain', 'le 02/11']
            },
            placeHoldersAffiche: {
                lieu: '',
                activite: '',
                date: ''
            },
            champsForm: ['activite', 'lieux', 'date'],
            parent: null
        }
    },
    mounted() {
        this.parent = this.$parent.$parent.$parent.$parent
    },
    methods: {
        changeLieu(val) {
            this.parent.recherche.lieux = val.formatted_address
        },
        goto(route) {
            this.parent.loadActivities()
            this.$router.push(route)
        },
        placeholder(index) {
            if (index == 0) {
                return this.placeHoldersListe.activites[
                    Math.floor(Math.random() * this.placeHoldersListe.activites.length)
                ]
            } else if (index == 1) {
                return this.placeHoldersListe.lieux[Math.floor(Math.random() * this.placeHoldersListe.lieux.length)]
            } else if (index == 2) {
                return this.placeHoldersListe.date[Math.floor(Math.random() * this.placeHoldersListe.date.length)]
            }
        },
        recherche() {}
    }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.barre {
    position: absolute;
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: center;
    ::v-deep label {
        font-size: 14px;
        margin-top: -2px;
    }
    .place-input {
        margin: 0;
        box-shadow: none !important;
        width: 100%;
        margin-top: 5px;
        input {
            width: 100%;
            font-size: 14px;
        }
    }
    ::v-deep input {
        font-size: 14px;
    }
    ::v-deep .v-input__slot:before {
        border-color: rgba(0, 0, 255, 0) !important;
    }
    ::v-deep .v-input__slot {
        box-shadow: none !important;
        background-color: rgba(255, 255, 255, 0) !important;
        padding-right: 0 !important;
    }
    .container-all {
        background-color: rgba(255, 255, 255, 0.8);
        padding-right: 3px;
        box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
        width: 93vw;
        display: inline-flex;
        align-items: center;
        border-radius: 20px;
        justify-content: space-between;
        .container-champ {
            width: 100%;
            .champ {
                ::v-deep .v-input__control {
                    border-radius: 100%;
                }
            }
        }
    }
}
</style>
