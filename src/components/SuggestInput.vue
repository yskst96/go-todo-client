<template>
    <div>
        <input type="text" :value="value" @input="onChange" />
        <div v-show="value" class="suggest">
            {{ items.filter(i => i.indexOf(value) != -1) }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue'
import { HTMLElementEvent } from '@/types/event'

export default defineComponent({
    props: {
        value: { type: String as PropType<string> },
        items: { type: Array as PropType<string[]> }
    },
    setup(props, context: SetupContext) {
        const onChange = (event: HTMLElementEvent<HTMLInputElement>) => {
            context.emit('input', { type: 'filter', value: event.target.value })
        }

        return { onChange }
    }
})
</script>
