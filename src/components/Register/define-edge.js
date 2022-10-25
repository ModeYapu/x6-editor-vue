import { Shape } from '@antv/x6'

Shape.Edge.config({
  attrs: {
    line: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
    }
  }
})

const flowEdge = Shape.Edge.define({
  attrs: {
    line: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
    }
  }
})

export { flowEdge }
