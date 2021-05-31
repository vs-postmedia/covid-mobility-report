// LIBS
import * as d3 from 'd3';
import * as Chart from './js/Chart/chart.js';
import * as Scrollyteller from './js/Scrollyteller/scrollyteller.js';

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

const groupBy = (array, key) => {
	return array.reduce(function(result, x) {
		(result[x[key]] = result[x[key]] || []).push(x);

		return result
	}, {});
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
	
	// scrollama!
	Scrollyteller.init('.scrollyteller .chart')
};



init();

