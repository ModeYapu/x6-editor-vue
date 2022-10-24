
import { EventBus } from "../eventBus";

export const eventResigner = (graph) => {
    graph.on('edge:mouseenter', ({ cell }) => {
        cell.addTools([
            {
                name: 'vertices',
                args: {
                    snapRadius: 0,
                    stopPropagation: false
                }
            },
            { name: 'source-arrowhead' },
            { name: 'target-arrowhead' }
        ])
    })
    graph.on('edge:mouseleave', ({ cell }) => {
        cell.removeTools()
    })


    graph.on('cell:contextmenu', ({ e, x, y, cell, view }) => {
        console.log('cell:contextmenu', e, x, y, cell, view, Object.prototype.toString.call(cell))
        const type = Object.prototype.toString.call(cell) === '[object X6.Node]' ? 'node' : 'edge'
        EventBus.$emit('xypoint', { x: e.clientX, y: e.clientY, type: type, point: { x, y } })
        graph.resetSelection(cell)
    })

    graph.on('blank:contextmenu', ({ e, x, y }) => {
        console.log('cell:contextmenu', e, x, y)
        EventBus.$emit('xypoint', { x: e.clientX, y: e.clientY, type: 'blank', point: { x, y } })
    })

}