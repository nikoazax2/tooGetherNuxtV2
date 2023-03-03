<template>
    <div class="container-degouline">
        <div class="degouline" :class="bas ? 'bas' : ''"></div>
        
        <div class="conteneur-planet" v-if="planet">
            <img
                class="planet-tourne"
                style="position: absolute"
                src="@/assets/planetquitournerouge.gif" />
        </div>
        <div v-if="texte" class="titrecard" to="/">
            <div class="titre">T o o G e t h e r</div>
            <div class="sous-titre">Faites des rencontres en faisant ce que vous aimez</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        planet: {
            type: Boolean,
            default: true
        },
        texte:{
            type: Boolean,
            default: false
        },
        bas:{
            type: Boolean,
            default: false
        },
    }
}
</script>
<style lang="scss" scoped>
.container-degouline{ 
    .degouline{
        width: 100%;
        height: 349px;
        position: absolute;
        background-image: url('~@/assets/degouline.svg');
        background-repeat: repeat-x;
        margin-top: -222px;
    }
    .bas{
        margin-top: 0;
    }
    .conteneur-planet{
        display: flex;
        justify-content: center;
        position: absolute;
        top: -60px;
        left: 50vw;
        .planet-tourne{
            width: 33vw!important;
        }
    }
    .titrecard{
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        color: white;
        justify-content: center;
        text-align: center;
        top: 125px;
        .titre{
            font-weight: 600;
            font-size: 22px;
        }
        .sous-titre{
            opacity: 0.8;
            font-size: 14px;
        }
    }
}
</style>