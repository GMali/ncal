var blessed = require('blessed');
var cal = require('./cal');

var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true
});

screen.title = 'ncal';

var mycal = new cal();

var table = new blessed.table({
  // width:           screen.width,
  // height:          screen.height,
  width:           29,
  height:          13,
  // padding:         1,
  // pad:             0,
  noCellBorders:   true,
  // fillCellBorders: false,
  border:          'line',
  shadow:          true,
  label:           mycal.getTitle(),
  style: {
    border: {
      fg: 'brightblack'
    },
    header: {},
  },
});

table.setData(mycal.getArray());

screen.append(table);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();
