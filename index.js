;(function(global) {

Date.prototype.getPickrDate = function(opts)     { return (opts && opts.utc) ? this.getUTCDate() : this.getDate(); };
Date.prototype.getPickrFullYear = function(opts) { return (opts && opts.utc) ? this.getUTCFullYear() : this.getFullYear(); };
Date.prototype.getPickrMonth = function(opts)    { return (opts && opts.utc) ? this.getUTCMonth() : this.getMonth(); };
Date.prototype.getPickrDay = function(opts)      { return (opts && opts.utc) ? this.getUTCDay() : this.getDay(); };

var Datepickr = (function() {
  var currentDate = new Date();
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var buildCache = [];
  var date = {
    current: {
      year: function(opts)  {
        return currentDate.getPickrFullYear(opts);
      },
      month: function(opts) {
        return currentDate.getPickrMonth(opts);
      },
      day: function(opts) {
        return currentDate.getPickrDate(opts);
      }
    },
    month: {
      string: function(month, months) {
        var date = month;
        return monthToStr(date, months);
      },
      numDays: function(month, year) {
        // Check to see if february is a leap year.
        // Otherwise, return the respective # of days.
        return (month === 1 && !(year & 3) &&
            (year % 1e2 || !(year % 4e2))) ?
          29 : daysInMonth[month];
      }
    }
  };

  function calendarClick(e) {
    var time = new Date(this.year, this.month).getTime();
    switch (e.target.getAttribute('data-target')) {
      case 'month-prev':
        if (this.config.minDate && time <= this.config.minDate) return;
        this.month--;
        if (this.month < 0) {
          this.year--;
          this.month = 11;
        }
        rebuildCalendar.call(this);
        break;
      case 'month-next':
        if (this.config.maxDate && time >= this.config.maxDate) return;
        this.month++;
        if (this.month > 11) {
          this.year++;
          this.month = 0;
        }
        rebuildCalendar.call(this);
        break;
      case 'day':
        var d = new Date(this.year, this.month, e.target.textContent).getTime();
        var c = e.target.classList;
        if (this.config.halfDay) {
          if (c.contains('halfday')) {
            c.remove('halfday');
            this.config.activeDays = this.config.activeDays.map(function(date) {
              if (date[0] === d) date[1] = 1;
              return date;
            });
          } else if (c.contains('active')) {
            c.remove('active', 'halfday');
            this.config.activeDays = this.config.activeDays.filter(function(date) {
              return date[0] !== d;
            });
          } else {
            c.add('active', 'halfday');
            this.config.activeDays.push([d, 0.5]);
          }
        } else {
          if (c.contains('active')) {
            c.remove('active', 'halfday');
            this.config.activeDays = this.config.activeDays.filter(function(date) {
              return date[0] !== d;
            });
          } else {
            if ( this.config.singleSelection ) {
              var daylinks = this.element.querySelectorAll('a');
              for (var i = 0; i < daylinks.length; i++) {
                daylinks[i].classList.remove('active', 'halfday');
              }
              this.config.activeDays = [[d, 1]];
            } else {
              this.config.activeDays.push([d, 1]);
            }
            c.add('active');
          }
        }

        this.config.activeDays.sort(function(a, b) {
          return a[0] - b[0];
        });

        this.callback(this.config.activeDays);
        break;
    }
  }

  function buildNode(nodeName, attributes, content) {
    if (!(nodeName in buildCache)) {
      buildCache[nodeName] = document.createElement(nodeName);
    }

    var element = buildCache[nodeName].cloneNode(false);

    if (attributes) {
      for (var attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
      }
    }

    if (content) {
      if (typeof content === 'object') {
        element.appendChild(content);
      } else {
        element.textContent = content;
      }
    }

    return element;
  }

  function monthToStr(date, months) {
    return months[date];
  }

  function roundDate(d) {
    return new Date(d.getPickrFullYear(this.config), d.getPickrMonth(this.config), d.getPickrDate(this.config));
  }

  function isToday(year, month, day) {
    return day === date.current.day(this.config) &&
      month === date.current.month(this.config) &&
      year === date.current.year(this.config);
  }

  function isPast(year, month, day) {
    return new Date(year, month, day).getTime() < new Date().getTime();
  }

  function isFuture(year, month, day) {
    return new Date(year, month, day).getTime() > new Date().getTime();
  }

  function isWeekend(year, month, day) {
    var d = new Date(year, month, day).getPickrDay(this.config);
    return d === 0 || d === 6;
  }

  function isOmitted(year, month, day) {
    var d = new Date(year, month, day).getTime(),
      is;
    if (this.config.omitDays.length) {
      this.config.omitDays.forEach(function(omitted) {
        if (omitted === d) is = true;
      });
    }
    return is;
  }

  function buildWeekdays(weekdays) {
    var weekdayHtml = document.createDocumentFragment();
    weekdays.forEach(function(weekday) {
      weekdayHtml.appendChild(buildNode('th', {}, weekday));
    });
    return weekdayHtml;
  }

  function rebuildCalendar() {
    while (this.calendarBody.hasChildNodes()) {
      this.calendarBody.removeChild(this.calendarBody.lastChild);
    }

    var firstOfMonth = new Date(this.year, this.month, 1).getPickrDay(this.config),
      numDays = date.month.numDays(this.month, this.year);

    this.currentMonth.textContent = date.month.string(this.month, this.config.months) + ' ' + this.year;
    this.calendarBody.appendChild(buildDays.call(this, firstOfMonth, numDays, this.month, this.year));
  }

  function buildCurrentMonth(config, month, year, months) {
    return buildNode('strong', {
      class: 'small'
    }, date.month.string(month, months) + ' ' + year);
  }

  function buildMonths() {
    var months = buildNode('div', {
      'class': 'months'
    });
    var prevMonth = buildNode('a', {
      'class': 'icon next button short quiet',
      'data-target': 'month-next',
      'href': '#'
    });
    var nextMonth = buildNode('a', {
      'class': 'icon prev button short quiet',
      'data-target': 'month-prev',
      'href': '#'
    });

    months.appendChild(prevMonth);
    months.appendChild(nextMonth);
    return months;
  }

  function buildDays(firstOfMonth, numDays, month, year) {
    var calendarBody = document.createDocumentFragment(),
      row = buildNode('tr'),
      dayCount = 0,
      klass,
      omit,
      i;

    // Print out previous month's 'days'
    for (i = 1; i <= firstOfMonth; i++) {
      row.appendChild(buildNode('td'));
      dayCount++;
    }

    for (i = 1; i <= numDays; i++) {
      omit = false;

      // If we have reached the end of a week,
      // wrap to the next line.
      if (dayCount === 7) {
        calendarBody.appendChild(row);
        row = buildNode('tr');
        dayCount = 0;
      }

      if (isToday.call(this, year, month, i)) {
        if (this.config.omitWeekends && isWeekend.call(this, year, month, i) ||
          this.config.omitDays && this.config.omitDays.length && isOmitted.call(this, year, month, i)) {

          klass = 'today quiet';
          omit = true;
        } else {
          klass = 'today';
        }
      } else if (this.config.omitPast && isPast(year, month, i) ||
        this.config.omitFuture && isFuture(year, month, i) ||
        this.config.omitWeekends && isWeekend.call(this, year, month, i) ||
        this.config.omitDays && this.config.omitDays.length && isOmitted.call(this, year, month, i)) {

        klass = 'fill-light quiet';
        omit = true;
      } else {
        klass = 'fill-light';
      }

      var self = this;
      // If any dates were passed set day as active.
      if (this.config.activeDays.length) {
        this.config.activeDays.forEach(function(d) {
          if (roundDate.call(self, new Date(d[0])).getTime() === new Date(year, month, i).getTime()) {
            klass += (d[1] === 1) ? ' active' : ' halfday active';
          }
        });
      }
      row.appendChild(buildNode('td', {}, buildNode('a', {
        'class': klass,
        'data-target': (!omit) ? 'day' : false,
        'href': '#'
      }, i)));

      dayCount++;
    }

    // If we haven't finished at the end of the week,
    // start writing out the 'days' for the next month.
    for (i = 1; i <= (7 - dayCount); i++) {
      row.appendChild(buildNode('td'));
    }

    calendarBody.appendChild(row);
    return calendarBody;
  }

  function buildCalendar() {
    var firstOfMonth = new Date(this.config.startYear, this.config.startMonth, 1).getPickrDay(this.config);

    var numDays = date.month.numDays(this.month, this.year);
    var calendarDiv = buildNode('div', {
      class: 'date-pickr'
    });

    this.currentMonth = buildCurrentMonth(this.config, this.month, this.year, this.config.months);
    var months = buildMonths(this.config, this.month, this.year);
    months.appendChild(this.currentMonth);

    var calendar = buildNode('table', {
      class: 'small'
    }, buildNode('thead', {}, buildNode('tr', {
      class: 'weekdays'
    }, buildWeekdays(this.config.weekdays))));
    this.calendarBody = buildNode('tbody');
    this.calendarBody.appendChild(buildDays.call(this, firstOfMonth, numDays, this.month, this.year));
    calendar.appendChild(this.calendarBody);

    calendarDiv.appendChild(months);
    calendarDiv.appendChild(calendar);

    this.element.appendChild(calendarDiv);

    calendarDiv.addEventListener('click', function(e) {
      e.preventDefault();
      calendarClick.call(this, e);
    }.bind(this));

    return calendarDiv;
  }

  return function(el, cb, opts) {
    var datepickr = {};
    this.element = el;
    this.callback = cb;
    this.config = {
      utc: false,
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      minDate: null,
      maxDate: null,
      halfDay: false,
      omitPast: false,
      omitFuture: false,
      omitWeekends: false,
      omitDays: [],
      activeDays: [],
      singleSelection: false
    };

    this.config.startYear = date.current.year(this.config);
    this.config.startMonth = date.current.month(this.config);

    if (opts) {
      for (var key in opts) {
        if (this.config.hasOwnProperty(key)) {
          this.config[key] = opts[key];
        }
      }
    }

    var self = this;

    // Normalize any active days by rounding them.
    if (this.config.activeDays.length) {
      this.config.activeDays = this.config.activeDays.map(function(d) {
        return [roundDate.call(self, new Date(d[0])).getTime(), d[1]];
      });
    }

    // Normalize any omitted days by rounding them.
    if (this.config.omitDays.length) {
      this.config.omitDays = this.config.omitDays.map(function(d) {
        return roundDate.call(self, new Date(d)).getTime();
      });
    }

    datepickr.options = function(opts) {
      if (opts) {
        for (var key in opts) {
          if (this.config.hasOwnProperty(key)) {
            this.config[key] = opts[key];
          }
        }
      }
    }.bind(this);

    this.year = this.config.startYear;
    this.month = this.config.startMonth;
    buildCalendar.call(this);
    return datepickr;
  };
})();

global.Datepickr = Datepickr;
if (typeof module !== 'undefined' && module.exports) module.exports = Datepickr;
})(this);
