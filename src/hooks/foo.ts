//import axios from '@/util/axios'

import { ref } from 'vue'

const foo = ref('')

export async function useFoo() {
    const modifyFoo = (value: string) => {
        foo.value = value
    }

    return {
        foo,
        modifyFoo
    }
}
