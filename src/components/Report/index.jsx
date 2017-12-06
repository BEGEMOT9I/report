// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TABLE_FIELDS } from '../../lib/constants'
import { getData } from '../../lib/actions/data'
import { getEntries } from './selectors'
import classes from './styles.scss'

type Props = {
  entries: Array<Object> | typeof undefined,
  getData: () => void
}
type State = {
  entriesCount: number,
  page: number,
  sort?: {
    desc: boolean,
    key: string
  }
}

class Report extends Component<Props, State> {
  filteredEntries: Array<Object>
  entriesCountList: Array<number>
  inputElement: HTMLInputElement

  constructor(props) {
    super(props)

    this.entriesCountList = [5, 10, 20, 50, 100]
    this.state = {
      entriesCount: this.entriesCountList[0],
      page: 1
    }
  }

  componentDidMount() {
    this.props.getData()
  }

  selectEntriesCount = (event: SyntheticInputEvent<*>) => {
    const { entries } = this.props
    const { page } = this.state
    const value = +event.target.value
    const newPage = entries && value * page >= entries.length ? 1 : page

    this.setState({
      entriesCount: value,
      page: newPage
    })

    this.inputElement.value = newPage.toString()
  }

  getShownEntries() {
    const { entries } = this.props
    const { entriesCount, page, sort } = this.state
    const beginIndex = (page - 1) * entriesCount
    const endIndex = (page - 1) * entriesCount + entriesCount

    let shownEntries = (entries || []).slice(beginIndex, endIndex)

    if (sort) {
      const sign = sort.desc ? -1 : 1
      const { key: fieldKey } = sort

      shownEntries = shownEntries.sort((a, b) => {
        if (+a[fieldKey] < +b[fieldKey]) {
          return -1 * sign
        }
        if (+a[fieldKey] > +b[fieldKey]) {
          return 1 * sign
        }
        return 0
      })
    }

    return shownEntries
  }

  getPaginationArray(page, beginIndex, entriesLength, entriesCount) {
    const maxLength = 7
    const endPage = Math.floor(entriesLength / entriesCount) + 1
    const firstPage = 1

    let result = []

    if (endPage <= maxLength) {
      for (let i = firstPage; i <= endPage; i++) {
        result.push(i)
      }
    } else {
      result.push(1)

      if (page < maxLength - 1) {
        for (let i = 2; i < maxLength - 1; i++) {
          result.push(i)
        }
        result.push('...')
        result.push(endPage)
      } else if (page > endPage - (maxLength - 2)) {
        result.push('...')
        for (let i = endPage - (maxLength - 2) + 1; i <= endPage; i++) {
          result.push(i)
        }
      } else {
        result.push('...')
        for (let i = page; i <= page + (maxLength - 4); i++) {
          result.push(i)
        }
        result.push('...')
        result.push(endPage)
      }
    }

    return result
  }

  getResults(entries) {
    const entriesLength = entries.length
    let results = {}

    entries.forEach(entry =>
      Object.keys(entry).forEach(fieldKey => {
        if (fieldKey !== 'time') {
          if (results[fieldKey]) {
            results[fieldKey] += +entry[fieldKey]
          } else {
            results[fieldKey] = +entry[fieldKey]
          }
        }
      })
    )

    TABLE_FIELDS.forEach(field => {
      if (field.avg) {
        const result = +results[field.key] / entriesLength
        results[field.key] = +(+result).toFixed(2)
      }
    })

    return results
  }

  sort = fieldKey => {
    const { sort } = this.state

    let desc = true

    if (sort) {
      if (sort.key === fieldKey) {
        desc = !sort.desc
      }
    }

    this.setState({ sort: { key: fieldKey, desc } })
  }

  selectPage = (event: SyntheticInputEvent<*>) => {
    const { entries } = this.props
    const { entriesCount } = this.state
    const value = event.target.value

    if (
      /^\d*$/.test(value) &&
      +value > 0 &&
      entries &&
      (+value - 1) * entriesCount < entries.length
    ) {
      this.setState({ page: +value })
    }
  }

  render() {
    const { entries } = this.props
    const { entriesCount, page } = this.state
    const beginIndex = (page - 1) * entriesCount
    const endIndex = (page - 1) * entriesCount + entriesCount
    const entriesLength = entries ? entries.length : 0
    const shownEntries = this.getShownEntries()
    const paginationArray = this.getPaginationArray(
      page,
      beginIndex,
      entriesLength,
      entriesCount
    )
    const pageResults = this.getResults(shownEntries)
    const summaryResults = this.getResults(entries || [])

    return (
      <div className={classes.wrapper}>
        <span className={classes.entriesCountPhrase}>
          Show{' '}
          <select
            className={classes.entriesCountList}
            value={entriesCount}
            onChange={this.selectEntriesCount}
          >
            {this.entriesCountList.map(count => (
              <option key={`count-${count}`} value={count}>
                {count}
              </option>
            ))}
          </select>{' '}
          entries
        </span>
        <div className={classes.tableWrapper}>
          <table className={classes.table}>
            <thead className={classes.head}>
              <tr>
                {TABLE_FIELDS.map(field => (
                  <th key={field.key}>
                    <button
                      className={classes.sortButton}
                      type="button"
                      onClick={() => this.sort(field.key)}
                    >
                      {field.name}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={classes.body}>
              {!!shownEntries &&
                shownEntries.map((entry, index) => (
                  <tr key={`row-${index}`} className={classes.row}>
                    {Object.keys(entry).map(key => (
                      <td key={key}>{entry[key]}</td>
                    ))}
                  </tr>
                ))}
              <tr className={classes.rowResult}>
                <td>TOTAL ON PAGE</td>
                {Object.keys(pageResults).map(key => (
                  <td key={`page-result-${key}`}>{pageResults[key]}</td>
                ))}
              </tr>
              <tr className={classes.rowResult}>
                <td>TOTAL</td>
                {Object.keys(summaryResults).map(key => (
                  <td key={`summary-result-${key}`}>{summaryResults[key]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.footer}>
          <span className={classes.fromToEntries}>
            Show {beginIndex + 1} to {Math.min(endIndex, entriesLength)} of{' '}
            {entriesLength} entries
          </span>
          <div className={classes.selectPage}>
            <label htmlFor="goto" className={classes.selectPageText}>
              Goto page #:
            </label>
            <input
              id="goto"
              className={classes.selectPageField}
              type="number"
              ref={element => {
                if (element) {
                  this.inputElement = element
                }
              }}
              onChange={this.selectPage}
              title="Go to page number #"
            />
          </div>
          <div className={classes.pagination}>
            <button
              className={classes.pageNumberPrev}
              type="button"
              value={page - 1}
              disabled={page < 2}
              onClick={this.selectPage}
            >
              Previous
            </button>
            {paginationArray.map(
              pageNumber =>
                typeof pageNumber === 'number' ? (
                  <button
                    key={`pag-${Math.random()}`}
                    className={
                      page === pageNumber
                        ? classes.pageNumberActive
                        : classes.pageNumber
                    }
                    type="button"
                    value={pageNumber}
                    onClick={this.selectPage}
                  >
                    {pageNumber}
                  </button>
                ) : (
                  <span
                    key={`pag-${Math.random()}`}
                    className={classes.pageNumberEllipsis}
                  >
                    {pageNumber}
                  </span>
                )
            )}
            <button
              className={classes.pageNumberNext}
              type="button"
              value={page + 1}
              disabled={page > Math.floor(entriesLength / entriesCount)}
              onClick={this.selectPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  entries: getEntries(state)
})

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Report)
