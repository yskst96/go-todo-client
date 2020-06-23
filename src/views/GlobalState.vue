<template>
    <div class="p-4">
        <CompA></CompA>
        <hr />
        <CompB></CompB>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CompA from '@/components/sample/componentA.vue'
import CompB from '@/components/sample/componentB.vue'

export default defineComponent({
    components: { CompA, CompB },
    async setup() {
        //
    }
})
</script>
<style lang="postcss" scoped></style>
