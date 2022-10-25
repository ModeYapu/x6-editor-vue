import { portProps } from '../components/Register/define-node'

const exportJson = (json) => {
    let obj = {
        nodes: json.cells.filter(it => it.shape !== 'edge').map(node => { return detailNode(node) }),
        edges: json.cells.filter(it => it.shape === 'edge').map(edge => { return detailEdge(edge) })
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
    obj.shape = edge.edge
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
            stroke: "rgba(250, 140, 22, 1)"
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

    obj.shape = "edge"
    obj.connector = connectorObj[edge.shape] || edge.connector || 'smooth'
    obj.vertices = []
    return obj
}

const connectorObj = {
    'flow-polyline': 'normal',
    'flow-polyline-rounded': 'rounded'
}

export {
    exportJson,
    importJson
}