import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          parser: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
        ticks: {
          fontColor: '#ccc',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: '#ccc',
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const LineGraph = () => {
  const casesData = useSelector((state) => state.covid.historicalData);
  const { loading, error } = useSelector((state) => state.covid);

  return (
    <div className="linegraph">
      {!loading && error ? (
        <h4>No Data.</h4>
      ) : (
        casesData && casesData?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: '#128794',
                  borderColor: '#00e5ff',
                  color: '#fff',
                  data: [...casesData],
                },
              ],
            }}
            options={options}
          />
        )
      )}
    </div>
  );
};

export default LineGraph;
