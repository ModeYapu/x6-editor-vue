<template>
    <div>
        <ToolbarButton @onUndo='onUndo' @onRedo="onRedo" @copyCells='copyCells' @pasteCells="pasteCells"
            @deleteCells='deleteCells' @zoonIn="zoonIn" @zoonOut="zoonOut" @toFront="toFront" @toBack="toBack"
            @fitToContent="fitToContent" @scaleContentToFit="scaleContentToFit" @multiple="multiple"
            @showJson="showJson" @showDesigner="showDesigner" @save="save" />
        <ContextMenu @onUndo='onUndo' @onRedo="onRedo" @copyCells='copyCells' @pasteCells="pasteCells"
            @deleteCells='deleteCells' />
        <div class="x6-wrapper" :key="key">
            <div id="x6-slider"></div>
            <div v-show="!ShowJsonViewer" id="x6-container"></div>
            <div v-show="ShowJsonViewer" id="json-view-container">
                <CodeMirror :code='DataJson' @code="codeChange" />
            </div>
            <div id="x6-props-minimap" v-if="!ShowJsonViewer">
                <ContextProps />
                <div id="minimap-container"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Graph } from '@antv/x6';
import data from './data'
import './Register/index'
import { stencilInit } from './Stencil/Stencil'
import CodeMirror from './CodeMirror.vue'
import ContextMenu from './ContextMenu.vue'
import ContextProps from './ContextPorps/index.vue'
import ToolbarButton from './EditorToolbar/ToolbarButton.vue';
import { eventResigner } from './event'

import { exportJson, importJson } from '../utils/utils'
import Vue from 'vue';
export default {
    components: {
        CodeMirror,
        ContextMenu,
        ContextProps,
        ToolbarButton
    },
    data() {
        return {
            graph: null,
            state: {
                canRedo: false,
                canUndo: false,
            },
            ShowJsonViewer: false,
            DataJson: '',
            copyCellPoint: {},
            key: 0
        }
    },


    computed: {},

    mounted() {
        this.graphInit()
        this.graph.fromJSON(importJson(data))
    },

    methods: {
        graphInit() {
            this.graph = new Graph({
                container: document.getElementById('x6-container'),
                width: 800,
                height: 600,
                autoResize: true,
                // 画布是否可以拖动
                panning: { enabled: true, eventTypes: ['leftMouseDown'], },
                snapline: true, // 对齐线
                history: true,  // 撤销/重做
                clipboard: true, // 剪切板
                // 点选/框选
                selecting: {
                    enabled: true,
                    // multiple: true,
                    // rubberband: true,
                    showNodeSelectionBox: true,
                },
                // 快捷键
                keyboard: {
                    enabled: true,
                    global: true,
                },
                minimap: {
                    enabled: true,
                    container: document.getElementById('minimap-container'),
                },
                background: {
                    color: '#fff', // 设置画布背景颜色
                },
                grid: {
                    size: 10,      // 网格大小 10px
                    visible: false, // 渲染网格背景
                },
                // 滚动画布
                scroller: {
                    enabled: false,
                    pageVisible: true,
                    pageBreak: true,
                    pannable: true,
                },
                mousewheel: {
                    enabled: true,
                    modifiers: ['ctrl', 'meta'],
                    minScale: 0.5,
                    maxScale: 2,
                },
                connecting: {
                    // 连线
                    allowPort: true, // 是否允许边链接到链接桩
                    allowEdge: false, // 是否允许边链接到另一个边
                    allowNode: false, // 是否允许边链接到节点（非节点上的链接桩)
                    allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
                    allowMulti: false, // 是否允许在相同的起始节点和终止之间创建多条边
                    allowBlank: false, // 是否允许连接到画布空白位置的点
                    highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
                    snap: {
                        radius: 50,
                    }, // 自动吸附
                    // router: {
                    //     name: 'orth',
                    // }
                }
            });

            Vue.prototype.graph = this.graph
            stencilInit(this.graph)

            eventResigner(this.graph)


            this.history = this.graph.history

            this.history.on('change', () => {
                this.state.canRedo = this.history.canRedo()
                this.state.canUndo = this.history.canUndo()
            })

            this.graph.bindKey('ctrl+c', () => {
                this.copyCells()
            })

            this.graph.bindKey('ctrl+v', () => {
                this.pasteCells()
            })
            this.docAddEventListener()
        },
        docAddEventListener() {
            document.addEventListener('mousedown', this.switchPanning)
        },
        switchPanning() {
            this.graph.enablePanning()
            this.graph.disableMultipleSelection()
            this.graph.disableRubberband()
        },
        removeEventListener() {
            document.removeEventListener('mousedown', this.switchPanning)
        },
        onUndo() {
            this.history.undo()
        },

        onRedo() {
            this.history.redo()
        },

        save() {
            const gData = this.graph.toJSON()
            console.log('gData', gData)
            exportJson(gData)

            console.log('exportJson', exportJson(gData))
        },

        fitToContent() {
            this.graph.fitToContent({
                minWidth: this.graph.options.width,
                minHeight: this.graph.options.height,
                padding: 10,
            })
        },

        scaleContentToFit(options = {}) {
            this.graph.scaleContentToFit(options)
        },
        showJson() {
            // this.key += 1        
            this.ShowJsonViewer = true
            this.removeEventListener()
            const jsonStr = JSON.stringify(exportJson(this.graph.toJSON()))
            this.DataJson = JSON.stringify(JSON.parse(jsonStr), null, 2)
            this.graph.dispose()
        },
        codeChange(params) {
            this.codeChangeJson = importJson(JSON.parse(params))
            localStorage.setItem('codeChangeJson', JSON.stringify(this.codeChangeJson))
        },
        showDesigner() {

            this.ShowJsonViewer = false
            this.$nextTick(() => {
                this.graphInit()
                this.$nextTick(() => {
                    this.graph.fromJSON(this.codeChangeJson)
                })
            })
        },

        toFront() {
            let cells = this.graph.getSelectedCells()
            cells.forEach(item => {
                item.toFront()
            });
        },
        toBack() {
            let cells = this.graph.getSelectedCells()
            cells.forEach(item => {
                item.toBack()
            });
        },
        copyCells() {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.copy(cells)
            }
            return false
        },
        pasteCells(offset = { dx: 32, dy: 32 }) {
            if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: offset })
                this.graph.cleanSelection()
                this.graph.select(cells)
            }
            return false
        },
        deleteCells() {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                cells.forEach(it => { it.remove() })
            }
            return false
        },
        zoonIn() {
            this.graph.zoom(-0.2)
        },
        zoonOut() {
            this.graph.zoom(0.2)
        },
        multiple() {
            this.graph.disablePanning()
            this.graph.enableMultipleSelection()
            this.graph.enableRubberband()
        }
    }
}

</script>
<style lang='less' scoped>
.x6-wrapper {
    display: flex;
}

#x6-slider {
    height: 100vh;
    width: 200px;
    position: relative;
}


#json-view-container {
    height: 100vh;
    flex: 1;
}

#x6-container {
    height: 100vh !important;
    flex: 1;
}

#x6-props-minimap {
    width: 248px;
}
</style>