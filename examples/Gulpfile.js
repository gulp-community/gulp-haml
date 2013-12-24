var gulp = require("gulp");
var haml = require("../index");


gulp.task("haml", function(){
  gulp.src("./haml/**/*.haml")
  .pipe(haml())
  .pipe(gulp.dest("./html"));
});



gulp.task("default", function(){
  gulp.run("haml");
});