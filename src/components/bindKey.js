import methods from "./Editor/methods"

export const bindKey = (graph) => {
    // 复制粘贴
    graph.bindKey('ctrl+c', () => {
        methods.copyCells()
    })

    graph.bindKey('ctrl+v', () => {
        methods.pasteCells()
    })

    // 删除
    graph.bindKey('delete', () => {
        methods.deleteCells()
    })
    graph.bindKey('backspace', () => {
        methods.deleteCells()
    })

    // 保存
    graph.bindKey('ctrl+s', () => {
        methods.save()
    })

    // 撤销 重做
    graph.bindKey('ctrl+z', () => {
        methods.onUndo()
    })
    graph.bindKey('ctrl+shift+z', () => {
        methods.onRedo()
    })
}
