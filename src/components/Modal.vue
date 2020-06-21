<template>
    <div class="modal-overlay" :class="{ 'is-open': visible }" @click="close">
        <div
            class="modal-content illustration top-1/10 left-0 sm:left-2/5 rounded "
            @click.stop=""
        >
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    props: {
        visible: { type: Boolean as PropType<boolean> },
        close: { type: Function as PropType<() => void> }
    },

    setup() {
        //
    }
})
</script>
<style scoped>
.modal-content {
    z-index: 5;
    position: fixed;
    padding: 40px 64px;
}

.modal-overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-color: rgba(0, 0, 0, 0.75);
    visibility: hidden;
    opacity: 0;
}

.modal-overlay.is-open {
    opacity: 1;
    visibility: visible;
}
</style>
