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
	border:          'line',
	style: {
		border: {
			fg: 'brightblack'
		},
	},
});

screen.append(table);

function doTable(cal) {
	table.setData(cal.getArray());
	table.setLabel(cal.getTitle());
	screen.append(table);
	screen.render();
}

screen.key(['down','left','j','h'], function(ch, key) {
	var prevmonth = mycal.month -1, year = mycal.year;
	if (prevmonth < 0 ) {
		prevmonth = 11; 
		year--;
	}
	mycal = new cal(prevmonth, year);
	doTable(mycal);
});

screen.key(['up','right','k','l'], function(ch, key) {
	var nextmonth = mycal.month +1, year = mycal.year;
	if (nextmonth > 11 ) {
		nextmonth = 0; 
		year++;
	}
	mycal = new cal(nextmonth, year);
	doTable(mycal);
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

doTable(mycal);
