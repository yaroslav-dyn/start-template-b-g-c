# Start front-end template projects
https://github.com/yaroslav-dyn/start-template-b-g-c
	
## Inside:
- bootstrap
- scss
- gulp
	-	build project in 'public'
	-	compile SCSS
	-	server with browsers sync live reload localhost:3000/

## Structure:
* | lib
* | public/
    * | fonts/
	* | img/
	* | scripts/
	* | css/
* favicon.ico
* index.html
* | src /
	* fonts/
	* img/
	* css/
	* js/
	* scss/
	* html-parts/
	* vendor
	* favicon.ico
	* index.html

* | node_modules/
* | .gitignore
* | .gulpfile.js
* | .package.json
* | .readme.md

### Gulp tasks:
1. gulp serve (developer mode for debugging + server on localhost:3000 from ./src/)
2. gulp serve:dist (Production mode + server on localhost:3000 from ./public/)
3. gulp build:dev (dev mode: prebuild files into ./src/)
4. gulp build:dist (prod mode: build and minify all dependencies and transfer it to ./public/)






