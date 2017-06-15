'use strict';

var map = require('map-stream');
var rext = require('replace-ext');
var util = require('gulp-util');
var _ = require('lodash');

var compilers = {
  creationix: require('haml'),
  visionmedia: require('hamljs'),
};

module.exports = function(opts) {
  var options = _.merge({
    ext: '.html',
    compiler: 'creationix',
    compilerOpts: {}
  }, opts);

  // Map each file to this function
  function hamlStream(file, cb) {
    // Remember that contents is ALWAYS a buffer
    if (file.isNull()) {
      return cb(null, file); // pass along
    }
    if (file.isStream()) {
      return cb(new util.PluginError('gulp-haml', 'Streaming not supported'));
    }
  
    try {
      // Render using the selected compiler
      var html = compilers[options.compiler]
      .render(file.contents.toString('utf8'), options.compilerOpts);
    } catch (e) {
      return cb(new util.PluginError({
          plugin: 'gulp-haml', 
          message: 'HAML conversion failed\n' + file.path +'\n'+ e
        })
      )
    } 
    
    
    file.path = rext(file.path, options.ext);
    file.contents = new Buffer(html);

    cb(null, file);
  }

  // Return a stream
  return map(hamlStream);
};
