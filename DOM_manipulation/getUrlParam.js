/* Parses the parameters out of a URL string and stores them in a dictionary
 * Adapted from: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
 * 				 http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
 */
var getUrlParam = function() {
	var sPageUrl = decodeURIComponent(window.location.search.substring(1)), // Extract and decode the url
		sUrlVariables = sPageUrl.split('&'),                                // Generate a list of strings of the form <variable>=<value>
		sParameterName,
		out = {};
	
	// Process all parameters
	for (var i = 0; i < sUrlVariables.length; i++) {
		// Get the variable and value from a parameter string of the form <variable>=<value>
		sParameterName = sUrlVariables[i].split('=');
		
		// Index the variable and its value if they both exist
		if (sParameterName[0])
			out[sParameterName[0]] = (sParameterName[1] === undefined ? undefined : sParameterName[1]);
	}
	
	return out;
};