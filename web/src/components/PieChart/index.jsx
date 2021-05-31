import React from 'react';
import { Pie } from 'react-chartjs-2';
import tv from '../../api/tv';
import { connect } from 'react-redux';
import './style.scss';
import { saveTvChannelsData } from '../../redux/actions/tv';

const PieChart = (props) => {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        };

        const { data } = await tv.get('/', config);

        if (data.success) {
          props.dispatch(saveTvChannelsData(data));
        }
      } catch (err) {
        console.error('Server Error: ', err);
      }
    };
    fetchData();
  }, []);

  const [barData, setBarData] = React.useState({
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
  const [barOptions, setBarOptions] = React.useState({
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
