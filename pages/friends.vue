<template>
    <div class="Friends">
        <headerDegouline :planet="true"></headerDegouline>
        <div class="body">
            <div class="titre-page">MES AMIS</div>
        </div>
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'Friends',
    props: {},
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {},
    mounted() {
        this.parent = this.$parent.$parent.$parent
        if (this.$auth.user) console.log('loadFriends')
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
.Friends {
}
</style>
 