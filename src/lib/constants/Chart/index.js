// @flow
import convertStringToDate from '../../convertStringToDate'

export const STYLES = {
  width: '100%',
  height: '500px',
  marginTop: '2rem'
}

export const DEFAULT_GRAPH_CONFIG = {
  id: 'g2',
  balloonText: '[[value]]',
  bullet: 'round',
  bulletBorderAlpha: 1,
  bulletColor: '#FFFFFF',
  lineThickness: 2,
  hideBulletsCount: 50,
  pointPosition: 'start',
  useLineColorForBulletBorder: true
}

export const GRAPH_CONFIG = {
  prev: {
    ...DEFAULT_GRAPH_CONFIG,
    lineColor: '#f00',
    legendValueText: 'Previous'
  },
  current: {
    ...DEFAULT_GRAPH_CONFIG,
    lineColor: '#148826',
    legendValueText: 'Current'
  }
}

export const LEFT_VALUES = {
  id: 'leftValues',
  axisAlpha: 1,
  dashLength: 1,
  position: 'left'
}

export const RIGHT_VALUES = {
  id: 'rightValues',
  axisAlpha: 1,
  axisColor: '#FAD872',
  dashLength: 1,
  position: 'right',
  minimum: 0,
  maximum: 1
}

export const OPTIONS = {
  type: 'serial',
  theme: 'light',
  syncDataTimestamps: true,
  autoMarginOffset: 0,
  marginTop: 7,
  valueAxes: [LEFT_VALUES, RIGHT_VALUES],
  chartCursor: {
    cursorPosition: 'start',
    categoryBalloonEnabled: false
  },
  categoryField: 'time',
  categoryAxis: {
    categoryFunction: function(category: string) {
      return convertStringToDate(category)
    },
    parseDates: true,
    centerLabelOnFullPeriod: false,
    minorGridEnabled: true,
    tickPosition: 'start',
    minPeriod: 'mm',
    axisColor: '#000000',
    axisThickness: 2,
    axisAlpha: 1,
    gridCount: 24
  },
  legend: {
    useGraphSettings: true,
    markerLabelGap: 10,
    align: 'center',
    switchable: false
  }
}
