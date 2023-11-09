<script setup>
import { ref } from 'vue';

const { value, options, label, title } = defineProps({
  value: String,
  options: {
    type: Array,
    default: () => []
  },
  label: String,
  title: String
})
const emit = defineEmits(['input']);

const open = ref(false);
const change = (value) => {
  open.value = false;
  emit('input', value);
}
</script>

<template>
  <div class="select" @blur="open = false">
    <span class="select__title" :class="{ active: value }">{{ title }}</span>
    <div
        class="select__body"
        :class="{ open: open, 'with-data': value && !open }"
        @click="open = !open"
    >
      {{ value }}
    </div>
    <div class="select__list" :class="{ hide: !open }">
      <div
          class="select__option"
          v-for="(option, index) of options"
          :key="`option-${index}`"
          @click="change(option)"
      >
        {{ label ? option[label] : option }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
