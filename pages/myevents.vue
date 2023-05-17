<template>
    <div class="MyAct">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="body">
            <div class="titre-page">MES ACTIVITES</div>
            <div v-if="parent.activites.length > 0 && $auth.user">
                <div
                    class="element"
                    v-for="activite in parent.activites"
                    @click="parent.goto('detailactivite' + '?id=' + activite.uuid)">
                    <uneAct :activite="activite" :chat="true" />
                </div>
            </div>
            <div v-if="parent.activites.length == 0">
                <div class="element">
                    <div class="message">Aucune activité <br />Incrit toi à une nouvelle activité !</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
import uneAct from '../components/uneActivite.vue'
export default {
    name: 'MyAct',
    props: {},
    components: {
        headerDegouline,
        barreRecherche,
        uneAct
    },
    created() {
        this.parent = this.$parent.$parent.$parent
        if (this.$auth.user) this.parent.loadActivitiesByUser(this.$auth.user.uuid)
        else this.parent.goto('login')
    },
    data: function () {
        return {
            parent: null
        }
    }
}
</script>

<style lang="scss" scoped>
.MyAct {
    .message {
        display: flex;
        justify-content: center;
        width: 100vw;
        height: calc(100vh - 400px);
        align-items: center;
        text-align: center;
    }
}
</style>
 