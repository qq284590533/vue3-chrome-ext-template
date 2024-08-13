<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="hello">{{ msg }}</h1>
  <button type="button" @click="count++">count is {{ count }}</button>
</template>

<style lang="scss" scoped>
button {
  border: 1px;
  background: gray;
  padding: 5px;
  border-radius: 5px;
}
</style>
