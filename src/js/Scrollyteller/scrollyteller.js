import 'intersection-observer';
import scrollama from 'scrollama';
import css from './scrollyteller.css';


// FUNCTIONS
const fadeIn = (selectorString) => {
	const elements = document.querySelectorAll(selectorString);
	elements.forEach(el => {
		el.style.opacity = 1;
		el.className += ' focus';
	});
};

const fadeOut = (selectorString) => {
	const elements = document.querySelectorAll(selectorString);
	elements.forEach(el => {
		el.style.opacity = 0.5;
		el.classList.remove('focus');
	});
};

const init = (selector) => {
	// scrollama!
	const scroller = scrollama();

	// setup the scroller instance, pass callback functions
	scroller
		.setup({
			offset: 1,
			step: '.step',
		})
		.onStepEnter(resp => {
			// { element, index, direction }
			const index = resp.index;
			const dir = resp.direction;

			if (index >= 0 && dir === 'down' || index > 0 && dir === 'up') {
				// fade  out
				fadeOut(selector);

				// refocus selected item
				fadeIn(`.scrollyteller .f${index + 1}`);
			} else if (index === 0 && dir === 'up') {
				// fade in
				fadeIn(selector);
			}
		})
		.onStepExit(resp => {
			// { element, index, direction }
			if (resp.index === 2 && resp.direction === 'down') {
				// fade in
				fadeIn(selector);

				// disable pointer-events
				const overlay = document.querySelectorAll('#charts .overlay');
				overlay.forEach(el => {
					el.className += ' no-events'
				});
			}
		});

	// setup resize event
	window.addEventListener('resize', scroller.resize);
};

export { init };