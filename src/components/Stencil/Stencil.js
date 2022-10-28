import { Addon } from '@antv/x6';

export const stencilInit = (graph) => {
    const stencil = new Addon.Stencil({
        groups: [{ name: 'group1', title: '模块' }],
        layoutOptions: {
            columns: 1,
            columnWidth: 200,
            rowHeight: 100,
            dx: 0
        },
        target: graph,
        title: '',
        stencilGraphWidth: 200,
        stencilGraphHeight: 500
    })
    document.getElementById('x6-slider').appendChild(stencil.container)

    const Start = graph.createNode({
        shape: 'flow-circle',
        width: 72,
        height: 72,
        attrs: {
            body: {
                fill: '#fff3ea',  // #fdd594
                stroke: '#ffc26d',
                lineWidth: 2,
                rx: 10
            }
        },
        label: '开始',
        "stateId": "Start1",
        "stateType": "Start",
        "stateProps": {
            "StateMachine": {
                "Name": "",
                "Comment": "",
                "Version": "0.0.1"
            }
        },
    })
    const ServiceTask = graph.createNode({
        shape: 'flow-rect',
        width: 110,
        height: 48,
        attrs: {
            body: {
                fill: '#e8f8ff',  // #94d4fc
                stroke: '#1890ff',
                lineWidth: 2,
                rx: 10
            }
        },
        label: 'ServiceTask',
        "stateId": "ServiceTask1",
        "stateType": "ServiceTask",
        "stateProps": {
            "ServiceName": "",
            "ServiceMethod": "",
            "Input": [
                {}
            ],
            "Output": {},
            "Status": {},
            "Retry": []
        },
    })
    // const ScriptTask = graph.createNode({
    //     shape: 'flow-rect',
    //     width: 110,
    //     height: 48,
    //     attrs: {
    //         body: {
    //             fill: '#13C2C2',
    //             stroke: '#acebe8',
    //             lineWidth: 2,
    //             rx: 10
    //         }
    //     },
    //     label: 'ScriptTask',
    // })

    const Choice = graph.createNode({
        shape: 'flow-rhombus',
        width: 80,
        height: 72,
        attrs: {
            body: {
                fill: '#e7fefa',   // #89e7de
                stroke: '#80e3dd',
                lineWidth: 2,
                rx: 10
            }
        },
        label: 'Choice',
        "stateId": "Choice1",
        "stateType": "Choice",
        "stateProps": '',
    })

    // const Compensation = graph.createNode({
    //     shape: 'flow-rect',
    //     width: 110,
    //     height: 48,
    //     attrs: {
    //         body: {
    //             fill: '#722ED1',
    //             stroke: '#acebe8',
    //             lineWidth: 2,
    //             rx: 10
    //         }
    //     },
    //     label: 'Compensation',
    // })

    const Succeed = graph.createNode({
        shape: 'flow-circle',
        width: 72,
        height: 72,
        attrs: {
            body: {
                fill: '#cfe4d8',    // 6ac899
                stroke: '#6fca9e',
                lineWidth: 2,
                rx: 10
            }
        },
        label: '成功',
        "stateId": "Succeed1",
        "stateType": "Succeed",
        "stateProps": '',
    })

    // const Fail = graph.createNode({
    //     shape: 'flow-circle',
    //     width: 72,
    //     height: 72,
    //     attrs: {
    //         body: {
    //             fill: 'red',
    //             stroke: 'rgba(250, 140, 22, 1)',
    //             lineWidth: 2,
    //             rx: 10
    //         }
    //     },
    //     label: 'Fail',
    // })

    stencil.load([Start, ServiceTask, Choice, Succeed], 'group1')
}

