var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = [
    { days : 31, label : 'January'   },
    { days : 28, label : 'February'  },
    { days : 31, label : 'March'     },
    { days : 30, label : 'April'     },
    { days : 31, label : 'May'       },
    { days : 30, label : 'June'      },
    { days : 31, label : 'July'      },
    { days : 31, label : 'August'    },
    { days : 30, label : 'September' },
    { days : 31, label : 'October'   },
    { days : 30, label : 'November'  },
    { days : 31, label : 'December'  },
];

function Calendar(month, year) {
    var now = new Date();

    // Don't use `month || ...` here because month can be `0`.
    this.month = month === undefined ? now.getMonth() : month;
    this.year = year || now.getFullYear();

    // Days in February
    if (this.isLeapYear()) MONTHS[1].days = 29;
}

Calendar.prototype.getTitle = function() {
    return ' ' + MONTHS[this.month].label + ' ' + this.year + ' ';
};

Calendar.prototype.getMonthData = function() {
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = MONTHS[this.month].days;

    var monthData = [['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']];

    for (var i = 0, day = 1; day <= monthLength; i++) {

        var week = DAYS.map(function(value, index) {
            var label = '  ';
            if (day <= monthLength && (i > 0 || index >= startingDay)) {
                label = this.formatDay(day);
                day++;
            }
            return label;
        }.bind(this));

        monthData.push(week);
    }

    return monthData;
}

Calendar.prototype.isLeapYear = function() {
    return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
};

Calendar.prototype.isToday = function(day) {
    var now = new Date();
    return day === now.getDate() && this.month === now.getMonth();
};

Calendar.prototype.formatDay = function(day) {
    var label = this.isToday(day) ? '{underline}' + day + '{/underline}' : day.toString();
    return day < 10 ? ' ' + label : label;
};

module.exports = Calendar;
