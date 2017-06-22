import * as d3 from 'd3';

const youjoSenki = [
  7.26,
  7.48,
  7.66,
  7.73,
  7.82,
  7.90,
  7.96,
  7.98,
  7.99,
  8.00,
  8.02,
  8.21
].map((rating, i) => {
  return {episode: i + 1, rating: rating};
});

// I might need this later
const highScore = Math.ceil(d3.max(youjoSenki, ys => ys.rating)),
      lowScore = Math.floor(d3.min(youjoSenki, ys => ys.rating)),
      delta = highScore - lowScore;

const svg = d3.select('svg'),
      margin = {top:20, right: 20, bottom: 30, left: 50},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleLinear()
  .rangeRound([0, width])
  .domain([1, youjoSenki.length]);  // Episode number

const y = d3.scaleLinear()
  .rangeRound([height, 0])
  .domain([lowScore, highScore]);  // Rating

const line = d3.line()
  .x(ys => x(ys.episode))
  .y(ys => y(ys.rating));

g.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x));

const path = g.append('path')
  .datum(youjoSenki)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('stroke-width', 0.5)
  .attr('d', line);

// Data points
g.append('g').selectAll('.line-point')
  .data(youjoSenki)
  .enter().append('g')
    .attr('class', 'line-point')
    .append('circle')
      .attr('cx', ys => x(ys.episode))
      .attr('cy', ys => y(ys.rating))
      .attr('r', 2)
      .style('fill', 'white')
      .style('stroke', 'steelblue');

// Data point labels
d3.selectAll('.line-point')
  .data(youjoSenki)
  .append('text')
  .attr('fill', 'steelblue')
  .attr('x', ys => x(ys.episode))
  .attr('y', ys => y(ys.rating))
  .attr('dy', '-0.6em')
  .attr('dx', '-0.9em')
  .text(ys => `${ys.rating}`);
