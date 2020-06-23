<template>
    <div>
        <div>componentC</div>
        <div>
            <div>Foo</div>
            <div>{{ state.foo }}</div>
            <button @click="addFoo">add foo</button>
        </div>
        <div>
            <div>Bar</div>
            <div>{{ state.bar }}</div>
            <button @click="addBar">add bar</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useSample } from '@/hooks/sample'
export default defineComponent({
    setup() {
        const { state, addFoo, addBar } = useSample()

        return {
            state,
            addFoo,
            addBar
        }
    }
})
</script>
