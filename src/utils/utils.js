import { portProps } from '../components/Register/define-node'
import { ColorConfig } from '../components/Register/colorConfig'

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
            fill: ColorConfig[node.stateType].fill,
            stroke: ColorConfig[node.stateType].stroke
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
* @param {Object} data json??????
* @param {String} file ?????????
* @return:
*/
const saveJSON = (data, filename) => {
    if (!data) {
        alert("?????????????????????");
        return;
    }
    if (!filename) filename = "json.json";
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
    }
    // ??????????????? blob ??????
    let blob = new Blob([data], { type: "text/json" }),
        a = document.createElement("a");
    a.download = filename;

    // ???blob???????????????
    // ?????? URL ??? Blob ??????
    a.href = window.URL.createObjectURL(blob);
    console.log(blob, "??????", a.href);

    // ?????? data- ?????????????????????  ???????????????????????????
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    console.log(a, "dataset", a.dataset.downloadurl);

    // ??????????????????
    let event = new MouseEvent("click", {});
    console.log("??????", event);

    // ????????????????????????????????????????????????
    a.dispatchEvent(event);
}

export const CellType = (cell) => {
    return Object.prototype.toString.call(cell) === '[object X6.Node]' ? 'node' : 'edge'
}

export const showPorts = (node, show) => {
    node.getPorts().forEach(element => {
        node.setPortProp(element, ['attrs', 'circle'], { visibility: show ? 'visible' : 'hidden' })
    });
}

export {
    exportJson,
    importJson,
    saveJSON
}