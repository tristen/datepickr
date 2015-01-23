Datepickr
---

The do it yourself date picker. It makes as no assumptions how it's shown on
the page. [__See demo__](http://tristen.ca/datepickr/demo/).

- Need to show/hide it on an input field? __Do it yourself__.
- Need to have it insert one date after selection? __Do it yourself__.
- Need nice formatted dates after selection? __Do it yourself__.

### Usage

``` html
<div id='datepickr'></div>

<script>
    var el = document.getElementById('datepickr');
    new Datepickr(el, function(res) {
       // console.log(res);
    });
</script>

```

### API

#### `new Datepickr(element, callback, options);`

The callback returns an array of arrayed dates whenever a date is selected.

```
[
    [1412481600000,1],
    [1413864000000,1],
    [1413950400000,1],
    [1414468800000,1]
]
```

The first field value is a timestamp along with `1` or `0.5` depending on
whether halfdays are enabled as an option or not.

| Option | Default Value | Description |
| ---- | ---- | ---- |
| weekdays | An array of weekday strings in English | Option for translation |
| months | An array of month strings in English | Option for translation |
| startYear | Current year | Start the date picker on a particular year |
| startMonth | Current month | Start the date picker on a particular month |
| minDate | null | a timestamp representing a maximum date the pager should page |
| maxDate | null | a timestamp representing a minimum date the pager should page |
| halfDay | false | Enables halfday selection of dates |
| omitPast | false | Prevent selecting days in the past |
| omitFuture | false | Prevent selecting days in the future |
| omitWeekends | false | Prevent selecting weekends |
| omitDays | Empty array | Pass a timestamp array of dates to prevent the selection of |
| activeDays | Empty array | Pass an array of arrayed dates ie. `[[[1413950400000,1],[1414468800000,0.5]` that are auto selected on load |
| utc | false | Should date output be interpreted as UTC |

To see examples of each option [see the demos](http://tristen.ca/datepickr/demo/).

### Adding/Removing options after initialization.

``` js
var pickr = new Datepickr(el);
pickr.options({
    halfDay: true
});

```

### Use with node or browserify.

``` js
// npm install datepickr
var datepickr = require('datepickr')

datepickr(el, function(res) {
  console.log(res);
});

```

### Credits

Code originally based off of [datepickr](https://code.google.com/p/datepickr/).
