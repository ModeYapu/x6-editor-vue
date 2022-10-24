<template>
    <div class="context-props">
        <div v-if="ChoiceType==='node'">
            <h3>节点</h3>
            <div id="node-prop">
                Label: <input type="text" v-model="nodeArgs.label" @change="labelChange('label')" /> <br />
                Id: <input type="text" v-model="nodeArgs.stateId" @change="labelChange('stateId')" /> <br />
                Type: <input type="text" v-model="nodeArgs.stateType" @change="labelChange('stateType')" /> <br />
                Props: <textarea type="text" v-model="nodeArgs.stateProps" @change="labelChange('stateProps')" />
            </div>
        </div>
        <div v-if="ChoiceType==='edge'">
            <h3>边</h3>
            <div id="node-prop">
                Label: <input type="text" v-model="nodeArgs.label" @change="labelChange('label')" /> <br />
                Id: <input type="text" v-model="nodeArgs.stateId" @change="labelChange('stateId')" /> <br />
                Type: <input type="text" v-model="nodeArgs.stateType" @change="labelChange('stateType')" /> <br />
                Props: <textarea type="text" v-model="nodeArgs.stateProps" @change="labelChange('stateProps')" />
            </div>
        </div>
        <div v-if="ChoiceType==='blank'">

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
            params: {},
            ChoiceType: '',
            nodeArgs: {
                label: '',
                stateId: '',
                stateType: '',
                stateProps: ''
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
                    label: '',
                    stateProps: params.edge.store.data.stateProps,
                }
            }
        })
    },

    methods: {
        labelChange(fromType) {
            let cells = this.graph.getSelectedCells()
            console.log('labelChange', cells, fromType)
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
            this.ChoiceType = ''
        },
    }
}

</script>
<style lang='less' scoped>
.context-props {
    width: 300px;
}
</style>