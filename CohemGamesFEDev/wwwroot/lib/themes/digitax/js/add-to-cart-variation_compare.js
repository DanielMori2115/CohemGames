/*global wc_add_to_cart_variation_params */
;(function ( $, window, document, undefined ) {
	/**
	 * VariationFormCP class which handles variation forms and attributes.
	 */
	var VariationFormCP = function( $form ) {
		var self = this;

		self.$form                = $form;
		self.$attributeFields     = $form.find( '.item-compare-wrapper select' );
		self.$singleVariation     = $form.find( '.item-compare-bottom' );
		self.$product             = $form.closest( '.color-compare-item' );
		self.variationData        = $form.data( 'product_variations' );
		self.useAjax              = false === self.variationData;
		self.xhr                  = false;
		self.loading              = true;

		// Initial state.
		self.$form.off( '.wc-variation-form' );

		// Methods.
		self.getChosenAttributes    = self.getChosenAttributes.bind( self );
		self.findMatchingVariations = self.findMatchingVariations.bind( self );
		self.isMatch                = self.isMatch.bind( self );

		// Events.
		$form.on( 'reload_product_variations', { variationForm: self }, self.onReload );
		$form.on( 'hide_variation', { variationForm: self }, self.onHide );
		$form.on( 'show_variation', { variationForm: self }, self.onShow );
		$form.on( 'change.wc-variation-form', '.item-attribute select', { variationForm: self }, self.onChange );
		$form.on( 'found_variation.wc-variation-form', { variationForm: self }, self.onFoundVariation );
		$form.on( 'check_variations.wc-variation-form', { variationForm: self }, self.onFindVariation );
		$form.on( 'update_variation_values.wc-variation-form', { variationForm: self }, self.onUpdateAttributes );

		// Init after gallery.
		setTimeout( function() {
			$form.trigger( 'check_variations' );
			$form.trigger( 'wc_variation_form', self );
			self.loading = false;
		}, 100 );
	};

	/**
	 * Reload variation data from the DOM.
	 */
	VariationFormCP.prototype.onReload = function( event ) {
		var form           = event.data.variationForm;
		form.variationData = form.$form.data( 'product_variations' );
		form.useAjax       = false === form.variationData;
		form.$form.trigger( 'check_variations' );
	};

	/**
	 * When a variation is hidden.
	 */
	VariationFormCP.prototype.onHide = function( event ) {
		event.preventDefault();
		event.data.variationForm.$form
			.find( '.single_add_to_cart_button' )
			.prop( 'disabled', true );		
	};

	/**
	 * When a variation is shown.
	 */
	VariationFormCP.prototype.onShow = function( event, variation, purchasable ) {
		event.preventDefault();
		
		if ( purchasable ) {
			event.data.variationForm.$form
				.find( '.single_add_to_cart_button' )
				.prop( 'disabled', false );
		} else {
			event.data.variationForm.$form
				.find( '.single_add_to_cart_button' )
				.prop( 'disabled', true );			
		}

		// If present, the media element library needs initialized on the variation description.
		if ( wp.mediaelement ) {
			event.data.variationForm.$form.find( '.wp-audio-shortcode, .wp-video-shortcode' )
				.not( '.mejs-container' )
				.filter(
					function () {
						return ! $( this ).parent().hasClass( 'mejs-mediaelement' );
					}
				)
				.mediaelementplayer( wp.mediaelement.settings );
		}
	};

	/**
	 * When the cart button is pressed.
	 */
	VariationFormCP.prototype.onAddToCart = function( event ) {
		if ( $( this ).is('.disabled') ) {
			event.preventDefault();
		}
	};

	/**
	 * Looks for matching variations for current selected attributes.
	 */
	VariationFormCP.prototype.onFindVariation = function( event, chosenAttributes ) {
		var form              = event.data.variationForm,
			attributes        = 'undefined' !== typeof chosenAttributes ? chosenAttributes : form.getChosenAttributes(),
			currentAttributes = attributes.data;

		if ( attributes.count && attributes.count === attributes.chosenCount ) {
			if ( form.useAjax ) {
				if ( form.xhr ) {
					form.xhr.abort();
				}
				form.$form.block( { message: null, overlayCSS: { background: '#fff', opacity: 0.6 } } );
				currentAttributes.product_id  = parseInt( form.$form.data( 'product_id' ), 10 );
				currentAttributes.custom_data = form.$form.data( 'custom_data' );
				form.xhr                      = $.ajax( {
					url: wc_add_to_cart_variation_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_variation' ),
					type: 'POST',
					data: currentAttributes,
					success: function( variation ) {
						if ( variation ) {
							form.$form.trigger( 'found_variation', [ variation ] );
						} else {
							form.$form.trigger( 'reset_data' );
							attributes.chosenCount = 0;

							if ( ! form.loading ) {
								form.$form
									.find( '.single_variation' )
									.after(
										'<p class="wc-no-matching-variations woocommerce-info">' +
										wc_add_to_cart_variation_params.i18n_no_matching_variations_text +
										'</p>'
									);
								form.$form.find( '.wc-no-matching-variations' ).slideDown( 200 );
							}
						}
					},
					complete: function() {
						form.$form.unblock();
					}
				} );
			} else {
				form.$form.trigger( 'update_variation_values' );

				var matching_variations = form.findMatchingVariations( form.variationData, currentAttributes ),
					variation           = matching_variations.shift();

				if ( variation ) {
					form.$form.trigger( 'found_variation', [ variation ] );
				} else {
					form.$form.trigger( 'reset_data' );
					attributes.chosenCount = 0;					
				}
			}
		} else {
			form.$form.trigger( 'update_variation_values' );
		}

		// Show reset link.
	};

	/**
	 * Triggered when a variation has been found which matches all attributes.
	 */
	VariationFormCP.prototype.onFoundVariation = function( event, variation ) {
		var form           = event.data.variationForm,			
			purchasable    = true,
			variation_id   = '';
		
		if ( variation.price_html ) {
			form.$form.find( '.item-price' ).html( sanitizer.sanitize( variation.price_html ) );
		}
		
		form.$form.find( 'input[name="variation_id"], input.variation_id' ).val( variation.variation_id ).trigger( 'change' );		

		// Enable or disable the add to cart button
		if ( ! variation.is_purchasable || ! variation.is_in_stock || ! variation.variation_is_visible ) {
			purchasable = false;
		}

	
		form.$singleVariation.show().trigger( 'show_variation', [ variation, purchasable ] );
	};

	/**
	 * Triggered when an attribute field changes.
	 */
	VariationFormCP.prototype.onChange = function( event ) {
		var form = event.data.variationForm;

		form.$form.find( 'input[name="variation_id"], input.variation_id' ).val( '' ).trigger( 'change' );
		form.$form.find( '.wc-no-matching-variations' ).remove();

		form.$form.trigger( 'woocommerce_variation_select_change' );
		form.$form.trigger( 'check_variations' );

		// Custom event for when variation selection has been changed
		form.$form.trigger( 'woocommerce_variation_has_changed' );
	};

	/**
	 * Escape quotes in a string.
	 * @param {string} string
	 * @return {string}
	 */
	VariationFormCP.prototype.addSlashes = function( string ) {
		string = string.replace( /'/g, '\\\'' );
		string = string.replace( /"/g, '\\\"' );
		return string;
	};

	/**
	 * Updates attributes in the DOM to show valid values.
	 */
	VariationFormCP.prototype.onUpdateAttributes = function( event ) {
		var form              = event.data.variationForm,
			attributes        = form.getChosenAttributes(),
			currentAttributes = attributes.data;

		if ( form.useAjax ) {
			return;
		}
		// Loop through selects and disable/enable options based on selections.
		form.$attributeFields.each( function( index, el ) {
			var current_attr_select     = $( el ),
				current_attr_name       = current_attr_select.data( 'attribute_name' ) || current_attr_select.attr( 'name' ),
				show_option_none        = $( el ).data( 'show_option_none' ),
				option_gt_filter        = ':gt(0)',
				attached_options_count  = 0,
				new_attr_select         = $( '<select/>' ),
				selected_attr_val       = current_attr_select.val() || '',
				selected_attr_val_valid = true;
			// Reference options set at first.
			if ( ! current_attr_select.data( 'attribute_html' ) ) {
				var refSelect = current_attr_select.clone();
				refSelect.find( 'option' ).removeAttr( 'attached' ).prop( 'disabled', false ).prop( 'selected', false );

				// Legacy data attribute.
				current_attr_select.data(
					'attribute_options',
					refSelect.find( 'option' + option_gt_filter ).get()
				);
				current_attr_select.data( 'attribute_html', refSelect.html() );
			}

			new_attr_select.html( current_attr_select.data( 'attribute_html' ) );

			// The attribute of this select field should not be taken into account when calculating its matching variations:
			// The constraints of this attribute are shaped by the values of the other attributes.
			var checkAttributes = $.extend( true, {}, currentAttributes );

			checkAttributes[ current_attr_name ] = '';

			var variations = form.findMatchingVariations( form.variationData, checkAttributes );
			// Loop through variations.
			for ( var num in variations ) {
				if ( typeof( variations[ num ] ) !== 'undefined' ) {
					var variationAttributes = variations[ num ].attributes;

					for ( var attr_name in variationAttributes ) {
						if ( variationAttributes.hasOwnProperty( attr_name ) ) {
							var attr_val         = variationAttributes[ attr_name ],
								variation_active = '';
							if ( attr_name === current_attr_name ) {
								if ( variations[ num ].variation_is_active ) {
									variation_active = 'enabled';
								}

								if ( attr_val ) {
									// Decode entities.
									attr_val = $( '<div/>' ).html( attr_val ).text();

									// Attach to matching options by value. This is done to compare
									// TEXT values rather than any HTML entities.
									var $option_elements = new_attr_select.find( 'option' );
									if ( $option_elements.length ) {
										for (var i = 0, len = $option_elements.length; i < len; i++) {
											var $option_element = $( $option_elements[i] ),
												option_value = $option_element.val();

											if ( attr_val === option_value ) {
												$option_element.addClass( 'attached ' + variation_active );
												break;
											}
										}
									}
								} else {
									// Attach all apart from placeholder.
									new_attr_select.find( 'option:gt(0)' ).addClass( 'attached ' + variation_active );
								}
							}
						}
					}
				}
			}

			// Count available options.
			attached_options_count = new_attr_select.find( 'option.attached' ).length;

			// Check if current selection is in attached options.
			if ( selected_attr_val ) {
				selected_attr_val_valid = false;

				if ( 0 !== attached_options_count ) {
					new_attr_select.find( 'option.attached.enabled' ).each( function() {
						var option_value = $( this ).val();

						if ( selected_attr_val === option_value ) {
							selected_attr_val_valid = true;
							return false; // break.
						}
					});
				}
			}

			// Detach the placeholder if:
			// - Valid options exist.
			// - The current selection is non-empty.
			// - The current selection is valid.
			// - Placeholders are not set to be permanently visible.
			if ( attached_options_count > 0 && selected_attr_val && selected_attr_val_valid && ( 'no' === show_option_none ) ) {
				new_attr_select.find( 'option:first' ).attr( 'disabled' );
				option_gt_filter = '';
			}

			// Detach unattached.
			new_attr_select.find( 'option' + option_gt_filter + ':not(.attached)' ).prop( 'disabled', true );

			// Finally, copy to DOM and set value.
			current_attr_select.html( sanitizer.sanitize( new_attr_select.html() ) );
			current_attr_select.find( 'option' + option_gt_filter + ':not(.enabled)' ).prop( 'disabled', true );

			// Choose selected value.
			if ( selected_attr_val ) {
				// If the previously selected value is no longer available, fall back to the placeholder (it's going to be there).
				if ( selected_attr_val_valid ) {
					current_attr_select.val( selected_attr_val );
				} else {
					current_attr_select.val( '' ).trigger( 'change' );
				}
			} else {
				current_attr_select.val( '' ); // No change event to prevent infinite loop.
			}
		});

		// Custom event for when variations have been updated.
		form.$form.trigger( 'woocommerce_update_variation_values' );
	};

	/**
	 * Get chosen attributes from form.
	 * @return array
	 */
	VariationFormCP.prototype.getChosenAttributes = function() {
		var data   = {};
		var count  = 0;
		var chosen = 0;

		this.$attributeFields.each( function() {
			var attribute_name = $( this ).data( 'attribute_name' ) || $( this ).attr( 'name' );
			var value          = $( this ).val() || '';

			if ( value.length > 0 ) {
				chosen ++;
			}

			count ++;
			data[ attribute_name ] = value;
		});

		return {
			'count'      : count,
			'chosenCount': chosen,
			'data'       : data
		};
	};

	/**
	 * Find matching variations for attributes.
	 */
	VariationFormCP.prototype.findMatchingVariations = function( variations, attributes ) {
		var matching = [];
		for ( var i = 0; i < variations.length; i++ ) {
			var variation = variations[i];
			if ( this.isMatch( variation.attributes, attributes ) ) {
				
				matching.push( variation );
			}
		}
		return matching;
	};

	/**
	 * See if attributes match.
	 * @return {Boolean}
	 */
	VariationFormCP.prototype.isMatch = function( variation_attributes, attributes ) {
		var match = true;
		for ( var attr_name in variation_attributes ) {
			if ( variation_attributes.hasOwnProperty( attr_name ) ) {
				var val1 = variation_attributes[ attr_name ];
				var val2 = attributes[ attr_name ];
				if ( val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2 ) {
					match = false;
				}
			}
		}
		return match;
	};

	/**
	 * Function to call wc_variation_form on jquery selector.
	 */
	$.fn.wc_variation_form_compare = function() {
		new VariationFormCP( this );
		return this;
	};

	/**
	 * Stores a default attribute for an element so it can be reset later
	 */
	$.fn.wc_set_variation_attr = function( attr, value ) {
		if ( undefined === this.attr( 'data-o_' + attr ) ) {
			this.attr( 'data-o_' + attr, ( ! this.attr( attr ) ) ? '' : this.attr( attr ) );
		}
		if ( false === value ) {
			this.removeAttr( attr );
		} else {
			this.attr( attr, value );
		}
	};


	$(function() {
		$( '.sw-variation-frontend' ).each( function() {
			$( this ).wc_variation_form_compare();
		});
	});	

})( jQuery, window, document );
