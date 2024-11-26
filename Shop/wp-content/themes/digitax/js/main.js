(function($) {
	"use strict";
	/*
	** Quickview and single product slider
	*/
	$(document).ready(function(){
		/* 
		** Slider single product image
		*/		
		$( '.product-images' ).each(function(){
			var $rtl 			= $('body').hasClass( 'rtl' );
			var $vertical		= $(this).data('vertical');
			var $img_slider 	= $(this).find('.product-responsive');
			var video_link 		= $(this).data('video');
			var $thumb_slider 	= $(this).find('.product-responsive-thumbnail' );
			var number_slider	= ( $vertical ) ? 4: 4;
			var number_mobile 	= ( $vertical ) ? 2: 3;
			
			$img_slider.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				arrows: false,
				rtl: $rtl,
				asNavFor: $thumb_slider,
				infinite: false
			});
			$thumb_slider.slick({
				slidesToShow: number_slider,
				slidesToScroll: 1,
				asNavFor: $img_slider,
				arrows: true,
				rtl: $rtl,
				infinite: false,
				vertical: $vertical,
				verticalSwiping: $vertical,
				focusOnSelect: true,
				responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: number_mobile    
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 2    
					}
				}
				]
			});
			var el = $(this);
			setTimeout(function(){
				$( '.woocommerce-product-gallery__trigger' ).remove();
				el.removeClass("loading");
				var height = el.find('.product-responsive').outerHeight();
				var target = el.find( ' .item-video' );
				target.css({'height': height,'padding-top': (height - target.outerHeight())/2 });
				$img_slider.prepend( '<a href="#" class="woocommerce-product-gallery__trigger">ðŸ”</a>' );
				var thumb_height = el.find('.product-responsive-thumbnail' ).outerHeight();
				var thumb_target = el.find( '.item-video-thumb' );
				thumb_target.css({ height: thumb_height,'padding-top':( thumb_height - thumb_target.outerHeight() )/2 });
			}, 1000);
			if( video_link != '' ) {
				$img_slider.append( '<button data-type="popup" class="featured-video-button fa fa-play" data-video="'+ video_link +'"></button>' );
				if( $( 'body' ).hasClass( 'single-product-style1' ) || $( 'body' ).hasClass( 'single-product-style2' ) ){
					$( '.woocommerce-product-gallery__wrapper > .woocommerce-product-gallery__image:first' ).prepend( '<button data-type="popup" class="featured-video-button style1" data-video="'+ video_link +'"></button>' );
				}
			}
		});
		$(window).resize(function(){
			var $width = $(this).width();
			if( $width < 767 ){
				$(document).click(function(e) {			
					var container = $(".swe-woo-tab-slider.layout-style-4 .swe-wrap-head .swe-button");
					if ( typeof container != "undefined" && !container.is(e.target) && container.has(e.target).length === 0 && container.html().length > 0 ){
						$(".swe-woo-tab-slider.layout-style-4 .swe-wrap-head .swe-tab-head").css("display", "none");
					}
				});
			}
		});
	});
	
	/*
	** Back to top
	**/
	$("#swg-totop").hide();
	var wh = $(window).height();
	var whtml = $(document).height();
	$(window).scroll(function () {
		if ($(this).scrollTop() > whtml/10) {
			$('#swg-totop').fadeIn();
		} else {
			$('#swg-totop').fadeOut();
		}
	});
	
	$('#swg-totop').on('click',function() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	/* end back to top */
		
	function sw_buynow_variation_product(){
		var element = $( '.single-product' );
		var target = $( '.single-product .variations_form' );
		var bt_addcart = target.find( '.single_add_to_cart_button' );
		var variation  = target.find( '.variation_id' ).val();
		var bt_buynow  = element.find( '.button-buynow' );
		var url = bt_buynow.data( 'url' );
		var qty = $('.single-product input.qty').val();
		if( typeof variation != 'undefined' ){
			if( variation == 0 ){
				bt_buynow.addClass( 'disabled' );
			}else{
				bt_buynow.removeClass( 'disabled' );
			}
			if( variation != '' ){
				bt_buynow.attr( 'href', url + '='+variation + '&quantity='+ qty );
			}else{
				bt_buynow.attr( 'href', url + '&quantity='+ qty );
			}
		}else{
			bt_buynow.attr( 'href', url + '&quantity='+ qty );
		}
	}
	$(window).on( 'change', function(){
		sw_buynow_variation_product();
	});
	$(document).ready(function(){
		sw_buynow_variation_product();
	});
	
	/*add title to button*/
	$("a.compare").attr('title', custom_text.compare_text);
	$(".yith-wcwl-add-button a").attr('title', custom_text.wishlist_text);
	$("a.add_to_cart_button").attr('title', custom_text.cart_text);

	
	$(".widget_nav_menu li.menu-compare a").on('hover', function() {
		$(this).css('cursor','pointer').attr('title', custom_text.compare_text);
	}, function() {
		$(this).css('cursor','auto');
	});
	$(".widget_nav_menu li.menu-wishlist a").on('hover', function() {
		$(this).css('cursor','pointer').attr('title', custom_text.wishlist_text);
	}, function() {
		$(this).css('cursor','auto');
	});
	
	$('.product-categories').each(function(){		
		$(this).find( 'li.cat-parent' ).append( '<span class="child-category-more"><svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 24 24"><path  fill-rule="evenodd" d="M4.47 9.4a.75.75 0 0 1 1.06 0l6.364 6.364a.25.25 0 0 0 .354 0L18.612 9.4a.75.75 0 0 1 1.06 1.06l-6.364 6.364a1.75 1.75 0 0 1-2.475 0L4.47 10.46a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg></span>' );
	});
	
	$(document).on( 'click', '.child-category-more', function(){
		$(this).parent().toggleClass( 'active' );
		$(this).parent().find( ' >ul.children' ).toggle(200);
	});	
	
	$(document).on('click', '.filter-sidebar .button-filter', function(){
		$("#sidebar-fixed").toggleClass( 'open' );
		$(this).toggleClass("closex");
	});
	
	$(document).on('click', '.sidebar-close', function(e){
		var target = $(this).attr( 'href' );
		$(target).removeClass( 'open' );
		e.preventDefault();
	});
	
	$( '.top-fill .above-product-widget.sidebar .widget .block-title-widget' ).each(function(){
		$(this).addClass( 'draw-border' );
	});

	$(window).scroll(function() {   
		if( $( 'body' ).hasClass( 'mobile-layout' ) ) {
			var target = $( '.mobile-layout #header-page' );
			var sticky_nav_mobile_offset = $(".mobile-layout #header-page").offset();
			if( sticky_nav_mobile_offset != null ){
				var sticky_nav_mobile_offset_top = sticky_nav_mobile_offset.top;
				var scroll_top = $(window).scrollTop();
				if ( scroll_top > sticky_nav_mobile_offset_top ) {
					$(".mobile-layout #header-page").addClass('sticky-mobile');
				}else{
					$(".mobile-layout #header-page").removeClass('sticky-mobile');
				}
			}
		}
	});
		
	/*
	** Ajax login
	*/
	$('form#login_ajax').on('submit', function(e){
		var target = $(this);		
		var usename = target.find( '#username').val();
		var pass 	= target.find( '#password').val();
		if( usename.length == 0 || pass.length == 0 ){
			target.find( '#login_message' ).addClass( 'error' ).html( sanitizer.sanitize( custom_text.message ) );
			return false;
		}
		target.addClass( 'loading' );
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: custom_text.ajax_url,
			headers: { 'api-key':target.find( '#woocommerce-login-nonce').val() },
			data: { 
				'action': 'swg_custom_login_user', //calls wp_ajax_nopriv_ajaxlogin
				'username': target.find( '#username').val(), 
				'password': target.find( '#password').val(), 
				'security': target.find( '#woocommerce-login-nonce').val() 
			},
			success: function(data){
				target.removeClass( 'loading' );
				target.find( '#login_message' ).html( sanitizer.sanitize( data.message ) );
				if (data.loggedin == false){
					target.find( '#username').css( 'border-color', 'red' );
					target.find( '#password').css( 'border-color', 'red' );
					target.find( '#login_message' ).addClass( 'error' );
				}
				if (data.loggedin == true){
					target.find( '#username').removeAttr( 'style' );
					target.find( '#password').removeAttr( 'style' );
					document.location.href = data.redirect;
					target.find( '#login_message' ).removeClass( 'error' );
				}
			}
		});
		e.preventDefault();
	});
	
	var $x = [];
	var $i = 0;
	$( '.button-layout' ).each(function(){
		var $class = $(this).attr( 'data-value' );
		$x[$i] = $class;
		$i ++;
	});
	
	$(document).on( 'click', '.button-layout', function(e){
		$(this).addClass( 'active' ).siblings().removeClass( 'active' );
		var $class = $(this).attr( 'data-value' );
		var $z = $.grep($x, function(value) {
			return value != $class;
		});
		
		var string = $z.toString();
		var target = $(this).closest( '.woocommerce' );
		target.addClass( $class );
		target.find( 'ul.products' ).addClass( $class );
		target.find( 'ul.products' ).fadeOut(1);	
		target.find( 'ul.products' ).fadeIn(300);	
		target.removeClass( string.replace( /,/g, ' ' ) );
		target.find( 'ul.products ' ).removeClass( string.replace( /,/g, ' ' ) );
		
		e.preventDefault();
	});
})(jQuery);

/*
** Check comment form
*/
function submitform(){
	if(document.commentform.comment.value=='' || document.commentform.author.value=='' || document.commentform.email.value==''){
		alert('Please fill the required field.');
		return false;
	} else return true;
}