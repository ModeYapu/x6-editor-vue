<template>
    <div>
        <codemirror v-model="codeStr" :options="cmOptions" @ready="onCmReady" @focus="onCmFocus" @blur="onCmBlur"
            @input="onCmInput" @scroll="onCmScroll"></codemirror>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

export default {
    components: {
        codemirror
    },
    props: ['code'],
    data() {
        return {
            cmOptions: {
                tabSize: 4,
                mode: 'application/json',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
            }
        }
    },


    computed: {
        codeStr: {
            get() {
                return this.code
            },
            set(val) {
                console.log(val)
            }

        }
    },

    mounted() {

    },

    methods: {
        onCmCursorActivity(a, b, c) {
            console.log('onCmCursorActivity', a, b, c)
        },
        onCmReady(a, b, c) {
            console.log('onCmReady', a, b, c)
        },
        onCmFocus(a, b, c) {
            console.log('onCmFocus', a, b, c)
        },
        onCmBlur(a, b, c) {
            console.log('onCmBlur', a, b, c)
        },
        onCmInput(code) {
            console.log('onCmInput', code)
            this.$emit('code', code)
        },
        onCmScroll() {
            console.log('onCmScroll')
        }
    }
}

</script>
<style lang='less'>
.CodeMirror {
    height: 100% !important;
}
</style>