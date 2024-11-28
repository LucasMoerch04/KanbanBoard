import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { VCard, VCardTitle, VCardSubtitle, VBtn, VRow, VCol, VTextField, VTextarea } from 'vuetify/components';
import '@testing-library/jest-dom';


const vuetify = createVuetify({
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VBtn,
    VRow,  // Add missing components
    VCol,
    VTextField,
    VTextarea,
  },
});

config.global.plugins = [vuetify];
