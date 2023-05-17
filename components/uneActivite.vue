<template>
    <div class="uneActivite">
        <div class="gauche partie">
            <div class="nom small-bold">{{ activite.name }} </div>
            <div class="desc small-bold">{{ activite.description }}</div>
            <div class="date small-bold">{{ parent.dateFormatee(activite.date) }}</div>
        </div>
        <div class="milieu partie">
            <div class="map">
                <MglMap
                    class="map-visu"
                    v-if="activite.coordlieux.lat && activite.coordlieux.lng"
                    :zoom="9"
                    :center="activite.coordlieux"
                    :accessToken="$var.accessToken"
                    :mapStyle.sync="$var.mapStyle">
                    <MglMarker :coordinates="[activite.coordlieux.lng, activite.coordlieux.lat]">
                        <div slot="marker" class="marker-map">
                            <code class="emojiMap" v-html="'<p>&\#x1F' + activite.emoji + ';</p>'"/>
                        </div>
                    </MglMarker>
                </MglMap>
            </div>
            <div class="adresse">{{ activite.lieux }}</div>
        </div>
        <div class="droite partie">
            <div>
                <div class="titre small-bold">
                    Participant{{ activite.users.length > 1 ? 's' : '' }}
                    <v-icon
                        v-if="this.$route.name == 'myevents'"
                        @click.stop="parent.goto(`chat?id=${activite.uuid}`)">
                        mdi-forum-outline
                    </v-icon>
                </div>
                <div class="photos">
                    <div v-for="user in activite.users.slice(0, 19)" class="photo-small-view">
                        <img v-if="user.avatar || user.profileImageBlob" :src="user.avatar || user.profileImageBlob" />
                    </div>
                    <div v-if="activite.users.length > 19">+{{ activite.users.length - 19 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MglMap, MglMarker } from 'vue-mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
    name: 'uneActivite',
    props: {
        activite: Object,
        chat: { type: Boolean, default: false }
    },
    components: {
        MglMap,
        MglMarker
    },
    created() {
        this.parent = this.$parent.$parent.$parent.$parent
        setTimeout(() => {
            this.chargement = false
            this.$forceUpdate()
        }, 2000)
    },
    data: function () {
        return { parent: null, chargement: true }
    }
}
</script>

<style lang="scss" scoped>
.uneActivite {
    height: 130px;
    width: calc(100% - 20px);
    display: inline-flex;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25) !important;
    border-radius: 10px;
    margin: 10px;
    background-color: white;
    .partie {
        padding: 5px;
        width: 33.3%;
    }
    .droite {
        .titre {
            text-align: center;
        }
    }
    .milieu {
        .map {
            height: calc(100% - 12px);
            width: 100%;
        }
        .adresse {
            text-align: center;
            font-size: 10px;
            white-space: nowrap;
        }
    }
    .photos {
        height: 100%;
        display: inline-flex;
        flex-wrap: wrap;
        height: fit-content;
        .photo-small-view {
            margin: 2px;
        }
    }
    .gauche {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .date {
            font-size: 10px;
        }
        .desc {
            height: 50px;
            max-width: 100%;
            font-size: 10px;
            display: inline-block;
            overflow: hidden;
        }
    }
}
</style>
 