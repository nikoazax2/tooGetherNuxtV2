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
    props:{
         test: { type: Function }, 
    },
    components: {
        headerDegouline,
        barreRecherche
    },
    created() {
    },
    mounted(){
        this.parent = this.$parent.$parent.$parent 
        this.parent.leadActivities()
    },
    data: function () {
        return {
            parent:null
        }
    }
}
</script>

<style lang="scss" scoped>
.listeevent { 
    
}
</style>
 