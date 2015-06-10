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
	return  ' ' + monthsLabels[this.month] + ' ' + this.year + ' ';
};

Calendar.prototype.getArray = function() {
	var firstDay = new Date(this.year, this.month, 1);
	var startingDay = firstDay.getDay();
	var monthLength = daysInMonth[this.month];
	if (this.month == 1 && ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0)) {
		monthLength = 29;
	}
	var arr = [['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']];
	for (var i = 0, day = 1; day <= monthLength; i++) {
		var week = [];
		for (var j = 0; j <= 6; j++) { 
			var label = '  ';
			if (day <= monthLength && (i > 0 || j >= startingDay)) {
				label = day;
				if(day == currentDate.getDate() && this.month == currentDate.getMonth())
					label = '{underline}'+label+'{/underline}'
				label = (day < 10 ? ' '+label : label);
				day++;
			}
			week.push(label + ' ');
		}
		arr.push(week);
	}
	return arr;
}

module.exports = Calendar;
