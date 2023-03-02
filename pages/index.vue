<template>
    <v-app>
        <accueil v-if="mobile" />
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
    </v-app>
</template>

<script>
import accueil from '@/pages/acceuil.vue'
export default {
    name: 'App',
    components: {
        accueil: accueil
    },
    data() {
        return {
            mobile: false
        }
    },
    created() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            this.mobile = true
        }
        this.loadUserCo()
    },
    methods: {
      async loadUserCo(){
           this.$var = await this.$auth;
      }
    },
    
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');
* {
    font-family: 'Noto Sans', sans-serif;
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
</style>
