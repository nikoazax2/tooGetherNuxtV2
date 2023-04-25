<template>
    <div class="detailactivite">
        <headerDegouline :planet="true"></headerDegouline>
        <div v-if="!chargement" class="body">
            <div class="titre-page">{{ parent.activity.name }}</div>
            <div class="date small-bold">{{ parent.dateFormatee(parent.activity.date) }}</div>
            <div class="map">
                <MglMap
                    class="map-visu map-detail"
                    v-if="parent.activity.coordlieux.lat && parent.activity.coordlieux.lng"
                    :zoom="12"
                    :center="parent.activity.coordlieux"
                    :accessToken="$var.accessToken"
                    :mapStyle.sync="$var.mapStyle">
                    <MglMarker :coordinates="[parent.activity.coordlieux.lng, parent.activity.coordlieux.lat]">
                        <div slot="marker" class="marker-map">
                            <code class="emojiMap" v-html="'<p>&\#x1F' + parent.activity.emoji + ';</p>'"></code>
                        </div>
                    </MglMarker>
                </MglMap>
                <div class="adresse small-bold">{{ parent.activity.lieux }}</div>
            </div>
            <div class="description">{{ parent.activity.description }}</div>
            <div class="titre-page">Participants</div>
            <div class="participants">
                <div class="participant" v-for="participant in parent.activity.users">
                    <div class="photo-profile" @click="parent.goto(`/profile?id=${participant.uuid}`)">
                        <img
                            height="50px"
                            width="50px"
                            v-if="participant.profileImageBlob || participant.avatar"
                            :src="participant.profileImageBlob || participant.avatar" />
                    </div>
                </div>
            </div>
            <div class="btn-valider" v-if="$auth.user">
                <v-btn
                    v-if="!parent.activity.users.map((a) => a.uuid).includes($auth.user.uuid)"
                    class="btn-long plein"
                    elevation="0"
                    dark
                    color="#e92626"
                    rounded
                    @click="participer()">
                    Participer
                </v-btn>
                <div v-else>
                    <v-btn class="btn-long vide" outlined color="#e92626" rounded>
                        <v-icon>mdi-check</v-icon> Inscrit
                    </v-btn>
                    <div class="se-desinscrire">Se désinscrire</div>
                </div>
            </div>
            <div v-else>Se connecter pour participer //TODO</div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
import { MglMap, MglMarker } from 'vue-mapbox'
export default {
    name: 'detailactivite',
    props: {},
    components: {
        headerDegouline,
        barreRecherche,
        MglMap,
        MglMarker
    },
    data: function () {
        return {
            chargement: true,
            parent: null
        }
    },
    async mounted() {
        this.chargement = true
        this.parent = this.$parent.$parent.$parent
        await this.parent.loadActivity()
        setTimeout(() => {
            this.$forceUpdate()
        }, 2000)
        this.chargement = false
    },
    methods: {
        async participer() {
            await this.$axios
                .put('/activities/' + this.$route.query.id + '/user/' + this.$auth.user.uuid)
                .then((response) => {
                    if (response) {
                        this.parent.activity.users.push(this.$auth.user)
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.detailactivite {
    .body {
        height: calc(100vh - 17vh);
        margin-top: 17vh;
        display: flex;
        flex-direction: column;
        .date {
            text-align: center;
            font-weight: 650;
        }
        .btn-valider {
            position: absolute;
            bottom: 40px;
            width: 100%;
        }
        .description {
            padding: 0 20px 20px 20px;
            overflow: hidden;
            white-space: break-spaces;
            font-size: 14px;
        }
        .participants {
            padding: 20px;
            overflow: hidden;
            white-space: break-spaces;
            display: inline-flex;
            flex-wrap: wrap;
            height: fit-content;
            justify-content: center;
            .photo-profile {
                position: inherit;
                margin: 5px;
            }
        }
        .map {
            height: 300px;
            padding: 20px;
            .marker-map {
                position: absolute;
                top: 0;
                left: 0;
                will-change: transform;
                opacity: 1;
                transition: opacity 0.2s;
            }
        }
        .emojiMap {
            transform: none !important;
            position: absolute;
        }
        .adresse {
            text-align: center;
        }
        .se-desinscrire {
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
            padding-bottom: 5px;
            opacity: 0.8;
        }
    }
}
</style>
 