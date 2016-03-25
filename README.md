# Build and publish your ASP.NET Core client code with gulp

## Description
There are many examples out there on how to do the server stuff in **ASP.NET Core**, 
but not on how to organize and publish the client code.

This repository contains an example on how to use gulp to compile Typescript and Sass,
copy Javascript and Css and on how to publish them together with the server code.
No unnecessary files are published.

Creating the files needed for development is now very easy:
`gulp make:dev`. Publishing is a simple `gulp publish` (which is automatically done when using `dnu publish`).

If I have new ideas on how to improve the scripts, I'll add them here. Feel free to send pull requests if you have ideas. 

## Requirements
You need to have the *npm* packages *gulp*, *gulp-cli*, *bower* and *typings* globally installed:
`npm install -g gulp gulp-cli bower typings`.

## Run
In the TestWebApp folder:

After you cloned the repositoy, install and use a dnx runtime, e.g. `dnvm install 1.0.0-rc1-update1` 
and `dnvm use 1.0.0-rc1-update1 -r clr -arch x64`. Now restore the packages
with `dnu restore` and start the web server in development mode `dnx web ASPNET_ENV=Development`.

For using the production mode, `gulp publish` first and start `dnx web ASPNET_ENV=Production`. 
Remember to `gulp make:dev` before using the development environment again, since
all dev files will be deleted when publishing.

## Files
All client files (except for the images) were moved into the `client` folder. 
The generated development output is copied to `wwwroot/dev`, all (minified and concatenated) 
files for publishing are stored in `wwwroot` and in `wwroot/lib`.

The following files were changed or added (based upon the files generated by *yeoman* `yo aspnet`).

* `.bowerrc` The directory changed to `client/bower_components`
* `bower.json` added override for bootstrap (necessary for correct deployment)
* `gulp.config.js` new: all paths used by gulp are here
* `gulpfile.js`
* `package.json` 
* `project.json` Mainly the scripts for *postrestore* and *prepublish*
* `tsconfig.json` The configuration used when compiling *Typescript* to *Javascript*
* `client/*` All client code is here
* `client/scripts/ts/tests` and `client/scripts/js/tests` All unit tests are stored here and won't be 
published
* `client/scripts/ts/typings.json` and `client/scripts/ts/typings/`All typings for 
Typescript are stored here (call `typings install` in this folder)
* `Views/Shared/_Layout.cshtml` Changed the ref for js and css included

## Tasks
### clean:dev
Deletes all files in `wwwroot/dev/`. *Javascript*, *Css*, *libraries*.

### compile
Compiles *Typescript* to *Javascript* and *Sass* to *Css* and saves the output in the 
according `wwwroot` folders.

### copy
Copies the *Javascript* and *Css* files from the `client` folder into the `wwwroot/dev/` folder. 
Everything what you don't program in *Typescript* / *Sass*

### publish
This will clean the `wwwroot/dev/` folder and recompile and copy all client code, concatenate and 
minify it and store it in `wwwroot/site.min.js`, `wwwroot/site.min.css` and the (concatenated and minified) 
library code in `wwwroot/lib/*`.

## Usage

### Development
While developing the application, these sub-tasks come in handy:

* `compile:ts` if you just want to recompile the *Typescript* code
* `compile:sass` if you just want to recompile the *Sass* code
* `copy:js` if you want to copy the client js code
* `copy:css` if you want to copy the client css
* `copy:lib` if you want to copy the libraries
* `make:dev` does all the steps above

### Publishing
Normally you'll always run `publish`, but in case you want to preserve the dev files, you can 
run `publish:make`.

## Final thoughts

* You could use different `wwwroot` folders for production and development. The `wwwroot` is 
specified in `project.json` where you could specify you development `wwwroot` folder, and 
when publishing you use the `--wwwroot` parameter.</li>
* If you want to dig deeper into gulp, I strongly recommend to watch John Papa's course at 
Pluralsight: <a href="https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs/table-of-contents">JavaScript Build Automation With Gulp.js</a>
* If you don't want to have one big `site.min.js` and one big `site.min.css` file because 
not every page uses all the code, you have to set up a mapping which maps from a source folder 
to a target minified file.


 




 
