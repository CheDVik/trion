(function ($) {
    'use strict';
 
    var lastScrollTop = 0,
    lastScrollTopLM,
		scrollTopPos = $(window).scrollTop(),
		time = 7, // time in seconds$elem, 
		isPause, 
		tick,
		percentTime,
		$elem = $('.slider-index');


////////////////////// WaypointAnimations

// Добавьте класс ez-animate к элементам, которые хотите анимировать.
// Добавить data-attributeв Animate.css тип анимации
// Добавить data-attribute-delay для установки задержки анимации
// Добавить data-attribute-offset, чтобы установить смещение триггера
// Добавьте класс ez-animate-group в контейнеры вокруг ваших ez-animate элементов для групповой анимации (полезно для поэтапной анимации)

    var InitWaypointAnimations = (function () {
      function onScrollInitAnimation(items, container, options) {
          const containerOffset = ( container ) ? container.attr("data-animation-offset") || options.offset : null;
          items.each( function() {
              const element = $(this),
              animationClass = element.attr("data-animation"),
              animationDelay = element.attr("data-animation-delay") || options.delay,
              animationOffset = element.attr("data-animation-offset") || options.offset;
  
              element.css({
                  "-webkit-animation-delay":  animationDelay,
                  "-moz-animation-delay":     animationDelay,
                  "animation-delay":          animationDelay,
                  "opacity":                  0
              });
  
              const trigger = ( container ) ? container : element;
  
              trigger.waypoint(function() {
                  element
                      .addClass("animated")
                      .addClass(animationClass)
                      .css({
                          "opacity": 1
                      });
              },{
                  triggerOnce: true,
                  offset: containerOffset || animationOffset
              });
          });
      }
      
      function InitWaypointAnimations(defaults) {
          if(!defaults) { defaults = {}; }
          const options = {
              offset: defaults.offset || "90%",
              delay: defaults.delay || "0s",
              animateClass: defaults.animateClass || "ez-animate",
              animateGroupClass: defaults.animateGroupClass || "ez-animate-group"
          }
  
          const animateGroupClassSelector = classToSelector(options.animateGroupClass);
          const animateClassSelector = classToSelector(options.animateClass);
  
          // Attach waypoint animations to grouped animate elements
          $(animateGroupClassSelector).each((index, group) => {
              const container = $(group);
              const items = $(group).find(animateClassSelector);
              onScrollInitAnimation(items, container, options);
          });
  
          // Attach waypoint animations to ungrouped animate elements
          $(animateClassSelector)
          .filter((index, element) => {
              return $(element).parents(animateGroupClassSelector).length === 0;
          })
          .each((index, element) => {
              onScrollInitAnimation($(element), null, options);
          });
      }
  
      function classToSelector(className) {
          return "." + className;
      }
  
      return InitWaypointAnimations;
  }());
  
		
////     progressBar for slideshow
	
	function progressBar(event){
	  callback(event);
      start();
    }
 
    function start() {
      percentTime = 0;
      isPause = false;
      tick = setInterval(interval, 10);
    };
 
    function interval() {
      if(isPause === false){
        percentTime += 1 / time;
        $('.bar').css({
           width: percentTime+"%"
         });
		 
        if(percentTime >= 100){
		  $elem.trigger('next.owl.carousel');
        }
      }
    }
    function pauseOnDragging(){
      isPause = true;
    }
 
    function moved(event){
      clearTimeout(tick);
	  callback(event);
      start();
    }
	
	function callback(event) {
    var itemIndex   = event.item.index + 1 - event.relatedTarget._clones.length / 2,
		itemCount	= event.item.count;
		$('.itemIndex').html(itemIndex);
		$('.itemCount').html(itemCount);
	}
 	
	function modlClose() {
		if ($('.modl-container').hasClass('modl-is-open')) {	
			$('.modl-container').removeClass('modl-is-open').addClass('modl-is-hidden');
		 }	
			
		if (	$('.sidebar').hasClass('view') ) {
			$('.sidebar').toggleClass('view');
			$('.overlay').fadeToggle(300);
		}

		$('body').css('overflow', 'auto');
		 
	}
	
    if ($.fn.owlCarousel) {
		$('.slider-index').owlCarousel({
			items: 1,
			loop:true,
			dots: false,
			nav: false,
			onInitialized : progressBar,
			onTranslate : moved,
			onDrag : pauseOnDragging
		});
		
		$('.customNextBtn').click(function() {
			$('.slider-index').trigger('next.owl.carousel');
		});

		$('.customPrevBtn').click(function() {
			$('.slider-index').trigger('prev.owl.carousel');
		});

        $('.slider-quality').owlCarousel({
			items: 3,
			loop:true,
			dots: true,
			nav: false,
            margin:15,
            autoplay:true,
            autoplayHoverPause:true,
			onDrag : pauseOnDragging,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,

                },
                1000:{
                    items:2,

                },
                1400:{
                    items:3,
                }
            }
		})
	}

  
function leftMenuPos(scrollTopPos) {
    if (scrollTopPos > lastScrollTopLM && scrollTopPos > 150) {
        if ($('.left-menu').hasClass('left-menu__fixed') === false) {
            $('.left-menu').addClass('left-menu__fixed').css({'width': $('.left-menu').parent().width()});
        }  
    } else {
        if (scrollTopPos < 150) {
            $('.left-menu').removeClass('left-menu__fixed');
        }
    }

    if ($('.left-menu').hasClass('left-menu__fixed') === true) {
        var footerTopY=$('.footer').offset().top - $(window).scrollTop(),
        oldTop=$('.left-menu').position().top,
        leftMenuBottomY = oldTop + $('.left-menu').height();   
        if (footerTopY < leftMenuBottomY ) {
              $('.left-menu').css({'top': oldTop - (leftMenuBottomY-footerTopY)});
              } else {
                  $('.left-menu').css({'top': 100});
              }
    }          
    lastScrollTopLM = scrollTopPos;
 }
	
$(document).ready(function () {

    if ($('.left-menu').length ){ 
        leftMenuPos(scrollTopPos);
    }

    $('.inner-section').waypoint(function(direction) {
        $('.left-menu a').removeClass('active');
        var selector = ".left-menu__a[href='#" + this.element.id + "']"; 
            $(selector).addClass('active');
        }, {
        offset: '5%'
      });

    if ($('.ez-animate').length ){ 
        InitWaypointAnimations();
    }

    if (scrollTopPos > 100) {
        $('.header').addClass('scrolled');
    }

	$(document).on('click', '.sidebar__menu_li_a', function () {	
		modlClose();
	});


  $(document).on('click', '.control', function () {	
         var  modalTarget= $(this).attr('modal-target');
         $('.modl-container.' + modalTarget).removeClass('modl-is-hidden').addClass('modl-is-open');
		 $('body').css('overflow','hidden');
  });

  $(document).on('click', '.accordion', function () {	
      var textWrapper=$(this).children('.accordion_textWrapper'),
          textWrapperHeight=textWrapper.prop('scrollHeight'),
          textWrapperScrollTop=Math.round($(this).offset().top);
       
        if ($(this).hasClass('accordionOpen') ) {
            textWrapper.css({'height': 0 +'px'})
            $(this).removeClass('accordionOpen');
        } else {
            textWrapper.css({'height': textWrapperHeight +'px'})
            $(this).addClass('accordionOpen');
            if (textWrapperScrollTop > 400){
              $('html, body').animate({
                  scrollTop: $(this).offset().top + 10
            }, 'slow');
            }
        }

  });
   
   
  $(document).on('click', 'body', function (e) {	
        var $target = $(e.target);
        var where;
          // Check where is clicked
        if ($target.is(".modl-bg,.modl-inner,.modl-container")) {
          where = "Outside";
          modlClose();
        } else if ($target.is(".modl-content")) {
          where = "Slide";
        } else {
          return;
        }
  });
   
		$('.header__menuToggle').on('click', function () {
			$('.sidebar').toggleClass('view');
			$('.overlay').fadeToggle(300);
			$('body').css('overflow','hidden');
		});
   
		$('.modl-close, .overlay').on('click', function() {
			modlClose();
		});
	   
	    $(document).keyup(function (e) {
			if (e.key === "Escape") { // escape key maps to keycode `27`
				modlClose();
			}	
		});
	  
});
  
    
$(window).on('scroll', function () {
 
       if ($('.overlay').has('view')) {
          $('.overlay').removeClass('view');
       }
 
       var scrollTopPos = Math.round($(this).scrollTop());
 
       if ($('.left-menu').length ){ 
        leftMenuPos(scrollTopPos);
        }
      

       if (scrollTopPos > lastScrollTop && scrollTopPos > 80) {
 
          $('.header').addClass('scrolled');
          $('.header').removeClass('show-scrolled');
 
       } else {
          $('.header').addClass('show-scrolled');
          if (scrollTopPos < 100) {
             $('.header').removeClass('scrolled show-scrolled');
          }
		}  
		if (Math.abs(scrollTopPos - lastScrollTop) > 500) {
		 lastScrollTop = scrollTopPos;
		}       
     });
	 
	 
 })(jQuery);