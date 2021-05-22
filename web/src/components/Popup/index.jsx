import React from 'react';
import InputField from '../InputField';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import './style.scss';
import { closePopup } from '../../redux/actions/ui';
// import tv from '../../../api/tv';
// import user from '../../../api/user';
// import { saveTvChannelsData } from '../../../redux/actions/tv';

const Popup = (props) => {
  const popupRef = React.createRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (inputData) => {
    console.log(inputData);
    // try {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${props.token}`,
    //     },
    //   };

    //   if (props.isAdmin) {
    //     const params = {
    //       tv_channel: inputData.popup.toUpperCase(),
    //     };
    //     const responseTvChannel = await tv.post('/', params, config);

    //     if (responseTvChannel.data.success) {
    //       const responseAllTvChannels = await tv.get('/', config);
    //       if (responseAllTvChannels.data.success) {
    //         props.dispatch(saveTvChannelsData(responseAllTvChannels.data));
    //         document
    //           .getElementsByClassName('popup-filter-holder')[0]
    //           .classList.add('fadeOut');
    //         setTimeout(() => {
    //           props.dispatch(props.dispatch(closePopup()));
    //         }, 250);
    //       }
    //     }
    //   } else {
    //     const params = {
    //       location: inputData.popup,
    //     };
    //     const responseLocation = await user.put(
    //       `/location/${props.userId}`,
    //       params,
    //       config
    //     );

    //     if (responseLocation.data.success) {
    //       const responseTvChannel = await tv.put(
    //         `/${props.userId}`,
    //         {
    //           tv_channel: props.tvChannelId,
    //         },
    //         config
    //       );

    //       if (responseTvChannel.data.success) {
    //         // const responseAllUsers

    //         document
    //           .getElementsByClassName('popup-filter-holder')[0]
    //           .classList.add('fadeOut');
    //         setTimeout(() => {
    //           props.dispatch(closePopup());
    //         }, 250);
    //       }
    //     }
    //   }
    // } catch (err) {
    //   throw err.message;
    // }
  };

  return (
    <div className='popup-holder' ref={popupRef}>
      <div className='popup-box'>
        <button
          className='popup-btn'
          onClick={() => {
            popupRef.current.classList.add('fadeOut');
            setTimeout(() => {
              props.dispatch(closePopup());
            }, 250);
          }}
        >
          <i className='fas fa-times'></i>
        </button>
        <h2 className='popup-title'>{props.popupDataTitle}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={props.popupDataLabel}
            type='text'
            id='popup'
            name='popup'
            register={{
              ...register('popup', {
                required: true,
                minLength: 2,
              }),
            }}
            watch={watch().popup}
            errors={errors.popup}
          />
          <button className='popup-btn-confirm' type='submit'>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // isAdmin: state.user.userData.isAdmin,
    // token: state.user.token,
    // userId: state.user.userData.id,
    // tvChannelId: state.tv.tvChannelId,
    popupDataTitle: state.ui.popup.data?.title,
    popupDataLabel: state.ui.popup.data?.label,
  };
};

export default connect(mapStateToProps)(Popup);
