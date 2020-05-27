import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// 謎の型エラーがでる(betaだから？)
// @ts-ignore
createApp(App)
  .use(router)
  .mount("#app");
