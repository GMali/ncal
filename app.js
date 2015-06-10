var blessed = require('blessed');
var cal = require('./cal');

var screen = blessed.screen({
	autoPadding: true,
	smartCSR: true
});

screen.title = 'ncal';

var mycal = new cal();

var table = new blessed.table({
	width:           29,
	height:          13,
	noCellBorders:   true,
	tags:            true,
	label:           mycal.getTitle(),
	border:          'line',
	style: {
		border: {
			fg: 'brightblack'
		},
	},
});

table.setData(mycal.getArray());

screen.append(table);

screen.key(['Up'], function(ch, key) {
	
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

screen.render();
