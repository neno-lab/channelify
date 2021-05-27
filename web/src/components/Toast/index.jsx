import React from 'react';
import { FailIcon, SuccessIcon } from '../../assets/icons';
import { connect } from 'react-redux';
import './style.scss';
import { closeToast } from '../../redux/actions/ui';

const Toast = (props) => {
  const toastRef = React.createRef();

  React.useEffect(() => {
    setTimeout(() => {
      props.dispatch(closeToast());
    }, 5000);
  }, []);

  const handleOnClick = () => {
    toastRef.current.classList.add('fadeOut');
    setTimeout(() => {
      props.dispatch(closeToast());
    }, 250);
  };

  return (
    <div className={`toast ${props.className}`} ref={toastRef}>
      {props.className === 'success' ? (
        <SuccessIcon className='toast-icon' />
      ) : (
        <FailIcon className='toast-icon' />
      )}

      <h2>{props.text}</h2>
      <div className='toast-x' onClick={() => handleOnClick()}>
        <div className='toast-line-1'></div>
        <div className='toast-line-2'></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.ui.toast.text,
    className: state.ui.toast.className,
  };
};

export default connect(mapStateToProps)(Toast);
