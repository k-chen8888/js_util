/* Generates a stylized alert <div> (toast) at a target location
 * Saves toast as a JavaScript object
 * 
 * Note that users must style their toasts themselves
 */
var makeToast = function(options) {
	var exports = {};
	
	// Create a DOM object for the toast and place it appropriately in the HTML file
	// @param(where) is the location to prepend the toast to
	// @param(classes) is a string that contains a space-delimited list of classes that the toast will take on (in addition to being of the "toast" class)
	$(options.where || 'body').prepend( '<div class="toast ' + (options.classes + '"' || 'plain"') + '></div>' );
	exports.obj = $('div.toast.' + (options.classes ? options.classes.split(' ').join('.') : 'plain') );
	
	// Add content to the DOM object
	// @param(info) is an object that specifies the following:
	//		@param(info.content) is the initial piece of content that appears inside the toast, which must have an id="content"
	//		@param(info.update) is a function that must occur at an interval and must take the the element that it is meant to change as an argument
	//		@param(info.updateTimer) is the amount of time to wait (in milliseconds) before the toast's content is edited by setIntterval
	if (options.info) {
		exports.obj.append(options.info.content || '<p id="content">This is a plain piece of toast. Yummy.</p>');
		
		// Can the content be updated?
		if (options.info.update) {
			exports.updateContent = setInterval(function() {
				options.info.update(exports.obj.children('#content'));
			}, (options.info.updateTimer || 1000), exports);
		}
	} else exports.obj.append('<p>This is a plain piece of toast. Yummy.</p>');
	
	// Can the toast be eaten (closed out)?
	// @param(edible) is a function that defines behavior that occurs when the toast is eaten...
	//		Set this to false to make the toast inedible (cannot be destroyed)
	//		Set this to undefined to make the toast exhibit default behavior on destruction
	exports.eatToast = ( options.edible === false ? false : ( typeof options.edible == 'function' ? options.edible : function(exports) { eatToast(exports); } ) );
	// If the toast can be closed out, add an 'x' button to it and set and event listener on that element
	if (exports.eatToast) {
		// Uses the HTML code for an 'x' button
		exports.obj.append('<a id="close" href="#">&#10006;</a>');
		
		// Toast is eaten on close
		exports.obj.children('a#close').click(exports, function() {
			exports.eatToast(exports);
		});
	}
	
	return exports;
};


/* Refreshes a stale piece of toast with new information, giving it new life and flavor
 */
var reToast = function(stale, options) {
	// @param(classchange) contains 2 arrays, one of old classes and another of new classes
	stale.obj.removeClass(options.classchange[0].join(' '));
	stale.obj.addClass(options.classchange[1].join(' '));
	
	// @param(info) updates the content
	if (options.info) {
		stale.obj.append(options.info.content || '<p id="content">I\'m tasty again!</p>');
		
		// Can the content be updated?
		if (options.info.update) {
			stale.updateContent = setInterval(function() {
				options.info.update(stale.obj.children('#content'));
			}, (options.info.updateTimer || 1000), stale);
		}
	} else stale.obj.append('<p>I\'m tasty again!</p>');
	
	// @param(edible) defines how the toast gets eaten
	stale.eatToast = ( options.edible === false ? false : ( typeof options.edible == 'function' ? options.edible : function(stale) { eatToast(stale); } ) );
	// If the toast can be closed out, add an 'x' button to it and set and event listener on that element
	if (stale.eatToast) {
		// Uses the HTML code for an 'x' button
		stale.obj.append('<a id="close" href="#">&#10006;</a>');
		
		// Toast is eaten on close
		stale.obj.children('a#close').click(stale, function() {
			stale.eatToast(stale);
		});
	}
};


/* Erases a toast from the DOM tree
 * Like, completely... fade out, get rid of all setTimeout(), and delete
 */
var eatToast = function(toast) {
	// Fade to nothing
	toast.obj.fadeTo(250, 0, function(){
		toast.obj.css({'pointer-events': 'none'});
		
		// Stop the toast from updating itself
		if (toast.updateContent) clearInterval(toast.updateContent);
		
		// Delete from tree
		toast.obj.remove();
	});
	
	// The user now needs to remember that the old toast object can no longer be used
};