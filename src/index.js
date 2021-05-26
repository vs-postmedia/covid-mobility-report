// LIBS
import 'intersection-observer';
import scrollama from 'scrollama';
import HorizonChart from './js/HorizonChart/horizon-chart.js';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';


// JS
const init = async () => {
	// instantiate the scrollama
	const scroller = scrollama();
	
	console.log(HorizonChart)
	HorizonChart.init([1], '.scrollyteller');
	// setup the instance, pass callback functions
	scroller
		.setup({
			offset: 0.75,
			step: '.step',
		})
		.onStepEnter(resp => {
			// { element, index, direction }

			const imgs = document.querySelectorAll('.scrollyteller img');
			imgs.forEach(img => {
				img.style.opacity = 0.5;
				img.classList.remove('focus');
			});

			const focus = document.querySelectorAll(`.scrollyteller img.f${resp.index}`);
			focus.forEach(img => {
				img.style.opacity = 1;
				img.className += " focus";
			});
		})
		.onStepExit(resp => {
			// { element, index, direction }
		});

	// setup resize event
	window.addEventListener("resize", scroller.resize);
};

init();