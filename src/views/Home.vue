<template>
  <div>
    <button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    }) as { count: number; double: number };

    function increment() {
      state.count++;
    }

    return {
      state,
      increment
    };
  }
});
</script>
