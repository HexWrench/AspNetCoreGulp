module.exports = function() {
   var wwwroot = 'wwwroot/';
   var devOutput = wwwroot + 'dev/';
   var images = wwwroot + 'images/';
   var client = "client/";
   var clientScripts = client + 'scripts/';
   var clientStyles = client + 'styles/';
   var clientJsFolder = clientScripts + 'js/';
   var clientTsFolder = clientScripts + 'ts/';

   var devOutputJs = devOutput + 'js/';

   // folders to be excluded must not end with an '/'
   var publishCleanRule = [
       wwwroot + '**/*',
       '!' + wwwroot + 'dev',
       '!' + wwwroot + 'dev/**/*',
       '!' + wwwroot + 'images',
       '!' + wwwroot + 'images/**/*',
   ];

   var clientFolders = {
      js: clientJsFolder,
      ts: clientTsFolder,
      jsTests: clientJsFolder + 'tests/',
      tsTests: clientTsFolder + 'tests/',
      css: clientStyles + 'css/',
      sass: clientStyles + 'sass/',
      lib: client + 'bower_components/'
   }

   var devOutputFolders = {
      root: devOutput,
      js: devOutputJs,
      jsTests: devOutputJs + 'tests/',
      css: devOutput + 'css/',
      lib: devOutput + 'lib/'
   }

   var publishOutput = {
      js: wwwroot + 'site.min.js',
      css: wwwroot + 'site.min.css',
      libJs: wwwroot + 'lib/js/lib.min.js',
      libCss: wwwroot + 'lib/css/lib.min.css',
      libFonts: wwwroot + 'lib/fonts',
      cleanRule: publishCleanRule
   }

   var config = {
      wwwroot: wwwroot,
      client: clientFolders,
      images: images,
      devOutput: devOutputFolders,
      publishOutput: publishOutput
   };

   return config;
}
