/**
 * Horizontal Bar Chart
 */

import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';

// Main Component
export default class HorizontalBarChart extends Component {
   render() {
      const { labels, label, chartdata, height } = this.props;
      const data = () => {
         return {
            labels: labels,
            datasets: [
               {
                  label: label,
                  backgroundColor: ChartConfig.color.info,
                  borderColor: ChartConfig.color.info,
                  borderWidth: 1,
                  hoverBackgroundColor: ChartConfig.color.info,
                  hoverBorderColor: ChartConfig.color.info,
                  data: chartdata,
               }
            ]
         }
      }
      // chart options
      const options = {
         legend: {
            display: false
         },
         scales: {
            xAxes: [{
               gridLines: {
                  color: ChartConfig.chartGridColor,
                  drawBorder: false
               },
               ticks: {
                  fontColor: ChartConfig.axesColor,
                  min: 1,
                  max: 9
               },
            }],
            yAxes: [{
               gridLines: {
                  display: false
               },
               ticks: {
                  fontColor: ChartConfig.axesColor
               },
            }]
         }
      };

      return (
         <HorizontalBar data={data} options={options} height={height} />
      );
   }
}
