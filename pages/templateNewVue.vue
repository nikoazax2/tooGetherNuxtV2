<template>
    <div class="leTemplate">
        <headerDegouline :planet="false"></headerDegouline> 
    </div>
</template>

<script>
import headerDegouline from '../components/headerDegouline.vue'
import barreRecherche from '../components/barreRecherche.vue'
export default {
    name: 'leTemplate',
    props:{
    },
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {
    },
    mounted(){
        this.parent = this.$parent.$parent.$parent
    },
    data: function () {
        return {
            parent:null
        }
    }
}
</script>

<style lang="scss" scoped>
.leTemplate { 
    
}
</style>
 