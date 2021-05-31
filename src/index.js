// LIBS
import * as d3 from 'd3';
import 'intersection-observer';
import scrollama from 'scrollama';
import * as Chart from './js/Chart/chart.js';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';

// VARS
let container, width;
const dataUrl = 'https://gist.githubusercontent.com/njgriffiths/c0a987372baea607f22506e1cd6b4e1c/raw/086fcbd214433e2e2b648ee3df9616bafef95183/covid-mobility.csv';

const config = {
	chart_variables: ['work','transit','driving'],
	fill_colours: ['#A7A9AB','steelblue','darkred'],
	y_scale_metric: 'driving'
};


// FUNCTIONS
const parseDate = d3.utcParse('%Y-%m-%d');

const addLabel = (d, el, group) => {
	const label = document.createElement('p');
	label.innerText = d.key;
	label.className = `label ${group}`;

	el.prepend(label);
};

const buildCharts = (data) => {
	data
		// sort data by region name
		.sort((a,b) => (a.key.toLowerCase().replace(/\s/g, '') > b.key.toLowerCase().replace(/\s/g, '')) ? -1 : 1)
		.forEach((d,i) => {
			// create the chart element
			const container = document.createElement('div');
			const group = d.key.toLowerCase().replace(' ', '-');
			container.id = `${group}`;
			container.className = `chart ${d.class_name}`;
			charts.prepend(container);

			// add region name
			addLabel(d, container, 'group');

			// get chart with
			width = container.offsetWidth;

			// init chart
			Chart.init(d.data, config, container);
		});
};

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

const groupBy = (array, key) => {
	return array.reduce(function(result, x) {
		(result[x[key]] = result[x[key]] || []).push(x);

		return result
	}, {});
};

const setupScroller = (scroller) => {
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
				fadeOut('.scrollyteller .chart');

				// refocus selected item
				fadeIn(`.scrollyteller .f${index + 1}`);
			} else if (index === 0 && dir === 'up') {
				// fade in
				fadeIn('.scrollyteller .chart');
			}

			// console.log(index, dir)
		})
		.onStepExit(resp => {
			// { element, index, direction }
			if (resp.index === 2 && resp.direction === 'down') {
				// fade in
				fadeIn('.scrollyteller .chart');

				// disable pointer-events
				const overlay = document.querySelectorAll('#charts .overlay');
				overlay.forEach(el => {
					el.className += ' no-events'
				})
			}

			// console.log(resp.index, resp.direction)
		});

	// setup resize event
	window.addEventListener('resize', scroller.resize);
};

const transformData = (data) => {
	// group by region
	const grouped = groupBy(data, 'region');

	return Object.keys(grouped).map(d => {
		let className = grouped[d][grouped[d].length - 1].driving > 0 ? 'f1' : 'f2';
		className = d === 'Seoul' ? 'f3' : className;
		
		return {
			key: d,
			class_name: className,
			data: grouped[d].map(({date, driving, transit, work}) => ({date, driving: driving, transit: transit, work: work}))
		}
	});
};


// Let's kick this off!
const init = async () => {
	// scrollama!
	const scroller = scrollama();
	// wrapper el
	container = d3.select('charts');

	// grab our data
	const resp = await d3.csv(dataUrl, d => {
		return {
			date: parseDate(d.date),
			// date: d.date,
			region: d.region,
			driving: Math.round(+d.driving_avg * 10) / 10,
			transit: Math.round(+d.transit_stations_avg * 10) / 10,
			work: Math.round(+d.workplaces_avg * 10) / 10
		}
	});

	// draw the chart
	const data = transformData(resp);
	buildCharts(data, '.chart');
	
	setupScroller(scroller);
};



init();

