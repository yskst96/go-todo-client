<template>
    <div class="bg-blue-200">
        <div>componentA</div>
        <div>
            <div>Foo</div>
            <div>{{ state.foo }}</div>
            <button @click="addFoo">add foo</button>
            <div></div>
            <button @click="addFooA">add fooA</button>
        </div>
        <div>
            <div>Bar</div>
            <div>{{ state.bar }}</div>
            <button @click="addBar">add bar</button>
        </div>
        <div class="bg-blue-400">
            <ComponentC></ComponentC>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ComponentC from '@/components/sample/componentC.vue'
import { useSample } from '@/hooks/sample'
export default defineComponent({
    components: { ComponentC },
    setup() {
        const { state, addFoo, addBar } = useSample()

        // これでもグローバル更新されるので安全でない
        const addFooA = () => {
            state.foo++
        }

        return {
            state,
            addFoo,
            addBar,
            addFooA
        }
    }
})
</script>
