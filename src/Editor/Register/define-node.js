import { Shape } from '@antv/x6'

const portProps = {
    ports: {
        groups: {
            group1: {
                position: 'top'
            },
            group2: {
                position: 'right'
            },
            group3: {
                position: 'bottom'
            },
            group4: {
                position: 'left'
            }
        },
        items: [
            {
                id: 0,
                group: 'group1' // 指定分组名称
            },
            {
                id: 1,
                group: 'group2' // 指定分组名称
            },
            {
                id: 2,
                group: 'group3' // 指定分组名称
            },
            {
                id: 3,
                group: 'group4' // 指定分组名称
            }
        ]
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                r: 2,
                magnet: true,
                stroke: '#1890ff',
                strokeWidth: 2,
                fill: '#fff',
                visibility:'hidden'
            },
        }
    ],
}

const flowRect = Shape.Rect.define({
    width: 160,
    height: 80,
    attrs: {
        body: {
            fill: '#adc6ff',
            stroke: '#2f54eb',
            lineWidth: 2,
            rx: 10
        }
    },
    type: 'node',
    ...portProps
})

const flowCircle = Shape.Circle.define({
    width: 80,
    height: 80,
    attrs: {
        body: {
            fill: '#ffe58f',
            stroke: '#faad14',
            lineWidth: 2,
            rx: 10
        }
    },
    type: 'node',
    ...portProps
})

const flowPolygon = Shape.Polygon.define({
    width: 80,
    height: 80,
    attrs: {
        body: {
            fill: '#efdbff',
            stroke: '#9254de',
            strokeWidth: 2,
            fillRule: 'nonzero',
        }
    },
    type: 'node',
    points: '0,10 10,0 20,10 10,20',
    ...portProps
})

const flowEllipse = Shape.Ellipse.define({
    width: 160,
    height: 80,
    attrs: {
        body: {
            fill: '#b7eb8f',
            stroke: '#52c41a',
            lineWidth: 2,
            rx: 10
        }
    },
    type: 'node',
    ...portProps
})

export { flowRect, flowCircle, flowPolygon, flowEllipse, portProps }