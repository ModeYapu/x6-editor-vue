import { Graph } from '@antv/x6'
import { flowRect, flowCircle, flowPolygon, flowEllipse } from './define-node'
import { flowEdge, flowPolyline, flowPolylineRound, flowSmooth } from './define-edge'

Graph.registerNode('flow-rect', flowRect)
Graph.registerNode('flow-circle', flowCircle)
Graph.registerNode('flow-rhombus', flowPolygon)
Graph.registerNode('flow-ellipse', flowEllipse)

Graph.registerEdge('edge-flow', flowEdge)
Graph.registerEdge('flow-polyline-round', flowPolylineRound)
Graph.registerEdge('flow-polyline', flowPolyline)
Graph.registerEdge('flow-smooth', flowSmooth)