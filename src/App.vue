<script setup>
import { ref } from 'vue';
import options from "../mocks/select.js";

const current = ref('');
const input = (value) => {
  current.value = value.title;
}
</script>

<template>
  <section>
    <v-select
        :value="current"
        :options="options"
        label="title"
        title="Выберите значение"
        @input="input"
    />
    <v-table />
  </section>
</template>

<style scoped>

</style>
