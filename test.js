var es = require('event-stream');
var haml = require('haml');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');


var file = fs.readFileSync('./haml/test.haml');

    var html = haml.render(file.toString('utf8'));

      console.log(html);
      //cb(null, file);
console.log(process.platform);