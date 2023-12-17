<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String,
  width: Number
})
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <img :width="width" :src="imageUrl" alt="image" />
    <h2 class="title font-extrabold">{{ title }}</h2>
    <p class="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.title {
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  line-height: 24px;
  width: 259px;
  color: rgba(0, 0, 0, 0.4);
}
</style>
