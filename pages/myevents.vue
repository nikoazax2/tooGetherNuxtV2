<template>
    <div class="MyAct">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="body">
            <div class="titre-page">MES ACTIVITES</div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'MyAct',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
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
}
</style>
 