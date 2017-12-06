// @flow
export const DEFAULT_GRAPH_CONFIG = {
  id: 'g2',
  balloonText: '[[value]]',
  bullet: 'round',
  bulletBorderAlpha: 1,
  bulletColor: '#FFFFFF',
  lineThickness: 2,
  hideBulletsCount: 50,
  pointPosition: 'start',
  useLineColorForBulletBorder: true,
  balloon: {
    drop: true
  }
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
