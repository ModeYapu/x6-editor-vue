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
// flow-polyline-round
// flow-polyline
// flow-smooth

const flowPolyline = Shape.Edge.define({
  attrs: {
    line: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
    }
  },
  router: {
    name: 'orth',
  },
})

const flowPolylineRound = Shape.Edge.define({
  attrs: {
    line: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
    }
  },
  connector: 'rounded',
  router: {
    name: 'orth',
  },
})
const flowSmooth = Shape.Edge.define({
  attrs: {
    line: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16'
    }
  },
  connector: 'smooth',
})

export { flowEdge, flowPolyline, flowPolylineRound, flowSmooth }
