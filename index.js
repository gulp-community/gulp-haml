(function () {
  'use strict';

  var map = require('map-stream'),
      rext = require('replace-ext'),
      util = require('gulp-util'),
      compilers = {
        creationix: require('haml'),
        visionmedia: require('hamljs')
      };
      

  function _mergeObjects(o1, o2) {
    var k, v;
    for (k in o2) {
      v = o2[k];
      o1[k] = v;
    }
    return o1;
  }

  module.exports = function(options) {
    var options = _mergeObjects({
      ext: '.html',
      compiler: 'creationix',
      compilerOpts: {}
    }, options);

    // Map each file to this function
    function hamlStream(file, cb) {
      // Remember that contents is ALWAYS a buffer
      if (file.isNull()) return cb(null, file); // pass along
      if (file.isStream()) return cb(new util.PluginError('gulp-haml', 'Streaming not supported'));

      var html = compilers[options.compiler].render(file.contents.toString('utf8'), options.compilerOpts);
      file.path = rext(file.path, options.ext);
      file.contents = new Buffer(html);

      cb(null, file);
    }

    // Return a stream
    return map(hamlStream);
  };

})();

