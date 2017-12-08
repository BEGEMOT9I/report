// need plugin "transform-object-rest-spread"
import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/dashboard_header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import router from 'global/router';

import { Navigation } from 'react-router';
import { DateRange } from 'react-date-range';
import { MultipleSwitchGroup } from 'common/switch';
import { auto_color } from 'common/utils';

var self;

Date.prototype.to_str = function () {
  var year = this.getUTCFullYear()
  var month = this.getUTCMonth()
  var day = this.getUTCDate()

  return year + "-" + (((month + 1) < 10) ? "0" : "") + (month + 1) + "-" + ((day < 10) ? "0" : "") + day);
}

var INITIAL_STATE = {
  hosts: {
    // 'WEB': (window.localStorage.getItem('hosts_show_WEB') || 'true') == 'true',
    // 'iPhone': (window.localStorage.getItem('hosts_show_iPhone') || 'false') == 'true',
    // 'iPad': (window.localStorage.getItem('hosts_show_iPad') || 'false') == 'true',
    // 'Android': (window.localStorage.getItem('hosts_show_Android') || 'false') == 'true',
    // 'Mobile Web': (window.localStorage.getItem('hosts_show_Mobile Web') || 'true') == 'true',
    // 'White Label': (window.localStorage.getItem('hosts_show_White Label') || 'true') == 'true'
    'WEB': true,
    'iPhone': true,
    'iPad': true,
    'Android': true,
    'Mobile Web': true,
    'Other': true
  },
  columns: { // columns should go in the same order as they appear in the table
    'Srchs': true,
    'Clicks': true,
    'BC': true,
    'CBC': true,
    'PBC': true,
    'BTR': true,
    'CPC': true
  },
  is_loading: false,
  chart_error: false,
  chart_loading: true,
  loaded: false,
  show_datepicker: false,
  highlight_update_button: false,
  default_ranges: {
    'Today': {
      startDate: function startDate(now) {
        return now.startOf('day');
      },
      endDate: function endDate(now) {
        return now.startOf('day');
      }
    },

    'This Week': {
      startDate: function startDate(now) {
        return now.startOf('isoWeek');
      },
      endDate: function endDate(now) {
        return now.startOf('day');
      }
    },

    'This Month': {
      startDate: function startDate(now) {
        return now.startOf('month');
      },
      endDate: function endDate(now) {
        return now.startOf('day');
      }
    },

    'This Year': {
      startDate: function startDate(now) {
        return now.startOf('year');
      },
      endDate: function endDate(now) {
        return now.startOf('day');
      }
    },

    'Yesterday': {
      startDate: function startDate(now) {
        return now.startOf('day').add(-1, 'days');
      },
      endDate: function endDate(now) {
        return now.startOf('day').add(-1, 'days');
      }
    },

    'Last Week': {
      startDate: function startDate(now) {
        return now.startOf('isoWeek').add(-7, 'days');
      },
      endDate: function endDate(now) {
        return now.startOf('isoWeek').add(-1, 'days');
      }
    },

    'Last Month': {
      startDate: function startDate(now) {
        return now.startOf('month').add(-1, 'months');
      },
      endDate: function endDate(now) {
        return now.startOf('month').add(-1, 'days');
      }
    },

    'Last Year': {
      startDate: function startDate(now) {
        return now.startOf('year').add(-1, 'years');
      },
      endDate: function endDate(now) {
        return now.startOf('year').add(-1, 'days');
      }
    }
  }
};

var DATA_TABEL_CONFIG = {
  destroy: true,
  serverSide: true,
  responsive: true,
  lengthChange: true,
  searching: false,
  info: true,
  ordering: false,
  // deferRender: true,
  scrollX: '100%',
  fixedColumns: {
    leftColumns: 1,
  },
  columns: [
    { data: 'date' },
    { data: 'search_aviasales_searches' },
    { data: 'search_aviasales_clicks' },
    { data: 'search_aviasales_bc' },
    { data: 'search_aviasales_cbc' },
    { data: 'search_aviasales_pbc' },
    { data: 'search_aviasales_btr' },
    { data: 'search_aviasales_str' },
    { data: 'search_aviasales_cpc' },
    { data: 'iphone_aviasales_searches' },
    { data: 'iphone_aviasales_clicks' },
    { data: 'iphone_aviasales_bc' },
    { data: 'iphone_aviasales_cbc' },
    { data: 'iphone_aviasales_pbc' },
    { data: 'iphone_aviasales_btr' },
    { data: 'iphone_aviasales_str' },
    { data: 'iphone_aviasales_cpc' },
    { data: 'ipad_aviasales_searches' },
    { data: 'ipad_aviasales_clicks' },
    { data: 'ipad_aviasales_bc' },
    { data: 'ipad_aviasales_cbc' },
    { data: 'ipad_aviasales_pbc' },
    { data: 'ipad_aviasales_btr' },
    { data: 'ipad_aviasales_str' },
    { data: 'ipad_aviasales_cpc' },
    { data: 'android_aviasales_searches' },
    { data: 'android_aviasales_clicks' },
    { data: 'android_aviasales_bc' },
    { data: 'android_aviasales_cbc' },
    { data: 'android_aviasales_pbc' },
    { data: 'android_aviasales_btr' },
    { data: 'android_aviasales_str' },
    { data: 'android_aviasales_cpc' },
    { data: 'm_aviasales_searches' },
    { data: 'm_aviasales_clicks' },
    { data: 'm_aviasales_bc' },
    { data: 'm_aviasales_cbc' },
    { data: 'm_aviasales_pbc' },
    { data: 'm_aviasales_btr' },
    { data: 'm_aviasales_str' },
    { data: 'm_aviasales_cpc' },
    { data: 'wl_aviasales_searches' },
    { data: 'wl_aviasales_clicks' },
    { data: 'wl_aviasales_bc' },
    { data: 'wl_aviasales_cbc' },
    { data: 'wl_aviasales_pbc' },
    { data: 'wl_aviasales_btr' },
    { data: 'wl_aviasales_str' },
    { data: 'wl_aviasales_cpc' }
  ],
  stateSave: true,
  rowCallback: function(row, data, index) {
    var columns = this.api().context[0].aoColumns;
    for (var i in columns) {
      if (data.hasOwnProperty(columns[i].data + '_critical') && data.hasOwnProperty(columns[i].data + '_warning')) {
        if (data[columns[i].data + '_critical'] < data[columns[i].data + '_warning']) { // the less the worse
          if (data[columns[i].data] <= data[columns[i].data + '_critical']) {
            $('td:eq(' + i.toString() + ')', row).addClass('critical');
          }
        } else {
          if (data[columns[i].data] >= data[columns[i].data + '_critical']) {
            $('td:eq(' + i.toString() + ')', row).addClass('critical');
          }
        }
      }
      if (columns[i].data.match(/(_btr|_str|_cpc)/)) {
        $('td:eq(' + i.toString() + ')', row).html(data[columns[i].data].toFixed(2)); // BTR, STR, CPC are floats and should be rounded
      }
    }
  },
  sServerMethod: 'POST',
  drawCallback: function( settings ) {
    $('#pagination-goto-input')[0].disabled = false;
    $('#pagination-overlay-loading').hide();
    $('#pagination-goto').show();
    $('#pagination-goto-input').val(self.dTable.page()+1)
  }
};

var CHART_CONFIG = {
  "type": "serial",
  "theme": "none",
  "pathToImages": "//www.amcharts.com/lib/3/images/",
  "dataDateFormat": "YYYY-MM-DD",
  "legend": {
    "useGraphSettings": true,
    "align": "center",
    "valueWidth": 90
  },
  "valueAxes": [{
    "id": "percent",
    "axisAlpha": 0,
    "position": "right"
  }],
  "chartScrollbar": {
    "graph": "search_aviasales_str",
    "scrollbarHeight": 30
  },
  "chartCursor": {
    "categoryBalloonDateFormat": "MMM DD",
    "cursorPosition": "mouse",
    "pan": true,
    "valueLineEnabled": false,
    "valueLineBalloonEnabled": true
  },
  "categoryField": "date",
  "categoryAxis": {
    "parseDates": true,
    "dashLength": 1,
    "minorGridEnabled": true,
    "position": "top",
    "minPeriod": "DD"
  }
};

var DATA_RANGE_THEME = {
  Calendar : { width: 200 },
  MonthButton : { background: '#1ba6d2' },
  MonthArrowPrev : { borderRightColor: '#ffffff' },
  MonthArrowNext : { borderLeftColor: '#ffffff' },
  PredefinedRanges : { margin: 0, width: 400 },
  PredefinedRangeItem: { display: 'inline-block', width: 80, margin: 2, padding: 5, cursor: 'pointer', background: '#1ba6d2', color: '#ffffff' }
};

var Body = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    self = this;

    var now = new Date();
    var from = new Date(now - 1000*3600*24*10);
    var to = new Date(now - 1000*3600*24);

    this.dTable = null;

    return {
      ...INITIAL_STATE,
      timeframe: {
        text: 'Last 10 days',
        from: from.to_str(),
        to: to.to_str()
      },
    };
  },
  componentDidMount: function() {
    var token = window.localStorage.getItem('token');

    if (token == null) {
      window.location = '/login';
    } else {
      window.setTimeout(function(){
        self.updateTable(self.state.interval);
        self.updateChart();
        self.setState({
          is_loading: true,
          highlight_update_button: false
        });
      }, 1000);
    }
  },
  // TODO: delete
  /* changeFrom: function(e) {
    this.setState({
      timeframe:{
        from: e.target.value,
        to: this.state.timeframe.to,
      }
    })
  },
  changeTo: function(e) {
    this.setState({timeframe:{
      to: e.target.value,
      from: this.state.timeframe.from,
    }})
  }, */
  updateTable: function() {
    var data = {
      from: self.state.timeframe.from,
      to: self.state.timeframe.to,
      gate_id: window.superuser_gate_id
    };
    this.dTable = $('#gate-hosts-table')
      .addClass('nowrap')
      .DataTable({
        ...DATA_TABEL_CONFIG,
        ajax: {
          url: window.SERVER_URL + '/hosts',
          data: data,
          timeout: 300000,
          beforeSend: function(request) {
            mamka(
              'send_event',
              {
                'name': 'hosts_resolution_change', 
                'meta': { 'data': data }
              }
            );
            request.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('token'));
            var current_height = $('#gate-hosts-table_wrapper').height()
            $('#gate-hosts-table_wrapper').css('height', current_height + 'px');
            $('#gate-hosts-table_wrapper').append('<div id="gate-hosts-table-loading" style="position:absolute;top:0;left:0;right:0;bottom:0;font-size:50px;text-transform:uppercase;text-align:center;background-color:rgba(255,255,255,0.8);padding-top:' + Math.floor(current_height/2 - 30) + 'px;">Loading...</div>');
            $('#pagination-goto').hide();
          },
          complete: function(data) {
            $('#gate-hosts-table-loading').remove();
            $('#gate-hosts-table_wrapper').css('height', 'inherit');
            self.setState({
              loaded: true,
              is_loading: false
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            (new Image()).src = "//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=" + Math.random();
            $('#gate-hosts-table-loading').html('Error');
            try {
              if (JSON.parse(jqXHR.responseText).description == 'Token is expired') {
                self.transitionTo('/login');
              } else {
                self.setState({ chart_error: true })
                self.showError({ hideAfter: 5000 })
              }
            } catch (e) {
              self.setState({ chart_error: true })
              self.showError({ hideAfter: 5000 })
            }
          }
        },
      }).page(0);
    this.setState({
      show_datepicker: false,
      highlight_update_button: false,
      is_loading: true
    });
  },
  updateChart: function() {
    this.setState({
      chart_error: false,
      chart_loading: true
    })
    document.getElementById('chart-curtain').innerHTML = 'LOADING CHART...';
    var data = {
      from: this.state.timeframe.from,
      to: this.state.timeframe.to,
      gate_id: window.superuser_gate_id
    };
    $.ajax({
      url: window.SERVER_URL + '/hosts',
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: 300000, // 5 minutes
      beforeSend: function(request) {
        mamka(
          'send_event',
          {
            'name': 'hosts_resolution_change',
            'meta': { 'data': data }
          }
        );
        request.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('token'));
      },
      success: function(data) {
        if (data.data) {
          data.data = data.data.reverse();
          var graphs = [];
          var hosts = {
            'search_aviasales': 'web',
            'iphone_aviasales': 'iPhone',
            'ipad_aviasales': 'iPad',
            'android_aviasales': 'Android',
            'm_aviasales': 'mobile',
            'wl_aviasales': 'Other'
          };
          var i = 0;
          for (var host in hosts) {
            graphs.push({
              "valueAxis": "percent",
              "id": host + "_str",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": auto_color(6, i),
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "STR: " + hosts[host],
              "useLineColorForBulletBorder": true,
              "valueField": host + "_str",
              "lineColor": auto_color(6, i)
            });
            i = i + 1;
          }
          console.debug(data.data);
          var chart = AmCharts.makeChart(
            "line-chart",
            {
              ...CHART_CONFIG,
              graphs,
              dataProvider: data.data
            }
          );
          self.setState({
            chart_error: false,
            chart_loading: false,
            is_loading: false,
            loaded: true
          })
        } else {
          self.setState({
            chart_error: true,
            chart_loading: false
          })
          self.showError({ hideAfter: 5000 })
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        (new Image()).src = "//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS&rand=" + Math.random();
        try {
          if (JSON.parse(jqXHR.responseText).description == 'Token is expired') {
            self.transitionTo('/login');
          } else {
            self.setState({ chart_error: true })
            self.showError({ hideAfter: 10000000000 })
          }
        }
        catch (e) {
          self.setState({ chart_error: true })
          self.showError({ hideAfter: 10000000000 })
        }
      }
    });
  },
  updateTableAndChart: function(interval) {
    this.updateTable(interval);
    this.updateChart();
  },
  requestReport: function() {
    var data = {
      from: this.state.timeframe.from,
      to: this.state.timeframe.to,
      order_report: true,
      gate_id: window.superuser_gate_id
    };
    $.ajax({
      url: window.SERVER_URL + '/hosts',
      data: data,
      context: {
        from: this.state.timeframe.from,
        to: this.state.timeframe.to
      },
      type: 'POST',
      dataType: 'json',
      timeout: 10000,
      beforeSend: function(request) {
        mamka(
          'send_event',
          {
            'name': 'hosts_resolution_change',
            'meta': { 'data': data }
          }
        );
        request.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('token'));
      },
      success: function(data) {
        if (data.result == 'OK') {
          window.vex.dialog.alert('Your report is being prepared. You can see all prepared reports on <a target="_blank" href="/downloads">Downloads page</a>.');
        }
        else {
          window.vex.dialog.alert('Could not order report. Please try again.');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        (new Image()).src = "//metrics.aviasales.ru/?goal=BACKOFFICE_FAILED_REQUEST_HOSTS_ORDER_REPORT&rand=" + Math.random();
        try {
          if (JSON.parse(jqXHR.responseText).description == 'Token is expired') {
            self.transitionTo('/login');
          } else {
            window.vex.dialog.alert('Could not order report. Please try again.');
          }
        }
        catch (e) {
          window.vex.dialog.alert('Could not order report. Please try again.');
        }
      }
    });
  },
  changePageKeyPress: function(event) {
    if (event.key === 'Enter') {
      var target_page = parseInt(event.target.value) - 1;
      if (isNaN(target_page) || (target_page < 0)) {
        window.vex.dialog.alert('Wrong page number!');
      } else {
        this.dTable.page(target_page).draw(false);
        $('#pagination-goto-input')[0].disabled = true;
        // $('#pagination-overlay-loading').show();
        // $('#pagination-goto').hide();
      }
    }
  },
  hideCurtain: function() {
    this.setState({
      is_loading: false
    });
  },
  getTextFromRange: function(range) {
    var default_ranges = this.state.default_ranges;
    var text = '';
    for (var title in default_ranges) {
      if ((default_ranges[title].startDate(moment()).isSame(range.startDate)) && (default_ranges[title].endDate(moment()).isSame(range.endDate))) {
        text = title;
        break;
      }
    }
    if (text == '') {
      var isSameDay = moment(range.startDate).startOf('day').isSame(moment(range.endDate).startOf('day'))
      var isSameMonth = moment(range.startDate).startOf('month').isSame(moment(range.endDate).startOf('month'))

      if (moment().startOf('year').isSame(moment(range.startDate).startOf('year'))) {
        if (isSameDay) {
          text = range.startDate.format('D MMMM');
        }
        // interval is inside current year, so we don't have to show year
        else if (isSameMonth) {
          // interval is inside a month, so we show it in 'Jan 10 - 23' format
          text = range.startDate.format('D') + ' - ' + range.endDate.format('D MMMM');
        } else {
          text = range.startDate.format('Do MMM') + ' - ' + range.endDate.format('Do MMM');
        }
      } else {
        if (isSameDay) {
          text = range.startDate.format('D MMM YYYY');
        }
        else if (isSameMonth) {
          // inside one month - show as 14 - 30 October 2015
          text = range.startDate.format('D') + ' - ' + range.endDate.format('D MMMM YYYY');
        } else {
          text = range.startDate.format('D MMM YYYY') + ' - ' + range.endDate.format('D MMM YYYY');
        }
      }
    }
    return text;
  },
  rangeInit: function(range) {
    var text = this.getTextFromRange(range);
    this.setState(
      {
        timeframe: {
          text: text,
          from: range.startDate.format('YYYY-MM-DD'),
          to: range.endDate.format('YYYY-MM-DD')
        }
      }
    );
  },
  changeRange: function(range) {
    var text = this.getTextFromRange(range);
    this.setState(
      {
        timeframe: {
          text: text,
          from: range.startDate.format('YYYY-MM-DD'),
          to: range.endDate.format('YYYY-MM-DD')
        },
        highlight_update_button: true
      }
    );
  },
  showDatePicker: function() {
    if (this.state.show_datepicker) {
      this.setState({ show_datepicker: false });
    } else {
      this.setState({ show_datepicker: true });
    }
  },
  hideDatePicker: function() {
    this.setState({ show_datepicker: false });
  },
  showError: function(options) {
    Messenger({ extraClasses: 'messenger-fixed messenger-on-top messenger-on-right' }).post({
      id: 'error',
      type: 'error',
      singleton: false,
      message: 'Oops! Error while loading table data. Try to reload the whole page.',
      showCloseButton: true,
      hideAfter: options.hideAfter,
    });
  }
  render: function() {
    var {
      chart_loading,
      chart_error,
      timeframe,
      is_loading,
      loaded,
      default_ranges,
      highlight_update_button,
      show_datepicker,
      hosts
    } = this.state

    var styles = {
      containerStyle: {
        backgroundColor: is_loading ? '#ccc' : '#fff',
        paddingBottom: 0
      },
      titleRowStyle: {
        backgroundColor: '#1ba6d2',
        color:'white',
        height: 2,
        WebkitTransition: 'height 1s',
        transition: 'height 1s'
      },
      titleStyle: {
        textAlign: 'center',
        marginTop: 12,
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit',
        fontSize: 0,
        WebkitTransition: 'font-size 1s',
        transition: 'font-size 1s'
      },
      headerRowStyle: {
        backgroundColor: '#1ba6d2',
        color:'white',
        height: 40
      },
      maxWidthCenteredStyle: {
        width: '100%',
        textAlign: 'center',
        padding: '0 0 5px 0'
      },
      additionalTitle: {
        position: 'absolute',
        left: 30,
        top: 15,
        textTransform: 'uppercase',
        fontSize: 17
      },
      controlWrapStyle: {
        height: 40,
        width: 200,
        overflow: 'visible',
        position: 'relative',
        display: 'inline-block',
        margin: '0 10px 0 10px'
      },
      rangeStyle: {
        position: 'absolute',
        top: 2,
        left: 0,
        right: 0,
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 12,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontWeight: 400,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        WebkitTransition: 'all .2s',
        transition: 'all .2s'
      },
      closerOverlay: {
        display: show_datepicker ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 99998
      },
      labelStyle: {
        fontSize: 10,
        textAlign: 'center',
        bottom: 2,
        left: 0,
        right: 0,
        position: 'absolute',
        color: '#fff',
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit'
      },
      buttonStyleWrapper: {
        display: 'inline-block',
        position: 'relative',
        width: 200,
        height: 40
      },
      buttonStyle: {
        height: 30,
        width: 120,
        borderTop: '1px solid #faa760',
        borderRight: '1px solid #e16800',
        borderBottom: '1px solid #e16800',
        borderLeft: 0,
        fontSize: 17,
        lineHeight: '17px',
        margin: 0,
        borderRadius: 3,
        position: 'absolute',
        left: 0,
        top: 5,
        backgroundColor: '#fd8a27',
        color: '#fff',
        outline: 'none',
        cursor: 'pointer',
        opacity: 1,
        animation: highlight_update_button ? 'pulse 1s infinite' : is_loading ? 'pulse 0.5s infinite' : 'none',
        zIndex: 99999
      },
      downloadButtonStyleWrapper: {
        display: 'inline-block', 
        float: 'right', 
        position: 'relative', 
        height: 40, 
        marginRight: 40
      },
      downloadButtonStyle: {
        height: 20,
        width: 140,
        border: '1px solid #ffffff',
        fontSize: 12,
        lineHeight: '12px',
        margin: 0,
        borderRadius: 3,
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: 'transparent',
        color: '#ffffff',
        outline: 'none',
        cursor: 'pointer',
        opacity: 0.9,
        textAlign: 'center'
      },
      bigLoadingStyle: {
        position:'absolute',
        top: 67,left: 0,right: 0,bottom: 0,
        zIndex:10000,
        display: (is_loading || !loaded) ? 'block' : 'none',
        backgroundColor: '#ccc'
      },
      bigLoadingHeadlineStyle: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        WebkitTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
        fontSize: 50,
        WebkitFontSmoothing: window.devicePixelRatio > 1 ? 'antialiased' : 'inherit',
        textAlign: 'center',
        color: '#f0f0f0',
        textTransform: 'uppercase',
        margin: '0'
      },
      curtainStyle: {
        display: (chart_loading || chart_error) ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontSize: 40,
        lineHeight: '550px',
        color: '#BCF',
        textAlign: 'center'
      },
      lineChart: {
        width: '100%',
        height: 500,
        padding: '0 30px'
      },
      headCell: {
        textAlign: 'center',
        fontSize: 14
      },
      paginationLoader: {
        display: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative', 
        top: -34,
        zIndex: 100,
        fontSize: 14
      },
      pagination: {
        width: 160,
        marginLeft: 'auto', 
        marginRight: 'auto',
        position: 'relative',
        top: -40,
        zIndex: 100
      },
      paginationLabel: {
        fontSize: 14,
        display: 'inline-block',
        width: 200
      },
      paginationInput: {
        fontSize: 14,
        display: 'inline',
        width: 60
      }
    }

    return (
      <Container id='body' style={styles.containerStyle}>
        <Row style={styles.titleRowStyle}>
          <h1 style={styles.titleStyle}>
            BY HOSTS
          </h1>
        </Row>
        <Row style={styles.headerRowStyle}>
          <div style={styles.maxWidthCenteredStyle}>
            <h1 style={styles.titleAdditional} className='visible-lg visible-md'>By hosts</h1>
            <div style={styles.controlWrapStyle}>
              <div style={styles.rangeStyle} onClick={this.showDatePicker}>{timeframe.text}</div>
              <DateRange
                onInit={ this.rangeInit }
                onChange={ this.changeRange }
                linkedCalendars={ true }
                ranges={ default_ranges }
                startDate={ timeframe.from }
                endDate={ timeframe.to }
                format='YYYY-MM-DD'
                firstDayOfWeek={ 1 }
                theme={DATA_RANGE_THEME}
                style={{
                  visibility: show_datepicker ? 'visible' : 'hidden',
                  position: 'absolute',
                  top: 40,
                  width: 420,
                  zIndex: 100000
                }} />
              <div style={styles.closerOverlay} onClick={this.hideDatePicker} />
              <span style={styles.labelStyle}>Timeframe</span>
            </div>
            <div style={styles.buttonStyleWrapper}>
              <Button onClick={this.updateTableAndChart} style={styles.buttonStyle} className='button' disabled={is_loading}>
                {is_loading ? 'Loading...' : 'Update'}
              </Button>
            </div>
            <div style={styles.downloadButtonStyleWrapper}>
              <Button onClick={this.requestReport} style={styles.downloadButtonStyle} className='download-button'>
                Download CSV
              </Button>
            </div>
          </div>
        </Row>
        <Row id="curtain" onClick={this.hideCurtain} style={styles.bigLoadingStyle}>
          <h1 style={styles.bigLoadingHeadlineStyle}>
            {'Loading...'}
          </h1>
        </Row>
        <Row style={{visibility: loaded ? 'visible' : 'hidden'}}>
          <Col sm={12}>
            <div
              id="chart-curtain"
              onClick={this.hideCurtain}
              style={styles.curtainStyle}
            >
              {chart_error ? 'ERROR' : 'LOADING...'}
            </div>
            <div id="line-chart" style={styles.lineChart}></div>
          </Col>
        </Row>
        <Row style={{visibility: loaded ? 'visible' : 'hidden', position: 'relative', padding: '0 50px'}}>
          <Col sm={12}>
            <Table id='gate-hosts-table' className='display compact' cellSpacing='0' width='100%'>
              <thead>
                <tr>
                  <th rowSpan="2" style={{textAlign: 'center', background: 'white', cursor: 'default'}}>Date</th>
                  <th colSpan="8" style={styles.headCell}>WEB</th>
                  <th colSpan="8" style={styles.headCell}>iPhone</th>
                  <th colSpan="8" style={styles.headCell}>iPad</th>
                  <th colSpan="8" style={styles.headCell}>Android</th>
                  <th colSpan="8" style={styles.headCell}>Mobile Web</th>
                  <th colSpan="8" style={styles.headCell}>Other</th>
                </tr>
                <tr>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                  <th>Srchs</th>
                  <th>Clicks</th>
                  <th>BC</th>
                  <th>CBC</th>
                  <th>PBC</th>
                  <th>BTR</th>
                  <th>STR</th>
                  <th>CPC</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
            <div id="pagination-overlay-loading" style={styles.paginationLoader}>
              Loading...
            </div>
            <div id="pagination-goto" style={styles.pagination}>
              <Label style={styles.paginationLabel} >
                Goto page#:&nbsp;
                <Input id="pagination-goto-input" type="text" style={styles.paginationInput} onKeyPress={this.changePageKeyPress.bind(null)} />
              </Label>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
});

@SidebarMixin
export default class extends React.Component {
  render() {
    var { open } = this.props
    var classes = classNames({
      'container-open': open
    });

    return (
      <Container id='container' className={classes}>
        <Header />
        <Sidebar open={open} />
        <Body />
        <Footer />
      </Container>
    );
  }
}
