import Vue from 'vue';

//Importando componentes
import App from './components/App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount("#app");
