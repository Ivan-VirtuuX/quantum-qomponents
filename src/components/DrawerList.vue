<script setup>
import { inject } from 'vue'

import DrawerListItem from '@/components/DrawerListItem.vue'

const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="drawer-list flex flex-col gap-6 flex-1" v-auto-animate>
    <DrawerListItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>

<style scoped>
.drawer-list {
  padding-right: 10px;
  margin-bottom: 20px;
}
</style>
