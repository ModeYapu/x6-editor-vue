import { exportJson, saveJSON } from '../../utils/utils'
function onUndo() {
    this.history.undo()
}

function onRedo() {
    this.history.redo()
}
function save() {
    const gData = this.graph.toJSON()
    // exportJson(gData)
    saveJSON(exportJson(gData))
}

function fitToContent() {
    this.graph.fitToContent({
        minWidth: this.graph.options.width,
        minHeight: this.graph.options.height,
        padding: 10,
    })
}
function scaleContentToFit(options = {}) {
    this.graph.scaleContentToFit(options)
}
function toFront() {
    let cells = this.graph.getSelectedCells()
    cells.forEach(item => {
        item.toFront()
    });
}
function toBack() {
    let cells = this.graph.getSelectedCells()
    cells.forEach(item => {
        item.toBack()
    });
}
function copyCells() {
    const cells = this.graph.getSelectedCells()
    if (cells.length) {
        this.graph.copy(cells)
    }
    return false
}
function pasteCells(offset = { dx: 32, dy: 32 }) {
    if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: offset })
        this.graph.cleanSelection()
        this.graph.select(cells)
    }
    return false
}
function deleteCells() {
    const cells = this.graph.getSelectedCells()
    if (cells.length) {
        cells.forEach(it => { it.remove() })
    }
    return false
}
function zoonIn() {
    this.graph.zoom(-0.2)
}
function zoonOut() {
    this.graph.zoom(0.2)
}
function multiple() {
    this.graph.disablePanning()
    this.graph.enableMultipleSelection()
    this.graph.enableRubberband()
}

export default {
    onUndo, onRedo, save, scaleContentToFit, fitToContent, toFront, toBack, copyCells, pasteCells, deleteCells, zoonIn, zoonOut, multiple
}