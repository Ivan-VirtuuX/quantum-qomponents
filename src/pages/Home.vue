<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 500)

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
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.warn(err)
  }
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }
  if (filters.searchQuery) params.title = `*${filters.searchQuery}*`

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.warn(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) return item

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.warn(err)
  }
}

onMounted(async () => {
  const localStorageCart = localStorage.getItem('cart')
  cart.value = localStorageCart ? JSON.parse(localStorageCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems)
</script>

<template>
  <div class="filter-components-top flex justify-between items-center mb-8 mt-10">
    <h2 class="components-title font-extrabold text-3xl">Все комплектующие</h2>
    <div class="filter-components-content flex items-center gap-5">
      <select
        @change="onChangeSelect"
        class="filter-components-select outline-none cursor-pointer transition"
      >
        <option value="name">По названию</option>
        <option value="price">Сначала дешевые</option>
        <option value="-price">Сначала дорогие</option>
      </select>
      <div class="search-block relative">
        <svg
          class="search-icon absolute"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
            stroke="#E4E4E4"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <input
          @input="onChangeSearchInput"
          class="search-input outline-none focus:border-gray-400 transition"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickPlus" />
</template>

<style scoped lang="scss">
.filter-components-top {
  @media (max-width: 870px) {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
  }
}

.components-title {
  @media (max-width: 420px) {
    font-size: 25px;
  }
}

.filter-components-content {
  @media (max-width: 870px) {
    flex-direction: column-reverse;
    justify-content: center;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
}

.filter-components-select {
  font-size: 14px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  padding: 12px 15px;
  color: #454545;

  @media (max-width: 870px) {
    width: 100%;
  }
}

.filter-components-select {
  &:focus {
    border-color: #c1c1c1;
  }
}

.search-block {
  @media (max-width: 540px) {
    width: 100%;
  }
}

.search-input {
  font-size: 14px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  padding: 12px 15px 12px 42px;
  height: 45px;
  width: 250px;

  @media (max-width: 540px) {
    width: 100%;
  }
}

.search-input {
  &::placeholder {
    color: #454545;
  }
}

.search-input {
  &:focus {
    border-color: #c1c1c1;
  }
}

.search-icon {
  left: 15px;
  top: 14px;
}
</style>
