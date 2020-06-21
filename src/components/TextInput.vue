<template>
    <div>
        <input
            type="text"
            :value="value"
            @input.stop="handleInput"
            @keyup.enter="enter"
        />
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

        const enter = (event: HTMLElementEvent<HTMLInputElement>) => {
            console.log('enter', event.target.value)
            context.emit('enter', event.target.value)
        }

        return { handleInput, enter }
    }
})
</script>
<style scoped>
input {
    width: 80%;
    border: solid 2px #001858;
    height: 32px;
    border-radius: 8px;
}
</style>
