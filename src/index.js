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
	fill_colours: ['#A7A9AB','#0062A3','darkred'],
	y_scale_metric: 'driving'
};


// FUNCTIONS
const parseDate = d3.utcParse('%Y-%m-%d');

const addLabel = (d, el, group) => {
	const label = document.createElement('p');
	label.innerText = d.key;
	label.className = `label ${group}`;

	el.prepend(label);
}

const buildCharts = (data) => {
	data.forEach((d,i) => {
		// create the chart element
		const container = document.createElement('div');
		const group = d.key.toLowerCase().replace(' ', '-');
		container.id = `${group}`;
		container.className = 'chart region';
		charts.prepend(container);

		// add region name
		addLabel(d, container, 'group');

		// get chart with
		width = container.offsetWidth;

		Chart.init(d.data, config,container);
	});
};

const groupBy = (array, key) => {
  return array.reduce(function(result, x) {
    (result[x[key]] = result[x[key]] || []).push(x);

    return result
  }, {});
};

const transformData = (data) => {
	// group by region
	const grouped = groupBy(data, 'region');

	const nested = Object.keys(grouped).map(d => {
		return {
			key: d,
			data: grouped[d].map(({date, driving, transit, work}) => ({date, driving: driving, transit: transit, work: work}))
		}
	});

	return nested;
};

// JS
const init = async () => {
	// scrollama!
	const scroller = scrollama();
	// wrapper el
	container = document.getElementById('charts');

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
	
	// setup the scroller instance, pass callback functions
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



init();

