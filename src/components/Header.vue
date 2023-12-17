<script setup>
import { convertPrice } from '@/helpers/convertPrice.js'

defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200">
    <router-link to="/">
      <div class="flex items-center gap-3">
        <img src="/logo.svg" alt="logo" class="w-10" />
        <div>
          <h2 class="header-title font-bold uppercase">Quantum Qomponents</h2>
          <p class="header-slogan font-extralight">Где инновации становятся реальностью</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-5 select-none">
      <li class="cursor-pointer">
        <router-link to="/favorites">
          <svg
            width="20"
            height="18"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1311 0C11.224 0 12.1421 0.347826 12.8852 1.04348C13.6284 1.73913 14 2.58824 14 3.59079C14 4.08184 13.8907 4.57801 13.6721 5.07928C13.4536 5.58056 13.2131 6.02558 12.9508 6.41432C12.6885 6.80307 12.2459 7.30435 11.623 7.91816C11 8.53197 10.4754 9.02813 10.0492 9.40665C9.62295 9.78517 8.93989 10.3632 8 11.1407L6.98361 12L5.96721 11.1714C5.04918 10.3734 4.37158 9.78517 3.93443 9.40665C3.49727 9.02813 2.96721 8.53197 2.34426 7.91816C1.72131 7.30435 1.27869 6.80307 1.01639 6.41432C0.754098 6.02558 0.519126 5.58056 0.311475 5.07928C0.103825 4.57801 0 4.08184 0 3.59079C0 2.58824 0.371585 1.73913 1.11475 1.04348C1.85792 0.347826 2.76503 0 3.83607 0C5.10382 0 6.15301 0.460358 6.98361 1.38107C7.81421 0.460358 8.86339 0 10.1311 0ZM7.04918 10.1893C8.12022 9.289 8.90164 8.61893 9.39344 8.17903C9.88525 7.73913 10.4262 7.21228 11.0164 6.59847C11.6066 5.98465 12.0164 5.44757 12.2459 4.98721C12.4754 4.52685 12.5902 4.06138 12.5902 3.59079C12.5902 2.93606 12.3552 2.39386 11.8852 1.96419C11.4153 1.53453 10.8306 1.31969 10.1311 1.31969C9.60656 1.31969 9.10929 1.46292 8.63934 1.74936C8.1694 2.03581 7.83607 2.40409 7.63934 2.85422H6.32787C6.15301 2.40409 5.8306 2.03581 5.36066 1.74936C4.89071 1.46292 4.38251 1.31969 3.83607 1.31969C3.13661 1.31969 2.55738 1.53453 2.09836 1.96419C1.63934 2.39386 1.40984 2.93606 1.40984 3.59079C1.40984 4.06138 1.51913 4.52685 1.7377 4.98721C1.95628 5.44757 2.36612 5.98465 2.96721 6.59847C3.56831 7.21228 4.11475 7.73913 4.60656 8.17903C5.09836 8.61893 5.86885 9.289 6.91803 10.1893L6.98361 10.2506L7.04918 10.1893Z"
              fill="#9B9B9B"
            />
          </svg>
        </router-link>
      </li>
      <li
        id="cart"
        @click="() => emit('openDrawer')"
        class="header-link transition flex items-center gap-3 text-zinc-700 font-semibold cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <span>{{ convertPrice(totalPrice) }}</span>
      </li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: 40px 60px;

  @media (max-width: 1040px) {
    padding: 20px 30px;
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}

.header-title {
  font-size: 20px;
  color: #6f6cf5;
  line-height: 20px;

  @media (max-width: 420px) {
    font-size: 16px;
  }
}

.header-slogan {
  font-size: 14px;
  color: #9b9b9b;

  @media (max-width: 420px) {
    font-size: 13px;
  }
}

.header-link {
  &:hover {
    color: #000000;
  }
}
</style>
