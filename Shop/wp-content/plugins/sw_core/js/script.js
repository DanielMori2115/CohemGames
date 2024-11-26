/**
 * script.js
 *
 * @copyright  2021 Add on elements. All rights reserved.
 * @license MIT
 */
 (function ($) {
 	"use strict";
 	var swg_elements = { 		
		swe_tabs: function($target) {
 			let $wrap_tabs = $target.find('.swe-wrap-tabs');
 			$wrap_tabs.find('.swe-tab-title').on('click', function() {
 				if ($(this).hasClass('active')) {
 					return;
 				}
 				let tab_control = $(this).attr('aria-controls');
 				$(this).closest('.swe-wrap-tab-head').find('.swe-tab-title.active').removeClass('active');
 				$(this).addClass('active');
 				$(this).closest('.swe-wrap-tabs').find('.swe-tab-content.active').removeClass('active');
 				$(this).closest('.swe-wrap-tabs').find('#' + tab_control).addClass('active');
 				if ($(this).closest('.swe-wrap-tabs').find('#' + tab_control).find('.swe-slider')[0]) {
 					let item = $(this).closest('.swe-wrap-tabs').find('.slick-slider');
 					let config = getConfigSlider(item);
 					$(this).closest('.swe-wrap-tabs').find('.slick-slider').slick('unslick').slick(config);
 				}
 			});
 			$target.find('.swe-navbar-toggle').on('click', function() {
 				$(this).siblings('.swe-tab-head').slideToggle();
 			});
 		},
    	// Call back count down timer for variable product
    	swg_countdown: function ($target) {
    		var items = $target.find('.swg-countdown-wrapper');
            $.each(items, function(item) {
                const $date = $(items[item]).data('date');
				const $austDay 	= new Date( $date  * 1000 );	
                const $days = $(items[item]).data('days') ? $(items[item]).data('days') : 'days';
                const $hours = $(items[item]).data('hours') ? $(items[item]).data('hours') : 'hours';
                const $mins = $(items[item]).data('mins') ? $(items[item]).data('mins') : 'mins';
                const $secs = $(items[item]).data('secs') ? $(items[item]).data('secs') : 'secs';
				const $action = $(items[item]).data('action') ? $(items[item]).data('action') : 'message';
				const $url = $(items[item]).data('url') ? $(items[item]).data('url') : '';
                $(items[item]).countdown($austDay, function(event) {
					$(this).html(
						event.strftime('<div class="countdown-row"><div class="countdown-section days"><span class="countdown-amount">%D</span><span class="countdown-period">'+$days+'</span></div><div class="countdown-section hours"><span class="countdown-amount">%H</span><span class="countdown-period">'+$hours+'</span></div><div class="countdown-section mins"><span class="countdown-amount">%M</span><span class="countdown-period">'+$mins+'</span></div><div class="countdown-section secs"><span class="countdown-amount">%S</span><span class="countdown-period">'+$secs+'</span></div></div>')
					);
				}).on('finish.countdown', function(event){
					if( $action == 'message' ){
						$(this).hide('slow', function(){ $(this).remove(); });	
						$(this).parent().find( '.swg-expire-message' ).show();
					}else if( $action == 'redirect' && $url != '' ){
						window.location.replace( $url );
					}
				});
            });
        },   
		swg_gallery: function ($target) {
			var items = $target.find('.photobox-gallery');
			$.each(items, function(item) {
                $(items[item]).photobox("li > a");
            });
		},
    };

    $(window).on('elementor/frontend/init', function () {       
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-brand-element.default",
            swg_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-testimonial.default",
            swg_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg-ourteam.default",
            swg_elements.swe_slider
            );
			
		elementorFrontend.hooks.addAction(
            "frontend/element_ready/swg_list_images.default",
            swg_elements.swe_slider
         );
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/swg-countdown.default",
			swg_elements.swg_countdown
		);	
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/swg_list_store.default",
			swg_elements.swe_tabs
		);		
    });

    function getConfigSlider(slider) {
    	let rtl = $('body').hasClass('rtl') ? true : false;
        let config = {
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
             breakpoint: 992,
             settings: {
                slidesToShow: $(slider).data('slides_to_show_tablet') ? parseInt($(slider).data('slides_to_show_tablet')) : 1,
                arrows: $(slider).data('arrows_tablet') == 'yes' ? true : false,
                dots: $(slider).data('dots_tablet') == 'yes' ? true : false,
                centerMode: $(slider).data('center_mode_tablet') == 'yes' ? true : false,
                centerPadding: $(slider).data('center_padding_tablet') ? parseInt($(slider).data('center_padding_tablet')) + 'px' : '0px',
            }
			}, {
			 breakpoint: 580,
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
})(jQuery);
