<template>
    <div class="acceuil">
        <headerDegouline :planet="false" :texte="true" :bas="true"></headerDegouline>

        <div class="header">
            <div class="header-gauche">
                <div class="not-connected-btn">
                    <v-btn text dark small>Connexion</v-btn>
                    <v-btn text dark small>Inscription</v-btn>
                </div>
            </div>
            <div class="header-droite">
                <v-btn class="btn-arrow-rounded" elevation="0" rounded color="white">
                    Créer une activité &nbsp;
                    <v-btn color="#e92322" width="25" height="25" elevation="0" x-small fab>
                        <v-icon color="white" size="25"> mdi-chevron-right </v-icon>
                    </v-btn>
                </v-btn>
            </div>
        </div>

        <barreRecherche class="barre-recherche" />

        <div class="planet-img-container">
            <img class="planet-img" style="position: absolute" src="@/assets/TooGetherPlanet.gif" />
        </div>
        <div class="chiffres">
            <div class="ligne haut">
                <div class="bloc deux">
                    <div class="chiffre">2</div>
                    <div class="texte">
                        <div class="gras">RECHERCHE</div>
                        <div class="pas-gras">CREE UNE ACTIVITE</div>
                    </div>
                </div>
                <div class="bloc">
                    <div class="chiffre">3</div>
                    <div class="texte">
                        <div class="gras">RENCONTRE</div>
                        <div class="pas-gras">AMUSE TOI</div>
                    </div>
                </div>
            </div>
            <div class="ligne bas">
                <div class="bloc">
                    <div class="chiffre">1</div>
                    <div class="texte">
                        <div class="gras">INSCRIT TOI</div>
                        <div class="pas-gras">CONNECTE TOI</div>
                    </div>
                </div>
                <div class="bloc">
                    <div class="chiffre">4</div>
                    <div class="texte">
                        <div class="gras">GARDE CONTACT</div>
                        <div class="pas-gras">ET REBELOTE !</div>
                    </div>
                </div>
            </div>
        </div>

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
.acceuil {
    .header {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
        padding-right: 20px;
        margin-top: 20px;
        .header-gauche {
            display: flex;
            align-items: center;
        }
    }
    .not-connected-btn {
        display: inline-flex;
    }
    .barre-recherche {
        top: 260px;
    }
    .chiffres {
        top: 350px;
        position: absolute;
        width: 100%;
        padding: 0 5% 0 5%;
        .ligne {
            display: inline-flex;
            width: 100%;
        }
        .haut {
            justify-content: center;
            .deux {
                margin-right: 20px;
            }
        }
        .bas {
            justify-content: space-between;
            margin-top: -15px;
        }
        .bloc {
            .chiffre {
                color: #ff0000;
                opacity: 0.23;
                font-size: 50px;
                font-weight: bolder;
            }
            .texte {
                margin-top: -30px;
                margin-left: 20px;
                .gras {
                    font-weight: 800;
                }
                white-space: nowrap;
                color: #616a79;
                font-size: 10px;
                opacity: 1;
            }
        }
    }
    .planet-img-container{
        position: absolute;
        bottom: 480px;
        img{
            height: 100vw;
        }
    }
}
</style>
 