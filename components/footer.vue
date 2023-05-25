<template>
    <div class="lefooter">
        <div class="conteneur">
            <div
                class="friends"
                :class="{
                    selected: routePos == '/friends' || routePos == '/profile/'
                }"
                @click="goto('/friends')">
                <v-icon> mdi-account-group </v-icon>
            </div>
            <div class="myevents" :class="{ selected: routePos == '/myevents' }" @click="goto('/myevents')">
                <v-icon> mdi-clipboard-text-clock </v-icon>
            </div>
            <div class="acceuil" :class="{ selected: routePos == '/acceuil' }" @click="goto('/acceuil')">
                <v-icon> mdi-home </v-icon>
            </div>

            <div
                class="recherche"
                :class="{
                    selected: routePos.includes('liste-events')
                }"
                @click="goto('/liste-events')">
                <v-icon> mdi-search-web </v-icon>
            </div>

            <div class="myevents" :class="{ selected: routePos == '/map' }" @click="goto('/map')">
                <v-icon> mdi-map </v-icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data: function () {
        return {
            routePos: ''
        }
    },
    created() {
        this.routePos = this.$route.path
    },
    methods: {
        goto(route) {
            this.$router.push(route)
        }
    },
    watch: {
        $route(to, from) {
            this.routePos = this.$route.path
        }
    }
}
</script>
<style lang="scss">
.lefooter {
    position: absolute;
    height: 35px;
    background-color: #202023;
    bottom: -2px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 10000;

    * {
        font-family: 'Noto Sans', sans-serif;
    }
    .body {
        height: 20px;
    }
    .conteneur {
        display: inline-flex;
        justify-content: space-evenly;
        height: 100%;
        width: 100%;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 20%;
        }
        i {
            color: white !important;
            font-size: 20px !important;
        }
        .selected {
            margin-top: -0.5%;
            height: 110%;
            background-color: #5a5a5a;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 5px;
            i {
                color: #ea2624 !important;
            }
        }
    }
}
</style>
