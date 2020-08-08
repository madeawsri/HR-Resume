import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// register globally
import MaskedInput from 'vue-text-mask'
Vue.component('masked-input', MaskedInput);
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate)
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert, { reverseButtons: true });

import Multiselect from 'vue-multiselect'
Vue.component('v-multiselect', Multiselect)

//import vSelect from 'vue-select'
//Vue.component('v-select', vSelect)
import DatePicker from 'vue2-datepicker';
Vue.component('v-date', DatePicker)

import Config from './config'
Vue.prototype.$config = Config

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

console.log('url:' + process.env.VUE_APP_API_ENDPOINT)

Vue.prototype.$http = axios
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters['user/isLogged']) {
            console.log('check login!!')
            next({
                name: 'Login',
                //query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})


Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    }
})


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');