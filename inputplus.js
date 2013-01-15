/*
 * jQuery Add Input Box 1.0
 * 
 * Author: Noah Yan
 * The function is to add/remove inputboxes and assign the values to a hidden input box.
 */
var addinputbox = function(options) {
	this.inputbox = {
		html: 	'<div class="additional_inputbox newinputbox"><input type="text" class="medium" maxlength="100" name="" value="DEFAULTVALUE" ><img src="images/add.png" class="addbox" title="add another choice" alt="add another choice" style="cursor:pointer; margin:0 3px;"><img src="images/remove.png" class="deletebox" title="remove this choice" alt="remove this choice" style="cursor:pointer; margin:0;">0 of 100 max characters</div>',
	}
	this.holder_id = options.holder_id;
	this.hidden_id = options.hidden_id;
	this.seprator = options.seprator;
	this.init();
}

addinputbox.prototype = {
	init: function() {
		this.addDefaultBoxes();
	},
	
	addDefaultBoxes: function() {
		var hidden_value = jQuery( '#' + this.hidden_id ).val();
		
		//if the hidden input value is empty, add a new input box;
		if( hidden_value === '' ) {
			this.addBox();
		} else {
			var obj = this;
			jQuery.each( hidden_value.split(obj.seprator), function(index, value) {
				if(value !== '') {
					obj.addBoxWith(value);
				}
			});
		}		
	},
	
	addBox: function() {
		jQuery('.newinputbox').removeClass('newinputbox');
		jQuery( '#' + this.holder_id ).append(this.inputbox.html.replace("DEFAULTVALUE", ''));
		//reattach the event to the new input html
		this.attachEvent();
	},
	
	addBoxWith: function(value) {
		jQuery('.newinputbox').removeClass('newinputbox');
		jQuery( '#' + this.holder_id ).append(this.inputbox.html.replace("DEFAULTVALUE", value));
		//reattach the event to the new input html
		this.attachEvent();
	},
	
	//attach the event to newly added input box
	attachEvent: function() {
		var obj = this;
		jQuery('.newinputbox').find('.addbox').bind('click', function() {
			obj.addBox();
		});
		jQuery('.newinputbox').find('.deletebox').bind('click', function() {
			if( jQuery('.additional_inputbox').length > 1 ) {
				jQuery(this).parent().remove();
			}
			obj.calculateValue();
		});
		jQuery('.newinputbox').find('input').bind('blur', function(){
			obj.calculateValue();
		});
	},
	
	calculateValue: function() {
		var new_value = '';
		var obj = this;
		jQuery('.additional_inputbox').each(function(){
			var newinputvalue = jQuery(this).find('input').val();
			if(newinputvalue !== '') {
				new_value += newinputvalue + obj.seprator;
			}
		});
		
		var len = parseInt(this.seprator.length) * (-1);
		jQuery('#' + this.hidden_id).val(new_value.slice(0, len));
	}
}
