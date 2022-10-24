<template>
    <div>
        <div>
            <button @click="onUndo">undo</button>
            <button @click="onRedo">redo</button>
            |
            <button @click="copyCells">copy</button>
            <button @click="pasteCells">paste</button>
            <button @click="deleteCells">delete</button>
            |
            <button @click="zoonIn">zoom In</button>
            <button @click="zoonOut">zoom Out</button>
            <button @click="toFront">toFront</button>
            <button @click="toBack">toBack</button>
            |
            <button @click="fitToContent">fitToContent
            </button>
            <button @click="scaleContentToFit">scaleContentToFit
            </button>

            <button @click="multiple">multiple</button>
            |
            <button @click="()=>{
                ShowJsonViewer=true
                showJson()
            }">showJson</button>
            <button @click="()=>{
                ShowJsonViewer=false  
                showDesigner()         
            }">showDesigner</button>
            |
            <button @click="save">save</button>
        </div>
        <ContextMenu @onUndo='onUndo' @onRedo="onRedo" @copyCells='copyCells' @pasteCells="pasteCells"
            @deleteCells='deleteCells' />
        <div class="x6-wrapper">
            <div id="x6-slider"></div>
            <div v-show="!ShowJsonViewer" id="x6-container"></div>
            <div v-show="ShowJsonViewer" id="json-view-container">
                <CodeMirror :code='DataJson' @code="codeChange" />
            </div>
            <div>
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
import { eventResigner } from './event'
import Vue from 'vue';
export default {
    components: {
        CodeMirror,
        ContextMenu,
        ContextProps
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

            copyCellPoint: {}
        }
    },


    computed: {},

    mounted() {
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
                snap: {
                    radius: 20,
                },
            }
        });
        Vue.prototype.graph = this.graph
        stencilInit(this.graph)

        eventResigner(this.graph)

        this.graph.fromJSON(data)

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

        // 控制连接桩显示/隐藏
        // const showPorts = (ports, show) => {
        //     for (let i = 0, len = ports.length; i < len; i = i + 1) {
        //         ports[i].style.visibility = show ? 'visible' : 'hidden'
        //     }
        // }
        // this.graph.on('node:mouseenter', () => {
        //     const container = document.getElementById('graph-container')
        //     const ports = container.querySelectorAll(
        //         '.x6-port-body',
        //     )
        //     showPorts(ports, true)
        // })
        // this.graph.on('node:mouseleave', () => {
        //     const container = document.getElementById('graph-container')
        //     const ports = container.querySelectorAll(
        //         '.x6-port-body',
        //     )
        //     showPorts(ports, false)
        // })


        document.addEventListener('mousedown', () => {
            this.graph.enablePanning()
            this.graph.disableMultipleSelection()
            this.graph.disableRubberband()
        })
    },

    methods: {
        onUndo() {
            this.history.undo()
        },

        onRedo() {
            this.history.redo()
        },

        save() {
            const gData = this.graph.toJSON()
            console.log('gData', gData)
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
            const jsonStr = JSON.stringify(this.graph.toJSON())
            this.DataJson = JSON.stringify(JSON.parse(jsonStr), null, 2)
        },
        codeChange(params) {
            console.log('codeChange', params)
            this.graph.fromJSON(JSON.parse(params))
        },
        showDesigner() {
            // this.graph.fromJSON()
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
</style>