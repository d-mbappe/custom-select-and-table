<script setup>
import { ref } from 'vue';
import data from "../../../mocks/table.js";

const sortedData = ref(data);
const sortedByASC = ref(false);
const currentSortColumn = ref('');

const columns = [
  { title: 'Номер', name: 'number'},
  { title: 'Девелопер ', name: 'developer'},
  { title: 'Срок', name: 'deadline'},
  { title: 'Тип', name: 'type'},
  { title: 'Этаж', name: 'floor'},
  { title: 'Площадь', name: 'square'},
]

/**
 * Универсальный callback для числовых и строковых значений
 * @param sortBy
 * @param ASC
 * @returns {(function(*, *): (*))|*}
 */
const sortCallback = (sortBy, ASC) => {
  return function (x, y) {
    /**
     * Сортировка чисел
     */
    if (typeof x[sortBy] === 'number') {
      console.log(sortBy)
      return ASC ? y[sortBy] - x[sortBy] : x[sortBy] - y[sortBy];
    }

    /**
     * Сортировка строк
     */
    const formattedX = x[sortBy].toLowerCase();
    const formattedY = y[sortBy].toLowerCase();

    return ASC ? (formattedX > formattedY ? -1 : 1) : (formattedX < formattedY ? -1 : 1);
  }
}
/**
 * Сортировка по колонкам
 * @param sortBy
 */
const sortList = (sortBy) => {
  /**
   * Проверка на переключение колонок для сброса формата сортировки до начального
   */
  if (currentSortColumn.value && currentSortColumn.value !== sortBy) {
    sortedByASC.value = false;
  }

  /**
   * Выбор сортировки по возрастанию и убыванию
   */
  if (sortedByASC.value) {
    sortedData.value.sort(sortCallback(sortBy, sortedByASC.value));
    sortedByASC.value = false;
  } else {
    sortedData.value.sort(sortCallback(sortBy, sortedByASC.value));
    sortedByASC.value = true;
  }
  currentSortColumn.value = sortBy;
}
</script>

<template>
  <div class="table">
    <div class="table__header">
      <table>
        <thead>
          <tr>
            <th
                v-for="(column, index) in columns"
                :key="`column-${index}`"
                @click="sortList(column.name)"
            >
              <span>{{ column.title }}</span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 6 5"
                  fill="none"
                  :class="{active : column.name === currentSortColumn}"
              >
                <path
                    opacity="0.3"
                    d="M3.43301 4.25L5.16506 1.25C5.35751 0.916667 5.11695 0.5 4.73205 0.5H1.26795C0.883049 0.5 0.642486 0.916666 0.834936 1.25L2.56699 4.25C2.75944 4.58333 3.24056 4.58333 3.43301 4.25Z"
                    stroke="#29277D"
                    stroke-linejoin="round"
                />
              </svg>
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="table__content">
      <table>
        <tbody>
          <tr v-for="(data, index) in sortedData" :key="`row-${index}`">
            <template v-for="(item, name, index) in data">
              <td
                  v-if="name !== 'id'"
                  :key="`item-${index}-${name}`"
              >
                {{ item }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
