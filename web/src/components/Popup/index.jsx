import React from 'react';
import InputField from '../InputField';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import './style.scss';
import { closePopup, openToast } from '../../redux/actions/ui';
import user from '../../api/user';
import { saveUserData } from '../../redux/actions/user';

const Popup = (props) => {
  const popupRef = React.createRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {
    let params = {
      location: inputData.popup,
    };

    let config = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };

    user
      .put(`/location/${props.userId}`, params, config)
      .then((res) => {
        return res;
      })
      .then(({ data }) => {
        if (data.success) {
          return user.get(`/${props.userId}`, config);
        }
      })
      .then((res) => {
        return res;
      })
      .then(({ data }) => {
        if (data.success) {
          props.dispatch(saveUserData(data));
          document
            .getElementsByClassName('popup-holder')[0]
            .classList.add('fadeOut');
          setTimeout(() => {
            props.dispatch(closePopup());
            props.dispatch(openToast('Location Added!', 'success'));
          }, 250);
        }
      })
      .catch((err) => {
        console.error('Server Error: ', err);
      });
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
    token: state.user.token,
    userId: state.user.userData.id,
    // tvChannelId: state.tv.tvChannelId,
    popupDataTitle: state.ui.popup.data?.title,
    popupDataLabel: state.ui.popup.data?.label,
  };
};

export default connect(mapStateToProps)(Popup);
