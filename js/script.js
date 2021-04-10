var toggleButton = document.querySelector('.toggle-menu');
var navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
	navBar.classList.toggle('toggle');
});



const slides = document.querySelectorAll('.slide');
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
const dots = document.querySelectorAll('.dot');
let index = 0;

function setActive(n) {
	for(slide of slides)
		slide.classList.remove('active');
	slides[n].classList.add('active');	
	for(dot of dots)
		dot.classList.remove('active');
	dots[n].classList.add('active');		
} 

rightArrow.addEventListener('click', function(){
	if(index == slides.length - 1){
		index = 0;
		setActive(index);
	}		
	else {
		index++;
		setActive(index);
	}		
	clearInterval(runSlider);
})

leftArrow.addEventListener('click', function(){
	if(index == 0) {
		index = slides.length - 1;
		setActive(index);
	}
	else {
		index--;
		setActive(index);
	}
	clearInterval(runSlider);
})


for(let i = 0; i < dots.length; i++) {
	dots[i].addEventListener('click', function(){
		setActive(i);
		index = i;
		clearInterval(runSlider);
	})
}

const runSlider = setInterval(function(){
	if(index == slides.length - 1){
		index = 0;
		setActive(index);
	}		
	else {
		index++;
		setActive(index);
	}
}, 2500)

//scroll to top

//(function(){
	var intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page
	var scrollButton = document.querySelector('.to-top'); // Reference to our scroll button
	//var header = document.querySelector('#header');
	var headerHeight = "50";
	
	
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > headerHeight)
			scrollButton.style.display = "block";
		else
			scrollButton.style.display = "none";
	});
	
	
	function scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(intervalId);
		}
		window.scroll(0, window.pageYOffset - 50);
	}
	
	function scrollToTop() {
		intervalId = setInterval(scrollStep, 7);
	}
	
	scrollButton.addEventListener('click', scrollToTop);

//}())

//smooth menu scroll

(function () {

	var smoothScroll = function smoothScroll(targetEl, duration) {
		var target = document.querySelector(targetEl);
		var targetPosition = target.getBoundingClientRect().top; // - headerElHeight; //if header fixed minus headerElHeight 

		var startPosition = window.pageYOffset;
		var startTime = null;

		var ease = function ease(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		var animation = function animation(currentTime) {
			if (startTime === null) startTime = currentTime;
			var timeElapsed = currentTime - startTime;
			var run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};

		requestAnimationFrame(animation);
	};

	var scrollTo = function scrollTo() {
		var navBar = document.querySelector('.nav-bar');
		//const links = document.querySelectorAll('.js-scroll'); //добавлЯем классы к линкам
		var links = document.querySelectorAll('.nav-link'); 

		links.forEach(function (each) {
			each.addEventListener('click', function (e) {
				e.preventDefault();
				var currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000); //выход из мобильного меню
				navBar.classList.remove('toggle');
			});
		});
	};

	scrollTo();
}());


