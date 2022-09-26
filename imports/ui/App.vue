<template>
  <div>
    <h1>Welcome to the Altruist Platform!</h1>
    <Hello/>
    <InputForm/>
    <h2>Current offers:</h2>
    <ListingGrid isNeed=false />
    <h2>Current needs:</h2>
    <ListingGrid isNeed=true />
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import InputForm from './components/InputForm.vue'
import ListingGrid from './components/ListingGrid.vue'

export default {
  components: {
    Hello,
    InputForm,
    ListingGrid,
  },
}
</script>

<style>
  body {
    padding: 20px;
  }
</style>
