import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyABqQuqQ3hHULDFgNNtLoYqZx_88ZmRl_o',
        libraries: 'places',
    }
});

Vue.prototype.$var = { 
    accessToken:
        "pk.eyJ1Ijoibmlrb2F6YXgyIiwiYSI6ImNrdjZoc2tjazUxdHEybnM3NThrb3BzeWUifQ.lXywLOuZT805nnFeujPKOg", // your access token. Needed if you using Mapbox maps
    mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
    activites: null,
    loading: true, 
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
    },
    loadImg:false,
}

Vue.prototype.$gf = { 
}