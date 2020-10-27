import { Data } from '@react-google-maps/api';
import React from 'react';
import Plot from 'react-plotly.js';

function DataVisualization(props) {
  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 400, height: 240, title: 'New York City' }}
      ></Plot>
    </>
  );
}

export default DataVisualization;
