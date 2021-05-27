// LIBS
import * as d3 from 'd3';
import 'intersection-observer';
import scrollama from 'scrollama';
import HorizonChart from './js/HorizonChart/horizon-chart.js';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';

// VARS
const amznUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/jank/AMZN.csv';
const aaplUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/jank/AAPL.csv';

// FUNCTIONS
const parseDate = d3.utcParse('%Y-%m-%d');

// JS
const init = async () => {
	// instantiate the scrollama
	const scroller = scrollama();
	
	const data = await fetchData()
	HorizonChart.init(data, '.chart');
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
				img.className += ' focus';
			});
		})
		.onStepExit(resp => {
			// { element, index, direction }
		});

	// setup resize event
	window.addEventListener('resize', scroller.resize);
};

async function fetchData() {
// 	// const AMZN = await d3.csv(amznUrl);
// 	const values = await d3.csv(aaplUrl, d => {
// 		const date = parseDate(d['Date']);
// 		return {date, value: +d['Close']};
// 	});
// 	const v = values[0].value;

// 	return {
// 		key: 'AAPL',
// 		values: values.map(({date, value}) => ({date, value: Math.log(value / v)}))
// 	};

	const data = Promise.all(["AAPL", "AMZN", "GOOG", "IBM", "MSFT"].map(async key => {
	  const values = await d3.csv(`https://gist.githubusercontent.com/mbostock/696604b8395aa68d0e7dcd74abd21dbb/raw/55c17dab8461cde25ca8c735543fba839b0c940b/${key}.csv`, d => {
	    const date = parseDate(d["Date"]);
	    return {date, value: +d["Close"]};
	  });
	  const v = values[0].value;
	  return {key, values: values.map(({date, value}) => ({date, value: Math.log(value / v)}))};
	}))

	return data;
}



init();

