import { createApp } from "vue";
import './styles/index.scss'
import App from "./App.vue";
import router from "./router";
import mylibs from '@/libs/index.js'
import derective from "@/directiove/index.js"
const app = createApp(App);

app.use(router);
app.mount("#app");
app.use(mylibs)
app.use(derective)
