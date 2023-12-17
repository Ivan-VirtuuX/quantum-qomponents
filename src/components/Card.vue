<script setup>
import { convertPrice } from '@/helpers/convertPrice.js'

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="card-container bg-white border border-slate-100 rounded-xl hover:-translate-y-2 transition hover:shadow-xl flex flex-col items-center"
  >
    <img class="card-img" :src="imageUrl" alt="component" />
    <div class="w-full flex flex-col justify-between h-full">
      <p class="card-title">{{ title }}</p>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="font-medium uppercase card-price-title">Цена:</span>
          <span class="font-bold card-price">{{ convertPrice(price) }} </span>
        </div>
        <div class="flex items-center gap-2">
          <div
            v-if="isFavorite"
            class="card-favorited-btn-container cursor-pointer"
            style="background: #fef0f0"
            @click="onClickFavorite"
          >
            <img src="/red-heart.svg" alt="like" class="card-like-btn" />
          </div>
          <div v-else class="card-favorite-btn-container cursor-pointer" @click="onClickFavorite">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1311 0C11.224 0 12.1421 0.347826 12.8852 1.04348C13.6284 1.73913 14 2.58824 14 3.59079C14 4.08184 13.8907 4.57801 13.6721 5.07928C13.4536 5.58056 13.2131 6.02558 12.9508 6.41432C12.6885 6.80307 12.2459 7.30435 11.623 7.91816C11 8.53197 10.4754 9.02813 10.0492 9.40665C9.62295 9.78517 8.93989 10.3632 8 11.1407L6.98361 12L5.96721 11.1714C5.04918 10.3734 4.37158 9.78517 3.93443 9.40665C3.49727 9.02813 2.96721 8.53197 2.34426 7.91816C1.72131 7.30435 1.27869 6.80307 1.01639 6.41432C0.754098 6.02558 0.519126 5.58056 0.311475 5.07928C0.103825 4.57801 0 4.08184 0 3.59079C0 2.58824 0.371585 1.73913 1.11475 1.04348C1.85792 0.347826 2.76503 0 3.83607 0C5.10383 0 6.15301 0.460358 6.98361 1.38107C7.81421 0.460358 8.86339 0 10.1311 0ZM7.04918 10.1893C8.12022 9.289 8.90164 8.61893 9.39344 8.17903C9.88525 7.73913 10.4262 7.21228 11.0164 6.59847C11.6066 5.98465 12.0164 5.44757 12.2459 4.98721C12.4754 4.52685 12.5902 4.06138 12.5902 3.59079C12.5902 2.93606 12.3552 2.39386 11.8852 1.96419C11.4153 1.53453 10.8306 1.31969 10.1311 1.31969C9.60656 1.31969 9.10929 1.46292 8.63934 1.74936C8.1694 2.03581 7.83607 2.40409 7.63934 2.85422H6.32787C6.15301 2.40409 5.8306 2.03581 5.36066 1.74936C4.89071 1.46292 4.38251 1.31969 3.83607 1.31969C3.13661 1.31969 2.55738 1.53453 2.09836 1.96419C1.63934 2.39386 1.40984 2.93606 1.40984 3.59079C1.40984 4.06138 1.51913 4.52685 1.7377 4.98721C1.95628 5.44757 2.36612 5.98465 2.96721 6.59847C3.56831 7.21228 4.11475 7.73913 4.60656 8.17903C5.09836 8.61893 5.86885 9.289 6.91803 10.1893L6.98361 10.2506L7.04918 10.1893Z"
                fill="#D3D3D3"
              />
            </svg>
          </div>
          <div
            v-if="isAdded"
            class="card-added-btn-container cursor-pointer"
            style="background: #d1ffdb"
            @click="onClickAdd"
          >
            <img src="/checkMarkSuccess.svg" alt="add" />
          </div>
          <div v-else class="card-add-btn-container cursor-pointer" @click="onClickAdd">
            <img src="/plus.svg" alt="add" class="card-add-btn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 210px;
  padding: 19px;
}

.card-img {
  height: 114px;
  margin-bottom: 30px;
  max-width: none;
  object-fit: contain;
}

.card-title {
  font-size: 12px;
  margin-bottom: 12px;
}

.card-price {
  font-size: 14px;

  &-title {
    font-size: 11px;
    color: #bdbdbd;
  }
}

.card-favorite-btn-container,
.card-add-btn-container,
.card-added-btn-container,
.card-favorited-btn-container {
  border: 1px solid #f3f3f3;
  border-radius: 7px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.card-added-btn-container,
.card-favorited-btn-container {
  border: none;
}

.card-like-btn {
  width: 14px;
  height: 13px;
}

.card-add-btn {
  width: 11px;
  height: 11px;
}
</style>
