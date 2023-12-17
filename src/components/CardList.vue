<script setup>
import Card from '@/components/Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="cards grid gap-5 justify-between" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :on-click-favorite="() => emit('addToFavorite', item)"
      :on-click-add="() => emit('addToCart', item)"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
    />
  </div>
</template>

<style scoped lang="scss">
.cards {
  grid-template-columns: repeat(4, minmax(0, 210px));

  @media (max-width: 1040px) {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 1040px) {
    justify-content: center;
  }
}
</style>
