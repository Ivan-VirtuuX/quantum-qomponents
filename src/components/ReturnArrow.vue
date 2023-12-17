<script setup>
const emit = defineEmits(['closeDrawer'])
</script>

<template>
  <div
    class="return-arrow-container flex items-center justify-center cursor-pointer"
    @click="emit('closeDrawer')"
  >
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 11L1 6L6 1"
        stroke="#C8C8C8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.return-arrow-container {
  width: 32px;
  height: 32px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  svg {
    path {
      transition: all 0.2s ease-in-out;
    }
  }

  &:hover {
    border: 1px solid #afafaf;

    &.return-arrow-container {
      svg {
        path {
          stroke: #afafaf;
        }
      }
    }
  }
}
</style>
