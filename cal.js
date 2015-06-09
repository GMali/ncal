var daysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthsLabels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var currentDate = new Date(); 

function Calendar(month, year) {
	this.month  = (isNaN(month) || month == null) ? currentDate.getMonth()    : month;
	this.year   = (isNaN(year)  || year == null)  ? currentDate.getFullYear() : year;
}

Calendar.prototype.getTitle = function() {
	return monthsLabels[this.month] + ' ' + this.year;
};

Calendar.prototype.getArray = function() {
	var firstDay = new Date(this.year, this.month, 1);
	var startingDay = firstDay.getDay();
	var monthLength = daysInMonth[this.month];
	if (this.month == 1 && ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0)) {
		monthLength = 29;
	}
	var arr = [], labels = [], day = 1;
	for (var i = 0; i < 9; i++) {
		var week = [];
		for (var j = 0; j <= 6; j++) { 
			if (day <= monthLength && (i > 0 || j >= startingDay)) {
				week.push((day < 10 ? ' ' : '') + day.toString());
				day++;
			} else {
				week.push('');
			}
		}
		arr.push(week);
		if (day > monthLength) {
			break;
		}
	}
	return arr;
}

module.exports = Calendar;
