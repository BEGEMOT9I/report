// @flow
import React, { Component } from 'react'

import { TABLE_FIELDS } from '../../lib/constants'
import { GRAPH_CONFIG } from '../../lib/constants/Chart'
import formatDate from '../../lib/formatDate'
import classes from './styles.scss'

const AmCharts = require('@amcharts/amcharts3-react')
const PARAMETERS = TABLE_FIELDS.filter(field => field.key !== 'time')

type Props = {
  entries: Array<Entry>
}

class Chart extends Component<Props> {
  groupedEntries: Object
  selectedDate: string
  prevDate: string
  selectedParameter: string

  constructor(props: Props) {
    super(props)

    this.groupedEntries = {}
    this.selectedDate = ''
    this.prevDate = ''
    this.selectedParameter = PARAMETERS[0].key
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.entries !== this.props.entries) {
      this.updateEntries(nextProps.entries)
    }
  }

  updateEntries(entries: Array<Entry>) {
    this.groupedEntries = {}

    entries.forEach(entry => {
      const date = new Date(entry.time)
      const beginOfDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )

      let day = []

      if (this.groupedEntries[beginOfDate]) {
        day = this.groupedEntries[beginOfDate]
        day.push(entry)
      } else {
        day = [entry]
      }

      this.groupedEntries[beginOfDate] = day.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      )
    })

    if (!this.selectedDate) {
      this.selectedDate = Object.keys(this.groupedEntries)[0]
    }
  }

  selectDate = (event: SyntheticInputEvent<*>) => {
    this.selectedDate = event.target.value

    const dates = Object.keys(this.groupedEntries).sort(
      (a, b) => new Date(a) - new Date(b)
    )
    const selectedDateIndex = dates.indexOf(this.selectedDate)

    this.prevDate = dates[selectedDateIndex - 1]

    this.forceUpdate()
  }

  selectParameter = (event: SyntheticInputEvent<*>) => {
    this.selectedParameter = event.target.value
    this.forceUpdate()
  }

  getGraph(nameConfig: string, valueField: string) {
    return {
      ...GRAPH_CONFIG[nameConfig],
      id: nameConfig,
      valueField
    }
  }

  getData() {
    if (!this.selectedDate) {
      return []
    }

    let result = this.formatGraphSeria(
      this.groupedEntries[this.selectedDate],
      'current'
    )

    if (this.prevDate) {
      const prevEntries = this.formatGraphSeria(
        this.groupedEntries[this.prevDate],
        'prev'
      )

      result = result.map((currentEntry, index) => ({
        ...currentEntry,
        ...prevEntries[index]
      }))
    }

    return result
  }

  formatGraphSeria(entries: Array<Entry>, prefix: string) {
    return entries.map(entry =>
      Object.keys(entry).reduce((resultEntry, currentFieldKey) => {
        resultEntry[
          currentFieldKey === 'time' ? 'time' : `${prefix}_${currentFieldKey}`
        ] =
          entry[currentFieldKey]
        return resultEntry
      }, {})
    )
  }

  render() {
    let graphs = [this.getGraph('current', `current_${this.selectedParameter}`)]

    if (this.prevDate) {
      graphs.push(this.getGraph('prev', `prev_${this.selectedParameter}`))
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerItem}>
            <label htmlFor="setDate">Select a date:&nbsp;</label>
            <select
              name="setDate"
              id="setDate"
              className={classes.headerSelect}
              value={this.selectedDate}
              onChange={this.selectDate}
            >
              {Object.keys(this.groupedEntries)
                .sort((a, b) => new Date(a) - new Date(b))
                .map(stringDate => {
                  const date = formatDate(new Date(stringDate))

                  return (
                    <option key={`date-${stringDate}`} value={stringDate}>
                      {date}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className={classes.headerItem}>
            <label htmlFor="setParameter">Select a parameter:&nbsp;</label>
            <select
              name="setParameter"
              id="setParameter"
              className={classes.headerSelect}
              value={this.selectedParameter}
              onChange={this.selectParameter}
            >
              {PARAMETERS.map(field => (
                <option key={`field-${field.key}`} value={field.key}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <AmCharts.React
          style={{
            width: '100%',
            height: '500px'
          }}
          options={{
            type: 'serial',
            theme: 'light',
            marginRight: 80,
            autoMarginOffset: 20,
            marginTop: 7,
            dataProvider: this.getData(),
            valueAxes: [
              {
                axisAlpha: 0.2,
                dashLength: 1,
                position: 'left'
              }
            ],
            graphs,
            chartCursor: {
              cursorPosition: 'start'
            },
            categoryField: 'time',
            categoryAxis: {
              categoryFunction: function(category) {
                return new Date(category)
              },
              parseDates: true,
              centerLabelOnFullPeriod: false,
              minorGridEnabled: true,
              tickPosition: 'start',
              minPeriod: 'hh',
              axisColor: '#000000',
              axisThickness: 2,
              axisAlpha: 1,
              gridCount: 24
            },
            legend: {
              useGraphSettings: true,
              align: 'center',
              switchable: false
            }
          }}
        />
      </div>
    )
  }
}

export default Chart
