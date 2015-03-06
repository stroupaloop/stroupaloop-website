$(document).ready(function(){
	$('#top').css('height',$(window).height());

	$('.project-item').click(function(){
		var project_name = this.id;
		$('.modal-body').html(Project(project_name));
	});

	$('.scroll-down').hover(
		function(){
			$('.glyphicon').css('padding-top','30px');
		}, function() {
			$('.glyphicon').css('padding-top','20px');
		}
	);

	applyNavigation();

	var lmargin;
	var windowWidth  = $(window).width();
	if (windowWidth >= 1200) {
  	// lmargin range is -20 to 60 or 412.5
  	lmargin = ((windowWidth - 1200)/240) * 80 - 20;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth >= 992 && windowWidth <= 1199) {
  	// lmargin range is -8 to 66
  	lmargin = ((windowWidth - 992)/207) * 74 - 8;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth >= 768 && windowWidth <= 991) {
  	// lmargin range is 3 to 78
  	lmargin = ((windowWidth - 768)/223) * 75 + 3;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth <= 767) {
  	// lmargin range is 27 to 211
  	lmargin = ((windowWidth - 400)/367) * 184 + 27;
  	$('.project').css('margin-left', lmargin);
  }
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

  windowWidth  = $(window).width();
	if (windowWidth >= 1200) {
  	// lmargin range is -20 to 60 or 412.5
  	lmargin = ((windowWidth - 1200)/240) * 80 - 20;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth >= 992 && windowWidth <= 1199) {
  	// lmargin range is -8 to 66
  	lmargin = ((windowWidth - 992)/207) * 74 - 8;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth >= 768 && windowWidth <= 991) {
  	// lmargin range is 3 to 78
  	lmargin = ((windowWidth - 768)/223) * 75 + 3;
  	$('.project').css('margin-left', lmargin);
  } else if (windowWidth <= 767) {
  	// lmargin range is 27 to 211
  	lmargin = ((windowWidth - 400)/367) * 184 + 27;
  	$('.project').css('margin-left', lmargin);
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

// isotope filtering
$(function(){
	var $container = $('.project').isotope({
		itemSelector: '.project-item',
		layoutMode: 'fitRows'
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

// Project switch selector
function Project(projectname) {
	switch (projectname) {
		case 'matchbakers':
			return '<p><strong>MatchBakers website</strong><br/><a href="http://matchbakers.com" target="_blank">matchbakers.com</a></p>' +
			'<a href="http://matchbakers.com" target="_blank"><img src="images/projects-matchbakers-full.png" class="img-responsive"></a>'
			break;
		case 'mb-website':
			return '<p><strong>MegaBots website</strong><br/><a href="https://pacific-crag-2074.herokuapp.com/" target="_blank">megabots.com</a></p>' +
			'<a href="https://pacific-crag-2074.herokuapp.com/" target="_blank"><img src="images/projects-mb-website-full.png" class="img-responsive"></a>'
			break;
		case 'mb-video':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://player.vimeo.com/video/120241149" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/120241149">MegaBots website video</a> from <a href="https://vimeo.com/user3392637">Andrew Stroup</a> on <a href="https://vimeo.com">Vimeo</a>.</p></div>' +
			'<h4>MegaBots website HTML5 video</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Editor<br/>Tools: C300, GoPro Hero3+, 5d mark iii, Final Cut Pro<br/><br/>MegaBots Inc. background HTML5 website video.</p>';
			break;
		case 'autodesk':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/mBj8SSVtyCQ" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Giant T-Shirt Missile Launcher Turret at Autodesk University</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Director, Producer, Videography, Editor<br/>Tools: C300, GoPro Hero3+, 5d mark iii, Final Cut Pro<br/><br/>The MegaBots Mark I and missile turret head to Las Vegas as guest presenters for Autodesk University 2014, showcasing in the exhibit hall and firing t-shirts into the crowd at the keynote speech at Mandalay Bay.</p>';
			break;
		case 'junk':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/KjViDItdp00" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Real Life Mech Prototype Destroys Junk Car</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Director, Producer, Videographer, Editor<br/>Tools: GoPro Hero3+, 5d mark iii, Final Cut Pro<br/><br/>The MegaBots team took the Mark I to a secret location outside of Boston and tested the cannon on a junker. The MegaBall, a 6 inch, 3 lb, paint-filled cannonball, was fired at 120 miles per hour, causing massive damage to the vehicle. Check us out and support our Kickstarter if you like what you see!</p>';
			break;
		case 'junk-after':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/BRG6w2kSr7E" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Real Life Mech Prototype Destroys Junk Car (After Hours Edition)</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Director, Producer, Videographer, Editor<br/>Tools: GoPro Hero3+, 5d mark iii, Final Cut Pro<br/><br/>The MegaBots team took the Mark I to a secret location outside of Boston and tested the cannon on a junker. After testing the MegaBall, the MegaBots team tested ammunition the internet suggested after the sun went down. Check us out and support our Kickstarter if you like what you see!</p>';
			break;
		case 'nycc':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/bJvDIg-4t4M" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>MegaBots at New York Comic Con 2014</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Director, Producer, Videography, Editor<br/>Tools: GoPro Hero3+, Final Cut Pro<br/><br/>The MegaBots team debuts the first giant fighting mech robot, Mark I, and missile turret at New York Comic Con 2014 (NYCC) as they prepare for their Kickstarter launch.</p>';
			break;
		case 'mb-ks':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/IHmUlEd5H18" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Kickstarter Video</h4>' +
			'<p><strong>MegaBots, Inc.</strong></p>' +
			'<p>Roles: Executive Producer, Production Manager<br>Tools: C300, GoPro Hero3+, 5d mark iii, Final Cut Pro<br/><br/>MegaBots, Inc pits 15-foot-tall piloted humanoid robots against each other in the sport of the future: epic arena combat!</p>';
			break;
		case 'hexapod':
			return '<div class="embed-responsive embed-responsive-16by9">' +
			'<iframe src="https://www.kickstarter.com/projects/projecthexapod/stompy-the-giant-rideable-walking-robot-0/widget/video.html" frameborder="0" scrolling="no"></iframe></div>' +
			'<h4>Project Hexapod</h4>' +
			'<p>Project Hexapod is a team of roboticists, engineers, designers, and fabricators who are building a 4,000 pound, 18 foot diameter rideable 6-legged robot and release the designs to the world.  We don’t just want to build a giant robot, we want to enable others to build giant robots.  This blog is the official source for news on our efforts.</p>'
			break;
		case 'selfie':
			return '<p><strong>Pictures of People Taking Selfies</strong><br/><a href="http://picturesofpeopletakingselfies.com" target="_blank">picturesofpeopletakingselfies.com</a></p>' +
			'<p><a href="http://picturesofpeopletakingselfies.com" target="_blank"><img src="images/projects-selfie-full.png" class="img-responsive"></a></p>'
			break;
		case 'personal-website':
			return '<p><strong>Personal website v1</strong><br/><a href="http://stroupaloop.herokuapps.com" target="_blank">stroupaloop.com</a></p>' +
			'<p><a href="http://stroupaloop.herokuapps.com" target="_blank"><img src="images/projects-personal-website-full.png" class="img-responsive"></a></p>'
			break;
		case 'ck':
			return '<p><strong>CommonKey website</strong><br/><a href="https://commonkey.com" target="_blank">commonkey.com</a></p>' +
			'<p><a href="http://commonkey.com" target="_blank"><img src="images/projects-ck-full.png" class="img-responsive"></a></p>'
			break;
		case 'tbbt-8':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/Tb_naDUJiEQ" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Portable Deployable Bridge</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to safely allow a light duty truck to travel over a 30 foot span. The system was required to be transported and deployed from one side by the same truck, while being within the Gross Vehicle Weight Rating of the truck. The team was given 5 days and $10,000 to complete the project.</p>'
			break;
		case 'tbbt-7':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/L1HkwWjjKsg" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Gated Checkpoint Security System</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to automatically detect and prevent unauthorized access at a gated checkpoint. The system was required to be naturally open, meaning the ability to allow authorized vehicles to pass through the system unharmed. Additionally, the system would be measured for g force and damage to the vehicle. The team was given 3 days and $5,000 to complete the project.</p>'
			break;
		case 'tbbt-6':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/OC-efvNaw1A" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Automated Food Machine</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to automate the preparation, cooking, and delivery of food for the masses. The team was given 5 days and $6,000 to complete the project.</p>'
			break;
		case 'tbbt-5':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/76sRLzfOAjE" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Green Waterfall Elevator</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to harness the energy of a waterfall to power a self sustainable elevator. The team was given 4 days and $5,000 to complete the project.</p>'
			break;
		case 'tbbt-4':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/hSiiqnaP1cU" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Olympian Robot</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to compete in three decathlon events (100m dash, javelin throw, and the standing long jump). The metrics were to break the existing Olympic world records for the 100m dash and standing long jump and get as close to the current world record for the javelin throw. The robot was required to be controlled remotely and powered by an on-board energy source. The robot could shed 75% of the original weight for the long jump event. The team was given 5 days and $10,000 to complete the project.</p>'
			break;
		case 'tbbt-3':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/dz0QBcGmHU0" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Environmental Protection Shelter</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to protect a human from extreme environmental conditions (gale force winds, >2000F fire exposure, and >1500lbs of a 3" diameter water blast). The environmental protection shelter was required to be stored inside a medium sized military duffel bag and be deployed within 5 minutes. The human protected by the shelter had to maintain survivable conditions (oxygen and temperature levels). The team was given 3 days and $4,000 to complete the project.</p>'
			break;
		case 'tbbt-2':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/Mh_5Uz8Ibnw" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Missile Defense System</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory</strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to destroy an incoming projectile with another projectile (no smaller than 1.5" in diameter), controlled remotely from within a bunker, and remotely powered. The team was given 5 days and $20,000 to complete the project.</p>'
			break;
		case 'tbbt-1':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/agvbKAiYwN4" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Explosion Payload Protection</h4>' +
			'<p><strong>Discovery Channel, The Big Brain Theory<br/></strong></p>' +
			'<p>Tasked with designing, fabricating, and delivering a system to protect an explosive payload located in the bed of a truck experiencing a head on collision with another vehicle (~35mph), requiring the payload to experience less than 25g of acceleration. The team was given 3 days and $5,000 to complete the project.</p>'
			break;
		case 'jpeo-plan':
			return '<img src="images/projects-jpeo-full.png" class="img-responsive">' + 
			'<h4>CBDP Capabilities Development Plan</h4>' +
			'<p><strong>JPEO-CBD</strong></p>' +
			'<p>Developed the CBDP Enterprise and medical acquisition framework to define the end to end alignment of investments and strategies, supporting portfolio management in fielding materiel solutions to the Warfighter, requiring cross-organizational and intra-agency collaboration and review.</p>'
			break;
		case 'lss':
			return '<img src="images/projects-lss-full.png" class="img-responsive">' + 
			'<h4>S&amp;T Needs and Priorities Lean Six Sigma</h4>' +
			'<p><strong>JPEO-CBD</strong></p>' +
			'<p>Facilitated alignment of JPEO-CBD and JSTO-CBD investments and strategies to support CBDP Enterprise portfolio management through process refinement, metrics definition, and alignment to the POM development process.</p>'
			break;
		case 'pom':
			return '<img src="images/projects-pom-full.png" class="img-responsive">' + 
			'<h4>Program Objective Memorandum Tool</h4>' +
			'<p><strong>JPEO-CBD</strong></p>' +
			'<p>Developed an in-house auditing software program to support the JPEO-CBD CBDP POM development process. The software allows users to evaluate multiple POM scenarios via builds and simulations, easily access programmatic information, automate tracking of all transactions, compare builds, and generate reports for stakeholder review.' +
			'<ul><li>Saved over 1,000 man hours per year</li>' +
			'<li>Rapid prototyping and development</li>' +
			'<li>Continuation of updates and support to optimize coding and increase automation</li>' +
			'<li>Published a Standard Operating Procedures for use across the organization</li>' +
			'<li>Coordinated cross-organizational integration into information systems for automatic updates and reconciliation</li></ul></p>'
			break;
		case 'dbf':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://player.vimeo.com/video/38203714" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/120241149">MegaBots website video</a> from <a href="https://vimeo.com/user3392637">Andrew Stroup</a> on <a href="https://vimeo.com">Vimeo</a>.</p></div>' +
			'<h4>AIAA Design Build Fly Competition</h4>' +
			'<p>Oklahoma State University (Team Black) chief engineer in the American Institute of Aeronautics and Astronautics Design, Build, Fly 2009 competition. A cooperative team effort (15 members) requiring conceptual platform design to meet specified mission criteria, development of manufacturing techniques for rapid prototyping and testing, and the execution of performance-rated flights against domestic and international teams.' +
			'<ul><li>System conceptual design and oversaw construction methods for rapid prototyping</li>' +
			'<li>Verification and validation of subsystems and system (structural modeling and simulation, prototype testing, and avionics optimization and integration)</li>' +
			'<li>Test plan development for flight testing and performance evaluation</li></ul></p>';
			break;
		case 'disney':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/08VwtYdoBhM" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>Disneyland Resorts, California Screamin</h4>' +
			'<p><strong>BarDyne, Inc.<br/></strong></p>' +
			'<p>Fluid power consulting project for Disneyland Resorts, performing the following tasks:' + 
			'<ul><li>Collaborated with the Disneyland Resorts engineering team on design and test plans, to include: dynamic modeling and simulation, test components, and routine reports</li>' +
			'<li>Conducted on-site system and component testing</li>' +
			'<li>Prepared and presented a final analysis, report,and recommendation to the Disneyland Resorts engineering team</li></ul></p>'
			break;
		case 'efv':
			return '<div class="embed-responsive embed-responsive-16by9">' + 
			'<iframe src="https://www.youtube.com/embed/Jv9Eq1vopbc" frameborder="0" allowfullscreen></iframe></div>' +
			'<h4>General Dynamics, Expeditionary Fighting Vehicle</h4>' +
			'<p><strong>BarDyne, Inc.<br/></strong></p>' +
			'<p>Managed two concurrent project teams for the US Marine Corps Expeditionary Fighting Vehicle program (led by General Dynamics Amphibious Systems), providing consultation and test services through:' +
			'<ul><li>On-site inspection and DFMEA testing</li>' +
			'<li>Dynamic modeling and simulation of fluid power systems and subsystems</li>' +
			'<li>Design, construction, and execution of multiple platforms and tests to validate and characterize systems and subsystems</li>' +
			'<li>Presentation of test results and recommendations for implementation in system design</li></ul></p>'
			break;
		case 'dfi':
			return '<img src="images/projects-dfi-full.png" class="img-responsive">' + 
			'<h4>DFI Oil Rigging and Drilling</h4>' +
			'<p><strong>BarDyne, Inc.</strong></p>' +
			'<p>Secured a $100k, one year international consulting project for DFI (a Canadian based oil rigging company), managing a project team to perform:' +
			'<ul><li>On-site analysis and review of several fluid power systems, designs, components, and issues</li>' +
			'<li>Dynamic modeling and simulation of systems and subsystems</li>' +
			'<li>Presentation of test results and recommendations</li>' +
			'<li>Implementation of solutions and follow-on validation</li></ul></p>'
			break;
	}
};