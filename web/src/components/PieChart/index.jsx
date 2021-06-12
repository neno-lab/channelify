import React from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import './style.scss';

const PieChart = (props) => {
  const [barData, setBarData] = React.useState(null);
  const [barOptions, setBarOptions] = React.useState(null);

  React.useEffect(() => {
    setBarData({
      labels: props.tvChannelsName,
      datasets: [
        {
          label: 'test label',
          data: props.tvChannelAmount,
          backgroundColor: [
            'rgb(255, 186, 103)',
            'rgb(96, 47, 68)',
            'rgb(211, 223, 135)',
            'rgb(246, 170, 206)',
            'rgb(140, 209, 246)',
          ],
          borderWidth: 5,
        },
      ],
    });
    setBarOptions({
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Data Orgranized In Bars',
          fontSize: 25,
        },
        legend: {
          display: true,
          position: 'top',
        },
      },
    });
  }, [props.tvChannelAmount]);

  return (
    <div className='pie-holder'>
      <Pie data={barData} options={barOptions} height={400} width={400} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token,
    tvChannelsData: state.tv.tvChannelsData,
    tvChannelsName: state.tv.tvChannelsData?.map((name) => {
      return name.tv_channel_name;
    }),
    tvChannelAmount: state.tv.tvChannelsData?.map((amount) => {
      return amount.amount;
    }),
  };
};

export default connect(mapStateToProps)(PieChart);
