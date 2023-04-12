<template>
    <div class="Map">
        <headerDegouline :planet="true" />
        <div class="map-container">
            <MglMap
                :center="center"
                class="map-visu map-map"
                ref="map"
                :zoom="4"
                :accessToken="$var.accessToken"
                :mapStyle.sync="$var.mapStyle"
                @zoom="handleZoom"
                @move="handleZoom">
                <MglMarker
                    @click="focusActivity = activite"
                    v-for="activite in activities"
                    :coordinates="[activite.lng, activite.lat]">
                    <div slot="marker" class="marker-map">
                        <code class="emojiMap" v-html="'<p>&\#x1F' + activite.emoji + ';</p>'"></code>
                    </div>
                </MglMarker>
            </MglMap>
        </div>
        <div class="focus" v-if="focusActivity" @click="parent.goto('detailactivite' + '?id=' + focusActivity.uuid)">
            <uneAct  :activite="focusActivity" /> 
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
import { MglMap, MglMarker } from 'vue-mapbox'
import Mapbox from 'mapbox-gl'
import uneAct from '../components/uneActivite.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
    name: 'Map',
    props: {},
    components: {
        headerDegouline,
        barreRecherche,
        MglMap,
        MglMarker,
        uneAct
    },
    data: function () {
        return {
            parent: null,
            chargement: false,
            rectView: null,
            activities: [],
            timeoutSearch: null,
            center: { lat: 46.554666, lng: 2.438728 },
            focusActivity: null
        }
    },
    created() {},
    async mounted() {
        this.chargement = true
        this.parent = this.$parent.$parent.$parent
        await this.loadActivitiesMap()
        this.chargement = false
    },
    methods: {
        handleZoom() {
            const bounds = this.$refs.map.map.getBounds()
            this.rectView = {
                no: new Mapbox.LngLat(bounds.getSouthWest().lng, bounds.getNorthEast().lat),
                ne: bounds.getNorthEast(),
                so: bounds.getSouthWest(),
                se: new Mapbox.LngLat(bounds.getNorthEast().lng, bounds.getSouthWest().lat)
            }
            clearTimeout(this.timeoutSearch)
            this.timeoutSearch = setTimeout(() => {
                this.loadActivitiesMap()
            }, 100)
        },
        async loadActivitiesMap() {
            let res = await this.$axios.get(`/activities/map/${JSON.stringify(this.rectView)}`)
            this.activities = res.data
            this.activities.forEach((activite) => {
                activite.coordlieux = JSON.parse(activite.coordlieux)

                activite.users.forEach((user, index) => {
                    this.parent.getProfileImage(user)
                    if (index == activite.users.length - 1) {
                        this.imgLoad = false
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.Map {
    .map-container {
        height: 100vh;
        margin-top: 0vh;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100vw;
    }
    .focus {
        position: absolute;
        bottom: 40px;
    }
}
::v-deep .degouline {
    z-index: 1;
}
::v-deep .planet-tourne {
    z-index: 2;
}
</style>
 