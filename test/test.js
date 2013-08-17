// This is some code to test with

if (TARGET == "ios" || TARGET == "webkit") { // #ifdef ios webkit
	// WEBKIT / IOS!
} // #endif

// #ifdef test
console.log("TEST");
// #endif

/* #ifdef android
console.log("this would be commented out and run in the browser");
console.log("but when we build for android, it'll be uncommented.");
#endif */

// #ifdef browser
console.log("hi!");
//#endif

