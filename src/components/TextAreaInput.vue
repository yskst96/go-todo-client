<template>
    <div>
        <textarea rows="5" :value="value" @input.stop="handleInput" />
    </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType } from 'vue'
import { HTMLElementEvent } from '@/types/event'

export default defineComponent({
    props: { value: { type: String as PropType<string> } },
    setup(_, context: SetupContext) {
        const handleInput = (event: HTMLElementEvent<HTMLInputElement>) => {
            const value = event.target.value
            context.emit('input', value)
        }

        return { handleInput }
    }
})
</script>
<style scoped>
textarea {
    border: solid 2px #001858;
    border-radius: 8px;
    width: 80%;
}
</style>
