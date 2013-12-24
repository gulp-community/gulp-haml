var should = require('should');
var gutil = require('gulp-util');
var haml = require('../');

require('mocha');

describe('gulp haml', function(){
  it('should render haml .haml to HTML .html', function(done){
    var hamlStream = haml();

    var fakeFile = new gutil.File({
      base: "/home/proj/haml/",
      cwd: "/home/proj/",
      path: "/home/proj/haml/stuff.haml",
      contents: "!!!5\n%html %head %title\r\n  %body %h1 Test"
    });

    hamlStream.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      newFile.path.should.equal("/home/proj/haml/stuff.html");
      String(newFile.contents).should.equal("<!DOCTYPE html>\n<html><head><title></title></head><body><h1>Test</h1></body></html>");
      done();
    });
    hamlStream.write(fakeFile);
  });
});