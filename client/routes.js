import Vue from 'vue'
import VueRouter from 'vue-router'

import ListingGrid from '/imports/ui/components/ListingGrid.vue'
import ListingModal from '/imports/ui/components/ListingModal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/myoffers",
    name: "My Offers",
    component: ListingGrid,
    props: { isNeed: 'false', isOwn: 'true' },
  },
  {
    path: "/myneeds",
    name: 'My needs',
    component: ListingGrid,
    props: { isNeed: 'true', isOwn: 'true' },
  },
  {
    path: "/offers",
    name: "Offers",
    component: ListingGrid,
    props: { isNeed: 'false', isOwn: 'false' },
  },
  {
    path: "/needs",
    name: 'Needs',
    component: ListingGrid,
    props: { isNeed: 'true', isOwn: 'false' },
  },
  {
    path: "/listing/:lid",
    name: 'Show listing',
    component: ListingModal,
  },
//  {
//    path: "/profile",
//    name: 'Profile',
//    component: Profile
//  }
]

const router = new VueRouter({
  routes
})

export default router
