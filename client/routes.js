import Vue from 'vue'
import VueRouter from 'vue-router'

import ListingGrid from '/imports/ui/components/ListingGrid.vue'
import ListingModal from '/imports/ui/components/ListingModal.vue'
import Profile from '/imports/ui/components/Profile.vue'
import TransactionPage from '/imports/ui/components/TransactionPage.vue'

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
    name: 'View listing',
    component: ListingModal,
  },
  {
    path: "/transaction/:tid",
    name: 'View transaction',
    component: TransactionPage,
  },
  {
    path: "/profile",
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  routes
})

export default router
