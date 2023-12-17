<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const favorites = ref([])

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites?item_id=${item.id}`
      )
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${data[0].id}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.warn(err)
  }
}

const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites?_relations=items`)
    favorites.value = data.map((obj) => ({ ...obj.item, isFavorite: true, isAdded: false }))

    const localStorageCart = localStorage.getItem('cart')
    cart.value = localStorageCart ? JSON.parse(localStorageCart) : []

    favorites.value = favorites.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
  } catch (err) {
    console.warn(err)
  }
})

watch(cart.value, () => {
  console.log(cart.value)
  favorites.value = favorites.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <h2 class="font-extrabold text-3xl mb-8 mt-10">Мои закладки</h2>
  <CardList :items="favorites" @add-to-favorite="addToFavorite" @add-to-cart="onClickPlus" />
</template>
