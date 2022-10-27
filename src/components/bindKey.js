export const bindKey = (graph, that) => {
    // 复制粘贴
    graph.bindKey('ctrl+c', () => {
        that.copyCells()
    })

    graph.bindKey('ctrl+v', () => {
        that.pasteCells()
    })

    // 删除
    graph.bindKey('delete', () => {
        that.deleteCells()
    })
    graph.bindKey('backspace', () => {
        that.deleteCells()
    })

    // 保存
    graph.bindKey('ctrl+s', () => {
        that.save()
    })

    // 撤销 重做
    graph.bindKey('ctrl+z', () => {
        that.onUndo()
    })
    graph.bindKey('ctrl+shift+z', () => {
        that.onRedo()
    })
}
