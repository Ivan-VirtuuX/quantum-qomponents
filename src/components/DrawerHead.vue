<script setup>
import { inject } from 'vue'

import ReturnArrow from '@/components/ReturnArrow.vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex items-center gap-2 mb-6">
    <ReturnArrow @close-drawer="closeDrawer" />
    <h2 class="text-2xl font-bold select-none">Корзина</h2>
  </div>
</template>
