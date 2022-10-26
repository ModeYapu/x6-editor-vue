<template>
    <div class="context-props">
        <div v-if="ChoiceType === 'node'">
            <div class="title">节点</div>
            <div class="from-content">
                <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="Label">
                        <a-input v-model="nodeArgs.label" @change="onChange('label')" />
                    </a-form-item>
                    <a-form-item label="Id">
                        <a-input v-model="nodeArgs.stateId" @change="onChange('stateId')" />
                    </a-form-item>
                    <a-form-item label="Type">
                        <a-input v-model="nodeArgs.stateType" @change="onChange('stateType')" readOnly />
                    </a-form-item>
                    <a-form-item label="Props">
                        <a-textarea :rows="12" v-model="nodeArgs.stateProps" @change="onChange('stateProps')" />
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div v-if="ChoiceType === 'edge'">
            <div class="title">边</div>
            <div class="from-content">
                <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="Label">
                        <a-input v-model="nodeArgs.label" @change="onChange('label')" />
                    </a-form-item>
                    <a-form-item label="Shape">
                        <a-select v-model="nodeArgs.edgeShape" @change="handleSelectChange">
                            <a-select-option value="flow-smooth">
                                Smooth
                            </a-select-option>
                            <a-select-option value="flow-polyline">
                                Polyline
                            </a-select-option>
                            <a-select-option value="flow-polyline-round">
                                Polyline Round
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Props">
                        <a-textarea :rows="12" v-model="nodeArgs.stateProps" @change="onChange('stateProps')" />
                    </a-form-item>

                </a-form>
            </div>
        </div>
        <div v-if="ChoiceType === 'blank'">

        </div>
    </div>
</template>

<script>
import { EventBus } from "../../eventBus";



export default {
    components: {

    },
    props: ['point'],
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
            params: {},
            ChoiceType: '',
            nodeArgs: {
                label: '',
                stateId: '',
                stateType: '',
                stateProps: '',
                edgeShape: ''
            },
        }
    },


    computed: {

    },

    mounted() {
        EventBus.$on('selectParams', (params) => {
            console.log('selectParams', params)
            this.ChoiceType = params.type
            if (params.type === 'node') {
                this.nodeArgs = {
                    label: params.node.store.data.attrs.text.text,
                    stateId: params.node.store.data.stateId,
                    stateType: params.node.store.data.stateType,
                    stateProps: JSON.stringify(params.node.store.data.stateProps, null, 2),
                }

            } else {
                this.nodeArgs = {
                    label: params.edge.store.data.labels ? params.edge.store.data.labels[0].attrs.text.text : '',
                    stateProps: params.edge.store.data.stateProps ? JSON.stringify(params.edge.store.data.stateProps, null, 2) : '',
                    edgeShape: params.edge.store.data.shape
                }
            }
        })
    },

    methods: {
        onChange(fromType) {
            let cells = this.graph.getSelectedCells()
            console.log('onChange', cells, fromType)
            if (this.ChoiceType === 'node') {
                if (fromType === 'label') {
                    cells[0].setAttrs({
                        // body: { fill: '#faad14' },
                        label: { text: this.nodeArgs.label },
                    })
                } else {
                    cells[0].setProp(fromType, fromType === 'stateProps' ? JSON.parse(this.nodeArgs[fromType]) : this.nodeArgs[fromType])
                }

            } else {
                if (fromType === 'label') {
                    cells[0].appendLabel({
                        attrs: {
                            text: {
                                text: this.nodeArgs.label,
                            },
                        },
                    })
                } else {
                    cells[0].setProp(fromType, fromType === 'stateProps' ? JSON.parse(this.nodeArgs[fromType]) : this.nodeArgs[fromType])
                }
            }
            // this.ChoiceType = ''
        },
        handleSelectChange(value) {
            let cells = this.graph.getSelectedCells()
            cells[0].setProp('shape', value)
            cells[0].removeRouter()
            this.$nextTick(() => {
                if (value === 'flow-polyline') {
                    cells[0].setRouter('orth')
                    cells[0].setConnector('normal')
                } else if (value === 'flow-polyline-round') {
                    cells[0].setRouter('orth')
                    cells[0].setConnector('rounded')
                } else if (value === 'flow-smooth') {
                    cells[0].setConnector('smooth')
                }
            })
        },
    }
}

</script>
<style lang='less' scoped>
.context-props {
    width: 100%;

    .title {
        padding: 8px 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px solid #e8e8e8;
        background: #fafafa;
    }

    .from-content {
        padding: 12px;
    }
}
</style>