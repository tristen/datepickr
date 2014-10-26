all: dist/datepickr.js dist/datepickr.min.js

UGLIFY = node_modules/.bin/uglifyjs

dist/datepickr.js: index.js
	cat index.js > dist/datepickr.js

dist/datepickr.min.js: dist/datepickr.js
	$(UGLIFY) dist/datepickr.js > dist/datepickr.min.js
