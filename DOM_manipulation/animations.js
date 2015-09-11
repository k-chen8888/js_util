/* Hide and show animations
 * Shortcuts for making things vanish, use the direct jQuery call for other cases
 */

// Hides a target element, identified by a string
var hide = function(target, speed) {
	$(target).fadeTo(speed || 500, 0, function(){
		$(target).css({'pointer-events': 'none'});
	});
};

// Shows a target element, identified by a string
var show = function(target, speed) {
	$(target).fadeTo(speed || 500, 1, function(){
		$(target).css({'pointer-events': ''});
	});
};