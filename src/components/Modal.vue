<template>
    <div v-show="visible">
        <div>モーダル</div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        console.log(props.visible)
    }
})
</script>
