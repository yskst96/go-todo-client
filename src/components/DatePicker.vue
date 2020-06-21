<template>
    <div>
        <div :class="picker"></div>
        <input
            type="text"
            class="bg-white w-4/5 h-8 border-solid border-2 border-blue-900 rounded-lg"
            :value="dispDate"
            readonly
            @click="open"
        />
    </div>
</template>
<script>
import 'simplepicker/dist/simplepicker.css'
import SimplePicker from 'simplepicker'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

export default {
    props: {
        value: { required: true, type: String },
        picker: { required: true, type: String }
    },
    data() {
        return {
            date: null,
            datepicker: null
        }
    },
    computed: {
        dispDate() {
            if (!this.value) return ''
            return dayjs(this.value).format('YYYY/MM/DD HH時')
        }
    },
    mounted() {
        dayjs.locale('ja')
        this.datepicker = new SimplePicker(`#${this.key}`, { zIndex: 10 })

        this.datepicker.on('submit', date => {
            const d = dayjs(date).format('YYYYMMDDHH')

            this.$emit('input', d)
        })
    },
    methods: {
        open() {
            if (this.value) {
                this.datepicker.reset(
                    dayjs(this.value, { format: 'YYYYMMDDHH' }).toDate()
                )
            }

            console.log('open', this.value)

            this.datepicker.open()
        }
    }
}
</script>
