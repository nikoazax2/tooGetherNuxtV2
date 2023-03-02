import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyABqQuqQ3hHULDFgNNtLoYqZx_88ZmRl_o',
        libraries: 'places',
    }
});

Vue.prototype.$var = {
    test:""
}

Vue.prototype.$globalfunctions =  {
    goto(route) { this.$router.push(route); },
    formatDate(ladateheure, activity) {
        var heure = ladateheure.split(",")[1];
        var ladate = ladateheure.split(",")[0];
        var date = new Date(ladate);
        var month = (date.getMonth() + 1).toString();
        month.length == 1 ? (month = "0" + month) : "";
        var dateToday = new Date();
        date.setHours(heure.split(":")[0], heure.split(":")[1], 0);
        var leretour = "";

        //max après demain minuit
        let afterTomorrow = new Date();
        afterTomorrow.setDate(dateToday.getDate() + 2);
        afterTomorrow.setHours(0, 0, 1);
        //max  demain minuit
        let tomorrow = new Date();
        tomorrow.setDate(dateToday.getDate() + 1);
        tomorrow.setHours(0, 0, 1);
        //max  aujourdhui minuit
        let today = new Date();
        today.setDate(dateToday.getDate());
        //max  hier minuit
        let yesterday = new Date();
        yesterday.setDate(dateToday.getDate() - 1);
        yesterday.setHours(0, 0, 1);

        let minutes = date.getMinutes().toString();
        minutes.length == 1 ? (minutes = "0" + minutes) : "";

        if (date > afterTomorrow) {
            leretour = `Le ${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`;
        }
        if (date < afterTomorrow && date > tomorrow) {
            leretour = `Demain à ${date.getHours()}h${minutes}`;
        }
        if (date < tomorrow && date > today && date > dateToday) {
            leretour = `Aujourd'hui à ${date.getHours()}h${minutes}`;
        }
        if (date > today && date < dateToday) {
            leretour = `Passé aujourd'hui à ${date.getHours()}h${minutes}`;
            activity.passed = true;
        }
        if (date < today && date > yesterday) {
            leretour = `Passé hier à ${date.getHours()}h${minutes}`;
            activity.passed = true;
        }
        if (date < today && date < yesterday) {
            leretour = `Passé le ${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`;
            activity.passed = true;
        }
        return leretour;
    },


}