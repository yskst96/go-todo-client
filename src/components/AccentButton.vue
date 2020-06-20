<template>
    <div>
        <button
            class="w-40 mx-2 my-2 px-3 py-4 border-none rounded font-bold cursor-pointer accent paragraph"
        >
            <slot></slot>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<style lang="postcss" scoped>
.button {
    color: #172c66;
}
</style>
