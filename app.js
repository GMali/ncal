var blessed = require('blessed');
var contrib = require('blessed-contrib');
var cal = require('./cal');

var screen = blessed.screen({
  autoPadding: false,
  smartCSR: true
});

screen.title = 'ncal';

var mycal = new cal();

var table = new contrib.table({
  border:        {type: "line"},
  fg:            'brightwhite',
  selectedBg:    'black',
  selectedFg:    'brightwhite',
  // width:         '100%',
  // height:        '100%',
  columnSpacing: 2,
  columnWidth:   [3,3,3,3,3,3,3],
  label:         mycal.getTitle(),
  keys:          true,
  interactive:   true,
});

screen.append(table);

table.setData({
  headers:       ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  data:          mycal.getArray(),
});

table.focus();

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();
