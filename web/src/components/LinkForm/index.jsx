import React from 'react';
import Link from '../Link';
import './style.scss';

const LinkForm = (props) => {
  let links = [
    { title: 'Tv Channels' },
    { title: 'Statistics' },
    { title: 'Add Location' },
    { title: 'Log Out' },
  ];

  return (
    <div className='link-form'>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            index={index}
            title={link.title}
            popupRef={props.popupRef}
          />
        );
      })}
    </div>
  );
};

export default LinkForm;
