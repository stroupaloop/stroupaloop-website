$(document).ready(function(){
	$('#top').css('height',$(window).height());

	$('.js-lazyYT').lazyYT(); 

	$('.scroll-down').hover(
		function(){
			$('.glyphicon').css('padding-top','30px');
		}, function() {
			$('.glyphicon').css('padding-top','20px');
		}
	);

	applyNavigation();

  /* Isotope stuff */
  var $container = $('.project');

  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector: '.project-item',
      layoutMode: 'masonry'
    });
  });

  // bind filter button click
	$('#filters').on('click', 'button', function(){
		var filterValue = $(this).attr('data-filter');
		$container.isotope({
			filter:filterValue
		});
	})

  // change active class on buttons
	$('.button-group').each(function(i,buttonGroup){
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function(){
			$buttonGroup.find('.active').removeClass('active').removeClass('btn-teal').addClass('btn-bluegrey');
			$(this).addClass('active').removeClass('btn-bluegrey').addClass('btn-teal').blur();
		})
	})
});

var aChildren = $("nav li").children(); // find the a children of the list items (array)
var aArray = []; // create the empty aArray
for (var i=0; i < aChildren.length; i++) {
	var aChild = aChildren[i];
	var ahref = $(aChild).attr('href');
	aArray.push(ahref); // assigns the values to the array
} // this for loop fills the aArray with attribute href values

$(window).scroll(function(){
	var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
	var windowHeight = $(window).height(); // get the height of the window
	var docHeight = $(document).height();

	
	for (var i=0; i < aArray.length; i++){
		var theID = aArray[i];
		var divPos = $(theID).offset().top - 1; // get the offset of the div from the top of page
		var divHeight = $(theID).height() + 205; // get the height of the div in question
		if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
			$("a[href='" + theID + "']").parent().addClass("active");
		} else {
			$("a[href='" + theID + "']").parent().removeClass("active");
		}
	}

	if(windowPos + windowHeight == docHeight) {
		if (!$("nav li:last-child").hasClass("active")) {
			$("nav li.active").removeClass("active");
			$("nav li:last-child").addClass("active");
		}
	}
});

$(window).resize(function(){ 
	// dynamically set height of top section
  if ($(window).height() > 500) {
    $('#top').css('height','auto');
    $('#top').css('height',$(window).height());
  }
  else {
    $('#top').css('height', 600);
  }
});

// navigation functions
function replaceActiveElement(){
	$('.navbar-default .navbar-nav > .active');
}

function applyNavigation()
{
	applyClickEvent();
	applyNavigationFixForPhone();
	applyScrollSpy();
	applyStickyNavigation();
}
function applyClickEvent(){
	$('a[href*=#]').on('click', function(e){
		e.preventDefault();
		if( $( $.attr(this, 'href') ).length > 0 ){
			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 600);
		}
		return false;
	});
}
function applyNavigationFixForPhone(){
	$('.navbar li a').click(function(event){
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}
function applyScrollSpy(){
	$('#navbar-example').on('activate.bs.scrollspy', function(){
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}
function applyStickyNavigation(){
	lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
	$(window).on('scroll', function(){  
		stickyNavigation();  
	});  
	
	stickyNavigation();
}
function stickyNavigation(){         
	if($(window).scrollTop() > lnStickyNavigation){   
		$('body').addClass('fixed');  
	} else {  
		$('body').removeClass('fixed');   
	}  
}