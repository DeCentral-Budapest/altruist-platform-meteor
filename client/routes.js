import Vue from 'vue'
import VueRouter from 'vue-router'

import Inbox from '/imports/ui/components/Inbox.vue'
import ListingGrid from '/imports/ui/components/ListingGrid.vue'
import ListingModal from '/imports/ui/components/ListingModal.vue'
import Profile from '/imports/ui/components/Profile.vue'
import TransactionPage from '/imports/ui/components/TransactionPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/inbox'
  },
  {
    path: "/inbox",
    name: "Inbox",
    component: Inbox,
  },
  {
    path: "/myresources",
    name: "My Resources",
    component: ListingGrid,
    props: { isNeed: 'false', isOwn: 'true'},
  },
  {
    path: "/mygoods",
    name: "My Goods",
    component: ListingGrid,
    props: { isNeed: 'false', isOwn: 'true', isServ: 'false', isGood: 'true' },
  },
  {
    path: "/myservices",
    name: "My Services",
    component: ListingGrid,
    props: { isNeed: 'false', isOwn: 'true', isServ: 'true', isGood: 'false' },
  },
  {
    path: "/myneeds",
    name: 'My needs',
    component: ListingGrid,
    props: { isNeed: 'true', isOwn: 'true', isServ: 'false', isGood: 'false' },
  },
  {
    path: "/listings",
    name: "Listings",
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
  {
    path: "/searchresults",
    name: "Search results",
    component: ListingGrid,
    props: { isNeed: 'both', isOwn: 'both' },
  },
]

const router = new VueRouter({
  routes
})

export default router
