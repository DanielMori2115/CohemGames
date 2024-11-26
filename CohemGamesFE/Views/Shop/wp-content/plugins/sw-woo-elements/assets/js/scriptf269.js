/**
 * script.js
 *
 * @copyright  2021 Add on elements. All rights reserved.
 * @license MIT
 */
 (function ($) {
 	"use strict";
 	var sw_woo_elements = {
 		swe_tabs: function($target) {
 			let $wrap_tabs = $target.find('.swe-wrap-tabs');
 			$wrap_tabs.find('.swe-tab-title').on('click', function() {
 				if ($(this).hasClass('active')) {
 					return;
 				}
 				let tab_control = $(this).attr('aria-controls');
 				$(this).closest('.swe-wrap-tab-head').find('.swe-tab-title.active').removeClass('active');
 				$(this).addClass('loaded active');
 				$(this).closest('.swe-wrap-tabs').find('.swe-tab-content.active').removeClass('active');
 				$(this).closest('.swe-wrap-tabs').find('#' + tab_control).addClass('active');
 				if (!$(this).hasClass( 'loaded' ) && $(this).closest('.swe-wrap-tabs').find('#' + tab_control).find('.swe-slider')[0]) {
 					let item = $(this).closest('.swe-wrap-tabs').find('.slick-slider');
 					let config = getConfigSlider(item);
 					$(this).closest('.swe-wrap-tabs').find('.slick-slider').slick('unslick').slick(config);
 				}
 			});
 			$target.find('.swe-navbar-toggle').on('click', function() {
 				$(this).siblings('.swe-tab-head').slideToggle();
 			});
 		},
 		swe_slider: function ($target) {
 			let items = $target.find('.swe-slider');
            $.each(items, function(item) {
                let config = getConfigSlider(items[item]);
                $(items[item]).find('.slick-slider').removeClass('slick-initialized slick-slider slick-dotted');
                $(items[item]).slick(config);
            });
        },
    	// Call back count down timer for variable product
    	swe_countdown: function ($target) {
    		var items = $target.find('[data-countdown="countdown"]');
            $.each(items, function(item) {
                const $date = $(items[item]).data('date').split("-");
                const $textdays = $(items[item]).data('textdays') ? $(items[item]).data('textdays') : 'days';
                const $texthours = $(items[item]).data('texthours') ? $(items[item]).data('texthours') : 'hours';
                const $textmins = $(items[item]).data('textmins') ? $(items[item]).data('textmins') : 'mins';
                const $textsecs = $(items[item]).data('textsecs') ? $(items[item]).data('textsecs') : 'secs';
                const $format = '<div class="countdown-times"><div class="day">%%D%% <span>'+ $textdays +'</span> </div><div class="hours">%%H%% <span>'+ $texthours +'</span> </div><div class="minutes">%%M%% <span>'+ $textmins +'</span> </div><div class="seconds">%%S%% <span>'+ $textsecs +'</span> </div></div>';
                $(items[item]).lofCountDown({
                    TargetDate: $date[0] + "/" + $date[1] + "/" + $date[2] + " " + $date[3] + ":" + $date[4] + ":" + $date[5],
                    DisplayFormat: $format,
                    FinishMessage: "Expired"
                });
            });
        },
        swe_cart: function ($target) {
            $target.on('click', '.swe-close, .woo-cart-close', function (e) {
                e.preventDefault();
                $target.find('.input-toggle').prop('checked', false);
            });
        }, 
		
		swe_category_hover: function ($target) {
			$target.find('.swe-woo-categories-slider.style-6 .swe-item > .swe-wrap-item' ).each(function(){
				var $this = $(this);
				var $img_target = $this.find( '.swe-wrap-image img' );
				var img_H = $img_target.height();
				var img_W = $img_target.width();
				var outer_W = $(this).width();
				console.log( img_H/2 );
				var target_H = $(this).find( '.swe-wrap-content' ).outerHeight(true);
				$img_target.parents( '.swe-wrap-image' ).css({'left': -img_W/2, 'top': -( img_H/2 - target_H/2) });
				$(this).find( '.swe-title' ).on({
					mouseenter: function() { 				 
						$this.addClass( 'hover' );					
						$img_target.parents( '.swe-wrap-image' ).css( 'left', outer_W - img_W );
					},
					mouseleave: function() {
						$this.removeClass( 'hover' );	
						$img_target.parents( '.swe-wrap-image' ).css( 'left', -img_H/2 );
					}
				});
			});
        },
        // Pagination Ajax
        swe_pagination_ajax: function ($target) {

            $target.find('.view-more-button').on('click', function (e) {
                e.preventDefault();
            });
            var wrapId = $target.find('.swe-wrapper')[0].id;

            var wrap = $target.find('ul.products')[0];
            var item = '#'+ wrapId +' .product';
            var path = '#'+ wrapId +' a.next.page-numbers';

            if ($target.find('.pagination-ajax')[0]) {
                if ($target.find(path)[0]) {
                    var button = false;
                    var scrollThreshold = false;
                    if ($target.find('.view-more-button')[0]) {
                        button = '#'+ wrapId +' .view-more-button';
                        scrollThreshold = false;
                        $(document).on('click', '.view-more-button', function () {
                            $(this).hide();
                        });
                    }
                    var infScroll = new InfiniteScroll(wrap, {
                        path: path,
                        append: item,
                        status: '#'+ wrapId +' .scroller-status',
                        hideNav: '#'+ wrapId +' .swe-pagination',
                        button: button,
                        scrollThreshold: scrollThreshold,
                    });

                    $(wrap).on('history.infiniteScroll', function (event, response, path) {
                        $target.find('.view-more-button').show();
                    });
                    $(wrap).on('last.infiniteScroll', function (event, response, path) {
                        $target.find('.view-more-button').remove();
                    });
                }
            }
        },
		swe_loadmore_ajax: function ($target) {
			var button =  $target.find('.collection-loadmore');
			var page = 2;
			var loading = false;
			var maxpage = button.data( 'maxpage' );
			var loadmore_style  = button.data( 'loadmore_style' );
            var scrollHandling = {
				allow: true,
				reallow: function() {
					scrollHandling.allow = true;
				},
				delay: 400 /* milliseconds) adjust to the highest acceptable value */
			};
			
			function containsSpecialChars(str) {
			  const specialChars = /[?]/;
			  return specialChars.test(str);
			}
			
			function get_url( $page ){
				var current_url = window.location.href;
				var next_url = '';
				if( containsSpecialChars( current_url ) ){
					next_url = current_url + '&paged=' + $page;
				}else{
					next_url = current_url + '?paged=' + $page;
				}
				return next_url;
			}
			
			
			function _product_loadmore_ajax(){
				loading = true;
				button.addClass( 'loading' );	
				var url = get_url( page );	
				$target.find( 'ul.swe-slider' ).each( function(){
					$(this).addClass( 'loaded' );
				});
				$.ajax({method:"GET", url: url, success: function( data ) {
					 var $data = $('<div>'+data+'</div>');
					var target_html = $data.find( 'ul.swe-collections-wrapper' );					
					page = page +1;				
					loading = false;
					$target.find('ul.swe-collections-wrapper').append( target_html.html() );
					var target_sliders = $target.find( '.swe-wrap-item > ul.swe-slider' );
					target_sliders.each( function(item){
						let config = getConfigSlider(target_sliders[item]);
						if( !$(target_sliders[item]).hasClass( 'loaded' ) ){
							$(target_sliders[item]).removeClass('slick-initialized slick-slider slick-dotted');
							$(target_sliders[item]).slick(config);
							$(target_sliders[item]).addClass( 'loaded' );
						}
					});
					button.removeClass( 'loading' );
					if( maxpage < page ){
						button.addClass( 'loaded' );
					}
				}});
			}
			if( loadmore_style == 2 ){
				$(window).scroll(function(){
					if( ! loading && scrollHandling.allow ) {
						scrollHandling.allow = false;
						setTimeout(scrollHandling.reallow, scrollHandling.delay);
						var offset = $(button).offset().top - $(window).scrollTop();	
						if( maxpage < page ){
							button.addClass( 'loaded' );
						}
						if( 1000 > offset && maxpage >= page ) {
							_product_loadmore_ajax();
						}
					}
				});
			}else{		
				button.on( 'click', function(e){
					if( maxpage >= page ){			
						_product_loadmore_ajax();
					}
					e.preventDefault();
				});
			}
        },
    };

    $(window).on('elementor/frontend/init', function () {

        // Woo Cart
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-cart.default",
            sw_woo_elements.swe_cart
            );

 		// Category Tab slider
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-category-tab-slider.default",
 			sw_woo_elements.swe_tabs
 			);
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-category-tab-slider.default",
 			sw_woo_elements.swe_slider
 			);
			
		// Category Tab Chils Cat
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-category-tab-childcat.default",
 			sw_woo_elements.swe_tabs
 			);
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-category-tab-childcat.default",
 			sw_woo_elements.swe_slider
 			);
 		
 		// Filter Tab slider
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-filter-tab-slider.default",
 			sw_woo_elements.swe_tabs
 			);
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-filter-tab-slider.default",
 			sw_woo_elements.swe_slider
 			);

 		// Tags slider
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-tags-slider.default",
 			sw_woo_elements.swe_slider
 			);
			
		// Categories slider
 		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-categories-slider.default",
 			sw_woo_elements.swe_slider
 			);
		elementorFrontend.hooks.addAction(
 			"frontend/element_ready/swe-woo-categories-slider.default",
 			sw_woo_elements.swe_category_hover
 			);

        // Countdown slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-countdown-slider.default",
            sw_woo_elements.swe_countdown
            );
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-countdown-slider.default",
            sw_woo_elements.swe_slider
            );

        // Related and Upsells slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-related-and-upsells-tab-slider.default",
            sw_woo_elements.swe_tabs
            );
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-related-and-upsells-tab-slider.default",
            sw_woo_elements.swe_slider
            );

        // Recent Viewed slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-recent-viewed.default",
            sw_woo_elements.swe_slider
            );

        // Related slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-related-slider.default",
            sw_woo_elements.swe_slider
            );

        // Upsells slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-upsells-slider.default",
            sw_woo_elements.swe_slider
            );

        // Products grid
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-products-grid.default",
            sw_woo_elements.swe_pagination_ajax
            );

        // Products slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-products-slider.default",
            sw_woo_elements.swe_slider
            );
			elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-brand-element.default",
            sw_woo_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-testimonial.default",
            sw_woo_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-ourteam.default",
            sw_woo_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg_list_images.default",
            sw_woo_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-collections.default",
            sw_woo_elements.swe_loadmore_ajax
            );
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swe-woo-collections.default",
            sw_woo_elements.swe_slider
            );
		
		$('[data-type=tab_ajax]').on('click', function() {
			swe_tab_click_ajax( $(this) );
		});
		
		$( '.product-images-slider' ).each(function(){
			var $rtl 			= $('body').hasClass( 'rtl' );
			var $vertical		= $(this).data('vertical');
			var $vertical_tb	= $(this).data('vertical_tablet');
			var $img_slider 	= $(this).find('.product-responsive');
			var $thumb_slider 	= $(this).find('.product-responsive-thumbnail' );
			var number_slider	=  $(this).data( 'number' );
			var number_tablet 	= $(this).data( 'number_tablet' );
			var number_mobile 	= $(this).data( 'number_mobile' );
			
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
					breakpoint: 992,
					settings: {
						slidesToShow: number_tablet,
						vertical: $vertical_tb
					}
				},
				{
					breakpoint: 580,
					settings: {
						slidesToShow: number_mobile,
						vertical: false
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 2,
						vertical: false
					}
				}
				]
			});
			var el = $(this);
			setTimeout(function(){
				el.removeClass("loading");				
			});
		});
    });

    function getConfigSlider(slider) {
    	let rtl = $('body').hasClass('rtl') ? true : false;
        let config = {
		  appendArrows: $(slider).parent(),
		  variableWidth: ( typeof( $(slider).data('variable_width') ) != 'undefined' ) ? $(slider).data('variable_width') : false,
          rows: $(slider).data('slides_to_rows') ? parseInt($(slider).data('slides_to_rows')) : 1,
          slidesToShow: $(slider).data('slides_to_show') ? parseInt($(slider).data('slides_to_show')) : 4,
          slidesToScroll: $(slider).data('slides_to_scroll') ? parseInt($(slider).data('slides_to_scroll')) : 1,
          arrows: $(slider).data('arrows') == 'yes' ? true : false,
          dots: $(slider).data('dots') == 'yes' ? true : false,
          pauseOnHover: $(slider).data('pause_on_hover') == 'yes' ? true : false,
          autoplay: $(slider).data('autoplay') == 'yes' ? true : false,
		  speed: ( typeof( $(slider).data('speed') ) != 'undefined' )? $(slider).data('speed') : 500,
          autoplaySpeed: ( typeof( $(slider).data('autoplay_speed') ) != 'undefined' ) ? $(slider).data('autoplay_speed') * 1000 : 3000,
          infinite: $(slider).data('infinite') == 'yes' ? true : false,
          fade: $(slider).data('fade') == 'fade' ? true : false,
		  cssEase: 'linear',
          centerMode: $(slider).data('center_mode') == 'yes' ? true : false,
          lazyLoad: $(slider).data('lazyload') ? $(slider).data('lazyload') : 'progressive',
          nextArrow: $(slider).data('next'),
          prevArrow: $(slider).data('prev'),
          rtl: rtl,
          centerPadding: $(slider).data('center_padding') ? parseInt($(slider).data('center_padding')) + 'px' : '0px',
          responsive: [ {
             breakpoint: 1199,
             settings: {
                slidesToShow: $(slider).data('slides_to_show_tablet') ? parseInt($(slider).data('slides_to_show_tablet')) : 1,
                arrows: $(slider).data('arrows_tablet') == 'yes' ? true : false,
                dots: $(slider).data('dots_tablet') == 'yes' ? true : false,
                centerMode: $(slider).data('center_mode_tablet') == 'yes' ? true : false,
                centerPadding: $(slider).data('center_padding_tablet') ? parseInt($(slider).data('center_padding_tablet')) + 'px' : '0px',
            }
			}, {
			 breakpoint: 767,
			 settings: {
				slidesToShow: $(slider).data('slides_to_show_mobile') ? parseInt($(slider).data('slides_to_show_mobile')) : 1,
				arrows: $(slider).data('arrows_mobile') == 'yes' ? true : false,
				dots: $(slider).data('dots_mobile') == 'yes' ? true : false,
				centerMode: $(slider).data('center_mode_mobile') == 'yes' ? true : false,
				centerPadding: $(slider).data('center_padding_mobile') ? parseInt($(slider).data('center_padding_mobile')) + 'px' : '0px',
			}
		}]
		};
	return config;
	}
	
	function swe_tab_click_ajax( element ) {			
		var target 		= element.attr( 'aria-controls' );
		var id	 		= element.data( 'target_id' );
		var orderby 	= element.data( 'orderby' );
		var order 		= element.data( 'order' );
		var item_row  	= element.data( 'slides_to_rows' );
		var filter    	= element.data( 'filter' );
		var catid 		= element.data( 'category' );
		var number 		= element.data( 'number' );
		var columns 	= element.data( 'slides_to_show' );
		var columns1 	= element.data( 'slides_to_show_tablet' );
		var columns2 	= element.data( 'slides_to_show_mobile' );
		var interval 	= element.data( 'autoplay_speed' );
		var scroll1		= element.data( 'slides_to_scroll' );
		var infinite 	= element.data( 'infinite' );
		var autoplay 	= element.data( 'autoplay' );	
		var centermode  = element.data( 'center_mode' );
		var arrows 	    = element.data( 'arrows' );
		var dots 	    = element.data( 'dots' );
		var pause 		= element.data( 'pause_on_hover' );
		var fade 		= element.data( 'fade' );
		
		
		var tg_append 	= element.parents( '.swe-ajax' ).find( ' .swe-wrap-tab-content' );
		var action = 'swe_category_ajax_callback';
		
		var ajaxurl   = swe_ajax.ajax_url.replace( '%%endpoint%%', action );
		if( !element.hasClass ('loaded') ){
			tg_append.addClass( 'loading' );
			var data 		= {
				action: action,
				catid: catid,
				number: number,
				target: target,
				target_id: id,
				item_row: item_row,
				filter: filter,
				orderby: orderby,
				order: order,
				columns: columns,
				columns1: columns1,
				columns2: columns2,
				interval: interval,
				infinite: infinite,
				centermode: centermode,
				autoplay: autoplay,
				arrows: arrows,
				dots: dots,
				pause: pause,
				fade: fade,	
				nextArrow:'<button class="swe-slider-btn prev-item"><i class="fas fa-chevron-left"></i></button>',
				prevArrow:'<button class="swe-slider-btn prev-item"><i class="fas fa-chevron-left"></i></button>',
			};
			jQuery.post(ajaxurl, data, function(response) {
				element.addClass( 'loaded' );
				tg_append.find( '.swe-tab-content' ).removeClass( 'active' );
				tg_append.append( response );
				console.log( id );
				$(id).removeClass('slick-initialized slick-slider slick-dotted');
				$(id).slick(getConfigSlider( id ));
				$( ".add_to_cart_button" ).attr( "title", swe_ajax.title );
				$( ".add_to_wishlist" ).attr( "title", swe_ajax.wishlist );
				$( ".compare" ).attr( "title", swe_ajax.compare );
				$( ".sw-quickview" ).attr( "title", swe_ajax.quickview );
				tg_append.removeClass( 'loading' );
			});
		}		
	}
})(jQuery);
