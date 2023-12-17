<script setup>
import { convertPrice } from '@/helpers/convertPrice.js'

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number
})

const emit = defineEmits(['onClickRemove'])
</script>

<template>
  <div class="flex justify-between border border-zinc-200 p-4 rounded-xl">
    <img class="drawer-item-img" :src="imageUrl" alt="component" />
    <div class="flex flex-col gap-1">
      <p class="drawer-item-title">{{ title }}</p>
      <span class="drawer-item-price font-bold">{{ convertPrice(price) }}</span>
    </div>
    <div
      class="drawer-item-remove-btn flex items-center justify-center cursor-pointer transition"
      @click="() => emit('onClickRemove')"
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="transition"
          d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
          fill="#D3D3D3"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer-item {
  &-img {
    width: 71.32px;
    object-fit: contain;
  }

  &-title {
    width: 150px;
    font-size: 12px;
  }

  &-price {
    font-size: 14px;
  }
}

.drawer-item-remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgb(228, 228, 231);

  &:hover {
    border: 1px solid #9b9b9b;

    svg {
      path {
        fill: #9b9b9b;
      }
    }
  }
}
</style>
