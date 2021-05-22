import React from 'react';
import Link from '../Link';
import './style.scss';

const LinkForm = () => {
  let links = [
    { title: 'Tv Channels' },
    { title: 'Statistics' },
    { title: 'Add Location' },
    { title: 'Profile' },
    { title: 'Log Out' },
  ];

  return (
    <div className='link-form'>
      {links.map((link, index) => {
        return <Link key={index} title={link.title} />;
      })}
    </div>
  );
};

export default LinkForm;
