import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/css/bootstrap-theme.css'
import '@fortawesome/fontawesome-free/js/all.js'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  })
})
