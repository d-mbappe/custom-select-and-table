import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseTable from "@/components/ui/BaseTable.vue";

import '@/assets/scss/main.scss';


const app = createApp(App);

app.component('v-select', BaseSelect);
app.component('v-table', BaseTable);

app.mount('#app');
