import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//remove grid lines
ChartJS.defaults.scale.grid.display = false;
//remove legend
ChartJS.defaults.plugins.legend.display = false;
//remove line border
ChartJS.defaults.datasets.line.borderJoinStyle = 'round';
//make the line smooth
ChartJS.defaults.datasets.line.cubicInterpolationMode = 'monotone';
//make the line more curvy
ChartJS.defaults.datasets.line.tension = 0.4;
//delete margin left
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,

    },
  },
//   scales: {
//     y: {
//         display:false
//     }
// }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 70, 50, 20, 70],
      borderColor: '#C5F541',
      backgroundColor: '#0e026d',
    },
  ],
};

export function LineChartExercise({data}:any) {
  return <Line options={options} data={data} />;
}