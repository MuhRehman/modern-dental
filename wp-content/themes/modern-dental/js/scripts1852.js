var $ = jQuery.noConflict();

var MD = {
	Common: null,
	Home: null,

	init: function () {
		// Fire off JS based on URI segment
		var uri = document.location.pathname.split('/');

		if (uri[1] == '' || uri[1] == null)
		{
			//MD.Home.init();
		}
		// trigger global scripts
		MD.Common.init();

		$(window).on('resize', function(){
			MD.Common.sidebarSetHeight();
		});

	}

};

MD.Common = {
	
	// instantiate functions
	init: function () {
		// not a mobile device
		if ( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {

		}
		// instantiate always
		MD.Common.sidebarViewMore();
	},

    viewport: function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    },

	sidebarSetHeight: function () {

		// vars
		var contentObj = $('#content');
		var contentHeight = contentObj.height();
		var sidebarObj = $('#sidebar > .sidebar-content');
		var sidebarHeight = sidebarObj.height();

		// get the viewport width
		var viewportWidth = MD.Common.viewport().width;
		// window is larger than mobile breakpoint
		if (viewportWidth >= 745) {
			// if content height is greater than sidebar, set sidebar height.
			if ( contentHeight > sidebarHeight ) {
				sidebarObj.css({'min-height' : contentHeight});
			}
		} else {
			sidebarObj.css({'min-height' : 'inherit'});
		}

	},

	sidebarViewMore: function () {

		// get sidebar menu
		var $productMenu = $('#sidebar #modern-dental-products ul.menu');
		// get the first list item
		var $listItem = $('#sidebar #modern-dental-products ul.menu li:lt(4)');

		// save the product menu height
		var productMenuHeight = $productMenu.height();
		// get the list item height
		var listItemHeight = 0;
		$listItem.each(function() {
		   listItemHeight += $(this).height();
		});

		$(window).resize(function() {
			var productMenuHeight = $productMenu.height('auto');
			var listItemHeight = $listItem.height('auto');

			// save the product menu height
			var productMenuHeight = $productMenu.height();
			// get the list item height
			var listItemHeight = 0;
			$listItem.each(function() {
			   listItemHeight += $(this).height();
			});

			// reset menu
			$productMenu.height(listItemHeight).removeClass('toggle-open').addClass('toggle-closed');
			// show hidden widgets
			$("#sidebar .widget:not('#modern-dental-products')").show();
		});

		// set height of product menu to show the first 3 menu items on page load
		$productMenu.height(listItemHeight).addClass('toggle-closed');

		// get toggle link element
		var $menuToggle = $('#sidebar #modern-dental-products a.product-menu-toggle');
		
		// var $menuBackgroundSizeAuto = $('#sidebar').css('min-height','auto');
		// toggle the product menu navigation
		$menuToggle.click(function(event){		
			event.preventDefault();
			// get current text
			var toggleText = $(this).text();
			// toggle text, view more or less
			$(this).text(toggleText == "[+] View All Products" ? "[-] Collapse Products" : "[+] View All Products");
			// expand the menu
			if ( $productMenu.is('.toggle-closed') ) {
				$productMenu.addClass('toggle-open').removeClass('toggle-closed').animate({height: productMenuHeight}, 'slow');
				//$productMenu.addClass('sidebarListCompact');
				//$("#sidebar .widget:not('#modern-dental-products')").hide();
				
			} else {
				$productMenu.addClass('toggle-closed').removeClass('toggle-open').animate({height: listItemHeight}, 'slow');
				//$("#sidebar .widget:not('#modern-dental-products')").show();
			}
		}); // $menuToggle

	}

};

/*

MD.Home = {

	// instantiate functions
	init: function () {
		MD.Home.exampleFunction();
	},

	exampleFunction: function () {

	}

};
*/

$( document ).ready(function() {
	MD.init();
});

// force function to trigger after page load
$(window).bind('load', function() {
	MD.Common.sidebarSetHeight();
});