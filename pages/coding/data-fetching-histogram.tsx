import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const htmlCode = `<main class="main-container">
<div class="histogram-chart-container">
  <div class="histogram-chart" id="histogram-chart">
    <div class="histogram-chart-upper">
      <div class="histogram-chart-y-axis" id="histogram-chart-y-axis"></div>
      <div class="histogram-chart-bars" id="histogram-chart-bars">
      </div>
    </div>
    <div class="histogram-chart-x-axis" id="histogram-x-axis">
    </div>
  </div>
</div>
</main>`;

const cssCode = `.main-container {
  display: flex;
  padding: 2rem;
  justify-content: center;
}

.histogram-chart-container {
  height: 600px;
  width: 600px;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  padding: 2rem 3rem;
}

.histogram-chart-upper {
  display: flex;
}

.histogram-chart-bars {
  border-left: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  align-items: flex-end;
}

.histogram-chart-bar {
  flex: 1;
  background-color: teal;
  margin: 0 1rem;
}

.histogram-chart-x-axis {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
}

.histogram-chart-x-axis-label {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
}

.histogram-chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.histogram-chart-y-axis-label {
  flex: 1;
  padding: 0 0.5rem;
  text-align: center;
}`;

const jsCode = `/*
High-level overview: 
1. Fetch the random number data from the endpoint and adapt it to get the frequencies of each number
2. Using the number frequencies object, we will render a histogram chart
3. We will need to draw the bars, the x axis with labels, and the y axis with labels
4. Bonus: Styling and adding tooltip of information on hover of the bars; button to refetch/regenerate data; random bar colors
*/

(async () => {
try {
  // 1. Fetch the random number data and adapt the response to get the number frequencies
  const response = await fetch(
    "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch numbers for histogram");
  }

  const data = await response.text();
  // Numbers comes back in plain text like 1\n2\n3\n...
  const numbers = data.split("\n");
  // Count the number of times each number appears
  const numberFrequencies = numbers.reduce((acc, currentNumText) => {
    if (currentNumText !== "") {
      const currentNum = parseInt(currentNumText, 10);
      if (acc.hasOwnProperty(currentNum)) {
        acc[currentNum] += 1;
      } else {
        acc[currentNum] = 1;
      }
    }
    return acc;
  }, {});

  // 2. Using the number frequencies, draw the histogram chart
  const width = 500;
  const height = 550;
  drawHistogram(numberFrequencies, width, height);
} catch (err) {
  console.error(err);
}
})();

function drawHistogram(numberFrequencies, width, height) {
  console.log("Drawing the histogram naow");

  // Draw the histogram bars
  drawHistogramBars(numberFrequencies, width, height);
  // Draw the X Axis labels
  drawXAxis(Object.keys(numberFrequencies), width);
  // Draw the Y Axis labels
  drawYAxis(Object.values(numberFrequencies), height);
}

function drawHistogramBars(numberFrequencies, width, height) {
  console.log("Drawing Histogram Bars");
  const histogramChartBody = document.getElementById("histogram-chart-bars");
  histogramChartBody.style.height = \`$\{height\}px\`;
  histogramChartBody.style.width = \`$\{width\}px\`;
  const maxFrequencyYAxisValue = computeMaxFrequencyYAxisValue(
    Object.values(numberFrequencies)
  );
  Object.entries(numberFrequencies).forEach(([number, frequency]) => {
    const histogramBar = document.createElement("div");
    histogramBar.classList.add("histogram-chart-bar");

    // Compute bar height based on max frequency rounded to nearest ten
    const barHeightPercentage = Math.round(
      (frequency / maxFrequencyYAxisValue) * 100
    );
    histogramBar.style.height = \`$\{barHeightPercentage\}%\`;

    // Set data-x and data-y attributes for mouseover tooltips
    histogramBar.setAttribute("data-x", number);
    histogramBar.setAttribute("data-y", frequency);

    histogramChartBody.appendChild(histogramBar);
  });
}

function drawXAxis(xAxisLabels, width) {
  console.log("Drawing X Axis labels", xAxisLabels);
  const xAxis = document.getElementById("histogram-x-axis");
  xAxis.style.width = \`$\{width\}px\`;
  xAxisLabels.forEach((xAxisLabel) => {
    const labelSpan = document.createElement("span");
    const labelText = document.createTextNode(xAxisLabel);
    labelSpan.appendChild(labelText);
    labelSpan.classList.add("histogram-chart-x-axis-label");
    xAxis.appendChild(labelSpan);
  });
}

function drawYAxis(frequencies, height) {
  console.log("Drawing Y Axis");
  const yAxis = document.getElementById("histogram-chart-y-axis");
  yAxis.style.height = \`$\{height\}px\`;
  const maxFrequencyYAxisValue = computeMaxFrequencyYAxisValue(frequencies);
  const yAxisLabels = [];
  for (let i = maxFrequencyYAxisValue; i > 0; i = i - 10) {
    yAxisLabels.push(i);
  }
  yAxisLabels.forEach((yAxisLabel) => {
    const labelSpan = document.createElement("span");
    labelSpan.classList.add("histogram-chart-y-axis-label");

    const labelText = document.createTextNode(yAxisLabel);

    labelSpan.appendChild(labelText);
    yAxis.appendChild(labelSpan);
  });
}

function computeMaxFrequencyYAxisValue(frequencies) {
  const maxFrequency = Math.max(...frequencies);
  const maxFrequencyYAxisValue = Math.ceil(maxFrequency / 10) * 10;
  return maxFrequencyYAxisValue;
}
`;

const DataFetchingHistogram: NextPage = () => {
  return (
    <div>
      <p>Source: https://frontendeval.com/questions/data-fetching</p>
      <p>
        Retrieve a list of numbers from an endpoint (
        {`https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new`}
        ), then plot a histogram showing the frequency of each number in the
        list. The histogram should have appropriately-numbered x and y axes. In
        the example below, the list contained 24 ones, 17 twos, 30 threes, and
        so on.
      </p>
      <p>Code Pen Example: https://codepen.io/alfinity/pen/PoOyWRe</p>
      <Prism.Tabs>
        <Prism.Tab label="dataFetchingHistogram.js" language="javascript">
          {jsCode}
        </Prism.Tab>
        <Prism.Tab label="index.css" language="css">
          {cssCode}
        </Prism.Tab>
        <Prism.Tab label="index.html" language="markup">
          {htmlCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default DataFetchingHistogram;
