<template>
    <div class="listeevent">
        <headerDegouline :planet="true" :bas="-150" :texte="true"></headerDegouline>
        <div class="liste">
            <barreRecherche class="barre-recherche" />
            <div v-if="parent.activites.length > 0">
                <div
                    @click="parent.goto('detailactivite' + '?id=' + activite.uuid)"
                    class="element"
                    v-for="activite in parent.activites">
                    <uneAct :activite="activite" />
                </div>
            </div>
        </div>
        <div v-if="parent.activites.length == 0" class="no-data-container">
            <div class="no-data">
                <div class="aucun-event">Aucune activité ne correspond à ta recherche :(</div>
                <div class="aucun-event">Pas de panique, tu peux</div>
                <v-btn class="btn-long plein" elevation="0" dark color="#e92626" rounded @click="parent.goto('create')">
                    Créer une activité
                </v-btn>
                <div class="aucun-event">ou en chercher une autre !</div>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
import uneAct from '../components/uneActivite.vue'
export default {
    name: 'App',
    props: {
        test: { type: Function }
    },
    components: {
        headerDegouline,
        barreRecherche,
        uneAct
    },
    created() {
        this.parent = this.$parent.$parent.$parent
        this.parent.loadActivities()
    },
    mounted() {},
    data: function () {
        return {
            parent: null
        }
    }
}
</script>

<style lang="scss" scoped>
.listeevent {
    height: 100%;
    .liste {
        top: 200px;
        position: absolute;
        width: 100%;
        height: calc(100% - 200px);
        .element {
            padding-top: 50px;
        }
    }
}
</style>
 