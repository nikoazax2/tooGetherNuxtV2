<template>
    <div class="listeevent">
        <headerDegouline :planet="false"></headerDegouline>
 
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'App',
    components: {
        headerDegouline,
        barreRecherche
    },
    created: function () {},
    data: function () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.listeevent { }
</style>
 