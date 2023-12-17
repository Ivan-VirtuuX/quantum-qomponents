<script setup>
import { computed, provide, ref, watch } from 'vue'

import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, { price }) => acc + price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const openDrawer = () => {
  drawerOpen.value = true

  document.querySelector('body').style.overflow = 'hidden'
}

const closeDrawer = () => {
  drawerOpen.value = false

  document.querySelector('body').style.overflow = 'auto'
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="content shadow-xl rounded-2xl bg-white m-auto mt-14 pb-10">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
