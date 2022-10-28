
import { EventBus } from "../eventBus";
import { CellType } from '../utils/utils'

export const eventResigner = (graph) => {
    graph.on('node:selected', (args) => {
        // code here
        // console.log('select args', args)
        EventBus.$emit('selectParams', { ...args, type: 'node' })
    })
    graph.on('edge:selected', (args) => {
        // code here
        console.log('select args', args)
        EventBus.$emit('selectParams', { ...args, type: 'edge' })
    })

    graph.on('blank:click', (args) => {
        EventBus.$emit('selectParams', { ...args, type: '' })
    })

    graph.on('cell:contextmenu', ({ e, x, y, cell }) => {
        const type = CellType(cell)
        EventBus.$emit('xypoint', { x: e.clientX, y: e.clientY, type: type, point: { x, y } })
        graph.resetSelection(cell)
    })

    graph.on('blank:contextmenu', ({ e, x, y }) => {
        EventBus.$emit('xypoint', { x: e.clientX, y: e.clientY, type: 'blank', point: { x, y } })
    })

    graph.on('selection:changed', (args) => {
        EventBus.$emit('selectionChanged', args)
    })
}