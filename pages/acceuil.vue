<template>
    <div class="acceuil">
        <headerDegouline :planet="false" :texte="true"></headerDegouline>

        <!-- Connecté -->
        <div class="connected"></div>
        <!-- PAs Connecté -->
        <div class="not-connected"></div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
export default {
    name: 'App',
    components: {
        headerDegouline
    },
    created: function () {},
    data: function () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>
 