// import * as d3 from 'd3';
import d3Horizon from 'd3-horizon';
// import cubism from 'cubism';
import css from './horizon-chart.css';


// VARS
const step = 25;
const overlap = 5;
const mirror = true;
// const scheme = 'RdYlBu';
const margin = {top: 30, right: 10, bottom: 0, left: 10};
// const scheme = ['#d7191c','#fdae61','#ffffbf','#abd9e9','#2c7bb6'];
const scheme = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'];

// FUNCTIONS
let x, y, height, width;
const color = i => {
	console.log(scheme[i + (i >= 0) + overlap])
	return scheme[i + (i >= 0) + overlap]
	// return scheme[overlap * 2 + 1][i + (i >= 0) + overlap]
};

const addLabel = (d, el) => {
	const label = document.createElement('p');
	label.innerText = d.key;
	label.className = 'label';

	el.prepend(label);
}

const buildAxes = (data, width) => {
	const max = d3.max(data, d => d3.max(d.values, d => Math.abs(d.value)));

	x = d3.scaleUtc()
	    	.domain([data[0].values[0].date, data[0].values[data[0].values.length - 1].date])
	    	.range([0, width]);

	y = d3.scaleLinear()
			.domain([-max, +max])
			.range([overlap * step, -overlap * step]);
}


const buildChart = _ => {
	return d3Horizon({useCanvas: false})
		.bands(5)
		.duration(600)
		.height(50)
		.mode('offset')
		.negativeColors(['#a50026','#d73027','#f46d43','#fdae61','#fee090'])
		.positiveColors(['#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'])
		// .width(750)
		.x(d => d.date)
		.y(d => d.value)
		.tooltipContent(({x,y,points}) => {
			// console.log(points)
			return `Value: ${points[0].value}`
		});
}

const init = async (data, el) => {
	let div, container;
	let charts = document.getElementById('charts');
	// const el = document.getElementById('chart');

	data.forEach((d,i) => {
		container = document.createElement('div');
		container.id = `${d.key}-0${i}`;
		container.className = 'container';
		charts.prepend(container);

		width = container.offsetWidth;

		console.log(width)
	
		data.forEach((d,i) => {
			div = document.createElement('div');
			div.id = `${d.key}`;
			div.className += 'chart';
			container.prepend(div);

			let el = document.getElementById(`${d.key}`);
			
			const chart = new buildChart();
			chart
				.width(width)
				.data(d.values)(el);

			addLabel(d, el);
		});
	})
};


export default { init };