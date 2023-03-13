import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyABqQuqQ3hHULDFgNNtLoYqZx_88ZmRl_o',
        libraries: 'places',
    }
});

Vue.prototype.$var = {
    recherche:{
        activite:'',
        lieux:'',
        date:''
    },
    activites:null,
    loading:true,
    possibiliteavatar: {
        avatarStyle: ["Circle"],
        accessoriesType: [
          "Blank",
          "Kurt",
          "Prescription01",
          "Prescription02",
          "Round",
          "Sunglasses",
          "Wayfarers"
        ],
        clotheColor: [
          "Black",
          "Blue01",
          "Blue02",
          "Blue03",
          "Gray01",
          "Gray02",
          "Heather",
          "PastelBlue",
          "PastelGreen",
          "PastelOrange",
          "PastelRed",
          "PastelYellow",
          "Pink",
          "Red",
          "White"
        ],
        clotheType: [
          "BlazerShirt",
          "BlazerSweater",
          "CollarSweater",
          "GraphicShirt",
          "Hoodie",
          "Overall",
          "ShirtCrewNeck",
          "ShirtScoopNeck",
          "ShirtVNeck"
        ],
        eyeType: [
          "Close",
          "Cry",
          "Default",
          "Dizzy",
          "EyeRoll",
          "Happy",
          "Hearts",
          "Side",
          "Squint",
          "Surprised",
          "Wink",
          "WinkWacky"
        ],
        eyebrowType: [
          "Angry",
          "AngryNatural",
          "Default",
          "DefaultNatural",
          "FlatNatural",
          "RaisedExcited",
          "RaisedExcitedNatural",
          "SadConcerned",
          "SadConcernedNatural",
          "UnibrowNatural",
          "UpDown",
          "UpDownNatural"
        ],
        facialHairColor: [
          "Auburn",
          "Black",
          "Blonde",
          "BlondeGolden",
          "Brown",
          "BrownDark",
          "Platinum",
          "Red"
        ],
        facialHairType: [
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "BeardMedium",
          "BeardLight",
          "BeardMagestic",
          "MoustacheFancy",
          "MoustacheMagnum"
        ],
        hairColor: [
          "Black",
          "Blue01",
          "Blue02",
          "Blue03",
          "Gray01",
          "Gray02",
          "Heather",
          "PastelBlue",
          "PastelGreen",
          "PastelOrange",
          "PastelRed",
          "PastelYellow",
          "Pink",
          "Red",
          "White"
        ],
        mouthType: [
          "Concerned",
          "Default",
          "Disbelief",
          "Eating",
          "Grimace",
          "Sad",
          "ScreamOpen",
          "Serious",
          "Smile",
          "Tongue",
          "Twinkle"
        ],
        skinColor: [
          "Tanned",
          "Yellow",
          "Pale",
          "Light",
          "Brown",
          "DarkBrown",
          "Black"
        ],
        topType: [
          "NoHair",
          "Eyepatch",
          "Hat",
          "Hijab",
          "Turban",
          "WinterHat1",
          "WinterHat2",
          "WinterHat3",
          "WinterHat4",
          "LongHairBigHair",
          "LongHairBob",
          "LongHairBun",
          "LongHairCurly",
          "LongHairCurvy",
          "LongHairDreads",
          "LongHairFrida",
          "LongHairFro",
          "LongHairFroBand",
          "LongHairNotTooLong",
          "LongHairShavedSides",
          "LongHairMiaWallace",
          "LongHairStraight",
          "LongHairStraight2",
          "LongHairStraightStrand",

          "ShortHairDreads01",
          "ShortHairDreads02",
          "ShortHairFrizzle",
          "ShortHairShaggyMullet",
          "ShortHairShortCurly",
          "ShortHairShortFlat",
          "ShortHairShortRound",
          "ShortHairShortWaved",
          "ShortHairSides",
          "ShortHairTheCaesar",
          "ShortHairTheCaesarSidePart"
        ]
      }
}

Vue.prototype.$gf =  {
    async loadActivities() {
        Vue.prototype
        debugger
        this.$var.loading = true
        console.log(this.$var.recherche);
        
        let res = await this.$axios.get(
            "/activities" + queryParamName + "/recherche"
        )
        this.listeEvents = res.data
        res.data.length == 0 ? this.chargement = false : ''
        for await (let activity of this.listeEvents) {
            this.nbImagesAcharger = this.nbImagesAcharger + activity.users.length;
            activity.users.forEach(user => {
                this.getProfileImage(user)
            })
            var coord = activity.coordlieux ? JSON.parse(activity.coordlieux) : null
            activity.coordlieux = coord ? [coord.lng, coord.lat] : null

        } 
    }
}