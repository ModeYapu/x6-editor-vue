import { EventBus } from "../../eventBus";
import { CellType } from '../../utils/utils'
import { ColorConfig } from '../Register/colorConfig'

EventBus.$on('selectionChanged', (params) => {
    const added = params.added
    const removed = params.removed
    const selected = params.selected
    console.log('selected', added, removed, selected, CellType)
    detailAdded(added)
    detailRemoved(removed)
})

function detailAdded(cells) {
    cells.forEach(cell => {
        if (CellType(cell) === 'node') {
            cell.setAttrs({
                body: { fill: ColorConfig[cell.getProp('stateType')].color },
            })
        } else {
            cell.setAttrs({
                line: { stroke: '#b64ee1', strokeWidth: 4 },
            })
        }
    });
}

function detailRemoved(cells) {
    cells.forEach(cell => {
        if (CellType(cell) === 'node') {
            cell.setAttrs({
                body: { fill: ColorConfig[cell.getProp('stateType')].fill },
            })
        } else {
            cell.setAttrs({
                line: { stroke: '#F6BD16', strokeWidth: 2 },
            })
        }
    });
}