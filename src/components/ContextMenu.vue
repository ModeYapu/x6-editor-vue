<template>
    <div class="context-menu" :style="{'top':xyPoint.y,left:xyPoint.x}">
        <div v-if="ChoiceType==='node'">
            <span @click="()=>{
                CopyPoint=params.point
                $emit('copyCells')
            }">
                <IconFont type="icon-copy"></IconFont>复制
            </span>
            <span @click="$emit('deleteCells')">
                <IconFont type="icon-remove"></IconFont>删除
            </span>
        </div>
        <div v-if="ChoiceType==='edge'">
            <span @click="$emit('deleteCells')">
                <IconFont type="icon-remove"></IconFont>删除
            </span>
        </div>
        <div v-if="ChoiceType==='blank'">
            <span @click="$emit('onUndo')">
                <IconFont type="icon-undo"></IconFont>撤销
            </span>
            <span @click="$emit('onRedo')">
                <IconFont type="icon-redo"></IconFont>恢复
            </span>
            <span @click="pasteCells">
                <IconFont type="icon-pasteHere"></IconFont>粘贴
            </span>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../eventBus";
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: require('../assets/font_1518433_oa5sw7ezue.js'),
})

export default {
    components: {
        IconFont: IconFont
    },
    props: ['point', 'menu'],
    data() {
        return {
            xyPoint: {},
            ChoiceType: '',
            CopyPoint: {},
            params: {},

        }
    },


    computed: {
        ContentMenu() {
            return { ...this.menu }
        },
    },

    mounted() {
        EventBus.$on('xypoint', (params) => {
            this.xyPoint = {
                x: params.x + 'px',
                y: params.y + 'px'
            }
            this.ChoiceType = params.type
            this.params = params
            console.log('params', this.params)
        })

        document.addEventListener('click', () => {
            this.ChoiceType = ''
        })

    },

    methods: {
        pasteCells() {
            const offset = { dx: this.params.point.x - this.CopyPoint.x, dy: this.params.point.y - this.CopyPoint.y }
            this.$emit('pasteCells', offset)
            this.CopyPoint = this.params.point
        }

    }
}

</script>
<style lang='less' scoped>
.context-menu {
    position: absolute;
    z-index: 999;


    div {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

        i {
            padding: 5px 12px 5px 0;
            // font-size: 18px;
        }

        span {
            display: block;
            height: 31px;
            line-height: 31px;
            width: 80px;
            text-align: center;
            font-size: 14px;
            color: #000;
            cursor: pointer;
        }

        span:hover {
            background-color: #d9ecff;
        }
    }


}
</style>