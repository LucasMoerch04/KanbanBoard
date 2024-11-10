import { createVuetify } from 'vuetify'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#121212', 
        },
      },
    },
  },
})
