var map = require('map-stream');
var gutil = require('gulp-util');
var haml = require('haml');

module.exports = function(options) {
  if(!options) options = {};
  if(!options.ext) options.ext = '.html';

  // Map each file to this function
  function hamlStream(file, cb) {
    // Remember that contents is ALWAYS a buffer
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-haml: Streaming not supported"));

    var html = haml.render(file.contents.toString("utf8"), options);
    file.path = gutil.replaceExtension(file.path, options.ext);
    file.contents = new Buffer(html);

    cb(null, file);
  }

  // Return a stream
  return map(hamlStream);
};