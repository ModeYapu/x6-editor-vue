import { Graph } from '@antv/x6'
import { flowRect, flowCircle, flowPolygon, flowEllipse } from './define-node'
import { flowEdge } from './define-edge'

Graph.registerNode('flow-rect', flowRect)
Graph.registerNode('flow-circle', flowCircle)
Graph.registerNode('flow-rhombus', flowPolygon)
Graph.registerNode('flow-ellipse', flowEllipse)

Graph.registerEdge('edge-flow', flowEdge)