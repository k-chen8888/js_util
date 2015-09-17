/* Gets the viewport dimensions based on the browser being used in the form [width, height]
 * Adapted from: http://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
 */
var getViewport = function() {
	// The more standards-compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		return [
			window.innerWidth,
			window.innerHeight
		];
	}
	
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined' &&
			 typeof document.documentElement.clientWidth != 'undefined' &&
			 document.documentElement.clientWidth != 0) {
		return [
			document.documentElement.clientWidth,
			document.documentElement.clientHeight
		];
	}
	
	// Older versions of IE
	else {
		return [
			document.getElementsByTagName('body')[0].clientWidth,
			document.getElementsByTagName('body')[0].clientHeight
		];
	}
};