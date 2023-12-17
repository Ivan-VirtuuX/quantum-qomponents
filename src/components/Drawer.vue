<script setup>
import axios from 'axios'

import { computed, inject, ref } from 'vue'

import { vOnClickOutside } from '@vueuse/components'

import DrawerList from '@/components/DrawerList.vue'
import DrawerHead from '@/components/DrawerHead.vue'
import InfoBlock from '@/components/InfoBlock.vue'

import { convertPrice } from '../helpers/convertPrice.js'

const { totalPrice } = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const isOrderCreating = ref(false)
const orderId = ref(null)

const { cart, closeDrawer } = inject('cart')

const createOrder = async () => {
  try {
    isOrderCreating.value = true
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.warn(err)
  } finally {
    isOrderCreating.value = false
  }
}

const isCartEmpty = computed(() => cart.value.length === 0)
const isButtonDisabled = computed(() => isOrderCreating.value || isCartEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50" />
  <div
    v-on-click-outside="closeDrawer"
    class="bg-white w-96 h-full fixed right-0 top-0 z-20 drawer-container flex flex-col"
  >
    <DrawerHead />
    <div
      class="drawer-body flex flex-col flex-1 overflow-y-auto"
      :class="!totalPrice && 'justify-center'"
    >
      <div v-if="!totalPrice || orderId">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          image-url="/images/cartEmpty.png"
          title="Корзина пустая"
          description="Добавьте хотя бы один товар, чтобы сделать заказ"
          :width="120"
        />
        <InfoBlock
          v-if="orderId"
          image-url="/images/orderPlaced.png"
          title="Заказ оформлен!"
          :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
          :width="83"
        />
      </div>
      <DrawerList v-if="totalPrice" />
    </div>
    <div v-if="totalPrice" class="flex-2 pt-2">
      <div class="flex">
        <span>Итого:</span>
        <div class="flex-1 border-b border-zinc-300 border-dashed mx-2 mb-1.5"></div>
        <span class="font-semibold">{{ convertPrice(totalPrice + vatPrice) }}</span>
      </div>
      <div class="flex mt-4">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-zinc-300 border-dashed mx-2 mb-1.5"></div>
        <span class="font-semibold">{{ convertPrice(vatPrice) }}</span>
      </div>
      <button
        :disabled="isButtonDisabled"
        @click="createOrder"
        class="order-btn mt-5 w-full font-bold text-xl flex items-center justify-center cursor-pointer transition"
      >
        Оформить заказ
        <svg
          class="arrow-right"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 8H15"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.3125 2L15 8L9.3125 14"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer-container {
  padding: 30px;
  border-radius: 20px 0 0 20px;

  @media (max-width: 400px) {
    width: 100%;
    border-radius: 20px;
  }
}

.order-btn {
  position: relative;
  background: #6f6cf5;
  color: #fff;
  border-radius: 15px;
  padding: 15px 0;

  &:hover {
    background: #827ff9;
  }

  &:disabled {
    background: #b4b1e0;
  }
}

.arrow-right {
  position: absolute;
  right: 30px;
}

.drawer-body {
  &::-webkit-scrollbar {
    background: #e5e5e5 !important;
    width: 7px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bebebe !important;
    border-radius: 10px;
  }
}
</style>
