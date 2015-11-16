/*
modalUI - 1.06 beta [16.11.15]
Author: vadimsva
Github: https://github.com/vadimsva/modalUI
*/
$(function(){

/* tab */
(function($) {
	$.fn.tab = function(method){
	
		var methods = {
			init : function(params) {

				$('.tab').click(function() {
					var curPage = $(this).attr('data-tab');
					$(this).parent().find('> .tab').each(function(){
						$(this).removeClass('active');
					});
					$(this).parent().find('+ .page_container > .page').each(function(){
						$(this).removeClass('active');
					});
					$(this).addClass('active');
					$(this).parent().find('+ .page_container > .page[data-page="' + curPage + '"]').addClass('active');
				});
			
			}
		};

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		
	};
	$('html').tab();
})(jQuery);


/* accordion */
(function($) {
	$.fn.accordion = function(method){
	
		var methods = {
			init : function(params) {

				$('.accordion_header').click(function() {
					var elem = $(this).parent();
					var toggle = elem.parent().attr('data-toggle');
					
					if (toggle && toggle == 'true') {
						if (elem.hasClass('active')) {
							elem.removeClass('active');
						} else {
							elem.parent().find('> .accordion_block').removeClass('active');
							elem.addClass('active');
						}
					} else {
						if (elem.hasClass('active')) {
							elem.removeClass('active');
						} else {
							elem.addClass('active');
						}
					}
				});
			
			}
		};

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		
	};
	$('html').accordion();
})(jQuery);


/* progress */
(function($) {
	$.fn.progress = function(method){
		var elem = $(this);
	
		var methods = {
			init : function(params) {
				if (elem.find('> .progress_bar').length == 0) {
					var prg_container = $('<div class="progress">');
					var prg_text = $('<div class="progress_text"><div></div></div>');
					var prg_bar = $('<div class="progress_bar" style="width:0%"><div></div></div>');
					prg_container.append(prg_text, prg_bar);
					elem.append(prg_container);
					elem.find('> .progress > .progress_text > div').css({width: elem.outerWidth() + 'px'});
					elem.find('> .progress > .progress_bar > div').css({width: elem.outerWidth() + 'px'});
				}
			},
			update : function(params) {
				var _defaults = {
					val: 0,
					text: '0%'
				};
				_options = $.extend(_defaults, params);
				elem.find('> .progress > .progress_bar').css({width: _options.val + '%'});
				elem.find('> .progress > .progress_text > div').html(_options.text);
				elem.find('> .progress > .progress_bar > div').html(_options.text);
			},
			hide : function() {
				$(this).empty();
			}
		};

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		
	};
	$('.progress').progress('init');
	document.addEventListener("DOMNodeInserted", function(event) {
		if ($(event.target).hasClass('progress')) {
			$('.progress').progress('init');
		}
	}, false);
})(jQuery);


/* dropdown */
(function($) {
	$.fn.dropdown = function(method){
		var methods = {
			init : function(params) {
				var elem, elemMenu;

				$('.btn-dropdown').click(function(event) {
					elem = $(this);
					elemMenu = $(this).find('+ .dropdown-menu');
					if(elemMenu.hasClass('open')) {
						elemMenu.removeClass('open');
					} else {
						$('.dropdown-menu').removeClass('open');
						elemMenu.addClass('open');
					}
					
					$('html').on('click.dropdownMenuEvent', function(event) {
						var target = $(event.target);
						var closeonclick = elemMenu.attr('data-closeonclick');
						if (typeof closeonclick !== typeof undefined && closeonclick !== false) {
							
							if (closeonclick && closeonclick == 'false') {
								if (!target.parents().andSelf().is('.dropdown-menu') && !target.parents().andSelf().is($('.btn-dropdown'))) {
									$('.dropdown-menu').removeClass('open');
								}
							} else {
								if (!target.parents().andSelf().is('.dropdown-menu > li.disabled') && !target.parents().andSelf().is('.dropdown-menu > li.sep') && !target.parents().andSelf().is($('.btn-dropdown'))) {
									$('.dropdown-menu').removeClass('open');
								}
							}
						}
						
					});
				
				});
			
			}
		};

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		
	};
	$('html').dropdown();
})(jQuery);











/* FOR EXAMPLES */
var current_anim_effect = $('#anim_effect').val();

$('#anim_effect').change(function(){
	current_anim_effect = $(this).val();
	$('#anim_box').removeAttr('class').addClass('animated active ' + current_anim_effect);
});
	
$('#anim_effect').click(function(){
	current_anim_effect = $(this).val();
});	

$('#anim_run').click(function(){
	$('#anim_box').addClass('animated active ' + current_anim_effect);
});

$('#anim_reset').click(function(){
	current_anim_effect = current_anim_effect.replace('In', 'Out');
	$('#anim_box').addClass('animated ' + current_anim_effect);
	setTimeout(function(){
		$('#anim_box').removeAttr('class');
		current_anim_effect = current_anim_effect.replace('Out', 'In');
	}, 300);
});



	
});


var prg_init = true;
function prg() {
	if (prg_init) {
		$('#prg').progress('init');
		var count = 0;
		sInt = setInterval(function() {
			if (count <= 100) {
				$('#prg').progress('update',{val: count, text: count + '%'});
				++count;
			} else {
				sTout = setTimeout(function(){
					$('#prg').progress('hide');
					prg_init = true;
					clearInterval(sInt);
					clearTimeout(sTout);
				},500);
			}
		
		}, 50);
		prg_init = false;
	}
}
