import Vue from 'vue'
import VueRouter from 'vue-router'

import InputForm from '/imports/ui/components/InputForm.vue'
import ListingGrid from '/imports/ui/components/ListingGrid.vue'

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
    path: "/listing",
    name: 'Listing',
    component: InputForm
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
