import Vue from 'vue'
import VueRouter from 'vue-router'

import Activity from '/imports/ui/components/Activity.vue'
import ListingGrid from '/imports/ui/components/ListingGrid.vue'
import ListingPage from '/imports/ui/components/ListingPage.vue'
import Profile from '/imports/ui/components/Profile.vue'
import DealPage from '/imports/ui/components/DealPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/activity'
  },
  {
    path: "/offers",
    name: "Listings",
    redirect: '/listings'
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity,
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
    component: ListingPage,
  },
  {
    path: "/deal/:tid",
    name: 'View deal',
    component: DealPage,
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
