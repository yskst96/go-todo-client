import { reactive, toRefs, ToRefs } from 'vue'

type State = { foo: number; bar: string }

//グローバルState的にもてる
let state: State

export const useSample = () => {
    if (!state) {
        state = reactive({ foo: 10, bar: 'xxx' })
    }

    const addFoo = () => {
        state.foo++
    }

    const addBar = () => {
        state.bar = state.bar + 'x'
    }

    return { state: state as Readonly<State>, addFoo, addBar }
}
