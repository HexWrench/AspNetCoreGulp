"use strict";

var gulp = require("gulp");
var config = require("./gulp.config")();
var del = require("del");
var $ = require("gulp-load-plugins")({lazy: true, pattern: '*'});

///
/// Cleaning the dev output
///

// Remove all javascript files from the devOutput folder
gulp.task("clean:dev:js", function () {
  log("Cleaning javascript dev output");
  return del(config.devOutput.js + '**/*');
});

// Remove all css files from the devOutput folder
gulp.task("clean:dev:css", function () {
  log("Cleaning css dev output");
  return del(config.devOutput.css + '**/*');
});

// Remove all library files from the devOutput folder
gulp.task("clean:dev:lib", function () {
  log("Cleaning libraries dev output");
  return del(config.devOutput.lib + '**/*');
});

gulp.task("clean-dev", ["clean:dev:js", "clean:dev:css", "clean:dev:lib"]);

///
/// Compiling
///

// Compile typescript to javascript, copy to devOutput
gulp.task("compile:ts", ['clean:dev:js'], function() {
   log("Compiling ts");
   var tsProject = $.typescript.createProject('tsconfig.json');
   var tsResult = gulp.src([config.client.ts + "/**/*.ts", "!" + config.client.ts + "/typings/**/*"])
    .pipe($.typescript({ outDir: config.devOutput.js }));

   var merge = require("merge2");
   return merge([
		tsResult.dts.pipe(gulp.dest(config.devOutput.js)),
		tsResult.js.pipe(gulp.dest(config.devOutput.js))
	]);
});

// Compile sass to css, copy to devOutput
gulp.task("compile:sass", ["clean:dev:css"], function() {
   log("Compiling sass");
   return gulp.src(config.client.sass + "**/*.scss")
      .pipe($.sass())
      .pipe(gulp.dest(config.devOutput.css));
});

gulp.task("compile", ["compile:ts", "compile:sass"]);

///
/// Copying
///

// Copy js to devOutput
gulp.task("copy:dev:js", ['clean:dev:js'], function() {
   log("Copy js to devOutput")
   return gulp.src(config.client.js + "**/*.js")
   .pipe(gulp.dest(config.devOutput.js));
});

// Copy css to devOutput
gulp.task("copy:dev:css", ['clean:dev:css'], function() {
    log("Copy css to devOutput")
   return gulp.src(config.client.css + "**/*.css")
   .pipe(gulp.dest(config.devOutput.css));
});

// Copy libraries to devOutput
gulp.task("copy:dev:lib", ['clean:dev:lib'], function() {
   log("Copy bower lib to devOutput")
   var mainbf = require("main-bower-files");
   return gulp.src(mainbf(), { base: config.client.lib })
   .pipe(gulp.dest(config.devOutput.lib))
});

gulp.task("copy:dev", ["copy:dev:js", "copy:dev:css", "copy:dev:lib"]);

///
/// make/copy all files required for development
///

gulp.task("make:dev", ["copy:dev", "compile"]);

///
/// Publishing
///

//  Remove old published files
gulp.task("publish:clean", function() {
   log("Clean published files");
   return del(config.publishOutput.cleanRule);
});

// Make all javascript, concat and minify it, and copy it to the publish output
gulp.task("publish:make:js", ["publish:clean", "compile:ts", "copy:dev:js"], function() {
   log("publishing js");
   return gulp.src([config.devOutput.js + "**/*.js", "!" + config.devOutput.jsTests + "**/*.js"])
      .pipe($.concat(config.publishOutput.js))
      .pipe($.uglify())
      .pipe(gulp.dest("."));
});

// Make all css, concat and minify it, and copy it to the publish output
gulp.task("publish:make:css", ["publish:clean", "compile:sass", "copy:dev:css"], function() {
   log("publishing css");
   return gulp.src(config.devOutput.css + "**/*.css")
      .pipe($.concat(config.publishOutput.css))
      .pipe($.cssmin())
      .pipe(gulp.dest("."));
});

// Concat and minify all libraries, and copy them to the publish output
gulp.task("publish:make:lib", ["publish:clean", "copy:dev:lib"], function() {
    log("publishing lib");
    var jsFilter = $.filter("**/*.js", {restore: true});
    var cssFilter = $.filter("**/*.css", {restore: true});
    var fontsFilter = $.filter(["**/*.{eot,svg,ttf,woff,woff2}"], {restore: true});

    //return gulp.src(config.devOutput.lib + "**/*")
    // use main-bower-files as src so the files are in the right order
    var mainbf = require("main-bower-files");
    return gulp.src(mainbf(), { base: config.client.lib })
    .pipe(jsFilter)
    .pipe($.concat(config.publishOutput.libJs))
    .pipe($.uglify())
    .pipe(gulp.dest("."))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.concat(config.publishOutput.libCss))
    .pipe($.cssmin())
    .pipe(gulp.dest("."))
    .pipe(cssFilter.restore)
    .pipe(fontsFilter)
    .pipe($.flatten())
    .pipe(gulp.dest(config.publishOutput.libFonts));
});

// publish without removing the development files
gulp.task("publish:make", ["publish:make:js", "publish:make:css", "publish:make:lib"]);

// publish and remove all development files - they would be included in the wwwroot otherwise
gulp.task("publish", ["publish:make"], function() {
   log("cleaning dev files");
   return del(config.devOutput.root);
});

///
/// helper
///

function log(message) {
   $.util.log(message);
}
