<template>
    <v-app>
        <nuxt v-if="mobile"/>  
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
        <footersite></footersite> 
    </v-app>
</template>

<script>
import home from '@/pages/home.vue'
import footersite from '@/components/footer.vue' 
export default {
    name: 'App',
    components: {
        accueil: accueil,
        footersite: footersite
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
        async loadUserCo() {
            this.$var = await this.$auth
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');
* {
    font-family: 'Noto Sans', sans-serif;
}
.btn-arrow-rounded {
    padding: 0 5px 0 10px !important;
    .v-btn__content{ 
        font-size: 11px;
        font-weight: 700;
        opacity: 0.9;
    } 
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
