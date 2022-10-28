import { portProps } from '../components/Register/define-node'

const exportJson = (json) => {
    console.log('jsno', json)
    let obj = {
        nodes: json.cells.filter(it => it.type === 'node').map(node => { return detailNode(node) }),
        edges: json.cells.filter(it => it.type !== 'node').map(edge => { return detailEdge(edge) })
    }
    return obj
}

function detailNode(node) {
    let obj = {}
    const nkey = ['id', 'shape', 'stateId', 'stateType', 'stateProps', 'zIndex']
    for (const key of nkey) {
        obj[key] = node[key]
    }

    obj.label = node.attrs.text.text
    obj.color = node.attrs.body.fill
    obj.size = `${node.size.width}*${node.size.height}`
    obj.type = 'node'
    obj.x = node.position.x
    obj.y = node.position.y
    return obj
}

function detailEdge(edge) {
    let obj = {}
    const nkey = ['id', 'stateProps', 'zIndex']
    for (const key of nkey) {
        obj[key] = edge[key]
    }

    obj.source = edge.source.cell
    obj.sourceAnchor = edge.source.port

    obj.target = edge.target.cell
    obj.targetAnchor = edge.target.port
    obj.shape = edge.shape
    obj.connector = edge.connector
    if (edge.labels && edge.labels.length) {
        obj.label = edge.labels[0].attrs.text.text
    }
    return obj
}
const importJson = (json) => {
    let nodes = json.nodes.map(node => detailImportNode(node))
    let edges = json.edges.map(edge => detailImportEdge(edge))
    let obj = {
        cells: [...nodes, ...edges]
    }
    return obj
}


function detailImportNode(node) {
    let obj = { ...portProps }
    const nkey = ['id', 'shape', 'stateId', 'stateType', 'stateProps', 'zIndex']
    for (const key of nkey) {
        obj[key] = node[key]
    }

    obj.attrs = {
        text: {
            text: node.label
        },
        body: {
            fill: node.color,
            // stroke: "rgba(250, 140, 22, 1)"
        }
    }
    obj.size = {
        width: Number(node.size.split('*')[0]),
        height: Number(node.size.split('*')[1])
    }
    obj.position = {
        x: node.x,
        y: node.y
    }
    obj.type = 'node'
    return obj
}

function detailImportEdge(edge) {
    let obj = {}
    const nkey = ['id', 'stateProps', 'zIndex']
    for (const key of nkey) {
        obj[key] = edge[key] ? edge[key] : null
    }
    obj.source = {
        cell: edge.source,
        port: edge.sourceAnchor,
    }

    obj.target = {
        cell: edge.target,
        port: edge.targetAnchor,
    }
    if (edge.label) {
        obj.labels = [{
            attrs: {
                text: {
                    text: edge.label
                }
            }
        }]
    }

    obj.shape = edge.shape || 'flow-smooth'

    return obj
}

/**
* @description:
* @param {Object} data json对象
* @param {String} file 文件名
* @return:
*/
const saveJSON = (data, filename) => {
    if (!data) {
        alert("保存的数据为空");
        return;
    }
    if (!filename) filename = "json.json";
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
    }
    // 要创建一个 blob 数据
    let blob = new Blob([data], { type: "text/json" }),
        a = document.createElement("a");
    a.download = filename;

    // 将blob转换为地址
    // 创建 URL 的 Blob 对象
    a.href = window.URL.createObjectURL(blob);
    console.log(blob, "链接", a.href);

    // 标签 data- 嵌入自定义属性  屏蔽后也可正常下载
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    console.log(a, "dataset", a.dataset.downloadurl);

    // 添加鼠标事件
    let event = new MouseEvent("click", {});
    console.log("事件", event);

    // 向一个指定的事件目标派发一个事件
    a.dispatchEvent(event);
}

export {
    exportJson,
    importJson,
    saveJSON
}