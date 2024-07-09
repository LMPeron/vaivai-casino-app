/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '@/stores';
import router from '@/router';
import Toastification from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(Toastification, { position: 'top-center' });
}
