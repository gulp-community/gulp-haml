var should = require('should');
var gutil = require('gulp-util');
var haml = require('../');
var fs = require('fs');

require('mocha');

describe('gulp haml', function(){
  it('should render haml .haml to HTML .html', function(done){
    var hamlStream = haml();

    var fakeFile = new gutil.File({
      base: "test/src/",
      cwd: "test/",
      path: "test/src/haml.haml",
      contents: fs.readFileSync('test/src/haml.haml', 'utf8')
    });

    hamlStream.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/expected/haml.html', 'utf8'));
      done();
    });
    hamlStream.write(fakeFile);
  });
});