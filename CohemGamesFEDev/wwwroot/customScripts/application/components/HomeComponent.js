//const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
//const urlList = document.getElementById("data").getAttribute("data-search");
//const urlAddOrEditFavorite = document.getElementById("data").getAttribute("data-add-or-edit-favorite");
const dataAdmin = document.getElementById("data").getAttribute("data-admins");

//const headers = {
//    "Content-Type": "application/json",
//    "_RequestVerificationToken": token
//}

console.log("Starting HomeView");

const urlParams = new URLSearchParams(window.location.search);

Vue.component('vue-multiselect', window.VueMultiselect.default)

let HomeSearch = new Vue({
    el: '#index',
    components: {
        vuejsDatepicker
    },
    data: {
        documents: [],
        filters: {
            "CurrentPage": 0
        }
    },
    methods: {
        GetCount: function() {

        },
        async DeleteFavorite(model) {

        }
    },
    async created() {
        console.log("Created");
        console.log("dataAdmin", dataAdmin);
    }
})