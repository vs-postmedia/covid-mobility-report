import * as d3 from 'd3';
import tooltipTemplate from '../TooltipTemplate/tooltip-template';
import css from './chart.css';



// THE GOOD STUFF
let svg, height, width, xScale, yScale, yScaleBand, yScaleMetric;
const yTicks = 3;
const opacity = 0.5;
const margin = {
	top: 10,
	right: 5,
	bottom: 25,
	left: 30
};



function handleMouseMove() {
	const bisectDate = d3.bisector(dataPoint => dataPoint.date).left;
	
	// get x-value of current mouse position
	const xValue = x.invert(d3.pointer(event)[0]);

	// Get the index of the xValue relative to the dataSet & the datapoints on the left & right of the index
	const dataIndex = bisectDate(dataCache, xValue, 1);
	const leftData = dataCache[dataIndex - 1];
	const rightData = dataCache[dataIndex];

	// i dunno, sometimes rightData doesn't work... <shrug>
	if (rightData) {
		// determine if xPos is closer to the left or right data point
		const dataPoint = xValue - leftData.date > rightData.date - xValue ? leftData : rightData;

		// because we aren't currently showing recoveries... (there's a better way, I know...)
		// d3.select('.highlight-0')
		// 	.style('display', null)
		// 	.attr('transform', `translate(${x(dataPoint.date)}, ${y(parseInt(dataPoint.cumulative_recovered))})`);

		d3.select('.highlight-0')
			.style('display', null)
			.attr('transform', `translate(${x(dataPoint.date)}, ${y(parseInt(dataPoint.active_cases))})`);

		d3.select('.highlight-1')
			.style('display', null)
			.attr('transform', `translate(${x(dataPoint.date)}, ${y(parseInt(dataPoint.cumulative_deaths))})`);

		//
		showTooltip(dataPoint);	
	}
}

function showTooltip(data) {
	const pageXpadding = 15;
	const content = tooltipTemplate(data);

	const tooltip = d3.select('.tooltip-container')
		.html(content);

	const width = d3.select('.tooltip-container')
		.style('width')

	// tooltip left/right of pointer to keep from getting pushed off screen
	const left = event.pageX > parseInt(width) ? event.pageX - (parseInt(width) + pageXpadding)  : event.pageX + pageXpadding;

	d3.select('.tooltip-container')
		.style('display', null)
		.style('top', `${event.pageY - 15}px`)
		.style('left', `${left}px`);
}

function handleMouseOut() {
	d3.selectAll('.highlight')
		.style('display', 'none');

	d3.select('.tooltip-container')
		.style('display', 'none');
}


// FUNCTIONS 
const drawData = (svg, metric, i, data, config) => {
	// prep variables for chart
	const variable = data.map(d => {
		d.value = parseInt(d[metric]);
		return (({date, value}) => ({date, value}))(d);
	});

	if (metric === 'work') {
		// bars
		svg.append('g')
			.attr('class', 'bar')
			.selectAll('rect')
			.data(variable)
			.join('rect')
			// .attr('stroke', config.fill_colours[i])
			// .attr('stroke-width', 1)
			.attr('fill', config.fill_colours[i])
			.attr('x', d => xScale(d.date))
			.attr('y', d => yScale(0))
			.attr('height', d => (height - margin.top - margin.bottom) - yScale(d.value))
			.attr('width', width / data.length)
	} else {
		// lines for the rest
		svg.append('path')
			.datum(variable)
			.attr('fill', 'none')
			.attr('stroke', config.fill_colours[i])
			.attr('stroke-width', 2)
			.attr('d', lineGenerator(variable, xScale));
	}


	

	// tooltip highlights
	svg.append('g')
		.append('circle')
		.attr('class', `highlight highlight-${i}`)
		.attr('r', 5)
		.attr('fill', config.fill_colours[i])
		.style('display', 'none');
};

const init = async (data, config, el) => {
	// console.log(data)

	// set height & width
	height = d3.select(el).style('height').slice(0, -2) - margin.top - margin.bottom;
	width = d3.select(el).style('width').slice(0, -2);
	
	// svg
	svg = d3.select(el)
		.append('svg')
		.attr('viewBox', [0, 0, width, height])

	// axes & gridlines
	setupAxes(data, config.y_scale_metric);
	
	// draw data  
	config.chart_variables.forEach((metric,i) => {
		drawData(svg, metric, i, data, config);
	});
};

const lineGenerator = (data, x) => {
	return d3.line() 
		.x(d => xScale(d.date))
		.y(d => yScale(d.value))
}

const setupAxes = (data, metric) => {
	yScaleMetric = metric;
	xScale = xSetup(data);
	yScale = ySetup(data);
	// yScaleBand = yScaleBandSetup(data);
	svg.append('g')
		.call(xAxis);

	svg.append('g')
		.call(yAxis);

	svg.append('g')
		.call(yAxisGridlines);
}

const xAxis = g => {
	g.attr('transform', `translate(0, ${height - margin.bottom})`)
		.attr('class', 'x-axis')
		.call(d3.axisBottom(xScale)
			.ticks(5)
			.tickSizeOuter(0)
			.tickFormat(d3.utcFormat('%b.'))
		)
};

const yAxis = g => {
	g.attr("transform", `translate(${margin.left},0)`)
		.attr('class', 'y-axis')
		    .call(d3.axisLeft(yScale)
		    	.ticks(yTicks)
		    )
		    .call(g => g.select('.domain').remove()); // removed the line
};

const yAxisGridlines = g => {
	g.attr("transform", `translate(${margin.left},0)`)
		.attr('class', 'gridline')
		    .call(d3.axisLeft(yScale)
		    	.ticks(yTicks)
		    	.tickSize(-width + margin.left + margin.right)
				.tickFormat('')
		    )
		    .call(g => g.select(".domain").remove()); // removed the line
};

const xSetup = (data) => {
	return d3.scaleUtc()
	// return d3.scaleOrdinal()
		.domain(d3.extent(data, d => d.date ))
		.range([ margin.left, width - margin.right ]);
}

const ySetup = (data) => {
	return d3.scaleLinear()
		.domain([-100, d3.max(data, d => parseInt(d[yScaleMetric]))]).nice()
		.range([height - margin.bottom, margin.top])
};

const updateChart = (data, config) => {
	
	// set height & width
	height = d3.select(id).style('height').slice(0, -2) / 1.6 - margin.top - margin.bottom;
	width = d3.select(id).style('width').slice(0, -2);
	
	// svg
	const svg = d3.select(id)
		.append('svg')
		.attr('viewBox', [0, 0, width, height])
		
	d3.select('svg')
		.on('mousemove touchmove', handleMouseMove)
		.on('mouseout touchend', handleMouseOut);

	// Add axes
	x = xSetup(data);
	y = ySetup(data);

	svg.append('g')
		.call(xAxis)

	svg.append('g')
		.call(yAxis)

	svg.append('g')
		.call(yAxisGridlines)

	// draw data area 
	config.chart_variables.forEach((metric,i) => {
		drawData(svg, metric, i, data, config);
	});

	// add tooltip
	// d3.select('#app')
	// 	.append('div')
	// 		.attr('class', 'tooltip-container')
	// 		.style('display', 'none')
	// 		.style('font', '1rem BentonSans');
};


window.addEventListener('resize', () => {
	const el = document.getElementById(el.replace('#', ''));

	if (el !== null) {
		el.innerHTML = '';
		updateChart(dataCache, configCache);
	}
});

export { init, updateChart };