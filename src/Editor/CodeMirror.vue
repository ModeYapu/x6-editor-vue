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
import 'codemirror/theme/juejin.css'

// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
// 高亮行功能
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'
import 'codemirror/mode/javascript/javascript'

export default {
    components: {
        codemirror
    },
    props: ['code'],
    data() {
        return {
            cmOptions: {
                tabSize: 4,
                mode: 'javascript',
                theme: 'juejin',
                lineNumbers: true,
                line: true,
                // 高亮行功能
                styleActiveLine: true,
                // 代码提示功能
                hintOptions: {
                    // 避免由于提示列表只有一个提示信息时，自动填充
                    completeSingle: false,
                },
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

.vue-codemirror {
    height: calc(100vh - 43px);
}

.cm-string {
    color: #a11 !important;
}

.cm-number {
    color: #164 !important;
}
</style>