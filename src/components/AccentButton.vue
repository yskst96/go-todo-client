<template>
    <div>
        <button class="button accent paragraph">
            <slot></slot>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<style scoped>
.button {
    padding: 12px 8px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    color: #172c66;
}
</style>
