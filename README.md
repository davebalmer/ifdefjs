ifdef.js
========

A mind-numbingly simple JavaScript preprocessor for platform-specific build
chains. Built with Node.js, designed for HTML/CSS/JS, but works with most text
files.

Designed more for HTML5 hybrid apps than hosted webapps, `ifdef.js` was born of
a desire to make building an app across a dozen platforms that was easy to
browser test and also more ready to optimize for each platform.


Use
===

	node ifdef.js "target" file, file, file, ...
	node ifdef.js "(multiple|target|keywords)" *.js

Note: haven't sorted out how I want it to output the actual files; directory 
flag or...? Looking for input.


How it works
============

At build time, the HTML/CSS pieces which are for a target which doesn't match
the build will be removed (including their separator comments).

This means that we can keep all of our scripts, for the most part, together. No
need for completely separate files for each platform. This is the same as C/C++
developers who use `#ifdef` in their source, which the compiler strips out.


Pattern
-------

	// #ifdef ios android
	...a hunk of code...
	// #endif

	// #ifndef webkit
	...code for everything BUT webkit...
	// #endif


Pseudo-code
-----------

	read a line from the file
	if it contains `#ifdef`,
		match all known target strings that are listed in the line
		if any of the strings are for the current build or alias,
			do not print the line
			resume file output
		if there are no target strings,
			skip the line
			resume file output
		otherwise,
			pause file output
	otherwise,
		if output not paused,
			output the line
	read the next line


Examples
========

HTML
----

This is probably of less use, but may be good for cleaning things up:

	<!-- #ifdef wp8 win8 -->
	<meta thingy="stuff">
	<!-- #ifdef -->

You can use this to provide alternate packages for browser vs. build:

	<!-- #ifdef browser -->
	<script src="app.js"></script>
	<script src="test.js"></script>
	<script src="canvas.js"></script>
	<!-- #endif -->

	<!-- #ifdef app
	<script src="app.min.js"></script>
	#endif -->

Notice the second block (`#ifdef app`) is fully commented out. This means:

- running outside of ifdef.js will be commented out; useful for browser testing

- building for a target other than `app` will remove it entirely

- building `app` will only remove the comment, revealing
  `<script src="app.min"></script>`

The same approach could also be used for special files that are platform
specific.


CSS
---

CSS should be handled by a good post-processor, but this could work in a pinch:

	/* #ifdef ios bb10 */
	some-attributes: value;
	/* #endif */

The same "commented-out-for-browser" approach in the HTML example could also
be used.


JavaScript
----------

Single line comments around a block of code:

	// #ifdef ios
	function next() { // ios specific function };
	// #endif

Working with conditionals that are used during browser testing, but not
desirable for optimized platform builds:

	if (TARGET == "wp8" || TARGET == "win8") { // #ifdef wp8 win8
		// Windows-stuff here
	} // #endif
	else if (TARGET == "android" || TARGET == "kindle") { #ifdef android
		// Android-ish things here
	} // #endif

- It is important to "close" `#ifdef` blocks with an `#endif`; in this case to
  clean up unused closing conditional braces.

- `TARGET` is an example of using some runtime means to identify browser type
  which compliments `#ifdef`.

- Conditional operators should be on a single line to satisfy the parser.


Roadmap
=======

- Make it write actual files
- Add some command line flags and config options
- Add it to npm


Contributions
=============

I'm in the middle of a project, I don't have time to totally flesh this into a
mature project, and I welcome any issues, suggestions and pull requests. Keep it
simple, make it smart.


License
=======

The MIT License (MIT)
Copyright (c) 2013 Dave Balmer

See LICENSE file for full license, but basically, do whatever the heck you want
with this code.

