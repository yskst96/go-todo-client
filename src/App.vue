<template>
    <div>
        <header></header>
        <Suspense>
            <template #default>
                <router-view></router-view>
            </template>
            <template #fallback>
                loading...
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<style>
/* テーマ
https://www.happyhues.co/palettes/17 */
html {
    background-color: #fef6e4;
    font-family: 'Sawarabi Gothic';
}
.headline {
    color: #001858;
}
.paragraph {
    color: #172c66;
}
.accent {
    background-color: #f582ae;
}
.secondary {
    background-color: #8bd3dd;
}

.illustration {
    background-color: #f3d2c1;
}

input:focus {
    outline: none;
}
textarea:focus {
    outline: none;
}
</style>
