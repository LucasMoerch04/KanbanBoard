import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import 'vuetify/styles';
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable,
  },
};


const app = createApp(App);


app.use(vuetify);
app.mount('#app');
