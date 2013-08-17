/*
	Prototype code, don't judge; make it better!

	Use
	----
	node ifdef.js target file, file, file

	Examples
	--------
	node ifdef.js "ios" *.js
	node ifdef.js "(android|bb10)" index.html app.css app.js

*/

var fs = require('fs');

// TODO: better CLI
var target = process.argv[2];
var args = process.argv.slice(3);

// TODO: make all these configurable
var ifdefRegex = /\#(ifdef|ifndef|endif)/i;
var ifndefRegex = /\#ifndef/i;
var allRegex = /\#(ifdef|ifndef|endif)\s+\w+/i; // at least some target
var targetRegex = new RegExp(target);

var paused = false;

for (var arg = 0; arg < args.length; arg++) {
	var file = fs.readFileSync(args[arg]).toString();
	var data = file.split("\n");
	var l = "";

	for (var i = 0; i < data.length; i++) {
		l = data[i];

		if (l.match(ifdefRegex)) {
			// this is an ifndef
			if (l.match(ifndefRegex)) {
				if (!l.match(targetRegex))
					paused = false;
				else
					paused = true;
			}
			else if (l.match(targetRegex)) {
				// our target is in the list
				paused = false;
			}
			else if (l.match(allRegex)) {
				// our target is not in the list
				paused = true;
			}
			else {
				paused = false;
			}
		}
		else {
			if (!paused)
				console.log(l);
		}
	}
}

// TODO: proper error
if (paused)
	console.log("WARNING: unclosed #ifdef");
