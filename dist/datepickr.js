!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Datepickr=t()}}(function(){return function t(e,i,n){function a(o,s){if(!i[o]){if(!e[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var f=i[o]={exports:{}};e[o][0].call(f.exports,function(t){var i=e[o][1][t];return a(i||t)},f,f.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(t,e,i){!function(t){Date.prototype.getPickrDate=function(t){return t&&t.utc?this.getUTCDate():this.getDate()},Date.prototype.getPickrFullYear=function(t){return t&&t.utc?this.getUTCFullYear():this.getFullYear()},Date.prototype.getPickrMonth=function(t){return t&&t.utc?this.getUTCMonth():this.getMonth()},Date.prototype.getPickrDay=function(t){return t&&t.utc?this.getUTCDay():this.getDay()};var i=function(){function t(t){var e=new Date(this.year,this.month).getTime();switch(t.target.getAttribute("data-target")){case"month-prev":if(this.config.minDate&&e<=this.config.minDate)return;this.month--,this.month<0&&(this.year--,this.month=11),f.call(this);break;case"month-next":if(this.config.maxDate&&e>=this.config.maxDate)return;this.month++,this.month>11&&(this.year++,this.month=0),f.call(this);break;case"day":var i=new Date(this.year,this.month,t.target.textContent).getTime(),n=t.target.classList;if(this.config.halfDay)n.contains("halfday")?(n.remove("halfday"),this.config.activeDays=this.config.activeDays.map(function(t){return t[0]===i&&(t[1]=1),t})):n.contains("active")?(n.remove("active","halfday"),this.config.activeDays=this.config.activeDays.filter(function(t){return t[0]!==i})):(n.add("active","halfday"),this.config.activeDays.push([i,.5]));else if(n.contains("active"))n.remove("active","halfday"),this.config.activeDays=this.config.activeDays.filter(function(t){return t[0]!==i});else{if(this.config.singleSelection){for(var a=this.element.querySelectorAll("a"),r=0;r<a.length;r++)a[r].classList.remove("active","halfday");this.config.activeDays=[[i,1]]}else this.config.activeDays.push([i,1]);n.add("active")}this.config.activeDays.sort(function(t,e){return t[0]-e[0]}),this.callback(this.config.activeDays)}}function e(t,e,i){t in D||(D[t]=document.createElement(t));var n=D[t].cloneNode(!1);if(e)for(var a in e)n.setAttribute(a,e[a]);return i&&("object"==typeof i?n.appendChild(i):n.textContent=i),n}function i(t,e){return e[t]}function n(t){return new Date(t.getPickrFullYear(this.config),t.getPickrMonth(this.config),t.getPickrDate(this.config))}function a(t,e,i){return i===p.current.day(this.config)&&e===p.current.month(this.config)&&t===p.current.year(this.config)}function r(t,e,i){return new Date(t,e,i).getTime()<(new Date).getTime()}function o(t,e,i){return new Date(t,e,i).getTime()>(new Date).getTime()}function s(t,e,i){var n=new Date(t,e,i).getPickrDay(this.config);return 0===n||6===n}function c(t,e,i){var n,a=new Date(t,e,i).getTime();return this.config.omitDays.length&&this.config.omitDays.forEach(function(t){t===a&&(n=!0)}),n}function h(t){var i=document.createDocumentFragment();return t.forEach(function(t){i.appendChild(e("th",{},t))}),i}function f(){for(;this.calendarBody.hasChildNodes();)this.calendarBody.removeChild(this.calendarBody.lastChild);var t=new Date(this.year,this.month,1).getPickrDay(this.config),e=p.month.numDays(this.month,this.year);this.currentMonth.textContent=p.month.string(this.month,this.config.months)+" "+this.year,this.calendarBody.appendChild(g.call(this,t,e,this.month,this.year))}function u(t,i,n,a){return e("strong",{class:"small"},p.month.string(i,a)+" "+n)}function l(){var t=e("div",{class:"months"}),i=e("a",{class:"icon next button short quiet","data-target":"month-next",href:"#"}),n=e("a",{class:"icon prev button short quiet","data-target":"month-prev",href:"#"});return t.appendChild(i),t.appendChild(n),t}function g(t,i,h,f){var u,l,g,d=document.createDocumentFragment(),m=e("tr"),y=0;for(g=1;g<=t;g++)m.appendChild(e("td")),y++;for(g=1;g<=i;g++){l=!1,7===y&&(d.appendChild(m),m=e("tr"),y=0),a.call(this,f,h,g)?this.config.omitWeekends&&s.call(this,f,h,g)||this.config.omitDays&&this.config.omitDays.length&&c.call(this,f,h,g)?(u="today quiet",l=!0):u="today":this.config.omitPast&&r(f,h,g)||this.config.omitFuture&&o(f,h,g)||this.config.omitWeekends&&s.call(this,f,h,g)||this.config.omitDays&&this.config.omitDays.length&&c.call(this,f,h,g)?(u="fill-light quiet",l=!0):u="fill-light";var D=this;this.config.activeDays.length&&this.config.activeDays.forEach(function(t){n.call(D,new Date(t[0])).getTime()===new Date(f,h,g).getTime()&&(u+=1===t[1]?" active":" halfday active")}),m.appendChild(e("td",{},e("a",{class:u,"data-target":!l&&"day",href:"#"},g))),y++}for(g=1;g<=7-y;g++)m.appendChild(e("td"));return d.appendChild(m),d}function d(){var i=new Date(this.config.startYear,this.config.startMonth,1).getPickrDay(this.config),n=p.month.numDays(this.month,this.year),a=e("div",{class:"date-pickr"});this.currentMonth=u(this.config,this.month,this.year,this.config.months);var r=l(this.config,this.month,this.year);r.appendChild(this.currentMonth);var o=e("table",{class:"small"},e("thead",{},e("tr",{class:"weekdays"},h(this.config.weekdays))));return this.calendarBody=e("tbody"),this.calendarBody.appendChild(g.call(this,i,n,this.month,this.year)),o.appendChild(this.calendarBody),a.appendChild(r),a.appendChild(o),this.element.appendChild(a),a.addEventListener("click",function(e){e.preventDefault(),t.call(this,e)}.bind(this)),a}var m=new Date,y=[31,28,31,30,31,30,31,31,30,31,30,31],D=[],p={current:{year:function(t){return m.getPickrFullYear(t)},month:function(t){return m.getPickrMonth(t)},day:function(t){return m.getPickrDate(t)}},month:{string:function(t,e){return i(t,e)},numDays:function(t,e){return 1!==t||3&e||!(e%100)&&e%400?y[t]:29}}};return function(t,e,i){var a={};if(this.element=t,this.callback=e,this.config={utc:!1,weekdays:["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],minDate:null,maxDate:null,halfDay:!1,omitPast:!1,omitFuture:!1,omitWeekends:!1,omitDays:[],activeDays:[],singleSelection:!1},this.config.startYear=p.current.year(this.config),this.config.startMonth=p.current.month(this.config),i)for(var r in i)this.config.hasOwnProperty(r)&&(this.config[r]=i[r]);var o=this;return this.config.activeDays.length&&(this.config.activeDays=this.config.activeDays.map(function(t){return[n.call(o,new Date(t[0])).getTime(),t[1]]})),this.config.omitDays.length&&(this.config.omitDays=this.config.omitDays.map(function(t){return n.call(o,new Date(t)).getTime()})),a.options=function(t){if(t)for(var e in t)this.config.hasOwnProperty(e)&&(this.config[e]=t[e])}.bind(this),this.year=this.config.startYear,this.month=this.config.startMonth,d.call(this),a}}();t.Datepickr=i,void 0!==e&&e.exports&&(e.exports=i)}(this)},{}]},{},[1])(1)});
